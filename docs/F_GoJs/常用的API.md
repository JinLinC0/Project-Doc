## 常用的`API`

具体`API`见官方文档：[`GoJS API`](https://gojs.net/latest/api/)

***

### `Diagram`下的常用`API`

#### 选择

选择`API`：`selection`，是一个只读属性，此只读属性返回选定对象的只读集合

通过这个`API`，我们可以读取到`myDiagram`画布中被选中的内容

```ts
// 读取被选中的节点
myDiagram.selection.each((node: any) => {
    ...
});

// 读取被选中的连接线
myDiagram.selection.each(function(link: any) {
    ...
});
```

#### 鼠标事件

所有鼠标和键盘事件都由 `InputEvent` 表示并重定向 添加到 `currentTool`。 默认工具是 `ToolManager` 的一个实例，它保留了三个无模式工具列表：`ToolManager.mouseDownTools`、`ToolManager.mouseMoveTools`和 `ToolManager.mouseUpTools`。 当鼠标事件发生时，`ToolManager` 会搜索这些列表，以查找第一个可以运行的工具。 然后，它将该工具设置为新的`currentTool`，它可以在其中继续处理输入事件

- 鼠标左键单击时：`click`

  ```ts
  // 鼠标单击画布时触发
  myDiagram.click = (e: any) => {
      ...
  };
  ```

- 鼠标左键双击画布时：`doubleClick`

  ```ts
  // 鼠标左键双击画布时触发
  myDiagram.doubleClick = (e: any) => {
      ...
  };
  ```

- 鼠标左键点击拖动：`mouseDragOver`

  ```ts
  // 函数在鼠标点击节点时触发一次，移动节点时一直触发，最后在释放鼠标时又触发一次
  myDiagram.mouseDragOver = (e: any) => {
      ...
  };
  ```

- 鼠标左键释放：`mouseDrop`

  ```ts
  // 函数在鼠标拖动节点后释放触发
  myDiagram.mouseDrop = (e: any) => {
      ...
  };
  ```

- 鼠标左键按住画布不动时：`mouseHold`

  ```ts
  // 鼠标左键点击画布不动时触发
  myDiagram.mouseHold = (e: any) => {
      ...
  };
  ```

- 鼠标悬停时：`mouseHover`

  ```ts
  // 鼠标在画布中悬停时触发
  myDiagram.mouseHover = (e: any) => {
      ...
  };
  ```

- 鼠标进入画布时：`mouseEnter`

  ```ts
  // 当鼠标从外界进入画布时触发
  myDiagram.mouseEnter = (e: any) => {
      ...
  };
  ```

- 鼠标离开画布时：`mouseLeave`

  ```ts
  // 鼠标离开画布时触发
  myDiagram.mouseLeave = (e: any) => {
      console.log(111)
  };
  ```

- 鼠标移动：`mouseOver`

  ```ts
  // 鼠标进入画布时触发一次，鼠标在画布中移动时一直触发，最后鼠标离开画布时再触发一次
  myDiagram.mouseOver = (e: any) => {
      ...
  };
  ```

#### 工具管理器

工具管理器`API`：`toolManager`

在使用扩展的时候需要用到工具管理器`API`，重新定义鼠标移动工具

```ts
myDiagram.toolManager.mouseMoveTools.insertAt(0, new PortShiftingTool());
```

#### 工具提示

工具提示`API`：`toolTip`

当鼠标（指针）在后台保持静止时，会显示工具提示的文本内容

默认值为 `null`，表示不显示任何工具提示：`myDiagram.toolTip = null`

```ts
// 画布提示工具函数，显示几个节点，几条连线
function diagramInfo(model: any) {
    return "Model:\n" + model.nodeDataArray.length + " nodes, " + model.linkDataArray.length + " links";
};

// 一个简单的画布工具提示
myDiagram.toolTip =
$("ToolTip",
    $(go.TextBlock, { margin: 4 },
    new go.Binding("text", "", diagramInfo)) 
);
```

#### 常用方法

##### 添加相关

###### `add`

将Part添加到和`Part.layerName`对应的图层中，这个方法通常用于图（`Diagram`）、节点（`Node`）、链接（`Link`）等对象的集合

###### `addChangedListener`

添加监测更改发生的监听器，添加一个监听器，以便在模型发生变化时执行特定的操作

注册一个事件处理程序，该处理程序在存在 `ChangedEvent` 时调用

```ts
// 当模型发生改变时（节点变化，连接线连接等等），会触发对应的函数
myDiagram.model.addChangedListener(function(evt: any) {
    if (evt.isTransactionFinished) {
      console.log("Model changed:", evt.object);
    }
});
```

> - `ChangedEvent` 表示对对象（通常为 `GraphObject`）的更改， 也适用于模型数据、模型或图表，最常见的情况是记住属性的名称以及该属性的前后值

###### `addModelChangedListener`

添加模型更改监听器，于`addChangedListener`效果类似，但是该该方法可以直接用在图中，可以在图中直接用属性声明：

```ts
new go.Diagram("myDiagramDiv",
   {
     "ModelChanged": (evt: any) => { if (evt.isTransactionFinished) console.log("Model changed:", evt.object); }
   }
)
```

也可以在后续进行设置：

```ts
myDiagram.addModelChangedListener(function(evt: any) {
    if (evt.isTransactionFinished) {
    	console.log("Model changed:", evt.object);
    }
})
```

###### `addDiagramListener`

添加图表监听器，注册一个事件处理程序，当存在给定名称的 `DiagramEvent` 时调用该事件处理程序，其基本格式为：

```ts
myDiagram.addDiagramListener("SelectionMoved", function(evt: any) {
    console.log("Nodes or links moved:", evt.subject);
});
```

> 图表监听器有两个参数
>
> - 第一个参数表示监听图表的事件`DiagramEvent `，它们在`Diagram`类上触发，详见[图表事件`API`](https://gojs.net/latest/api/symbols/DiagramEvent.html)
>
>   这里给出几个常见的图表事件：
>
>   - `ObjectSingleClicked`：元素（节点或连接）点击
>   - `BackgroundDoubleClicked`：双击画布背景
>   - `SelectionMoved`：选中元素（节点或链接）被移动时触发
>   - `PartRotated`：选中元素被旋转时触发
>
>   - `ViewportBoundsChanged`：当视图界面发生改变（画布放大/缩小）时触发
>   - `LinkDrawn`：创建新连接时触发
>   - `PartResized`：用 `ResizingTool` 更改了 `GraphObject`（元素） 的大小时触发
>   - `TextEdited`：修改了元素`TextBlock` 的字符串值时触发
>   - `externalobjectsdropped`：节点生成时触发
>   - `SelectionDeleted`：选中元素删除时触发
>
> - 第二个参数表示触发图表事件时执行的函数

简单实例：双击画布背景添加新节点：通过监听双击事件，获取上次输入事件的点击位置。调用 `addText()` 来添加新的节点：

```ts
function addText(text:string, x:any, y:any){
    myDiagram.add(
        GO(go.Node, "Auto", {location: new go.Point(x, y)},
            GO(go.TextBlock, text)
        )
    )
}

myDiagram.addDiagramListener("BackgroundDoubleClicked", (_e:any)=>{
    console.log(myDiagram.lastInput.documentPoint)
    let x = myDiagram.lastInput.documentPoint.x
    let y = myDiagram.lastInput.documentPoint.y
    addText("text", x, y)
})
```

###### `addLayer`

添加图层，将新图层添加到图层列表中，图层可以用来组织和管理图中的不同元素

图层是将绘制在关系图件集合的排列在前面或后面的方式，可以通过`layerName`属性来指定某个元素在图层中所处于的前后位置，处于前面的元素会覆盖处在后面的元素

`layerName: 'Foreground'`表示该元素处于图层的最前方

```ts
// 使用addLayer方法添加一个新的图层，并给它一个唯一的名称
var newLayer = $(go.Layer, { name: "NewLayer", visible: true, isTemporary: false });
myDiagram.addLayer(newLayer);
// isTemporary表示新图层的位置，为true表示显示在所有的图层前面
```

新的图层也向之前的图层一样，可以设置节点模板，连接线模板等等

```ts
// 在新图层中添加一个节点
var newNode = $(go.Node, "Auto",
    { layerName: newLayer.name },
    $(go.Shape, "RoundedRectangle",
      { fill: "lightyellow" }),
    $(go.TextBlock,
      { margin: 8 },
      new go.Binding("text", "key"))
);
newNode.data = { key: "Node3", color: "lightyellow" };
myDiagram.add(newNode);
```

同时还有在指定的图层之前/之后添加新的图层：`addLayerBefore`和`addLayerAfter`

```ts
// 获取默认图层
var defaultLayer = myDiagram.findLayer("");
myDiagram.addLayerAfter(newLayer, defaultLayer);
// 前一个参数表示新图层，后一个参数表示指定的图层
```

##### 删除相关

###### `clear`

清除画布中的所有元素，包括除背景网格之外的未绑定部件，并清除 `Model` 和 `UndoManager` 以及剪贴板，但是，这不会从关系图中删除任何侦听器

`myDiagram.clear()`

###### `remove`

从其画布移除元素，前提是该图位于此图中，其中删除节点也会删除与其连接的任何链接；删除组也会删除其所有成员；删除链接也会删除其所有标签节点

```ts
var node = myDiagram.findNodeForKey("add1");  // 先找到这个节点
if (node) {
    myDiagram.remove(node);
}
```

##### 事务相关

###### `commit`

启动一个新事务，调用提供的函数，并提交该事务

```ts
myDiagram.commit((d: any) => d.remove(somePart), "Remove Part");
// 第一个参数为事务要执行的函数，第二个参数表示事务的描述性字符串
```

`commit`事务可以进行拆分:开始事务`startTransaction`和结束事务`commitTransaction`

开始事务和结束事务的中间包含了要执行的函数方法和内容

###### `startTransaction`

开始一个事务，需要传入事务的描述性字符串

`myDiagram.startTransaction("changeDamageShowModel");`

###### `commitTransaction`

提交事务，提交当前事务的更改，需要传入事务的描述性字符串

`myDiagram.commitTransaction("changeDamageShowModel");`

##### 查找相关

###### `findLayer`

查找指定名称的图层`var foundLayer = myDiagram.findLayer("NewLayer");`

返回具有给定名称的图层，如果未找到该图层，则返回` null`

###### `findLinkForData`

在画布中查找与特定数据对象相关联的连接（`Link`）

```ts
var linkData = myDiagram.model.linkDataArray[0]; // 获取连接
var foundLink = myDiagram.findLinkForData(linkData); // 查看这条连接
```

###### `findLinkForKey`

在画布中查找与特定键（`key`）相关联的连接（`Link`），如果在模型中找不到具有该键的链接数据，则返回 `null`；找到了就返回连接

使用`findLinkForKey`方法时，需要声明：`GraphLinksModel.linkKeyProperty`

`linkKeyProperty: "key"`，之后就可以使用连接线的`key`值通过`findLinkForKey`进行对应连接线的查找：`let foundLink = myDiagram.findLinkForKey("link1");`

###### `findLinksByExample`

按照实例查找连接，通过将连接数据与示例数据保存值、正则表达式或谓词进行匹配来搜索连接

```ts
var exampleLinkData = { from: "add1", to: "add2" };
var foundLink = myDiagram.findLinksByExample(exampleLinkData);
```

###### `findNodeForData`

查找数据节点，用于在画布中查找与特定数据对象相关联的节点（`Node`），查找与模型的节点数据对象对应的节点或组

```ts
var nodeData = myDiagram.model.nodeDataArray[0];  // 获取节点
var foundNode = myDiagram.findNodeForData(nodeData);  // 查看节点
```

###### `findNodeForKey`

通过特定键(`key`)查找相关的节点（`Node`），查找与模型的节点数据对象的唯一键相对应的节点或组，如果在模型中找不到具有该键的节点数据，则为` null`

```ts
var foundNode = myDiagram.findNodeForKey("add1");
```

###### `findNodesByExample`

通过示例查找节点，通过将` Node` 数据与示例数据保存值、正则表达式或谓词进行匹配来搜索节点或组

```ts
// 通过节点的颜色作为查找的示例
var exampleNodeData = { color: "gray" };
var foundNode = myDiagram.findNodesByExample(exampleNodeData);
```

##### 选择相关

###### `select`

选择画布中的特定元素（如节点、链接等），使给定对象成为唯一选定的对象

```ts
var node = myDiagram.findNodeForKey("add1");
if (node) {
    myDiagram.select(node);
}
```

###### `selectCollection`

将给定集合中所有的元素进行选中

```ts
// 除了add3这个节点，其他节点都选中
var nodes = myDiagram.nodes;  // 获取所有的节点
var selectedNodes = new go.Set();  // 创建一个空的集合
nodes.each(function(node: any) {  // 循环遍历
    if (node.data.key !== "add3") {
        selectedNodes.add(node);  // 创建需要选中的集合
    }
});
myDiagram.selectCollection(selectedNodes); // 将集合的元素进行选中
```

###### `selection`

获取或设置图（`Diagram`）中当前选中的元素（如节点、链接等）

```ts
// 对当前选中的节点进行操作
myDiagram.selection.each((node: any) => {
    ...
}
```

##### 设置相关

###### `moveParts`

移动画布中的部分元素（如节点、链接等）

```ts
var node = myDiagram.findNodeForKey("add1");
var node1 = myDiagram.findNodeForKey("add2");
myDiagram.moveParts([node, node1], new go.Point(150, 150))
```

> `moveParts`方法有两个必要的参数，后两个参数详见官方文档
>
> - 第一个参数是移动对象的数组
> - 第二个参数是移动的偏移量

##### 其他相关

- 删除选中节点：`myDiagram.commandHandler.deleteSelection();`

  ```js
  if (myDiagram.commandHandler.canDeleteSelection()) {  // 先判断节点是否能被选中
      myDiagram.commandHandler.deleteSelection();
      return;
  }
  ```

- 获取所有获得焦点的节点：`myDiagram.nodes`

  ```js
  var items='';
  for(var nit = myDiagram.nodes; nit.next();){
      var node = nit.value;
      if(node.isSelected){
          items += node.data.key + ",";
      }
  }
  console.log(items);
  
  // 遍历整个画布的节点信息：
  for(var nit = myDiagram.nodes; nit.next();){
       var node = nit.value;
       var key = node.data.key;
       var text = node.data.text;
   }
  ```

- 选中节点：`myDiagram.select(node);`

***

### `Model`下的常用`API`

`model`模型保存图表的基本数据，描述基本实体及其属性和关系，而不是外观行为

该模型往往只保存相对简单的数据，这使得它们很容易通过序列化为` JSON` 或 `XML` 格式的文本来持久化，模型包含简单的数据对象，每个节点数据对象都具有唯一的键值

若要支持连接和分组，通常使用` GraphLinksModel`

在通常情况下，只需要保存模型即可保存画布中的图表，将模型保存为`JSON`格式的文本

```ts
// 将画布中的图表导出模型数据
myDiagram.model.toJson()

var model= myDiagram.model.toJson();  // 获得整个画布的json数据
var nodes= model.nodeDataArray;   // 取出数据中的所有节点数据
var Links= model.linkDataArray;   // 取出数据中的所有连接线数据

// 将模型数据导入到图表模型中
myDiagram.model = go.Model.fromJson(loadedString);
```

##### 节点方法

###### `findNodeDataForKey`

根据节点的键（`key`）查找模型（`Model`）中的节点数据

`myDiagram.model.findNodeDataForKey("add1");`

找到的数据比从`myDiagram`上直接调用`findNodeDataForKey`方法找到的更加具体

###### `addNodeData`

添加节点数据，该方法会将数据添加到 `nodeDataArray` 中

```ts
var node = {};
    node["key"] = "6";
    node["text"] = "new";
    node["color"] = "red";
myDiagram.model.addNodeData(node);
```

```ts
const newData = {
    key: key,
    color: color,
    loc: new go.Point(point.x, point.y),
    portArray: [],
    markArray: [],
    category: category
};
myDiagram.model.addNodeData(newData);  // 将数据添加到nodeDataArray中
```

###### `addNodeDataCollection`

添加节点数据集合

```ts
var newNodeDataArray = [
  { key: "Node3", color: "lightblue" },
  { key: "Node4", color: "lightyellow" }
];
// 添加到nodeDataArray中
myDiagram.model.addNodeDataCollection(newNodeDataArray); 
```

###### `containsNodeData`

检查模型（`Model`）中是否包含特定的节点数据，判断给定节点数据对象是否在此模型中

```ts
var nodeData = myDiagram.model.findNodeDataForKey("add1");
if (nodeData) {
    if (myDiagram.model.containsNodeData(nodeData)) {
    	alert("Node data exists in the model.");
    } else {
    	alert("Node data does not exist in the model.");
    }
} else {
    alert("Node data not found.");
}
```

###### `copyNodeData`

复制模型（`Model`）中的节点数据

```ts
var nodeData = myDiagram.model.findNodeDataForKey("add1");
if (nodeData) {
    var copiedNodeData = myDiagram.model.copyNodeData(nodeData);
    copiedNodeData.key = "Node3";   // 修改键值以避免冲突
    myDiagram.model.addNodeData(copiedNodeData);
} else {
    alert("Node data not found.");
}
```

###### `getCategoryForNodeData`

获取节点数据的类别（`Category`）

生成不同类型的节点是通过`linkTemplateMap`方法生成的，获取节点的类型就是获取其创建生成模板时设定的类型字符串

```ts
var nodeData = myDiagram.model.findNodeDataForKey("pipe1");
if (nodeData) {
    var category = myDiagram.model.getCategoryForNodeData(nodeData);
    alert("Node category: " + category);
} else {
    alert("Node data not found.");
}
```

###### `getKeyForNodeData`

获取节点数据的键（`key`）

```ts
var nodeData = myDiagram.model.findNodeDataForKey("add1");
if (nodeData) {
    var key = myDiagram.model.getKeyForNodeData(nodeData);
    alert("Node key: " + key);
} else {
    alert("Node data not found.");
}
```

###### `removeNodeData`

删除节点数据，将从 `nodeDataArray` 中删除该数据

```ts
myDiagram.model.removeNodeData(myDiagram.model.findNodeDataForKey("add1"));
```

此方法造成节点数据的删除，单单只是删除节点，不会将节点上的连接线一起删除

##### 设置相关

###### `set`

set方法的基本形式：`set(data: ObjectData, propname: string, val: any)`

> `set`方法通常传入三个参数：
>
> - 第一个参数是数据，通常是 `Panel.data` 的值，由 `Node`、`Link`、`Group`、`simple Part`、 或 `Panel.itemArray `中的项
> - 第二个参数是属性名称，即要设置的属性，通常是字符串形式
> - 第三个参数是设置的内容

```ts
// 给节点的颜色属性进行设置，将颜色设置为红色
var node = myDiagram.findNodeForKey("add1");
if (node) {
    myDiagram.model.set(node.data, "color", "red");
}
```

###### `setCategoryForNodeData`

更改给定节点数据的类别，即命名节点模板的字符串

```ts
var nodeData = myDiagram.model.findNodeDataForKey("add1");
if (nodeData) {
    // 将获取的节点类型设置成"pipe"类型
    myDiagram.model.setCategoryForNodeData(nodeData, "pipe");
} else {
    alert("Node data not found.");
}
```

###### `setDataProperty`

设置模型属性的方法，用于更改节点数据、链接数据、项数据或 `Model.modelData` 的某些属性的值，给定一个命名属性和新值的字符串，以撤消/重做并自动更新任何绑定的方式

方法的基本形式与`set`方法类似，可以参考`set`方法，`setDataProperty`和`set`方法是同义词，在功能上是基本一致的

`setDataProperty`方法通常在需要更新图表中的节点或链接属性时使用

***

### `GraphObject`类

`GraphObject`类是所有图形对象的基类，该类也是一个抽象类，继承自`GraphObject`的类包括：`Shape`、`TextBlock`、`Picture` 和 `Panel`，从Panel类派生 `Part` （顶级对象）类，`Node`和`Link`类派生自该类

#### 常用的属性

|       属性        |                             描述                             |
| :---------------: | :----------------------------------------------------------: |
|      `angle`      | 旋转角度，获取或设置此 `GraphObject` 的角度转换（以度为单位），默认值为 0 |
|   `background`    |         设置背景颜色， 默认值为` null `-- 不绘制背景         |
|     `cursor`      | 设置光标类型，默认值为空字符串，常用的光标字符串类型为：`help`（箭头右下加问号）、`wait`（加载转圈）、`crosshair`（截屏十字架）、`not-allowed`（禁止）、`zoom-in`（放大镜）、`grab`（拖动手）、`pointer`（手）和`move`（十字移动）等等 |
|   `desiredSize`   |  设置此属性值的宽度或高度：`desiredSize: new go.Size(6, 6)`  |
|     `height`      |                           设置高度                           |
|      `width`      |                           设置宽度                           |
|     `maxSize`     | 设置元素的最大尺寸，元素改变大小不能超过这个尺寸：`maxSize: new go.Size(200, 200)`，`NaN`表示设置为无穷大 |
|     `minSize`     |       设置元素的最小尺寸，元素改变大小不能小于这个尺寸       |
|    `layerName`    | 设置图层的先后展示：`layerName: 'Foreground'`：将图层展示到最顶部（永远不会被别的图层覆盖） |
|     `margin`      | 获取或设置此` GraphObject `周围的空白区域的大小，默认边距为 `Margin(0,0,0,0)` |
|      `name`       |           获取或设置此对象的名称，默认值为空字符串           |
|    `pickable`     | 控制一个对象是否可以被鼠标或触摸事件选中，默认为`true`表示可选中 |
|    `position`     | 设置节点或图表元素在画布上的位置，`position: new go.Point(100, 100)`，一般在模板中都是将这个属性进行绑定的 |
|      `scale`      |                设置元素的缩放，1表示本身大小                 |
|     `opacity`     |           设置不透明度，0.0表示透明，1.0表示不透明           |
|  `shadowVisible`  |         控制节点元素的阴影是否可见，默认值为 `null`          |
|     `stretch`     | 控制节点或图表元素的拉伸行为，默认值为`Stretch.Default`，还有其他的参数值：`Stretch.None`、`Stretch.Fill`、`Stretch.Horizontal` 或 `Stretch.Vertical` |
|     `visible`     | 设置是否可见，默认值为` true`，如果此对象不可见，则不会获取任何鼠标/触摸事件 |
|     `column`      | 获取或设置此 `GraphObject` 的列（如果它位于 `Table Panel`中）, 该值必须是非负整数，默认值为 0 |
|   `columnSpan`    | 获取或设置此 `GraphObject` 所跨越的列数（如果它位于 `Table Panel`中），该值必须是正整数，默认值为 1 |
|       `row`       | 获取或设置此 `GraphObject` 的行（如果它位于 `Table Panel`中）, 该值必须是非负整数，默认值为 0 |
|     `rowSpan`     | 获取或设置此 `GraphObject` 所跨越的行数（如果它位于 `Table Panel`中），该值必须是正整数，默认值为 1 |
| `segmentFraction` | 设置连接线上标签元素的位置，0表示位于连接线的开头，1表示位于连接线的结尾 |
|  `segmentIndex`   | 用于标识路径（如链接）上的特定线段，其中 -1 表示最后一段 -2 表示倒数第二段，将此值设置为 `NaN` 意味着将沿整个链路路由计算 `segmentFraction`的小数距离。 `NaN `值还表示在确定标签位置时不会使用 `Link.midPoint `和 `Link.midAngle` |
|  `segmentOffset`  | 用于标识路径（如链接）上的特定线段的偏移量，该值默认为 `Point (0, 0)` |
|   `contextMenu`   |  在上下文点击时出现的菜单，上下文菜单通常带有多个按钮的装饰  |
|     `toolTip`     | 当鼠标悬停在此对象上时，出现的提示工具，可以通过`myDiagram.toolManager.hoverDelay = 500; `来更改提示工具出现的时间 |

#### 常用的方法

##### `set`

`set`方法用于设置一个图表元素的属性

```ts
// 鼠标移动到节点时，设置元素的angle属性
mouseEnter: function(e, node) {
    node.set({angle: 45});
},
```

此方法只能用于设置此对象的现有属性，要附加新属性， 或要设置元素的属性，请使用 `GraphObject.setProperties`，但是`setProperties`方法的效率远低于`set`属性

##### `setProperties`

`setProperties`方法用于一次性设置一个图表元素的多个属性

```ts
mouseLeave: function(e, node) {
    node.setProperties({
        opacity: 0.5,
        angle: 45
    });
}
```

注意：`set`和`setProperties`设置的只能是`GraphObject`类中的属性

##### `getDocumentAngle`

`getDocumentAngle`方法用于获取一个图表元素相对于文档的旋转角度，返回在文档坐标中绘制对象的有效角度，该角度在 0 到 360 之间

```ts
// 与mouseEnter结合使用，获取某个点的旋转角度
mouseEnter: function(e, node) {
    var angle = node.getDocumentAngle();
    console.log("Node angle: " + angle);
}
```

##### `getDocumentBounds`

`getDocumentBounds`方法用于获取一个图表元素在文档坐标系中的边界框

```ts
mouseEnter: function(e, node) {
    var bounds = node.getDocumentBounds();
    console.log("Node bounds: " + bounds);
}
```

##### `getDocumentPoint`

`getDocumentPoint`方法用于获取一个图表元素在文档坐标系中的某个特定点的坐标

```ts
mouseEnter: function(e, node) {
    var point = node.getDocumentPoint(go.Spot.Center); // 获取中心点坐标
    console.log("Node center point: " + point);
}
```

##### `getDocumentScale`

`getDocumentScale`方法用于获取一个图表元素在文档坐标系中的缩放比例

```ts
mouseEnter: function(e, node) {
    var scale = node.getDocumentScale();
    console.log("Node scale: " + scale);
}
```

##### `getLocalPoint`

`getLocalPoint`方法用于获取一个图表元素在其本地坐标系中的某个特定点的坐标

#### 用户交互

`GraphObjects` 具有多个属性，可实现动态可自定义的交互

##### 鼠标移动事件

可以在组件中加入鼠标移动事件，来触发自定义的功能函数：

可以定义鼠标进入和离开事件处理程序来修改链接的外观，当鼠标经过它时，进行样式上的变化：

```ts
myDiagram.linkTemplate =
  new go.Link().add(
    new go.Shape(
      {
        strokeWidth: 2, stroke: "gray",  // 定义一开始的颜色为gray
        // 当鼠标进入连接线的时候触发，改变连接线的样式
        mouseEnter: (e, obj) => { obj.strokeWidth = 4; obj.stroke = "dodgerblue"; },
        // 当鼠标离开连接线的时候触发，改变连接线的样式
        mouseLeave: (e, obj) => { obj.strokeWidth = 2; obj.stroke = "gray"; }
      })
  );
```

常见的鼠标移动事件有：

- `mouseDragEnter`：处理当一个可拖动的对象进入一个节点或链接时的行为

- `mouseDragLeave`：处理当一个可拖动的对象离开一个节点或链接时的行为

- `mouseDrop`：处理当一个可拖动的对象被释放到一个节点或链接上时的行为

- `mouseEnter`：处理当鼠标进入一个节点或链接时的行为

- `mouseLeave`：处理当鼠标离开一个节点或链接时的行为

- `mouseHold`：处理当鼠标在一个节点或链接上按住一段时间时的行为

  > 可以对按住的时间进行控制：
  >
  > ```js
  > myDiagram = new go.Diagram("myDiagramDiv",
  >  { "toolManager.holdDelay": 500 });  // 500 milliseconds
  > // 或者
  > myDiagram.toolManager.holdDelay = 500;  // 500 milliseconds
  > ```

- `mouseHover`：处理当鼠标在一个节点或链接上悬停一段时间时的行为

  > 同样可以对悬停的时间进行控制：
  >
  > ```js
  > myDiagram = new go.Diagram("myDiagramDiv",
  >  { "toolManager.hoverDelay": 500 });  // 500 milliseconds
  > // 或者
  > myDiagram.toolManager.hoverDelay = 500;  // 500 milliseconds
  > ```

- `mouseOver`：处理当鼠标在一个节点或链接上移动时的行为

##### 鼠标点击事件

可以在组件中加入鼠标点击事件，来触发自定义的功能函数：

```ts
myDiagram.nodeTemplate =
  new go.Node("Auto",
      { 
        click: (e, node) => {
          ...
        }
      }
  );
```

鼠标点击事件属性包括：

- `click`：获取或设置当用户单次左键点击此对象时要执行的函数
- `doubleClick`：获取或设置当用户左键双击此对象时要执行的函数
- `contextClick`：获取或设置用户单次右键点击此对象时要执行的函数（上下文点击）

***

### `Panel`类

`Panel` 是一个 `GraphObject`，它将其他 `GraphObject` 作为其元素，面板负责确定其元素的大小和定位，面板的元素按照它们在元素集合中的显示顺序绘制

`Part`类继承自 `Panel`;`Part` 又是 `Node` 和 `Link`的基类

`panel`有许多的类型：

- `Panel.Position`：用于根据元素在面板局部坐标系中的绝对位置排列元素
- `Panel.Vertical`和 `Panel.Horizontal`：用于创建元素的线性“堆栈”，垂直布局和水平布局，在各个元素上使用 `GraphObject.alignment`或 `GraphObject.stretch`属性来控制它们的位置和大小。 如果要在水平面板中从右到左排列元素，请将 `isOpposite`设置为 `true` 或在垂直面板中从下到上。
- `Panel.Auto`：用于调整主元素的大小以适合 `Panel` 中的其他元素 -- 这将创建边框
- `Panel.Spot `：用于根据 `Spot` 属性 `GraphObject.alignment`和 `GraphObject.alignmentFocus`相对于面板的主元素排列元素，`Spot` 面板可以使用 `Panel.alignmentFocusName`相对于其他元素对齐
- `Panel.Table`： 用于将元素排列成行和列，通常使用不同的 元素的 `GraphObject.row`、`GraphObject.rowSpan`、`GraphObject.column`、 和 `GraphObject.columnSpan`属性
- `Panel.TableRow `和 `Panel.TableColumn `只能在 `Panel.Table`面板中立即使用 将元素集合组织为表中的行或列
- `Panel.Viewbox`：用于自动调整单个元素的大小以适合面板的可用区域
- `Panel.Grid`：不用于容纳典型元素，而仅用于绘制规则的线条图案

***

### `Link`类

链接是连接节点的部件，链接关系是定向的，从`Link.fromNode`到 `Link.toNode`，链接可以连接到节点中的特定端口元素，由`Link.fromPortId`和`Link.toPortId`属性命名

#### 常用的属性

##### `adjusting`

`adjusting`方法用于控制链接在调整时的行为，该方法的值必须是 `None`、`End`、`Scale`或 `Stretch` 之一

```ts
adjusting: go.LinkAdjusting.End
```

- `None`：当 `adjusting` 设置为 `None` 时，对象在调整大小时不会自动调整其内容。这意味着对象的大小可以改变，但其内容（如文本、形状等）不会自动适应新的尺寸。

- `End`：当 `adjusting` 设置为 `End` 时，对象在调整大小时会保持其内容的固定大小，但会调整内容的结束位置。例如，如果一个文本块被调整大小，文本块的文本不会改变大小，但文本的结束位置会移动以适应新的尺寸。

- `Scale`：当 `adjusting` 设置为 `Scale` 时，对象在调整大小时会按比例缩放其内容。这意味着对象的大小和内容的大小会一起改变，以保持内容的原始比例。

- `Stretch`：当 `adjusting` 设置为 `Stretch` 时，对象在调整大小时会拉伸其内容以适应新的尺寸。这意味着对象的内容会改变大小以填充新的空间，但不会保持原始比例。

##### `corner`

`corner`属性用于控制连接线的圆角半径，在连接线转弯的位置，可以进行圆角半径的设置

具体形式为：`corner: 10`

##### `curve`

`curver`用于控制连接线的曲线样式，该属性值必须是 `None`、`Bezier`、`JumpGap` 或 `JumpOver`之一，基本形式为：`curve: go.Curve.JumpGap`

- `None`：当 `curve` 设置为 `None` 时，链接将呈现为直线，没有任何曲线效果，这是默认的链接样式。

- `Bezier`：当 `curve` 设置为 `Bezier` 时，链接将呈现为贝塞尔曲线，贝塞尔曲线是一种平滑的曲线，可以通过控制点来调整曲线的形状。这种曲线样式通常用于需要平滑过渡的链接。

- `JumpGap`：当 `curve` 设置为 `JumpGap` 时，链接将在遇到其他链接或节点时呈现为跳跃的样式，形成一个小的间隙。这种样式通常用于表示链接之间的交叉或重叠。

- `JumpOver`：当 `curve` 设置为 `JumpOver` 时，链接将在遇到其他链接或节点时呈现为跳跃的样式，形成一个小的拱形。这种样式通常用于表示链接之间的交叉或重叠，但与 `JumpGap` 不同的是，`JumpOver` 会在交叉点形成一个小的拱形，而不是间隙。

##### `curviness`

`curviness`属性用于控制连接线的弯曲程度，这个属性通常与 `curve` 属性一起使用，特别是在 `curve` 设置为 `Bezier` 时，`curviness` 可以调整贝塞尔曲线的弯曲程度

```ts
curve: go.Link.Bezier,
curviness: 20
```

##### `fromEndSegmentLength`

`fromEndSegmentLength`方法用于控制连接起点端点的线段长度，默认值为 `NaN`

`fromEndSegmentLength: 10`

##### `toEndSegmentLength`

`toEndSegmentLength`用于控制连接的终点端点的线段长度，默认值为 `NaN`

`toEndSegmentLength: 10`

##### `fromShortLength`

`fromShortLength`属性用于控制连接的起点端点的短长度， 默认值为 `NaN`，这个属性通常用于调整链接的外观，特别是在链接的起点和终点附近

`fromShortLength: 10`

##### `relinkableFrom`

`relinkableFrom`属性用于控制连接的起点是否可以被重新连接，默认值`false`

##### `relinkableTo`

`relinkableTo`属性用于控制连接的终点是否可以被重新连接，默认值为`false`

##### `resegmentable`

`resegmentable`属性用于控制连接是否可以被重新分段，默认值为`false`

##### `smoothness`

`smoothness`属性设置连接的平滑度，这个属性通常与 `curve` 属性一起使用，特别是在 `curve` 设置为 `Bezier` 时，`smoothness` 可以调整贝塞尔曲线的平滑程度

设置平滑度的范围在0.0到1.0之间

***

### `GraphLinksModel`类

`GraphLinksModel`类支持节点之间的链接，将节点数据和链接数据保存在单独的数组中

```ts
myDiagram.model =
$(go.GraphLinksModel,
    {
        nodeDataArray: nodeDataArray,
        linkDataArray: linkDataArray
    }
);
// 可以在创建GraphLinksModel类的时候直接设置属性，如上所示
// 也可以后续进行设置添加，如
myDiagram.model.linkCategoryProperty = "category";
```

官方文档：[`GraphLinksModel`类的属性和方法](https://gojs.net/latest/api/symbols/GraphLinksModel.html)

#### 常用的属性

##### `linkCategoryProperty`

用于指定链接数据中表示链接类别的属性的名称，能够在图表中定义不同类型的链接，并应用不同的模板或行为

通常需要使用 `linkTemplateMap` 定义不同类别的链接模板

如果不显式设置 `linkCategoryProperty`，默认情况下，`GoJS` 会使用 `"category"` 作为链接类别的属性名，那么`linkCategoryProperty`可以指定其他字符串方便进行区分：

```ts
myDiagram.model.linkCategoryProperty = "LinkCategory";
```

在连接线数据中，进行连接线类型的选择引用：

```ts
// 使用连接线模板类型为infoPanelLink的连接线
const linkDataArray = [
    { from: "pipe1信息面板", fromPort: "bottom0", to: "pipe1", toPort: "top0", LinkCategory: "infoPanelLink"}
];
```

##### `linkDataArray`

用于存储图表中所有连接的数据

##### `linkFromKeyProperty`

连路数据来自的节点数据的键（声明这条连接是从哪个节点出来的）

用于指定连接数据对象中表示源节点键的属性名称，默认情况下，属性的值是 `"from"`

如果想要对其进行修改，我们可以进行设置

```ts
myDiagram.model.linkFromKeyProperty = "fromNode";
```

修改完后，我们后续连接线的数据数组内的信息也要进行修改：

```ts
const linkDataArray = [
    { fromNode: "add1", fromPort: "top0", to: "add2", toPort: "bottom0", labelKeys: ["pipe1"] }
];
```

##### `linkToKeyProperty`

连路数据到达的节点数据的键（声明这条连接要到哪个节点去）

用于指定链接数据对象中表示目标节点键的属性名称，默认情况下，属性的值是 `"to"`

与`linkFromKeyProperty`方法功能类似

##### `linkFromPortIdProperty`

用于指定链接数据对象中表示源端口 ID 的属性名称，默认情况下，属性的值是空字符串

我们可以对其进行节点出发端口的设置：

```ts
myDiagram.model.linkFromPortIdProperty = "fromPort";
```

##### `linkToPortIdProperty`

用于指定链接数据对象中表示目标端口 ID 的属性名称，默认情况下，其值是空字符串

我们可以对其进行节点出发端口的设置：

```ts
myDiagram.model.linkFromPortIdProperty = "toPort";
```

与`linkFromPortIdProperty`方法功能类似

##### `linkKeyProperty`

用于指定链接数据对象中表示链接键的属性名称，默认情况下，其值为空字符串

相当于给这个连接设置了一个其特有的`key`值，方便后续的使用，设置方式为：

```ts
myDiagram.model.linkKeyProperty = "linkId";
```

连接线的数据对象如下：

```ts
const linkDataArray = [
    { linkId: "link1", from: "add1", fromPort: "top0", to: "add2", toPort: "bottom0", labelKeys: ["pipe1"] },
];
```

后续可以通过`findLinkDataForKey `通过设置的Key值读取到这条连接线

```ts
console.log(myDiagram.model.findLinkDataForKey("link1"))
```

##### `linkLabelKeysProperty`

用于指定链接数据对象中表示链接标签键的属性名称，默认情况下，属性的值是 `""`

通过`linkLabelKeysProperty`方法，可以将节点当作为标签放到连接线上

设置方式为：

```ts
myDiagram.model.linkLabelKeysProperty = "labelKeys";
```

连接线的数据对象如下：将`Key`值为`pipe1`的节点，作为标签放到了这条连接线上

```ts
const linkDataArray = [
    { from: "add1", fromPort: "top0", to: "add2", toPort: "bottom0", labelKeys: ["pipe1"] },
];
```

##### `nodeGroupKeyProperty`

用于指定节点数据对象中表示节点所属组的属性名称，默认情况下，其值是 `"group"`

如果不想在声明某个节点是其他节点的组元素时通过`"group"`，设置其他字符串方式为：

```ts
myDiagram.model.nodeGroupKeyProperty = "parentGroup";
```

对节点数组的声明，说明哪些节点在一个组中，哪个节点是一个组

```ts
model.nodeDataArray = [
    { key: "Group1", isGroup: true },
    { key: "Alpha", color: "lightblue", parentGroup: "Group1" },
    { key: "Beta", color: "orange", parentGroup: "Group1" },
    { key: "Gamma", color: "lightgreen" }
];
```

##### `nodeIsGroupProperty`

用于指定节点数据对象中表示节点是否为组的属性名称，默认情况下，值是 `"isGroup"`

我们也可以对其进行重新设置：

```ts
myDiagram.model.nodeIsGroupProperty = "rootGroup";
```

#### 常用的方法

##### 添加连接相关

###### `addLabelKeyForLinkData`

添加一个节点键值，该值标识在给定链接数据上充当新标签节点的节点数据

用于向指定的链接数据对象添加一个新的标签键，这个方法通常用于在模型中动态地添加链接标签

```ts
// 通过连接线的Key获取这条连接线
const linkData = myDiagram.model.findLinkDataForKey("link1");
if (linkData) {
    // 将Key为add3的节点放到连接线上，当成连接线上的一个标签
    myDiagram.model.addLabelKeyForLinkData(linkData, 'add3');
}
```

仅当 `linkLabelKeysProperty` 已设置为空字符串以外的其他内容时，此方法才有效

###### `addLinkData`

添加连接数据：`myDiagram.model.addLinkData({ from: "add3", to: "add2" });`

###### `addLinkDataCollection`

用于向模型中添加一组链接数据，这个方法通常用于批量添加多个链接数据到模型中

```ts
const linkDataCollection = [
  { from: "add1", to: "add3", fromPort: "right0", toPort: "bottom0" },
  { from: "add2", to: "add3", fromPort: "bottom0", toPort: "bottom0" }
];
myDiagram.model.addLinkDataCollection(linkDataCollection);
```

###### `copyLinkData`

创建链接数据对象的副本，此方法只是创建 `JavaScript` 对象的浅拷贝（只能拷贝对象中的数值和字符串，对象中的数组和对象是不能进行拷贝的），此方法不会修改模型，返回的数据对象不会添加到此模型中

```ts
const originalLinkData = myDiagram.model.linkDataArray[0];
const copiedLinkData = myDiagram.model.copyLinkData(originalLinkData);
console.log(copiedLinkData);
```

同样的复制方法还有复制节点数据：`copyNodeData`

##### 查找连接相关

###### `findLinkDataForKey`

通过设置的`Key`值读取到这条连接线，前提是`linkKeyProperty`属性值不能为空，然后是这条连接线存在`Key`值

```ts
console.log(myDiagram.model.findLinkDataForKey("link1"))
```

###### `getCategoryForLinkData`

用于获取指定链接数据对象的类别，这个方法通常用于在模型中查找链接数据的类别，以便进行进一步的操作或验证

```ts
const linkData = myDiagram.model.linkDataArray[2]; 
const category = myDiagram.model.getCategoryForLinkData(linkData);
console.log(category)
```

###### `getFromKeyForLinkData`

用于获取指定链接数据对象的源节点的`Key`值，这个方法通常用于在模型中查找链接数据的源节点键，以便进行进一步的操作或验证

```ts
const linkData = myDiagram.model.linkDataArray[0]; 
const fromKey = myDiagram.model.getFromKeyForLinkData(linkData);
console.log("From Key:", fromKey); 
```

对应的有通过指定的链接数据获取目标节点的`Key`值：`getToKeyForLinkData`

###### `getFromPortIdForLinkData`

用于获取指定链接数据对象的源端口 ID，这个方法通常用于在模型中查找链接数据的源端口 ID，以便进行进一步的操作或验证

```ts
const linkData = myDiagram.model.linkDataArray[0]; 
const fromPortId = myDiagram.model.getFromPortIdForLinkData(linkData);
console.log("From portId:", fromPortId); 
```

对应的有通过指定的链接数据获取目标端口的ID：`getToPortIdForLinkData`

###### `getKeyForLinkData`

用于获取指定链接数据对象的键值，这个方法通常用于在模型中查找链接数据的键值，以便进行进一步的操作或验证

```ts
const linkData = myDiagram.model.linkDataArray[0];
const linkKey = myDiagram.model.getKeyForLinkData(linkData);
console.log("Link Key:", linkKey);
```

###### `getLabelKeysForLinkData`

用于获取指定链接数据对象的连接标签，这个方法通常用于在模型中查找链接数据的键值，以便进行进一步的操作或验证

```ts
const linkData = myDiagram.model.linkDataArray[0];
const LabelKeys = myDiagram.model.getLabelKeysForLinkData(linkData);
console.log("LabelKeys:", LabelKeys);
```

仅当 `linkLabelKeysProperty` 已设置为空字符串以外的其他内容时，此方法才有效

##### 删除连接相关

###### `removeLinkData`

用于从模型中移除指定的链接数据对象

```ts
const linkData = myDiagram.model.linkDataArray[0];
myDiagram.model.removeLinkData(linkData);
```

从 `linkDataArray` 中删除该数据对象，并通知所有侦听器链接数据对象已从集合中删除

###### `removeLinkDataCollection`

用于从模型中移除指定的链接数据对象的集合

```ts
const linkData1 = myDiagram.model.linkDataArray[0];
const linkData2 = myDiagram.model.linkDataArray[1];
myDiagram.model.removeLinkDataCollection([linkData1, linkData2]);
```

##### 设置连接相关

###### `setCategoryForLinkData`

用于设置指定链接数据对象的类别

```ts
const linkData = myDiagram.model.linkDataArray[0];
// 设置获取的连接线类型为：infoPanelLink
myDiagram.model.setCategoryForLinkData(linkData, "infoPanelLink");
```

###### `setDataProperty`

用于在模型中动态地更改节点或链接的属性，更改节点数据、链接数据或项数据的某些属性的值

```ts
myDiagram.model.setDataProperty("link1", "category", "special");
```

###### `setFromKeyForLinkData`

用于设置指定链接数据对象的源节点键，这个方法通常用于在模型中动态地更改链接的源节点，可以重新设置连接从哪一个节点出发的：

```ts
const linkData = myDiagram.model.linkDataArray[0];
// 原先使从add1节点出发的连接，现在将其设置到从add3节点出发
myDiagram.model.setFromKeyForLinkData(linkData, "add3");
```

对应的有设置指定链接数据对象的目标节点键：`setToKeyForLinkData`

###### `setFromPortIdForLinkData`

用于设置指定链接数据对象的源节点的连接出发端口，这个方法通常用于在模型中动态地更改链接的源节点的连接出发端口，可以重新设置连接从哪一个端口出发的：

```ts
const linkData = myDiagram.model.linkDataArray[0];
// 原先的连接是从add1节点的top0端口出发，现在将其设置到从bottom0端口出发
myDiagram.model.setFromPortIdForLinkData(linkData, "bottom0");
```

对应的有设置指定链接数据对象的目标节点的连接接受端口：`setToPortIdForLinkData`

###### `setKeyForLinkData`

用于设置指定链接数据对象的键值，这个方法通常用于在模型中动态地更改链接的键值

前提是对`linkKeyProperty`进行设置，该属性不能为空字符串

```ts
const linkData = myDiagram.model.linkDataArray[0];
// 原先这条连接线的LinkId为link1，现在将其改为link2
myDiagram.model.setKeyForLinkData(linkData, "link2");
```

###### `setLabelKeysForLinkData`

用于设置指定链接数据对象的标签键数组，这个方法通常用于在模型中动态地更改链接的标签，新设置的标签需要以数组的形式传入

```ts
const linkData = myDiagram.model.linkDataArray[0];
myDiagram.model.setLabelKeysForLinkData(linkData, ['add3']);
```

该方法是设置不是添加，传入的是新标签的数组，会将其原先的标签数组覆盖掉，如果想要保留原先的标签，可以将标签放入新的数组中，一起作为新的标签数组进行添加