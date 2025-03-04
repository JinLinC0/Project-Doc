## 数据模型(`Model`)

`GraphLinksModel`将节点数据和链接数据的集合（本质上是数组）保存为`GraphLinksModel.nodeDataArray`和 `GraphLinksModel.linkDataArray`的值，之后，设置`Diagram.model`属性，使关系图可以为所有节点数据创建节点，为所有链接数据创建链接

```js
var nodeDataArray = [
    { key: "Hello", color: "lightblue" },
    { key: "World!", color: "orange" },
];
var linkDataArray = [
    { from: "Hello", to: "World!" },
];
myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
```

```js
// 包含组的数据模型
var nodeDataArray = [
  { key: 1, text: "Alpha" },
  { key: 2, text: "Beta", group: 4 },   // 在组内部
  { key: 3, text: "Gamma", group: 4 },  // 在组内部
  { key: 4, text: "Omega", isGroup: true },  // 设置为组
  { key: 5, text: "Delta" }
];
var linkDataArray = [
  { from: 1, to: 2 },  // 连接从组外元素到组内元素
  { from: 2, to: 3 },  // 组内元素的连接
  { from: 4, to: 5 }  // 连接从整个组到组外元素
];
```

***

### 数据绑定

#### 单向数据绑定

通过 `Binding` 来绑定源对象和目标对象上的属性

如：`new go.Binding("text", "key"))`将数据对象中的`key`属性对应的值与模板中的`text`属性进行绑定

每个`Node`和`Link`都有一个`Panel.data`属性，该属性引用模型中数据对象的属性

将设置的属性与数据对象中对应的属性进行绑定，绑定后会覆盖原先设置的默认属性值，大多数的属性都是可以绑定的

`Part.location`通过用于对具有对象值的数据绑定属性，主要是绑定元素的位置信息

```ts
myDiagram.nodeTemplate =
    $(go.Node, "Auto",
      new go.Binding("location", "loc"), // 进行元素位置信息的绑定
      $(go.Shape, "RoundedRectangle",
        { fill: "white" },
        new go.Binding("fill", "color")),
      $(go.TextBlock,
        { margin: 5 },
        new go.Binding("text", "key"))
    );

var nodeDataArray = [
    // 对于每一个节点，分别指定其位置信息
    { key: "Alpha", color: "lightblue", loc: new go.Point(0, 0) },
    { key: "Beta", color: "pink", loc: new go.Point(100, 50) }
];
var linkDataArray = [
    { from: "Alpha", to: "Beta" }
];
myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
```

#### 双向数据绑定

单向数据绑定仅将值从源数据传输到目标属性

双向数据绑定能够将值从 `GraphObject` 传输回模型数据，以使模型数据与图表保持同步，不仅可以将值从源传递到目标，还可以将值从目标对象传递回源数据，双向数据绑定的形式：

`new go.Binding("location", "loc").makeTwoWay()`

相比与单向的绑定，使用双向绑定，在修改画布中的内容/属性后，会同步到数据模型中，导出数据也是修改后的数据，确保数据模型是最新的

#### 转换函数

为了与数据数组的样式进行匹配，可以通过转换函数进行转换：

```js
// 元素位置信息的绑定的代码修改为
new go.Binding("location", "loc", go.Point.parse), 

// 节点数据修改为
{ key: "Alpha", color: "lightblue", loc: "0 0" }    
```

对于转换函数，也可以直接在`Binding`中进行调用：

```js
// 对于元素填充的颜色进行传入值的判断绑定，该函数可以是匿名函数
new go.Binding("fill", "highlight", function(v) { return v ? "pink" : "lightblue"; })

// 根据数据数组传递过来的布尔类型的值进行选择判断
{ key: "Alpha", loc: "0 0", highlight: false }
```

#### 更改数据值

更改数据绑定值，一般是通过函数的形式进行绑定数据的修改

事务函数的一般形式：

```js
changeColor = function() {
  myDiagram.model.commit(function(m) {
      ...
  }, "");
}
```

每隔0.5秒改变一个节点元素的边框和背景颜色：

```js
function flash() {
    // 所有模型更改都应该发生在以下的事务中
    diagram.model.commit(function(m) {
        var data = m.nodeDataArray[0];  // 获取第一个节点数据
        // 更改highlight属性，布尔类型的属性值取反
        m.set(data, "highlight", !data.highlight); 
    }, "flash");
}

function loop() {
    setTimeout(function() { flash(); loop(); }, 500); // 每0.5秒改变一次
}

loop();
```

