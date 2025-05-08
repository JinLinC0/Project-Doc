## `AJAX`

`AJAX`可以不刷新页面更新网页；在页面加载后从服务器请求数据；在页面加载后从服务器接收数据；在后台向服务器发送数据

`AJAX `并非编程语言，仅仅组合了：

- 浏览器内建的 `XMLHttpRequest` 对象（从` web` 服务器请求数据）
- `JavaScript `和` HTML DOM`（显示或使用数据）

`Ajax `允许通过与场景后面的 `Web `服务器交换数据来异步更新网页。这意味着可以更新网页的部分，而不需要重新加载整个页面

***

### `XMLHttpRequest `对象

`XMLHttpRequest` 对象可用于在后台与` Web `服务器交换数据

```js
// 创建 XMLHttpRequest 对象
const xhttp = new XMLHttpRequest();

// 定义回调函数
xhttp.onload = function() {
  // 您可以在这里使用数据
}

// 发送请求
xhttp.open("GET", "ajax_info.txt");
xhttp.send();
```

浏览器不允许跨域访问，网页和它尝试加载的 `XML` 文件必须位于同一台服务器上

#### `XMLHttpRequest `对象方法

|                 方法                  |                             描述                             |
| :-----------------------------------: | :----------------------------------------------------------: |
|        `new XMLHttpRequest()`         |                创建新的` XMLHttpRequest `对象                |
|               `abort()`               |                         取消当前请求                         |
|       `getAllResponseHeaders()`       |                         返回头部信息                         |
|         `getResponseHeader()`         |                      返回特定的头部信息                      |
| `open(method, url, async, user, psw)` | 规定请求 	`method`：请求类型 `GET` 或` POST`； `url`：文件位置 `async`：`true`（异步）或 `false`（同步） `user`：可选的用户名 `psw`：可选的密码 |
|               `send()`                |              向服务器发送请求，用于` GET `请求               |
|            `send(string)`             |              向服务器发送请求，用于 `POST` 请求              |
|         `setRequestHeader()`          |                将标签/值对添加到要发送的标头                 |

#### `XMLHttpRequest` 对象属性

|         属性         |                             描述                             |
| :------------------: | :----------------------------------------------------------: |
|       `onload`       |            定义接收到（加载）请求时要调用的函数。            |
| `onreadystatechange` |        定义当 `readyState` 属性发生变化时调用的函数。        |
|     `readyState`     | 保存 `XMLHttpRequest` 的状态。 	 0：请求未初始化 1：服务器连接已建立 2：请求已收到 3：正在处理请求 4：请求已完成且响应已就绪 |
|    `responseText`    |                  以字符串形式返回响应数据。                  |
|    `responseXML`     |                 以` XML `数据返回响应数据。                  |
|       `status`       | 返回请求的状态号 	 `200: "OK" 403: "Forbidden" 404: "Not Found"` |
|     `statusText`     |         返回状态文本（比如` "OK" `或` "Not Found"`）         |