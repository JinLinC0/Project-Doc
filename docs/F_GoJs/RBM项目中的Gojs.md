## `RBM`项目中的`Gojs`

### 图片代替图形节点

#### 拖入`HTML`元素到画布中

在左侧有一栏用于存放相关的`HTML`元素，用于拖入到右侧的画布中，其实现方式为：将左侧的`HTML`元素设置成可拖拽，拖入到右侧的画布中，在右侧进行与`HTML`形状一致的节点的绘制，一般是通过`SVG`字符串进行绘制的，渣池的`geometry`字符串如下所示：

```ts
geometry: go.Geometry.parse("XFM88 77.8 0 77.8 0 53.8 88 53.8 136.6 0 181.4 0 181.4 35.3 157.5 35.3 157.5 24.5 136.6 24.5z XM 86.8 70.1 L 141.7 10.2 XM 82.8 66.1 L 137.1 6.4 XM142 8.8B 0 360 139 8.8 3 3 XM87 68.8B 0 360 84 68.8 3 3"),
```

#### `SVG`节点模板

`SVG`节点模板需要对其边框`stroke`和背景颜色`fill`进行设置，才能显示`SVG`绘图，如下所示：

```ts
$(go.Panel, 'Spot',
    $(go.Shape, "RoundedRectangle", 
        { 
            geometry: go.Geometry.parse("XFM88 77.8 0 77.8 0 53.8 88 53.8 136.6 0 181.4 0 181.4 35.3 157.5 35.3 157.5 24.5 136.6 24.5z XM 86.8 70.1 L 141.7 10.2 XM 82.8 66.1 L 137.1 6.4 XM142 8.8B 0 360 139 8.8 3 3 XM87 68.8B 0 360 84 68.8 3 3"),
            stroke: "black",
            fill: "white",
            strokeWidth: 1.5
        },
    ),
    $(go.TextBlock,
        { 
            margin: 10, 
            textAlign: 'center', 
            font: 'bold 14px Segoe UI,sans-serif', 
            stroke: '#484848', 
            editable: true,
            _isNodeLabel: true,
            cursor: "move" 
        },
        new go.Binding('text', 'key').makeTwoWay(),
    ),
  )
),
```

#### `HTML`元素的偏移量

计算``HTML`元素的偏移量后，拖到结束才能将画布中新绘制的节点的位置定在鼠标松开的位置

```ts
// 计算偏移量变量
const dragStartOffsetX = ref()
const dragStartOffsetY = ref()

// 获取拖动开始时的偏移量
function dragstart(event: any){
    const target = event.target;
    dragStartOffsetX.value = event.offsetX - target.clientWidth / 2;
    dragStartOffsetY.value = event.offsetY - target.clientHeight / 2;

    // 设置拖动数据，后续匹配拖动元素使用
    if (target.id === "svg_zhaChi") {
        event.dataTransfer.setData("node-type", "zhaChi");
    } else if (target.id === "html") {
        event.dataTransfer.setData("node-type", "html");
    }
}
```

其中`dragstart`函数需要绑定到每一个`HTML`元素的标签中`@dragstart="dragstart"`

#### 拖入画布

```ts
// html元素拖动到画布中
function drop(event: any) {
    event.preventDefault();  // 不要执行浏览器的默认操作，执行下面自定义的函数方法
    const target = event.target;  // 指向事件触发的原始元素
    // 获取像素比率
    const pixelRatio = myDiagram.computePixelRatio();
    if (!(target instanceof HTMLCanvasElement)) return;
    // 获取目标元素的边界框
    const bbox = target.getBoundingClientRect();
    let bbw = bbox.width;
    if (bbw === 0) bbw = 0.001;
    let bbh = bbox.height;
    if (bbh === 0) bbh = 0.001;
    // 计算鼠标在画布上的位置
    const mx = event.clientX - bbox.left * (target.width / pixelRatio / bbw);
    const my = event.clientY - bbox.top * (target.height / pixelRatio / bbh);
    const point = myDiagram.transformViewToDoc(new go.Point(mx - dragStartOffsetX.value, my - dragStartOffsetY.value));
    // 开始一个新的事务
    myDiagram.startTransaction('new node');
    // 获取拖动数据：确定拖动的是哪个HTML元素
    let nodeType = event.dataTransfer.getData("node-type");
    let category = "";
    let key = "html元素";
    if (nodeType === "zhaChi") {
        category = "zhaChi";
        key = "渣池";
    }
    const newData = {
        key: key,
        color: 'aqua',
        loc: new go.Point(point.x, point.y),
        portArray: [],
        markArray: [],
        category: category
    };
    myDiagram.model.addNodeData(newData);
    myDiagram.commitTransaction('new node');
}
```

同时，需要对画布进行设置：设置拖动事件，绑定拖动函数

```html
<div id="diagramDiv" class="layout-main" @dragover="event => event.preventDefault()" @dragenter="event => event.preventDefault()" @drop="drop"></div>
```

***

### 端口

端口是用于节点连线使用的，通过某个节点的一个端口连接到另一个节点的端口，端口一般分为上端口，下端口，左端口和右端口，他们连接线出入的方向和在节点的初始位置是不同的

#### 端口类型匹配

端口的添加需要区分上下左右端口，因此需要对端口数组`portArray`中加上对应的`portKey`值来区分，在`nodeDataArray`数组中，通过`portArray`数组来存放节点的端口信息，如：

```ts
portArray: [{portId: "bottom0", portKey: "bottom"}]
```

在端口模板中需要根据端口的`portKey`值，来进行生成特定位置，连接出/入的方向

对`alignment`，`fromSpot`和`toSpot`进行选择绑定，以`alignment`为例：

```ts
new go.Binding('alignment', 'portKey', (portKey: string) => {
    switch(portKey) {
        case "top": return go.Spot.Top;
        case "bottom": return go.Spot.Bottom;
        case "left": return go.Spot.Left;
        case "right": return go.Spot.Right;
        default: return go.Spot.Top;
    }
}),
```

这样不同类型的端口就有不同的模板，是根据`portKey`进行匹配的

#### 端口模板

整个端口模板形式如下所示：

```ts
new go.Binding('itemArray', 'portArray'), { 
    itemTemplate: $(go.Panel,
    {
        portId: "Top",
        fromSpot: go.Spot.Top,
        toSpot: go.Spot.Top,
        fromLinkable: true,
        toLinkable: true,
        cursor: 'pointer',
        alignment: go.Spot.Top,
        contextMenu:  ...  // 端口的上下文菜单
    },
    new go.Binding('portId', 'portId'),  // 将端口Id进行绑定
    // 根据portKey值匹配对应的alignment
    new go.Binding('alignment', 'portKey', (portKey: string) => {
        switch(portKey) {
            case "top": return go.Spot.Top;
            case "bottom": return go.Spot.Bottom;
            case "left": return go.Spot.Left;
            case "right": return go.Spot.Right;
            default: return go.Spot.Top;
        }
    }),
    // 根据portKey值匹配对应的fromSpot
    new go.Binding('fromSpot', 'portKey', (portKey: string) => {
        switch(portKey) {
            case "top": return go.Spot.Top;
            case "bottom": return go.Spot.Bottom;
            case "left": return go.Spot.Left;
            case "right": return go.Spot.Right;
            default: return go.Spot.Top;
        }
    }),
    // 根据portKey值匹配对应的toSpot
    new go.Binding('toSpot', 'portKey', (portKey: string) => {
        switch(portKey) {
            case "top": return go.Spot.Top;
            case "bottom": return go.Spot.Bottom;
            case "left": return go.Spot.Left;
            case "right": return go.Spot.Right;
            default: return go.Spot.Top;
        }
    }),
    // 端口样式的设置
    $(go.Shape, 'Rectangle',
        {
            strokeWidth: 1,
            desiredSize: new go.Size(6, 6),
        },
    )
    ),
},
```

#### 添加端口函数

添加端口函数的调用放在了弹出对话框中，鼠标左键双击某个节点后，会弹出一个添加端口对话框，选择添加对应位置的端口后，会在节点中生成新端口

给节点添加端口需要调用以下的端口添加函数，执行该函数后，会在节点端口模板设置的位置`alignment`中添加一个新的端口，添加后的端口可以进行移动并且可以拖到放到指定的位置

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

#### 删除端口函数

删除端口函数的调用放在了端口的右键菜单中，想要删除某个端口，只需通过鼠标右键该端口，点击移除端口菜单后，就可以将这个端口进行删除

```ts
// 删除端口
function removePort(port: any) {
    myDiagram.startTransaction('removePort');
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

#### 端口的移动

一般端口在节点中，其位置是需要可移动的，要使端口可以自由的移动，需要使用官方提供的扩展`PortShiftingTool`，在代码中的引入如下所示：

```ts
import { PortShiftingTool } from './extensions/PortShiftingTool';
// 设置端口移动
myDiagram.toolManager.mouseMoveTools.insertAt(0, new PortShiftingTool()); 
```

引入后，还需要对端口模板的类型进行设置，只有设置为`Spot`类型的模板，端口才可以提高Shift+鼠标左键进行位置上自由的移动

***

### 标定点

节点中的标定点是用于接入具体设备的信息而存在的，节点中的标定点设置和端口设置类似，也需要对标定点进行可移动，添加和删除操作

在`nodeDataArray`数组中，通过`markArray`数组来存放节点的端口信息，如：

```ts
markArray: [{markId: "mark0"}]
```

#### 标定点模板

```ts
// 标定点模板
new go.Binding('itemArray', 'markArray'), { 
    itemTemplate: $(go.Panel,
    {
        portId: "mark",
        cursor: 'pointer',
        alignment: new go.Spot(0.5, 0.2),  // 标定点在节点中的初始位置
        contextMenu:  ...   // 标定点的上下文菜单
    },
    new go.Binding('portId', 'markId'),
    $(go.Shape, 'Rectangle',
        {
            strokeWidth: 1,
            desiredSize: new go.Size(6, 6),
            fill: "red"
        },
    )
    )
},
```

经过尝试后发现，标定点模板不能和端口模板放在同一个层面，所以将标定点模板放到与节点模板同一个层级中，这样就能保证标定点可以正常的显示

#### 添加标定点函数

添加标定点函数的调用放在了弹出对话框中，鼠标左键双击某个节点后，会弹出一个添加标定点对话框，点击添加标定点按钮后，会在节点中生成新标定点

添加标定点不需要像添加端口一样考虑其类型，所以添加标定点函数是添加端口函数的简化版：

```ts
// 添加标定点
function addMark() {
    myDiagram.startTransaction('addMark');
    myDiagram.selection.each((node: any) => {
        if (!(node instanceof go.Node)) return;
        let i = 0;
        while (node.findPort("mark" + i.toString()) !== node) i++;
        const name = "mark" + i.toString();
        const newMarkData = {
            markId: name
        };
        const arr = node.data.markArray;
        if (arr) {
            myDiagram.model.insertArrayItem(arr, -1, newMarkData);
        }
    });
    myDiagram.commitTransaction('addMark');
}

```

#### 删除标定点函数

删除标定点函数的调用放在了标定点的右键菜单中，想要删除某个标定点，只需通过鼠标右键该标定点，点击移除标定点菜单后，就可以将这个标定点进行删除

```ts
// 删除标定点
function removeMark(mark: any) {
    myDiagram.startTransaction('removeMark');
    const markId = mark.portId;
    const arr = mark.panel.itemArray;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].markId === markId) {
            myDiagram.model.removeArrayItem(arr, i);
            break;
        }
    }
    myDiagram.commitTransaction('removeMark');
}
```

***

### 区分编辑和预览

在`Gojs`中，如果画布处于编辑状态，是可以进行端口的添加，连接线的连接的，之前的一系列操作都是在编辑状态下进行的；但是画布通常还有一种界面状态：预览界面，在预览界面中是不能进行对节点的一系列操作，包括连接线的连接等，只能对画布进行平移来查看整个画布元素。

对于界面编辑/预览模式的切换，可以通过以下的函数进行实现：

```ts
// 设置一开始画布为编辑模式
const isEditMode = ref(true)

// 切换编辑和预览模式
function toggleEditMode() {
    myDiagram.startTransaction("changeModel");
    isEditMode.value = !isEditMode.value;
    if(isEditMode.value){
        ElMessage('编辑模式')
    } else {
        ElMessage({
            message: '预览模式',
            type: 'success',
        })
    }
    if (myDiagram) {
        myDiagram.isReadOnly = !isEditMode.value;
        myDiagram.allowEdit = isEditMode.value;

        // 隐藏所有的节点端口
        myDiagram.nodes.each((node: any) => {
            node.ports.each((port: any) => {
                myDiagram.model.setDataProperty(port.data, 'visible', isEditMode.value);
            });
        });
    }
    myDiagram.commitTransaction("changeModel");
}
```

由于在预览界面，端口的是需要被隐藏的，所以要对模板中的端口模板进行设置，在切换到预览模式后将节点中的端口进行隐藏，在端口样式模板中绑定visible属性：

```ts
$(go.Shape, 'Rectangle',
    {
        strokeWidth: 1,
        desiredSize: new go.Size(6, 6),
    },
    new go.Binding('visible', 'visible'),
)
```

通过`isEditMode.value`布尔值的切换来改变端口的显示/隐藏状态

***

### 连接线上的管道节点

#### 重构扩展文件

管道节点需要在连接线上沿着连接线的路径进行移动，而官方给出的扩展文件没有办法实现该功能，官方的扩展文件`LinkLabelOnPathDraggingTool.ts`只是针对于连接线上的标签，不能用于我们需要的连接线上的节点进行沿着连接线移动

因此需要对其扩展文件`LinkLabelOnPathDraggingTool.ts`进行重新改写：

以下方法在鼠标点击的位置查找标签对象：它检查对象是否是链接的一部分，并且是否标记为链接标签（通过 `_isLinkLabel` 属性），同时修改后扩展到了节点

```diff
public findLabel(): go.GraphObject | null {
    const diagram = this.diagram;
    const e = diagram.lastInput;
    let elt = diagram.findObjectAt(e.documentPoint, null, null);

-   if (elt === null || !(elt.part instanceof go.Link)) return null;
-    while (elt !== null && elt.panel !== elt.part) {
-      elt = elt.panel;
-    }
-    if (!(elt as any)['_isLinkLabel']) return null;
-    return elt;
    
+    if (elt === null || (!(elt.part instanceof go.Link) && !((elt.part as any)['labeledLink'] instanceof go.Link))) return null;
+    while (elt !== null && elt.panel !== elt.part) {
+      elt = elt.panel;
+    }
+    if (elt === null) return null
+    if (!(elt as any)['_isLinkLabel'] && !((elt.part as any)['_isLinkLabel'])) return null;
+    	return elt;
    }
```

修改后的代码考虑了 `labeledLink` 属性，以支持更复杂的场景：连接线上的移动内容是节点，而不单单是连接线上的标签

#### 引入扩展

```ts
import { LinkLabelOnPathDraggingTool } from './extensions/LinkLabelOnPathDraggingTool';

myDiagram.toolManager.mouseMoveTools.insertAt(0, new LinkLabelOnPathDraggingTool());  // 设置连接上的标签只能沿着连接线进行移动
```

如果要是管道节点向连接线上的标签一样进行沿着连接线拖动，仅仅是引入拓展是不够的，需要对管道节点模板进行声明：

```ts
{ segmentIndex: NaN, segmentFraction: 0.5, _isLinkLabel: true }
```

- `segmentIndex`：索引值，`NaN`表示索引值无效
- `segmentFraction`：节点处于连接线的位置，0.5表示处于中间位置
- `_isLinkLabel`：表示该节点对象是一个连接标签，为`true`表示可以对拓展进行使用

#### 连接线上绑定管道节点

在连接线上添加管道，一开始想的是将连接线上的`label`标签作为管道节点，但是发现，连接线上的标签是不能实现传统节点的功能（如添加端口，添加标定点等等），其次连接线上的标签是不能被单独选中的，选中这个`label`就会导致整条连接线被选中，所以不能考虑使用连接线上的标签作为连接线上的管道进行使用

于是使用`labelKeys`，将通过管道模板产生管道节点通过`labelKeys`绑定到当前的连接线上，将管道节点名称`key`为`pipe1`的管道节点作为标签绑定在连接线上，这样这个管道节点一开始就会出现在连接线上

```ts
const linkDataArray = [
    { from: "add1", fromPort: "top0", to: "add2", toPort: "bottom0", labelKeys: ["pipe1"] },
];
```

同时，这个节点是需要存在的，即在`nodeDataArray`数组中有这个管道节点：

```ts
const nodeDataArray = [
    { key: "add1", color: "lightyellow", loc: new go.Point(-150, 200), portArray: [{portId: "top0", portKey: "top"}, {portId: "left0", portKey: "left"}, {portId: "right0", portKey: "right"}, {portId: "bottom0", portKey: "bottom"}] },
    { key: "add2", color: "lightblue", loc: new go.Point(100, 50), category: "zhaChi", portArray: [{portId: "bottom0", portKey: "bottom"}] },
    { key: "pipe1", color: "gray", loc: new go.Point(0, 100), category: "pipe", portArray: [{portId: "top0", portKey: "top"}], markArray: [{portId: "mark0"}]},
];
```

同时，需要在`GraphLinksModel`类中声明：`linkLabelKeysProperty: "labelKeys"`

#### 动态添加管道节点

鼠标左键双击某条连接线，进行管道添加操作，添加后的管道会出现在该连接线上

添加管道函数为：

```ts
// 在连接线上添加管道
function addPipe() {
    myDiagram.startTransaction("addPipeToLinks");
    myDiagram.selection.each(function(link: any) {
        if (link instanceof go.Link) 
        {
            var newPipeNode = 
            {
                key: "newPipe",
                color: 'gray',
                category: "pipe",
                portArray: [],
                markArray: []
            };
            // 添加节点到节点数据模型中
            myDiagram.model.addNodeData(newPipeNode);

            // 确保link.data有linkLabels属性
            if (!link.data.linkLabels) {
                link.data.linkLabels = [];
            }
            // 向连接中添加标签键，将新节点的唯一标识符（key数据）添加到连接线的labelKeys属性中，使节点显示在连接线上
            myDiagram.model.addLabelKeyForLinkData(link.data, newPipeNode.key)
        }
    });
    myDiagram.commitTransaction("addPipeToLinks");
}
```

***

### 信息面板节点

信息面板节点主要用于实现设备信息的展示，主要展示了设备的名称、风险等级、`DCS`数据、告警数据和损伤分布，并且需要通过按钮对每一项数据进行显示和隐藏的控制

设备信息面板节点通过`go.Panel`中的`Table`进行布局的

#### 信息面板节点

```ts
$(go.Panel, "Spot",
$(go.Panel, "Auto",
$(go.Shape, { fill: '#f4f4f4', stroke: 'black', strokeWidth: 1 }),  // 设置最外层边框
$(go.Panel, "Table",
    // 设置内部边框
    $(go.RowColumnDefinition, { row: 0, separatorStroke: 'black' }),
    $(go.RowColumnDefinition, { row: 1, separatorStroke: 'black' }),
    $(go.RowColumnDefinition, { row: 2, separatorStroke: 'black' }),
    $(go.RowColumnDefinition, { row: 3, separatorStroke: 'black' }),
    $(go.Panel, "Table",
        $(go.TextBlock, 
            { 
                stroke: 'black', 
                margin: 4, 
                row: 0, 
                column: 0, 
            },
            new go.Binding('text','key')
        ),
        // 报警标志样式模板
        $(go.Shape, "Triangle", 
            { 
                desiredSize: new go.Size(20, 20), 
                stroke: 'black', 
                row: 0, 
                column: 1, 
                margin: 4 
            },
            {
                toolTip:  // 定义节点工具提示
                    $("ToolTip",
                        $(go.TextBlock, { margin: 4 },
                            // 绑定设备的风险信息
                            new go.Binding("text", "riskData")
                         )  
                    )
            },
            new go.Binding('fill', 'color'),
            new go.Binding('visible', '', (data, obj) => {
                const nodeData = obj.part.data;
                return nodeData.riskVisible !== false;
            })
        )
    ),
    // DCS面板
    $(go.Panel, "Table", { row: 1, column: 0 },
        { 
            defaultColumnSeparatorStroke: 'black', 
            defaultRowSeparatorStroke: 'black' 
        },
        new go.Binding('itemArray', 'DCSArray'), 
        {
            itemTemplate: $(go.Panel, "TableRow",
                // 参数名模板
                $(go.TextBlock, 
                    { 
                        stroke: 'black', 
                        margin: 4 
                    },
                    new go.Binding('text', 'name')
                ),
                // value模板
                $(go.TextBlock, 
                    { 
                        stroke: 'black',   
                        column: 1, 
                        margin: 4 
                    },
                    new go.Binding('text', 'value')
                ),
                // 单位模板
                $(go.TextBlock, 
                    {
                        stroke: 'black', 
                        column: 2, 
                        margin: 4,
                    },
                    new go.Binding('text', 'unit')
                ),
                new go.Binding('visible', '', (data, obj) => {
                    const nodeData = obj.part.data;
                    return nodeData.dcsVisible !== false;
                })
            )
        }
    ),
    // 其他内容同DCS面板
  	...
)))
```

#### 信息面板的连接线

信息面板的连接线采用黑色和棕色相间的连接线，具体连接线模板设置如下：

```ts
// 数据面板的连线模板
myDiagram.linkTemplateMap.add('infoPanelLink',
    $(go.Link,
        { 
            selectable: true,
            resegmentable: true,
            routing: go.Routing.Orthogonal, 
            curve: go.Curve.JumpGap, 
            toShortLength: 2, 
            adjusting: go.LinkAdjusting.End 
        },
        new go.Binding("points"),
        $(go.Shape, { isPanelMain: true, strokeWidth: 2, stroke: 'gray' }),
        $(go.Shape, { isPanelMain: true, strokeWidth: 2, stroke: 'black', name: "FLOW", strokeDashArray: [10, 10] }),
    )      
);
```

#### 连接线的类型选择

在信息面板中，从信息面板端口出发/进入的连接线都要使用信息面板连接线，因此需要设置对连接的事件监听，如果连入/连出的面板类型为信息面板，就使用信息面板连线：

```js
// 如果以信息面板端口为终点/起点的连接线，使用infoPanelLink类型的连接线
myDiagram.addDiagramListener("LinkDrawn", function(e: any) {
    var link = e.subject;
    var fromNode = link.fromNode;
    var toNode = link.toNode;
    // 检查连接的起点或终点是否是信息面板
    if ((fromNode && fromNode.category === "infoPanel") || (toNode && toNode.category === "infoPanel")) {
        // 设置连接的类别为 infoPanelLink
        myDiagram.model.set(link.data, "category", "infoPanelLink");
    }
});
```

#### 给设备创建信息面板

通过双击设备，点击创建数据面板按钮，触发创建数据面板函数，为设备添加一个其特有的数据面板，该函数只是简单的实现了设备名称的绑定：

```ts
// 创建设备的数据面板
function addDataPanel(){
    myDiagram.startTransaction("addDataPanel");
    myDiagram.selection.each((node: any) => {
        if (!(node instanceof go.Node)) return;
        const newDataPanel = 
        { 
            key: `${node.data.key}信息面板`, 
            color: "red", 
            portArray: [{portId: "top0", portKey: "top"}, {portId: "left0", portKey: "left"}, {portId: "right0", portKey: "right"}, {portId: "bottom0", portKey: "bottom"}], 
            DCSArray: [{name: "流速", value: "20", unit: "m/s"}, {name: "温度", value: "30", unit: "℃"}], 
            damageArray: [{damageName: "盐酸腐蚀", damageValue: "100%"}], 
            alarmArray: [{alarmName: "警报"}], 
            riskData: "高风险", 
            category: "infoPanel"
        }
        myDiagram.model.addNodeData(newDataPanel);
    });
    myDiagram.commitTransaction("addDataPanel");
}
```

***

### `SVG`节点翻转

节点的翻转分为水平翻转和垂直翻转，翻转和旋转是不同的概念

对于`Geometry`类的几何图形，可以调用其方法`scale`进行控制节点的翻转，其中：

- `Geometry.scale(1, 1)`：表示几何图形节点不翻转，且正常大小显示
- `Geometry.scale(2, 2)`：表示几何图形节点不翻转，且节点大小放大两倍
- `Geometry.scale(-1, 1)`：表示几何图形节点水平翻转，且正常大小显示
- `Geometry.scale(1, -1)`：表示几何图形节点垂直翻转，且正常大小显示

我们可以通过上述的方法进行控制`SVG`节点的翻转，在进行翻转前，需要对节点数据模板进行属性的增加，加入`geometry`属性（`geometry`属性表示几何图形的绘制字符串），同时进行在节点模板上的绑定：

```ts
// 声明geometry的初始字符串数据
var zhaChiGeometry = go.Geometry.parse("XFM88 77.8 0 77.8 0 53.8 88 53.8 136.6 0 181.4 0 181.4 35.3 157.5 35.3 157.5 24.5 136.6 24.5z XM 86.8 70.1 L 141.7 10.2 XM 82.8 66.1 L 137.1 6.4 XM142 8.8B 0 360 139 8.8 3 3 XM87 68.8B 0 360 84 68.8 3 3");

// 模板绑定geometry属性，模板其他部分省略
$(go.Shape, "RoundedRectangle", 
    { 
        geometry: zhaChiGeometry,
        stroke: "black",
        fill: "white",
        strokeWidth: 1.5
    },
    new go.Binding('geometry', 'geometry') // 在节点模板上进行绑定
),
// 这样当geometry属性的翻转信息发生改变，就会作用在对于的模板节点上
```

对于节点数据`nodeDataArray`中`SVG`类型的数据，为了实现翻转效果，本应该添加三个属性：`geometry`，`isHorizontalFlipped`和`isVerticalFlipped`，但是后续发现这些属性可以在设置翻转函数中进行动态的添加，只有这个节点执行翻转动作时，这些属性才会被添加到对应的数据节点中。

`SVG`节点翻转函数：水平翻转函数（垂直翻转函数类似，不再进行说明）：

```ts
// svg节点进行水平翻转
function horizontalFlip() {
    myDiagram.startTransaction('horizontalFlip');
    myDiagram.selection.each((node: any) => {
        if (!(node instanceof go.Node)) return;

        // 获取节点翻转标志，如果一开始没有，则默认为false
        var isHorizontalFlipped = node.data.isHorizontalFlipped || false;
        var isVerticalFlipped = node.data.isVerticalFlipped || false;

        var zhaChiGeometrySample = go.Geometry.parse("XFM88 77.8 0 77.8 0 53.8 88 53.8 136.6 0 181.4 0 181.4 35.3 157.5 35.3 157.5 24.5 136.6 24.5z XM 86.8 70.1 L 141.7 10.2 XM 82.8 66.1 L 137.1 6.4 XM142 8.8B 0 360 139 8.8 3 3 XM87 68.8B 0 360 84 68.8 3 3");
        // 根据翻转标志计算当前翻转状态
        var currentGeometry = zhaChiGeometrySample;
        if (isHorizontalFlipped) {
            currentGeometry = currentGeometry.scale(-1, 1);
        }
        if (isVerticalFlipped) {
            currentGeometry = currentGeometry.scale(1, -1);
        }
        // 翻转几何图形
        var flippedGeometry = currentGeometry.scale(-1, 1);
        myDiagram.model.setDataProperty(node.data, "geometry", flippedGeometry);
        myDiagram.model.setDataProperty(node.data, "isHorizontalFlipped", !isHorizontalFlipped);
    });
    myDiagram.commitTransaction('horizontalFlip');
}
```

***

### 节点旋转后导致端口移动混乱

在项目中，节点上的端口移动是通过其扩展方法`PortShiftingTool`实现的，我们可以通过按住`Shift`键和鼠标移动来控制端口在节点上的位置

但是如果节点旋转后，移动端口将会出现问题，端口的移动不会跟着鼠标移动

所以，需要对扩展代码`PortShiftingTool.ts`进行修改，修改`updateAlignment`函数：

```ts
updateAlignment(): void {
    if (this.port === null || this.port.panel === null) return;
    // 获取最后输入的文档点
    const last = this.diagram.lastInput.documentPoint;
    const main = this.port.panel.findMainElement();
    if (main === null) return;
	
	// 将最后输入的点转换为局部坐标系中的点
    const localPoint = main.getLocalPoint(last);
    const tl = new go.Point(0, 0);
    const br = new go.Point(main.actualBounds.width, main.actualBounds.height);

    const x = Math.max(0, Math.min((localPoint.x - tl.x) / (br.x - tl.x), 1));
    const y = Math.max(0, Math.min((localPoint.y - tl.y) / (br.y - tl.y), 1));
    this.port.alignment = new go.Spot(x, y);
}
```

修改完后，移动旋转后节点的端口，就能使其节点上的端口正常移动

***

### 问题记录

#### 使用`itemArray`导致节点的其他元素消失

使用`itemArry`进行端口数组的绑定后，导致了该节点的其他元素（如节点名称）不显示了，由于替换此数组会导致此面板的所有子对象替换为在 `itemTemplateMap` 中找到的数组中每个特定项的面板副本，所有会导致节点的某些元素消失。

改进方法：将节点的其他元素都放在一个`$(go.Panel, 'Spot',)`中，其简单的结构如下：

```ts
myDiagram.nodeTemplate =
    $(go.Node, "Spot", 
        { 
            resizable: true,
            rotatable: true
        },
        // 端口模板
        new go.Binding('itemArray', 'portArray'), { 
            itemTemplate: $(go.Panel,
                ...
            ),
        },
        // 节点其他的元素
        $(go.Panel, 'Spot',
            $(go.Shape, "RoundedRectangle", 
            { 
                fill: "white",
                strokeWidth: 0
            },
            new go.Binding("fill", "color"),
            ),
            $(go.TextBlock,
                { 
                    margin: 10, 
                    textAlign: 'center', 
                    font: 'bold 14px Segoe UI,sans-serif', 
                    stroke: '#484848', 
                    editable: true,
                    _isNodeLabel: true,
                    cursor: "move" 
                },
                new go.Binding('text', 'key').makeTwoWay(),
            )
            ...
        ),
    ),
```

#### 控制台`bug`报错

##### `Binding error`

```txt
Binding error: TypeError: Cannot read properties of null (reading 'commandHandler') setting target property "visible" on Panel(Auto)#543 with conversion function: function(o) {
            return o.diagram.commandHandler.canRedo();
          }
```

出现问题的代码：`Redo`和`Undo`按钮的出现和隐藏判断时出现问题

```ts
new go.Binding("visible", "", function(o) {
    return o.diagram.commandHandler.canRedo();  
}).ofObject()),
```

这个错误表明在尝试读取 `commandHandler` 属性时，`diagram` 属性为 `null`。这通常发生在绑定评估时，上下文对象 `o` 不是预期的对象。

要解决这个问题，可以在转换函数中添加检查，确保 `o` 和 `o.diagram` 不是 `null` 后再访问 `commandHandler`，需要将代码修改为：

```ts
new go.Binding("visible", "", function(o) {
    if (o && o.diagram) {
        return o.diagram.commandHandler.canRedo();
    }
    return false;
}).ofObject()),
```

##### `Change not within a transaction`

`Change not within a transaction: !d isReadOnly: Diagram "diagramDiv"  old: false  new: true`

原代码：

```ts
// 切换编辑和预览模式
function toggleEditMode() {
    isEditMode.value = !isEditMode.value;
    if (myDiagram) {
        myDiagram.isReadOnly = !isEditMode.value;
        myDiagram.allowEdit = isEditMode.value;
    }
}
```

修改后的代码：

```ts
// 切换编辑和预览模式
function toggleEditMode() {
    myDiagram.startTransaction("changeModel");
    isEditMode.value = !isEditMode.value;
    if (myDiagram) {
        myDiagram.isReadOnly = !isEditMode.value;
        myDiagram.allowEdit = isEditMode.value;
    }
    myDiagram.commitTransaction("changeModel");
}
```

#### 端口隐藏导致连接线错乱

在编辑模式下的界面如下所示，从节点1的上端口连接到节点2的下端口：

![image-20240626160133922](..\assets\image-20240626160133922.png)

在切换到预览模式后，端口会进行隐藏后，但是连接线没有从端口位置进出，而是通过节点1向节点2进行连接

![image-20240626160149702](..\assets\image-20240626160149702.png)

在一开始的时候，在端口模板中是将`visible`属性绑定在主面板上的，切换`visible`属性可能会导致该端口上的连接失效：

```ts
itemTemplate: $(go.Panel,
    {
        portId: "Top",
        fromSpot: go.Spot.Top,
        toSpot: go.Spot.Top,
        fromLinkable: true,
        toLinkable: true,
        cursor: 'pointer',
        alignment: go.Spot.Top,
        visible: true,
    },
    new go.Binding('portId', 'portId'),
    new go.Binging('visible', 'visible'),
)
```

所以后续将端口的`visible`属性绑定到端口的样式属性上，只是单纯的隐藏掉这个端口的样式：

```ts
$(go.Shape, 'Rectangle',
    {
        strokeWidth: 1,
        desiredSize: new go.Size(6, 6),
    },
    new go.Binding('visible', 'visible'),
)
```

经过上述修改后，在预览模式下，端口隐藏后，其连接线就可以正常显示了

![image-20240626160332811](..\assets\image-20240626160332811.png)

#### 预览模式切换回编辑模式时连线路径变化

在编辑模式中改变连接线的位置形态，如下图所示：

![image-20240626164411643](..\assets\image-20240626164411643.png)

切换到预览模式，正常显示：

![image-20240626164443731](..\assets\image-20240626164443731.png)

但是从新切换回编辑模式，连接线的路径就发生了变化，不再按照原路径连接：

![image-20240626164544092](..\assets\image-20240626164544092.png)

经过排查，了解到在 `GoJS `中，默认情况下，链接（`Link`）会尝试使用最短路径进行连接。如果你想要取消这种最短路径连接属性，可以使用不同的路由（`Routing`）策略。

```diff
$(go.Link,
  { 
-    routing:go.Routing.AvoidsNodes,
+    routing: go.Routing.Orthogonal, 
    curve: go.Curve.JumpGap,
    corner: 10,  
    adjusting: go.LinkAdjusting.Stretch, 
    reshapable: true   // 设置连接线的形态是否可以被修改
  },
)
```

修改为`Orthogonal`路由策略后，连接线在从预览模式切换回编辑模式后，其形态不会发生变化：

![image-20240626165013003](..\assets\image-20240626165013003.png)