## 端口(`Port`)

节点端口`Ports`，链路中可以被连接线所连接的元素被称为端口，在一个节点中可以设置任意数量的端口，在默认情况下，一个节点只有一个端口，就是这整个节点

如果要声明节点`Node`中特定的元素为端口，需要对`GraphObject.portId`属性进行设置，端口的`GraphObject`只能位于`Nodes`和`Groups`中

在节点中经常需要多端口，甚至需要端口在节点中的位置可以进行动态调整

为了使链接数据对象区分链接应连接到哪个端口，`GraphLinksModel` 需要设置两个额外的数据属性，用于标识链接两端节点中的端口名称，`GraphLinksModel.getToKeyForLinkData` 标识要连接到的节点; `GraphLinksModel.getToPortIdForLinkData` 标识节点内的端口；

同样，`GraphLinksModel.getFromKeyForLinkData` 和 `GraphLinksModel.getFromPortIdForLinkData` 标识节点及其端口。

通常，`GraphLinksModel`不需要识别链路数据上的端口信息，如果要在链路数据上支持端口标识符，则需要将 `GraphLinksModel.linkToPortIdProperty` 和 `GraphLinksModel.linkFromPortIdProperty` 设置为链路数据属性的名称。如果未设置这些属性，则假定所有端口标识符为空字符串，即节点的一个默认端口的名称。

```js
var linkDataArray = [
    { from: "Add1", fromPort: "Out", to: "Subtract1", toPort: "A" },
    { from: "Add2", fromPort: "Out", to: "Subtract1", toPort: "B" }
];

myDiagram.model =
    $(go.GraphLinksModel,
      { 
    	linkFromPortIdProperty: "fromPort",
        linkToPortIdProperty: "toPort",
    	nodeDataArray: nodeDataArray,
        linkDataArray: linkDataArray
       }
     );
```

***

### 端口的属性

端口的属性仅在`GraphObjects`充当端口时才生效，常见的端口属性包括：

- `portId`：必须设置为节点中唯一的字符串以便将此 `GraphObject` 视为“端口”，而不是整个节点
- `fromSpot`和 `toSpot`：声明连接线应与此端口进行连接
- `fromEndSegmentLength`和 `toEndSegmentLength`：与此端口相邻的链路段的长度，默认值为10
- `fromShortLength`和 `toShortLength`：链路在接触此端口之前应终止的距离，默认值为0
- `fromLinkable`和 `toLinkable`：是否可以绘制与此端口连接的链接，默认值为 `null`
- `fromLinkableDuplicates`和 `toLinkableDuplicates`：用户是否可以在同一对端口之间绘制多个链接，默认值为 `false`
- `fromLinkableSelfNode`和 `toLinkableSelfNode`：用户是否可以在同一节点上的端口之间绘制链接
- `fromMaxLinks`和 `toMaxLinks`：限制在特定方向上与此端口连接的最大连路数

***

### `Table`布局的端口

使用端口的节点一般都是通过表格面板的：`Panel.Table`，但是想要端口在节点中可通过鼠标进行自由移动，需要使用端口移动扩展，并且端口的面板只能使用`Spot`

表格面板的节点布局：

- 主节点的位置在正中心：`row: 1, column: 1`；
- 上端口区域：`row: 0，column: 1`；
- 左端口区域: `row: 1，column: 0`;
- 右端口区域：`row: 1，column: 2`；
- 下端口区域：`row: 2，column: 1`；

一般多端口是通过`itemArray`和`itemTemplate`机制进行数据的传入和绑定的

创建端口：

```js
$(go.Panel, 'Horizontal', new go.Binding('itemArray', 'topArray'), {  // 上端口进行水平布局
    row: 0,
    column: 1,
    itemTemplate: $(go.Panel,
    {
        _side: 'top',
        fromSpot: go.Spot.Top,  // 从端口顶部发出连接
        toSpot: go.Spot.Top,    // 从端口顶部接收连接
        fromLinkable: true,
        toLinkable: true,
        cursor: 'pointer',   // 鼠标在端口悬停时，改变光标
        contextMenu:   // 端口的右键菜单
        $("ContextMenu",  
          $("ContextMenuButton",
            $(go.TextBlock, "Remove Port"),
            { 
            click: (e: any, obj: any) => removePort(obj.part.adornedObject),
            "ButtonBorder.fill": "white",
            "_buttonFillOver": "skyblue"
     		}
           )
         ),
    },
    new go.Binding('portId', 'portId'),
    $(go.Shape,
      'Rectangle',
      {
        stroke: null,
        strokeWidth: 0,
        desiredSize: new go.Size(8, 8),
        margin: new go.Margin(0, 1)   // 设置端口的左右间距
      },
      new go.Binding('ports')
     )
     ),
}),
```

设置可绘制新连接：需要对节点在图中绘制新连接，只需要对出端口的`fromLinkable`属性设置为`true`和入端口的`toLinkable`属性设置为`true`即可，建立连线后，连接的节点会根据新连线进行重新的的位置布局

#### 新增端口

一般需要在画布中对节点进行操作，使之可以对端口进行新增，新增端口的函数为：

```js
// 添加端口
function addPort(side: string) {
    myDiagram.startTransaction('addPort');
    myDiagram.selection.each((node: any) => {
      // 跳过任何被选定的连接
      if (!(node instanceof go.Node)) return;
      // 计算下一个可用的索引
      let i = 0;
      // 从小到大遍历索引i，获取一个可以使用的索引（没有被占用）
      while (node.findPort(side + i.toString()) !== node) i++;
      // 为新端口设置name，传入的side字符串加上可用的索引
      const name = side + i.toString();
      // 获取要修改的端口数据的数组，索引的属性为side传入字符串的端口数组
      const arr = node.data[side + 'Array'];
      if (arr) {
        // 创建一个新的端口数据对象
        const newportdata = {
          portId: name,
        };
        // 其添加到端口数据数组中
        myDiagram.model.insertArrayItem(arr, -1, newportdata);
      }
    });
    myDiagram.commitTransaction('addPort');
}

//上下文菜单调用：
click: () => addPort('right'),
```

#### 删除端口

端口也可以进行删除操作，通常对端口上下文菜单按钮进行click函数的编写：

```js
// 删除端口
function removePort(port: any) {
    myDiagram.startTransaction('removePort');
    // console.log(port.portId);  // 如top0
    const pid = port.portId;
    const arr = port.panel.itemArray;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].portId === pid) {
        myDiagram.model.removeArrayItem(arr, i);  // 删除数组中的项
        break;
      }
    }
    myDiagram.commitTransaction('removePort');
}

// 上下文菜单按钮调用：
click: (e: any, obj: any) => removePort(obj.part.adornedObject),
```

#### 端口的封装

一般通常将端口封装到一个函数中，后续使用简单的进行调用即可

```ts
// 其中函数的四个参数分别表示：端口的ID，端口的位置，端口是否可输出，端口是否可输入
function makePort(name, spot, output, input) {
  return $(go.Shape, 'Circle', {
    fill: null, 
    stroke: null,
    desiredSize: new go.Size(7, 7),
    alignment: spot, 
    alignmentFocus: spot,
    portId: name,
    fromSpot: spot,
    toSpot: spot,
    fromLinkable: output,
    toLinkable: input,
    cursor: 'pointer',
  });
}

// 调用
makePort('T', go.Spot.Top, false, true)
```

***

### `Spot`布局的端口

通过`Spot`布局的端口，可以使用官方扩展来进行端口在节点中的自由移动

端口的封装模板：需要对`portKey`进行判断，来确定这个端口是哪个方向的端口

```ts
// 端口模板
const portPanel = $(go.Panel,
    {
        portId: "Top",
        fromSpot: go.Spot.Top,
        toSpot: go.Spot.Top,
        fromLinkable: true,
        toLinkable: true,
        cursor: 'pointer',
        alignment: go.Spot.Top,
        visible: true,
        contextMenu:
        $("ContextMenu",
            $("ContextMenuButton",
                $(go.TextBlock, "Remove Port", { font: "bold 12px sans-serif", width: 100, textAlign: "center" }),
                {
                    click: (e: any, obj: any) => removePort(obj.part.adornedObject),
                    "ButtonBorder.fill": "white",
                    "_buttonFillOver": "skyblue"
                }
            )
        ),
    },
    new go.Binding('portId', 'portId'),
    new go.Binding('alignment', 'portKey', (portKey: string) => {
        switch(portKey) {
            case "top": return go.Spot.Top;
            case "bottom": return go.Spot.Bottom;
            case "left": return go.Spot.Left;
            case "right": return go.Spot.Right;
            default: return go.Spot.Top;
        }
    }),
    new go.Binding('fromSpot', 'portKey', (portKey: string) => {
        switch(portKey) {
            case "top": return go.Spot.Top;
            case "bottom": return go.Spot.Bottom;
            case "left": return go.Spot.Left;
            case "right": return go.Spot.Right;
            default: return go.Spot.Top;
        }
    }),
    new go.Binding('toSpot', 'portKey', (portKey: string) => {
        switch(portKey) {
            case "top": return go.Spot.Top;
            case "bottom": return go.Spot.Bottom;
            case "left": return go.Spot.Left;
            case "right": return go.Spot.Right;
            default: return go.Spot.Top;
        }
    }),
    $(go.Shape, 'Rectangle',
        {
            strokeWidth: 1,
            desiredSize: new go.Size(6, 6),
        },
        new go.Binding('visible', 'visible'),
    )
)
```

在节点模板中引入端口：

```ts
myDiagram.nodeTemplate =
    $(go.Node, "Spot", 
        { 
            resizable: true,
            rotatable: true
        },
        new go.Binding("location", "loc"),
        new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),  // 进行元素位置信息的绑定
        // 端口模板
        new go.Binding('itemArray', 'portArray'), { 
            itemTemplate: portPanel,
        },
        ...
      )
```

#### 新增端口

一般需要在画布中对节点进行操作，使之可以对端口进行新增，修改后的的函数为：

```ts
// 添加端口
function addPort(side: string) {
    myDiagram.startTransaction('addPort');
    myDiagram.selection.each((node: any) => {
      // 跳过任何被选定的连接
      if (!(node instanceof go.Node)) return;
      // 计算下一个可用的索引
      let i = 0;
      // 从小到大遍历索引i，获取一个可以使用的索引（没有被占用）
      while (node.findPort(side + i.toString()) !== node) i++;
      // 为新端口设置name，传入的side字符串加上可用的索引
      const name = side + i.toString();
      // 创建一个新的端口数据对象
      const newportdata = {
        portId: name,
        portKey: side
      };
      // 获取要修改的端口数据的数组，索引的属性为portArray
      const arr = node.data.portArray;
      if (arr) {
        // 其添加到端口数据数组中
        myDiagram.model.insertArrayItem(arr, -1, newportdata);
      }
    });
    myDiagram.commitTransaction('addPort');
}
```

#### 删除端口

端口也可以进行删除操作，通常对端口上下文菜单按钮进行click函数的编写：

```ts
// 删除端口
function removePort(port: any) {
    myDiagram.startTransaction('removePort');
    // console.log(port.portId);  // 如top0
    const pid = port.portId;
    const arr = port.panel.itemArray;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].portId === pid) {
        myDiagram.model.removeArrayItem(arr, i);  // 删除数组中的项
        break;
      }
    }
    myDiagram.commitTransaction('removePort');
}
```

