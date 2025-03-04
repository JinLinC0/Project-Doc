## 连接(`Link`)

### 连接

连接线相关的属性：

```js
$(go.Link,
  {
    selectionAdorned: false, 
    routing:go.Routing.AvoidsNodes,   // 设置链接线样式
    curve: go.Curve.JumpGap,  // 当连接相交时设置路由跳线 
    corner: 5,   // 设置垂直连续垂直处的圆角
    fromPortId: "from", 
    toPortId: "to", 
    relinkableTo: true,   // 允许连接线尾部重新连接
    relinkableFrom: true, // 允许连接线头部重新链接
  },
)
```

***

### 箭头

为连接添加箭头，只需要在`diagram.linkTemplate`中为第二个`Shape`设置`toArrow`属性即可

`toArrow: "OpenTriangle",`

***

### 路由

`Link.routing`路由，用于自定义每个连接采用的路径

常见的路由通常有两种：`Routing.Normal`和`Routing.Orthogonal`

```js
myDiagram.linkTemplate =
  new go.Link()
    .bind("routing", "routing")  // 绑定路由
	// routing: go.Routing.Orthogonal  // 可以进行路由的统一设置
    .add(
      new go.Shape(),
      new go.Shape( { toArrow: "Standard" })  // 设置箭头
    );

var linkDataArray = [
  { from: "Alpha", to: "Beta", routing: go.Routing.Normal },
  { from: "Alpha", to: "Gamma", routing: go.Routing.Orthogonal }  // 垂直拐外的路由
];
```

避开节点的路由：` Routing.AvoidsNodes`  路由连线永远不会穿过任何其他节点

#### 端段的长度

端段的长度用于`Orthogonal`和`AvoidsNodes`路由，指的是路由开始/结束段与元素之间的距离长度，可以通过`GraphObject.fromEndSegmentLength` 和 `GraphObject.toEndSegmentLength`进行设置

```js
myDiagram.linkTemplate =
  new go.Link({
      routing: go.Routing.Orthogonal,  // 设置路由
      fromSpot: go.Spot.Left, toSpot: go.Spot.Right  // 设置出节点和入节点的方向
    })
    .bind("fromEndSegmentLength")  // 绑定开始段的长度
    .bind("toEndSegmentLength")    // 绑定结束段的长度
    .add(
      new go.Shape(),
      new go.Shape( { toArrow: "Standard" })
    );

var linkDataArray = [
  { from: "Gamma", to: "Delta", fromEndSegmentLength: 4, toEndSegmentLength: 30 },
];
```

#### 路由相交

##### 设置跳线

使用`Link`的属性`curve`来进行设置`curve: go.Curve.JumpOver`

##### 设置间隙

使用`Link`的属性`curve`来进行设置`curve: go.Curve.JumpGap`

***

### 连接标签

用于在连接上添加注释，并且单击文本标签，会选中整个连接

```js
myDiagram.linkTemplate =
  new go.Link()
    .add(
      new go.Shape(),                           
      new go.Shape({ toArrow: "Standard" }),  
      new go.TextBlock()  // 设置链接文本块，并绑定连接数据
        .bind("text")
    );

var linkDataArray = [
  { from: "Alpha", to: "Beta", text: "a label" } // text为显示连接上的文本
];
```

也可以在连接上设置面板进行自定义图形元素标签

***

### `labelKeys`

`labelKeys`用于将节点当作连接线上的标签，通过唯一标识符`key`绑定到连接线上

通常需要进行设置：

```diff
myDiagram.model =
    $(go.GraphLinksModel,
        {
            linkFromPortIdProperty: "fromPort",
            linkToPortIdProperty: "toPort",
+           linkLabelKeysProperty: "labelKeys",
            nodeDataArray: nodeDataArray,
            linkDataArray: linkDataArray 
        }
    );
```

同时在连线中绑定这个节点：

```ts
const linkDataArray = [
    { from: "add1", fromPort: "top0", to: "add2", toPort: "bottom0", labelKeys: ["pipe1"] },
];
```

这样这个节点在一开始渲染的时候，就被渲染到了对应的连接线上，视为连接线上的标签

