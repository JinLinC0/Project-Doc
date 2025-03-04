## 节点(`Node`)

节点构造的常用属性有：`Panel`，`Node`，`TextBlock`，`Shape`，我们可以对其节点的属性进行设置，来更改属性

### `Panel`

面板负责确定其所有元素的大小和定位，每个面板都建立自己的坐标系

```js
myDiagram.add(
    $(go.Part, go.Panel.Vertical,  // 可以简写为：go.Part, "Vertical",
      { 
        new go.Point(0, 0),  // 设置面板的位置
        background: "lightgray", // 设置面板的背景颜色
        width: 140,  // 设置面板的宽度
    	height: 90,  // 设置面板的高度
    	// 设置最大文本块的宽度为面板的宽度
        //如果设置了文本块的宽度，那么面板的宽度，就是所有设置文本块宽度的最大宽度
    	defaultStretch: go.GraphObject.Horizontal,  
    	isOpposite: true,  // 设置的元素填充方向是从下到上，与默认方向相反
    	defaultAlignment: go.Spot.Bottom // 设置面板中元素的对齐方式
      },
     ));
```

#### `Panel.Position`

通过`Panel.Position`进行面板的设置，每个元素都会获得其正常大小，每个元素的位置由 `GraphObject.position`属性给出，如果未指定位置，则元素位于（0,0）左上角，所有位置都在小组自己的坐标系中，而不是在全文件的坐标系中

```js
diagram.add(
    $(go.Part, go.Panel.Position,
      { background: "lightgray" },
      $(go.TextBlock, "(0,0)", { background: "lightgreen" }),
      $(go.TextBlock, "(100, 0)", { position: new go.Point(100, 0), background: "lightgreen" }),
     ));
```

`Panel.Position`位置面板，默认情况下左上角的坐标为(0，0)，但是，如果有元素的位置信息的坐标为负数时，那位置信息的坐标就会改变，左上角的坐标就会被拓展到那个负的坐标

#### `Panel.Vertical`

`Panel.Vertical`垂直面板，在垂直面板中所有面板元素从上到下垂直排列

如果元素的宽度与面板的宽度不同，可以根据其 `GraphObject.alignment`属性进行水平对齐设置

```js
myDiagram.add(
    $(go.Part, go.Panel.Vertical,
      { background: "lightgray" },
      $(go.TextBlock, "a longer string", { background: "lightgreen" }),
      $(go.TextBlock, "left", { background: "lightgreen", alignment: go.Spot.Left }),
      $(go.TextBlock, "stretch", { background: "lightgreen", stretch: go.GraphObject.Fill })  // 添加拉伸属性，使文本块占满整行面板
     ));
```

#### `Panel.Horizontal`

`Panel.Horizontal`水平面板，元素是水平排列的，元素永远不会水平拉伸，但它们可以垂直拉伸

```js
myDiagram.add(
    $(go.Part, go.Panel.Horizontal,
      { position: new go.Point(0, 0), background: "lightgray" },
      $(go.Shape, { width: 30, fill: "lightgreen", height: 100 }),
      $(go.Shape, { width: 30, fill: "lightgreen", height: 50, alignment: go.Spot.Top }),
      $(go.Shape, { width: 30, fill: "lightgreen", stretch: go.GraphObject.Fill })
     ));
```

#### `Panel.Spot`

`Panel.Spot`点面板，根据元素的`GraphObject.alignment`进行排列元素

`Spot.x` 和 `Spot.y` 属性可以是介于 0 和 1 之间的任意数字，包括 0 和 1

```js
diagram.add(
    $(go.Part, go.Panel.Spot,
      $(go.Shape, "Rectangle",
        { fill: "lightgreen", stroke: null, width: 100, height: 50 }),
      // 矩形面板的左上角
      $(go.TextBlock, "0,0",     { alignment: new go.Spot(0, 0) }), 
      // 矩形面板的正中心
      $(go.TextBlock, "0.5,0.5", { alignment: new go.Spot(0.5, 0.5) }),
      // 矩形面板的右下角
      $(go.TextBlock, "1,1",     { alignment: new go.Spot(1, 1) })  
     ));
//alignment: new go.Spot(0, 0) 等价于 alignment: go.Spot.TopLeft
```

`Spot.offsetX `和 `Spot.offsetY`属性可以设置偏移量，在`Spot()`中的第三个参数和第四个参数中体现

```js
// 斑点处于面板的左下角，同时沿 X 轴偏移负 40 个单位（向左偏移）
$(go.TextBlock, "(-40,0)",  { background: pink, alignment: new go.Spot(0, 1, -40, 0) }),
// 斑点处于面板的右下角，同时沿 y 轴偏移负 20 个单位（向上偏移）
$(go.TextBlock, "(0,-20)",  { background: pink, alignment: new go.Spot(1, 1, 0, -20) }),
```

#### `Panel.Auto`

`Panel.Auto`自动面板，自动面板将“主”元素安装在面板的其他元素周围，作为边框使用

自动面板将测量非主元素，确定可以包含所有元素的宽度和高度，并使主元素尺寸稍大于非主元素，这样一般就不需要对主元素的宽和高进行设置（也可以设置，如果非主元素太大就会被裁剪）

自动面板是在对象周围实现边框的常用方法

可以通过`GraphObject.margin`和`Shape.spot`控制非主元素和主元素的边界

```js
spot1: new go.Spot(0, 0, 10, 0), spot2: new go.Spot(1, 1, -10, -10)
```

#### `Panel.Table`

表格面板中的每个对象都放入按 `GraphObject.row` 和 `GraphObject.column` 值索引的单元格中

```ts
$(go.Panel, "Table",
	// 将表格分成两行，第一行放一块内容，第二行放一块内容
    $(go.Panel, "Table", { row: 1, column: 0 },
        { 
            defaultRowSeparatorStroke: "black",    // 定义行边框的颜色
            defaultColumnSeparatorStroke: "black"  // 定义列边框的颜色
        },
        ...
    ),
    $(go.Panel, "Table", { row: 2, column: 0 },
        ...
    )
)
```

#### 面板项数组

##### `Panel.itemArray`

`Panel.itemArray`可以使面板中为数组`array`中的每一个值创建一个元素

```js
myDiagram.nodeTemplate =
  new go.Node("Vertical")
    .bind("itemArray", "items");  // 将items与数组项元素进行绑定

myDiagram.model =
  new go.GraphLinksModel(
    {
      nodeDataArray: [
        { key: 1, items: [ "Alpha", "Beta", "Gamma", "Delta" ] },
        { key: 2, items: [ "first", "second", "third" ] }
      ],
      linkDataArray: [
        { from: 1, to: 2 }
      ]
    });
// items数组中可以设置多个对象，包含各种属性（如颜色）为每个元素进行各自的绑定
```

`Panel.itemArray`绑定到某个数据属性，该属性始终以数组作为其值

#####  `Panel.itemTemplate`

`Panel.itemTemplate`用于自定义每个数组项创建的元素，绑定的数组中的每个元素都会获得此面板的副本，并与`Panel.itemArray`一起添加到面板中

```js
myDiagram.nodeTemplate =
  new go.Node("Auto")
    .add(
      new go.Shape("RoundedRectangle", { fill: "#3AA7A3" }),
      new go.Panel("Vertical", {  // 设置主元素为垂直面板
          itemTemplate:
            new go.Panel("Auto", { margin: 2 })
              .add(
                new go.Shape("RoundedRectangle", { fill: "#91E3E0" }),
                new go.TextBlock({ margin: 2 })
                  .bind("text", "") //Binding构造函数的第二个参数是空字符串， 因为字符串（和数字）没有很多有用的属性
              )
        }
      )
        .bind("itemArray", "items")
    );
```

***

### `Node`

```js
//最简单的节点仅由一个Panel.Auto类型的Panel组成，其Shape围绕着TextBlock
myDiagram.nodeTemplate = 
    $(go.Node, "Auto",
      $(go.Shape,);
      $(go.TextBlock,)
     );
```

***

### `TextBlocks`

`TextBlocks`是用来管理元素中显示文本的类

`TextBlock`类继承自`GraphObject`，因此某些 `GraphObject 属性会影响文本

```js
myDiagram.nodeTemplate = $(go.Node, "Auto",
    $(go.TextBlock,
    { 
        // 文本块内部字体相关
        font: 'bold 22px serif', // 设置文本块中文本的字体样式（加粗，大小，字体家族样式）
        stroke: '#492'   // 设置文本块中的文本字体颜色，默认情况是黑色的
        background: '#492',  // 设置文本块字体区域的背景颜色（不是文本跨组件元素的背景颜色）

        // 文本块元素尺寸相关
        width: 100,  // 设置文本块文本内容的高度
        height: 50,  // 设置文本块文本内容的宽度

        // 间距属性，文本内容周围的一些空间
        // margin 用于控制文本块与其容器边界之间的间距，而不是控制文本块内部的间距
        margin: 8,   // 设置所有(上下左右)边缘的空白量为8
        //margin: [10, 20, 10, 20]  //上边缘10，右边缘20，下边缘10，左边缘20

        maxLines: 2,  // 限制垂直高度，设置文本块中文本的最大行数，通常与overflow一起使用
        // 文本块在文本超出边界时应该使用省略号来表示超出的文本
        overflow: go.TextBlock.OverflowEllipsis,  

        // 文本内容对齐方式
        textAlign: 'center',  //指定的尺寸内绘制文字点排列方式：left, center, right

        alignment: go.Spot.Center,  // 将对象放置在父面板分配的区域中的位置进行对齐
        verticalAlignment: go.Spot.Center,// 将对象放置在父面板分配的区域中的位置进行垂直对齐

        // 文本内容是否可编辑
        editable: true,  //设置文本块中的文本内容可编辑，默认是不可编辑的

        // 文本换行符在text中是以\n进行体现的
        isMultiline: false,  // 忽略换行文本，换行符后面的文本都被忽略掉

        // 文本块翻转：None：不翻转；FlipHorizontal：水平方向镜像翻转；FlipVertical：垂直方向				// 镜像翻转；FlipBoth：既水平翻转右垂直翻转
        flip: go.GraphObject.None, // 设置文本块不翻转
    },
    new go.Binding("text", "key"))
);
```

***

### `Shape`

`Shape`是用于绘制元素几何形状的类，可以控制绘制的形状类型以及描边和填充方式

```js
myDiagram.nodeTemplate = $(go.Node, "Auto",
        $(go.Shape, "RoundedRectangle", // 设置图形的样式
        // 图形的样式包括：Rectangle：矩形；RoundedRectangle：带圆角的矩形；Ellipse：椭圆形
        // Diamond：菱形；TriangleRight：尖口向右三角形；TriangleDown：尖口向下三角形；
        // TriangleLeft：尖口向左三角形；TriangleUp：尖口向上三角形3；MinusLine：横线
        // PlusLine：十字线；XLine：×形
        {
            width:100,    // 设置基础图形元素的宽度
            height:60,    // 设置基础图形元素的高度
    		// 上面的宽度和高度可以进行统一的设置
    		desiredSize: new go.Size(100, 60),
    		margin: 4,    // 设置基础图形元素之间的边距
    
    		// 元素的背景颜色，填充形状的背景
    		fill: '#394', // 设置元素的背景颜色，默认为黑色，如果后续创建元素时有设置颜色，会将其覆盖
    
    		// 控制图像元素形状的轮廓
    		stroke: '#394',  // 设置元素轮廓边框的颜色
    		strokeWidth: 4,  // 设置轮廓边框的粗细
    		background: '#394', // 设置轮廓边框的背景颜色
    
    		// 角度和缩放
    		angle: 45,  // 设置元素的旋转角度，顺时针进行旋转，元素旋转，里面的字体内容不旋转
    		scale: 3.5, // 设置元素的缩放级别，大于1，放大；小于1，缩小
        },
        new go.Binding("fill", "color")),
    );
```

`go.Shape`属性主要用于改变形状样式，其通用的属性有：

|     属性      |          描述          |                          具体介绍                           |
| :-----------: | :--------------------: | :---------------------------------------------------------: |
|   `stroke`    |        边框颜色        |         `null`为无边框，可填`"#87CEFA"`，`"red"`等          |
|   `margin`    |        边框间距        |                                                             |
|   `visible`   |   设置是元素是否可见   |                `true`为可见，`false`为不可见                |
|  `textAlign`  |        文本位置        |                       `"center"`居中                        |
|  `editable`   |     文本是否可编辑     |                       `true`，`false`                       |
|    `font`     |          字体          |       `"bold 8pt Microsoft YaHei, Arial, sans-serif"`       |
|    `fill`     |        背景颜色        |                 可填`"#87CEFA"`，`"red"`等                  |
|  `alignment`  |      元素位置设置      |                  `go.Spot.BottomLeft`/左下                  |
| `isMultiline` |   编辑时是否允许换行   |                         默认`true`                          |
|  `maxLines`   | 设置文本显示的最大行数 |                                                             |
|   `minSize`   |        最小大小        | `new go.Size(10, 16)`，控制了最大大小后，文本就会自动换行了 |
|   `maxSize`   |        最大大小        |                                                             |

***

### `toolTip`

`GraphObject.toolTip`属性提供了提示工具，当鼠标停在了设置该属性的对象上时，会进行设置信息的展示

#### 节点的提示

通过`GraphObject.toolTip`进行节点提示的设置

```js
myDiagram.nodeTemplate =
  $(go.Node, "Auto",
    $(go.Shape, "RoundedRectangle",
      { fill: "white" },
      new go.Binding("fill", "color")),
    $(go.TextBlock, { margin: 5 },
      new go.Binding("text", "key")),
    {
      toolTip:  // 定义节点工具提示
        $("ToolTip",
          $(go.TextBlock, { margin: 4 },
            new go.Binding("text", "color"))  // 绑定节点的颜色信息
        )
    }
  );
```

#### 画布的背景提示

通过`Diagram.toolTip`进行画布提示的设置

```js
// 图表提示工具函数
function diagramInfo(model: any) {
  return "Model:\n" + model.nodeDataArray.length + " nodes, " +
                      model.linkDataArray.length + " links";
}

// 当未覆盖任何节点时，提供图表背景的工具提示
myDiagram.toolTip =
  $("ToolTip",
    $(go.TextBlock, { margin: 4 },
      new go.Binding("text", "", diagramInfo)) // 绑定函数转换器显示相关的信息
  );
```

***

### `contextMenu`

`GraphObject.contextMenu`上下文菜单，为图表或节点背景定义上下文菜单，是在用户鼠标右键点击时出现的菜单，上下文菜单绑定到与部件本身相同的数据

#### 节点添加上下文菜单

```js
myDiagram.nodeTemplate =
$(go.Node, "Auto",
  $(go.Shape, "RoundedRectangle", { fill: "white" },
    new go.Binding("fill", "color")
  ),
  $(go.TextBlock, { margin: 5 },
    new go.Binding("text", "key")
  ),
  {
      contextMenu:   // 为每个节点定义上下文菜单
      $("ContextMenu",  
          $("ContextMenuButton",  // 上下文菜单按钮
              $(go.TextBlock, "Change Color"),  // 设置上下文按钮的文本内容
              { 
                  click: changeColor,  // 按钮点击事件，调用相关的函数
                  "ButtonBorder.fill": "white",  // 设置上下文按钮的颜色
                  "_buttonFillOver": "skyblue",  // 设置鼠标悬停时的颜色
              }
          ),
          // 在上下文菜单中添加新的上下文菜单按钮
          $("ContextMenuButton",
              $(go.TextBlock, "new button"),
              { 
                  click: function(e, obj) { 
                      console.log("new button clicked"); 
                  }
              }
          )
      )
  }
);
```

#### 画布添加上下文菜单

```js
myDiagram.contextMenu =
    $("ContextMenu",
      $("ContextMenuButton",
        $(go.TextBlock, "btnName"),
        { 
    		click: function(e, obj) { ... }   // 点击按钮触发的事件
        },
    );
```

画布的上下文菜单一般包括创建新的节点，撤销和重做

```js
// 创建新节点上下文按钮
$("ContextMenuButton",
  $(go.TextBlock, "New Node"),
  { 
    click: function(e, obj) {
        e.myDiagram.commit(function(d) {
            var data = {};
            d.model.addNodeData(data);
            var part = d.findPartForData(data);
            // 在ContextMenuTool中设置保存mouseDownPoint的位置
            // 节点创建的位置就是鼠标右键的位置
            if(part){
                part.location = d.toolManager.contextMenuTool.mouseDownPoint; 
            } 
        	}, 'new node');
    	} 
    }
)
```

```js
// 撤销按钮
$("ContextMenuButton",
  $(go.TextBlock, "Undo"),
  { 
    click: function(e, obj) { e.myDiagram.commandHandler.undo(); } 
  },
  new go.Binding("visible", "", function(o) {   // 根据是否有可撤销的操作来决定是否可见
    return o.myDiagram.commandHandler.canUndo();  // 可以撤销返回true，否则返回false
}).ofObject())
```

```js
// 重做按钮
$("ContextMenuButton",
  $(go.TextBlock, "Redo"),
  { 
    click: function(e, obj) { e.myDiagram.commandHandler.redo(); } 
  },
  new go.Binding("visible", "", function(o) {  // 根据是否有可重做的操作来决定是否可见
    return o.myDiagram.commandHandler.canRedo();  // 可以重做返回true，否则返回false
}).ofObject())
```

#### 上下文按钮的点击函数

在上下文菜单的函数中，e（event）和 obj（object）是两个参数，它们分别代表事件对象和被点击的对象

- `e` 通常用于获取有关点击事件的详细信息，比如哪个节点被点击，或者点击的位置等

- `obj`可以通过这个参数来获取被点击对象的属性

基本形式：

```js
function changeColor(e: any, obj: any) {
    ...
}
```

改变节点颜色的上下文菜单按钮函数：

```js
function changeColor(e: any, obj: any) {
    myDiagram.commit(function(d) {
        // 获取包含单击的按钮的上下文菜单
        var contextmenu = obj.part;
        // 获取节点的绑定数据
        var nodedata = contextmenu.data;
        // 计算下一次的颜色
        var newcolor = "lightblue";
        switch (nodedata.color) {
            case "lightblue": newcolor = "lightgreen"; break;
            case "lightgreen": newcolor = "lightyellow"; break;
            case "lightyellow": newcolor = "orange"; break;
            case "orange": newcolor = "lightblue"; break;
        }
        // 修改当前节点的颜色
        // 这将评估数据绑定并记录UndoManager中的更改
        d.model.set(nodedata, "color", newcolor);
    }, "changed color");
}
```

