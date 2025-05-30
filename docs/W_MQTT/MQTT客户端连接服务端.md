## `MQTT`客户端连接服务端

`MQTT`客户端连接服务端的基本步骤：

1. 客户端向服务端发送连接请求

   发送请求连接的数据包`CONNECT`（又叫报文，必定包含`clientId`和`cleanSession`和`keepAlive`的数据）

   - `clientId`：客户端的名称，对于同一个服务端所连接的客户端的名称是不能相同的

   - `cleanSession`：布尔型数据（`true`和`false`）告知服务端此客户端是否是重要的客户端显示`false`，重要客户端发送信息时服务端需要发送确认信息来表示收到信息，若没有收到确认信息，服务端会将信息保存在本地，后续不断的发送该信息，确保信息可以被客户端收到

   - `keepAlive`：心跳时间间隔，一般设置60s

     心跳机制：要求每个客户端定时向服务端发送一个心跳信息，告知服务端本客户端还在连接中，其时间间隔就是`keepAlive`

2. 服务端向客户端发送连接确认

   回复数据包`CONNACK`（包含两个数据：`sessionPresent`和`returnCode`）

   - `sessionPresent`：当前会话，服务端告诉客户端有没有保存上次连接发送过去未确认信息（对于重要客户端来讲），`true`表示有

   - `returnCode`：连接返回码，来说明客户端连接的情况，成功连接返回数字0

