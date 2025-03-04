## 图表(`Diagram`)

### 图表的属性

图表的属性是用来确定画布的基本配置，常用的属性有；

```js
const myDiagram = $(go.Diagram, "diagramDiv", {
    // 设置图表的属性
    ...
});
```

常见的图表属性有：

- `'grid.visible': true`：画布上面是否出现网格
- `"grid.gridCellSize": new go.Size(5, 5)`：设置背景网格的大小
- `"draggingTool.isGridSnapEnabled": true`：启用网格对齐，当用户拖动一个节点时，节点的位置会自动对齐到最近的网格点上
- `"undoManager.isEnabled": true`：是否启用撤销管理器
- `isReadOnly: true`：设置只读，元素不可拖动
- `contentAlignment: go.Spot.Center`：节点位置移动后，全部内容处于在画布正中间
- `maxSelectionCount: 1`：最多选择一个元素
- `"animationManager.duration": 600`：画布刷新的加载速度
- `"toolManager.mouseWheelBehavior": go.WheelMode.Zoom`：鼠标滚轮事件放大和缩小，而不是上下滚动
- `"clickCreatingTool.archetypeNodeData": { key: "Node" }`：双击画布背景创建节点
- `"commandHandler.copiesTree": true`：复制树（整个）结构，复制一个节点时，该节点及其所有子节点（即整个子树）都会被复制
- `"commandHandler.deletesTree": true`：删除树（整个）结构，删除一个节点时，该节点及其所有子节点（即整个子树）都会被删除
- `"toolManager.hoverDelay": 100`：鼠标悬停多久`tooltips`会进行响应
- 关于`allow`的画布属性：（详细见：[`Diagram GoJS API`](https://gojs.net/latest/api/symbols/Diagram.html#allowClipboard)）
  - `allowZoom: false`：不允许改变图表的规模（鼠标滚轮不能调整画布的大小）
  - `allowCopy: false`：不允许复制节点元素
  - `allowClipboard: false`：不允许使用剪切板
  - `allowDelete: false`：不允许删除
  - `allowLink: false`：不允许进行连接
  - `allowDragOut: true`：允许拖出，可以将节点从当前的容器或组中拖动到其他容器或组中，允许节点在不同的层次结构或布局中移动
  - `allowDrop: true`：允许拖放，可以将节点拖动到当前的容器或组中
  - `allowMove: false`：禁止元素移动

***

### 模板设置

实现节点外观与节点数据分离的一种方法是使用数据模型和节点模板，模型基本上只是一个数据集合，其中包含每个节点和每个链接的基本信息，通常将节点和连接使用不同的模板

#### 模板模型

##### `GraphLinksModel`模型

`GraphLinksModel`，是最通用的类型。它支持对每个链接使用单独的链接数据对象的链接关系，链路可以连接的节点没有固有的限制，因此允许自反链接和重复链接，该模型还支持在节点中识别逻辑和物理上不同的连接对象，称为“端口”；同时还支持成员和组的关系

```js
// 写法一:
myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

// 写法二：推荐写法
myDiagram.model =
    $(go.GraphLinksModel,
        {
            nodeDataArray: nodeDataArray,
            linkDataArray: linkDataArray
        }
    );
```

##### `TreeModel`模型

`TreeModel`，简称树模型，仅支持形成树状结构图的链接关系，没有单独的链接数据`linkDataArray`，树中固有的父子关系由子节点数据上的额外属性确定，该属性通过其键引用父节点

```js
var nodeDataArray = [
    { key: "Alpha", color: "lightblue" },
    { key: "Beta", parent: "Alpha", color: "yellow" },  //指定父节点是哪个元素组件
    { key: "Gamma", parent: "Alpha", color: "orange" },
    { key: "Delta", parent: "Alpha", color: "lightgreen" }
  ];
myDiagram.model = new go.TreeModel(nodeDataArray);
```

#### 节点模板

##### `nodeTemplate`

`Diagram.nodeTemplate`用来定义节点样式

```js
myDiagram.nodeTemplate =
    $(go.Node, "Auto",
      $(go.Shape,
        // 内部设置的属性都是默认，即如果没有后续的绑定覆盖，就使用默认属性
        { 
    		figure: "RoundedRectangle",  // 几何形状
         	fill: "white",  // 背景颜色
    
    		// 整个节点作为一个端口，设置其端口属性
    		portId: '',  // 设置端口的唯一标识符
            cursor: 'pointer',  // 鼠标悬停在端口上时显示的光标样式
            fromLinkable: true, // 端口可以作为链接的起点
            fromLinkableSelfNode: true,  // 节点自身的这个端口可以作为链接的起点
            fromLinkableDuplicates: true,// 节点的重复部分也可以作为链接的起点
            toLinkable: true,  // 端口可以作为链接的终点
            toLinkableSelfNode: true,  // 节点自身的这个端口可以作为链接的终点
            toLinkableDuplicates: true, // 节点的重复部分也可以作为链接的终点
		},
        new go.Binding("fill", "color")  // 后续创建的元素设置的背景颜色进行绑定
      ),
        
      $(go.TextBlock,
        { 
    		text: "hello!",  // 节点的文本
         	margin: 5 
		},
        new go.Binding("text", "key")   // 后续创建的元素设置的文本进行绑定
      )
     );
```

##### `nodeTemplateMap`

`nodeTemplateMap`节点模板允许为不同类型的节点数据创建不同的模板，并将这些模板映射到相应的数据属性或键，只要在数据模型中指定模板的名称（默认是使用`category`进行声明，后续可以通过相应的`API`进行修改），就可以显示相应节点模板的图形

```js
// 模板的定义
myDiagram.nodeTemplateMap.add("End",
    ...
);
                              
// 相关节点使用该模板，通过category进行匹配
const nodeDataArray = [
    { key: "add2", loc: new go.Point(100, 50), category: "zhaChi" }
];
```

#### 连线模板

##### `linkTemplate`

`Diagram.linkTemplate`用来定义连接线的样式

```js
myDiagram.linkTemplate =
$(go.Link,
  	// 设置连接线的基本属性
    {
        routing: go.Routing.Orthogonal, 
        curve: go.Curve.JumpGap,
        corner: 10,
        adjusting: go.LinkAdjusting.End, 
        reshapable: true,  // 设置连接线的形态是否可以被修改
        resegmentable: true,  // 设置连接线可以分段的编辑
        selectable: true,  // 设置连线可以被选中
    },
    $(go.Shape,  // 链接线的样式
        { 
            strokeWidth: 1.5
        }
    ),
    $(go.Shape,  // 箭头的样式
        { 
            toArrow: "standard", 
            stroke: null 
        }
    ),
    {
        doubleClick : function(){  // 在连线中鼠标左键双击触发的事件
            ...
        }
    },
);
```

##### `linkTemplateMap`

`linkTemplateMap`连接模板允许为不同类型的连接数据创建不同的模板，并将这些模板映射到相应的数据属性或键，只要在数据模型中指定模板的名称（默认是使用`category`进行声明，后续可以通过相应的`API`进行修改），就可以显示相应连接模板的连接线

```ts
myDiagram.linkTemplateMap.add('infoPanelLink',
   ...
);
const linkDataArray = [
    { from: "pipe1信息面板", to: "pipe1", category: "infoPanelLink"}
];
```

#### 其他模板

##### `groupTemplate`

使用`Group`类将`Nodes`和`Links`的集合视为单个的`Node`，这些节点和连接是组的成员，共同构成了集合节点

`Diagram.groupTemplate`用来定义组的样式

```js
myDiagram.groupTemplate =
    $(go.Group, "Vertical",
      $(go.Panel, "Auto",
        $(go.Shape, "RoundedRectangle",  // 围绕着占位符Placeholder
          { 
    		parameter1: 14,
            fill: "rgba(128,128,128,0.33)" 
          }
         ),
        $(go.Placeholder,    //占位符,表示所有构件的面积，
          { padding: 5} // 添加内边距
         )  
      ),
      $(go.TextBlock,         // 组的标题
        { alignment: go.Spot.Right, font: "Bold 12pt Sans-Serif" },
        new go.Binding("text", "text"))
     );
```

调整组中元素的位置，会相应的改变组的面积大小