## `HTML DOM`

通过 `HTML DOM`（文档对象模型），`JavaScript` 能够访问和改变` HTML` 文档的所有元素

`JavaScript` 能改变/添加/删除页面中的所有 `HTML` 元素和属性，能改变页面中所有的`CSS`样式，能对页面中所有已有的` HTML `事件作出反应，能在页面中创建新的` HTML `事件

`DOM `是一项 `W3C (World Wide Web Consortium) `标准，`DOM `定义了访问文档的标准，是中立于平台和语言的接口，它允许程序和脚本动态地访问、更新文档的内容、结构和样式

`HTML DOM` 是 `HTML` 的标准对象模型和编程接口

`HTML DOM` **方法**是在 `HTML` 元素上执行的动作（如添加或删除` HTML` 元素），`HTML DOM` **属性**是设置或改变的 `HTML` 元素的值（比如改变 `HTML` 元素的内容）

在` DOM` 中，所有` HTML` 元素都被定义为对象，编程界面是每个对象的属性和方法

```html
<html>
<body>

<p id="demo"></p>

<script>
document.getElementById("demo").innerHTML = "Hello World!";
</script>

</body>
</html>
```

如上所示：`getElementById` 是方法，而 `innerHTML` 是属性

`HTML DOM Document` 对象：文档对象代表该网页，访问 `HTML` 页面中的任何元素，那么您总是从访问 `document` 对象开始

### 查找 `HTML` 元素的方法

|          查找`HTML`元素的方法           |             描述             |
| :-------------------------------------: | :--------------------------: |
|     `document.getElementById("id")`     | 使用元素的id来访问对应的元素 |
|  `document.getElementsByTagName(name)`  |     通过标签名来查找元素     |
| `document.getElementsByClassName(name)` |      通过类名来查找元素      |

通过对象选择器查找 `HTML` 对象：

|              属性              |                       描述                        |
| :----------------------------: | :-----------------------------------------------: |
|       `document.anchors`       |      返回拥有 `name` 属性的所有` <a>` 元素。      |
|       `document.applets`       |  返回所有 `<applet>` 元素（`HTML5` 不建议使用）   |
|       `document.baseURI`       |             返回文档的绝对基准 `URI`              |
|        `document.body`         |                返回 `<body>` 元素                 |
|       `document.cookie`        |                返回文档的`cookie`                 |
|       `document.doctype`       |               返回文档的 `doctype`                |
|   `document.documentElement`   |                返回 `<html>` 元素                 |
|    `document.documentMode`     |               返回浏览器使用的模式                |
|     `document.documentURI`     |                 返回文档的` URI`                  |
|       `document.domain`        |               返回文档服务器的域名                |
|      `document.domConfig`      |               废弃。返回` DOM `配置               |
|       `document.embeds`        |              返回所有 `<embed> `元素              |
|        `document.forms`        |              返回所有 `<form>` 元素               |
|        `document.head`         |                返回 `<head>` 元素                 |
|       `document.images`        |               返回所有 `<img>` 元素               |
|   `document.implementation`    |                  返回` DOM `实现                  |
|    `document.inputEncoding`    |             返回文档的编码（字符集）              |
|    `document.lastModified`     |             返回文档更新的日期和时间              |
|        `document.links`        | 返回拥有 `href `属性的所有 `<area>` 和 `<a> `元素 |
|     `document.readyState`      |              返回文档的（加载）状态               |
|      `document.referrer`       |           返回引用的` URI`（链接文档）            |
|       `document.scripts`       |             返回所有 `<script>` 元素              |
| `document.strictErrorChecking` |             返回是否强制执行错误检查              |
|        `document.title`        |                返回 `<title>` 元素                |
|         `document.URL`         |               返回文档的完整 `URL`                |

通过` JavaScript`操作 `HTML` 元素，首先找到这些元素，完成此任务的几种方法：

#### 通过`id`查找` HTML` 元素

`DOM`中查找 `HTML `元素最简单的方法是，使用元素的` id`

```js
// 查找 id="intro" 的元素
var myElement = document.getElementById("intro");
```

如果元素被找到，方法会以对象返回该元素（在` myElement` 中）；如果未找到元素，`myElement` 将包含 `null`

#### 通过标签名查找 `HTML `元素

```js
// 查找所有 <p> 元素
var x = document.getElementsByTagName("p");
```

如果标签元素中有多个`<p>`标签，其返回的x就变成了一个数组对象，，想要获取第一个`<p>`标签的内容，需要对其下标进行索引：`x[0].innerHTML`

#### 通过类名查找 `HTML` 元素

```js
// 包含 class="intro" 的所有元素的列表
var x = document.getElementsByClassName("intro");
```

如果通过类查找到的元素不在一个时，想要获取其内容，需要对其下标进行索引：`x[0].innerHTML`

#### 通过 `CSS `选择器查找` HTML `元素

```js
// 查找 class="intro" 的所有 <p> 元素列表
var x = document.querySelectorAll("p.intro");
```

#### 通过 `HTML` 对象选择器查找 `HTML `对象

```js
// 查找 id="frm1" 的 form 元素，在 forms 集合中，然后显示所有元素值
var x = document.forms["frm1"];
var text = "";
 var i;
for (i = 0; i < x.length; i++) {
    text += x.elements[i].value + "<br>";
}
document.getElementById("demo").innerHTML = text;
// 返回的内容是表单输入的内容和，按钮的文本内容
```

***

### 事件

`HTML` 事件是发生在 `HTML` 元素上的事情，当在 `HTML `页面中使用` JavaScript `时，`JavaScript` 能够“应对”这些事件

`HTML` 事件可以是浏览器或用户做的某些事情，如网页完成加载，字段被修改，按钮被点击等等，`JavaScript `允许在事件被侦测到时执行代码，通过` JavaScript` 代码，`HTML `允许您向` HTML `元素添加事件处理程序

常见的`HTML`事件：完整的`HTML DOM`事件可以参考：[HTML DOM事件](https://www.w3school.com.cn/jsref/dom_obj_event.asp)

|     事件      |              描述              |
| :-----------: | :----------------------------: |
|  `onchange`   |      `HTML` 元素已被改变       |
|   `onclick`   |     用户点击了 `HTML` 元素     |
| `onmouseover` | 用户把鼠标移动到 `HTML` 元素上 |
| `onmouseout`  |   用户把鼠标移开` HTML` 元素   |
|  `onkeydown`  |        用户按下键盘按键        |
|   `onload`    |     浏览器已经完成页面加载     |

```js
// 事件的具体使用形式为：<element event='一些 JavaScript'> element表示html元素，event表示事件
<button onclick='document.getElementById("demo").innerHTML=Date()'>现在的时间是？</button>
// 上述例子中onclick 属性（以及代码）被添加到 <button> 元素
```

***

### 改变 `HTML` 内容

|          方法          |                       描述                        |
| :--------------------: | :-----------------------------------------------: |
| `document.write(text)` | 直接写入`HTML` 输出流（直接在`HTML`网页写入数据） |

修改 `HTML `内容：

```js
document.getElementById(id).innerHTML = new text
```

改变属性的值：一般用于改变元素除id外的其他属性值，如`<img> `元素的 `src` 属性的值

```js
document.getElementById(id).attribute = new value
```

改变 `HTML `样式：

```js
document.getElementById(id).style.property = new style
document.getElementById("p2").style.color = "blue";
```

***

### 常见的属性

|                   属性                   |                             描述                             |
| :--------------------------------------: | :----------------------------------------------------------: |
| `element.innerHTML =  new html content`  | 获取或替换 `HTML` 元素的内容，可用于获取或改变任何 `HTML` 元素，包括 `<html>` 和 `<body>` |
|     `element.attribute = new value`      |                   改变 `HTML` 元素的属性值                   |
| `element.setAttribute(attribute, value)` |                   改变 `HTML `元素的属性值                   |
|   `element.style.property = new style`   |                    改变 `HTML` 元素的样式                    |

***

### `HTML DOM` 事件及事件监听程序

`HTML` 常见的事件的例子：当用户点击鼠标时；当网页加载后；当图像加载后；当鼠标移至元素上时；当输入字段被改变时；当 `HTML `表单被提交时；当用户敲击按键时

|                    事件                     |                             描述                             |
| :-----------------------------------------: | :----------------------------------------------------------: |
| `onmousedown` 和 `onmouseup `以及 `onclick` | 首先当鼠标按钮被点击时，`onmousedown` 事件被触发；然后当鼠标按钮被释放时，`onmouseup` 事件被触发；最后，当鼠标点击完成后，`onclick` 事件被触发 |
|           `onload `和 `onunload`            |          当用户进入后及离开页面时触发的事件（函数）          |
|                 `onchange`                  |             改变输入字段内容时触发的事件（函数）             |
|        `onmouseover` 和 `onmouseout`        |      鼠标移至 `HTML` 元素上或移出时触发某个事件（函数）      |

点击文本改变其内容的两种书写方式：

```html
<!--当事件代码较少时，可以直接放在事件的后面-->
<h1 onclick="this.innerHTML='谢谢！'">请点击此文本！</h1>
<!--如果代码较多时，可以通过引用函数-->
<h1 onclick="changeText(this)">点击此文本！</h1>
<script>
function changeText(id) { 
    id.innerHTML = "Hello:)";
}
</script>
```

也可以在`<script>`中后续添加事件处理方法，其他相关的事件处理方法相同

|                  添加事件处理程序的方法                  |               描述               |
| :------------------------------------------------------: | :------------------------------: |
| `document.getElementById(id).onclick = function(){code}` | 向`onclick` 事件添加事件处理程序 |

```html
<html>
<body>

<p>请点击“试一试”按钮，以执行 displayDate() 函数。</p>
<button id="myBtn">试一试</button>
<p id="demo"></p>

<script>
document.getElementById("myBtn").onclick = displayDate;
function displayDate() {
  document.getElementById("demo").innerHTML = Date();
}
</script>

</body>
</html> 
```

#### 事件监听程序

##### `addEventListener()` 方法

该方法为指定元素指定事件处理程序，并且不会覆盖已有的事件处理程序，可以向一个元素添加多个事件处理程序，能够向任何 `DOM` 对象添加事件处理程序而非仅仅` HTML `元素，例如`window` 对象

`addEventListener()` 方法使我们更容易控制事件如何对冒泡作出反应

语法：`element.addEventListener(event, function, useCapture);`

第一个参数是事件的类型（如鼠标点击，鼠标移动等等）（请勿对事件使用 `"on"` 前缀；请使用` "click"` 代替 `"onclick"`）；第二个参数是事件发生时我们调用的函数；第三个参数是布尔值，指定使用事件冒泡还是事件捕获，此参数是可选的，默认值是 `false`，将使用冒泡传播（最内侧元素的事件会首先被处理，然后是更外侧的），如果该值设置为 `true`，则事件使用捕获传播（最外侧元素的事件会首先被处理，然后是更内侧的）

```js
// 给出了一个具体的使用例子，可以将函数在外部写，之后在进行引用
document.getElementById("myBtn").addEventListener("click", function(){ alert("Hello World!"); });
```

```js
// 向相同元素添加多个事件处理程序：只需在使用一次该方法即可
element.addEventListener("click", myFunction);
element.addEventListener("click", mySecondFunction);
// 也可以向相同元素添加不同事件类型的数据
element.addEventListener("mouseover", myFunction);
element.addEventListener("click", mySecondFunction);
```

使用 `removeEventListener()` 方法删除已通过 `addEventListener()` 方法附加的事件处理程序

语法：`element.removeEventListener(event, function, useCapture);`

***

### `HTML DOM` 导航

通过` HTML DOM`，可以使用节点关系来导航节点树

节点关系：节点树中的节点彼此之间有一定的等级关系，通过（父、子和同胞，`parent`、`child` 以及 `sibling`）来描述这些关系

顶端节点被称为根（根节点）；每个节点都有父节点，除了根（根节点没有父节点）；节点能够拥有一定数量的子；同胞（兄弟或姐妹）指的是拥有相同父的节点

```html
<html>
   <head>
       <title>DOM 教程</title>
   </head>
  <body>
       <h1>DOM 第一课</h1>
       <p>Hello world!</p>
   </body>
</html> 

其中 <html> 是根节点
    <html> 没有父
    <html> 是 <head> 和 <body> 的父
    <head> 是 <html> 的第一个子
    <body> 是 <html> 的最后一个子
    <head> 有一个子：<title>
    <title> 有一个子（文本节点）："DOM 教程"
    <body> 有两个子：<h1> 和 <p>
    <h1> 有一个子："DOM 第一课"
    <p> 有一个子："Hello world!"
    <h1> 和 <p> 是同胞
```

元素节点是不包含文本的，文本节点是包含文本的

#### 节点之间的导航

##### `nodeValue`

```js
// 文本节点的值能够通过节点的 `innerHTML` 属性进行访问
var myTitle = document.getElementById("demo").innerHTML;
// 访问 innerHTML 属性等同于访问首个子节点的 nodeValue
var myTitle = document.getElementById("demo").firstChild.nodeValue;
var myTitle = document.getElementById("demo").childNodes[0].nodeValue;
```

##### `nodeName`

`nodeName` 属性规定节点的名称，总是包含` HTML `元素的大写标签名，以大写返回元素标签的名称

##### `nodeType`

`nodeType` 属性返回节点的类型，`nodeType` 是只读的

#### 添加和修改元素

|                  方法                  |                      描述                      |
| :------------------------------------: | :--------------------------------------------: |
|   `document.createElement(element)`    |                创建` HTML `元素                |
|    `document.createTextNode(text)`     |                创建一个文本节点                |
|           `element.remove()`           |           删除 `HTML` 元素`element`            |
|      `parent.removeChild(child)`       |        删除子节点，删除父节点中的子节点        |
|    `document.appendChild(element)`     | 添加` HTML` 元素，追加新元素作为父的最后一个子 |
| `document.insertBefore(element,child`  |      添加 `HTML `元素，插入到指定元素之前      |
| `document.replaceChild(element,child)` |     替换` HTML `元素，`child`表示被替换的      |

```html
<script>
var para = document.createElement("p");  // 创建了一个新的 <p> 元素
var node = document.createTextNode("这是新文本。");  // 创建了一个文本节点
para.appendChild(node);  // 向 <p> 元素追加这个文本节点

var element = document.getElementById("div1"); // 向已有元素追加这个新元素（找父节点）
element.appendChild(para);  // 向父节点追加这个新元素，作为最后一个子
// 也可以通过以下的方法将这个新元素，插入到指定元素之前
var child = document.getElementById("p1");
element.insertBefore(para,child);
</script>
```

```js
// 找到要删除的子节点，并使用其 parentNode 属性找到父节点
const child = document.getElementById("p1");
child.parentNode.removeChild(child);
```

***

### `HTML DOM` 集合

`getElementsByTagName()` 方法返回 `HTMLCollection` 对象（类数组的 `HTML` 元素列表（集合））

`NodeList `对象是从文档中提取的节点列表（集合），与 `HTMLCollection` 对象几乎相同

`querySelectorAll()` 方法返回` NodeList` 对象

```html
<html>
<body>

<h1>JavaScript HTML DOM</h1>
<p>Hello World!</p>
<p>Hello China!</p>
<p id="demo"></p>

<script>
var myCollection = document.getElementsByTagName("p");
document.getElementById("demo").innerHTML =
"第二段的 innerHTML 是：" +
myCollection[1].innerHTML;
</script>

</body>
</html>
```

`length` 属性定义了 `HTMLCollection` 中元素的数量，`length` 属性在您需要遍历集合中元素时是有用的

```js
// 改变所有标签<p>的背景颜色
function myFunction() {
  var myCollection = document.getElementsByTagName("p");
  var i;
  for (i = 0; i < myCollection.length; i++) {
    myCollection[i].style.color = "red";
  }
}
```

***

### 表单验证

`HTML` 表单验证可以通过 `JavaScript `完成

#### 约束验证` HTML input` 属性

|    属性    |            描述             |
| :--------: | :-------------------------: |
| `disabled` |   规定应禁用` input `元素   |
|   `max`    | 规定 `input` 元素的最大值。 |
|   `min`    |  规定` input `元素的最小值  |
| `pattern`  |  规定 `input `元素的值模式  |
| `required` |    规定` input`字段必填     |
|   `type`   |   规定 `input` 元素的类型   |

#### 约束验证 `CSS` 伪选择器

|   选择器    |                    描述                     |
| :---------: | :-----------------------------------------: |
| `:disabled` | 选择规定了` "disabled" `属性的` input` 元素 |
| `:invalid`  |         选择有无效值的` input` 元素         |
| `:optional` | 选择未规定` "required" `属性的`input `元素  |
| `:required` | 选择规定了 `"required"` 属性的` input `元素 |
|  `:valid`   |        选择具有有效值的` input` 元素        |

表单内容为空时，进行警告弹出：

```html
<!DOCTYPE html>
<html>
<head>
<script>
function validateForm() {
  let x = document.forms["myForm"]["fname"].value;
  if (x == "") {
    alert("Name must be filled out");
    return false;
  }
}
</script>
</head>
<body>

<h1>JavaScript 验证</h1>

<form name="myForm" action="/demo/html/action_page.php" onsubmit="return validateForm()" method="post">
  Name: <input type="text" name="fname">
  <input type="submit" value="Submit">
</form>

</body>
</html>
```

