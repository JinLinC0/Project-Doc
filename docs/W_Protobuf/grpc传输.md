## `grpc`传输

### 传输方式

根据不同的业务进行不同的选择

- `unary`单程传输方式：普通的传输方式（和http请求方式差不多）

  客户端发起一个http请求到服务端，服务端进行业务处理，在反应给客户端，这一请求就结束了

- `stream`流的传输方式：保持连接的传输方式，数据可以一直不停的来回传输，但是对服务器的压力较大

  `stream`流传输的三种状态：

  1. 双向：客户端请求服务器端（通过流的传输方式），服务器端返回客户端（通过流的传输方式）

  单向流，服务器端和客户端双方建立了长连接，只是由某一方主动向另一方一直发起流的数据

  2. 单向：客户端请求服务器端（通过流的传输方式），服务器端返回客户端（通过普通的方式，单程）

  3. 单向：客户端请求服务器端（通过普通的方式），服务器端发送给客户端（通过流的传输方式）

***

### `grpc`状态码与返回接收的用法

- 成功的`code`码： `code:0 -> ok`
- 失败的`code`码： `code:1  Canceled`  取消操作，服务端主动去取消连接就显示该码`context.cancel()`
- 失败的`code`码： `code:2  Unknown` 未知错误
- 失败的`code`码： `code:3  InvalidArgument`  客户端传入的参数有误
- 失败的`code`码： `code:4  DeadlineExceeded` 超时，超过了业务逻辑最大的时长
- 失败的`code`码： `code:5  NotFound`  找不到资源，一般是通过数据库找不到对应的数据
- 失败的`code`码： `code:6  AlreadyExists`  资源已存在，比如用户名被占用
- 失败的`code`码： `code:7  PermissionDenied`  没有相关的权限
- 失败的`code`码： `code:8  ResourceExhausted`  资源耗尽
- 失败的`code`码： `code:9  FailedPrecondition`  拒绝操作
- 失败的`code`码： `code:10  Aborted`  终止操作
- 失败的`code`码： `code:11  OutOfRange`  超过有效范围
- 失败的`code`码： `code:12  Unimplemented`  未执行或未支持的操作，比如服务器版本未支持
- 失败的`code`码： `code:13  Internal`  发生了一些不好的意外
- 失败的`code`码： `code:14  Unavailable`  服务不可用
- 失败的`code`码： `code:15  DataLoss`  数据丢失，不可恢复
- 失败的`code`码： `code:16  Unauthenticated`  无有效的认证

服务端设置`code`码代码：

```py
context.set_details('bug')  # 添加错误描述
context.set_code(grpc.StatusCode.DATA_LOSS)  # 设置错误码
raise context  # 抛出异常

# 客户端代码：
try:
  .......
except Exception as e:
  print(e.code().name, e.code().value)
  print(e.details())
```

