## `Socket`

`Socket`(套接字)编程主要用于实现`Windows`与`Linux`平台间的网络通信，`socket`是对应`TCP/IP`协议的最典型的应用开发接口，它提供了不同主机间进程通信的端点

通信的两端都要有`Socket`，是两台机器间通信的端点

网络通信其实就是`Socket`间的通信

`Socket`允许程序把网络连接当成一个流，数据在两个`Socket`间通过`IO`传输

套接字编程采用客户机/服务器`(C/S)`模式，连接成功后，双方可以进行通信，一般主动发起通信的应用程序为客户端，等待通信请求的为服务端

![image-20250428093823476](..\assets\image-20250428093823476.png)

> `Socket`可以理解为数据通道的两个插头，有其具体的方法去获取输入流和输出流
>
> 应用场景：客户端发送数据，服务端接收并显示在控制台

`Socket`编程有两种编程方式：`TCP`编程（传输可靠）和`UDP`编程

- 创建套接字：`sockfd = socket(domain, type, protocol);`

  > 参数`domain`指定`socket`地址簇类型；`type`为套接字类型；`protocol`指明`socket`请求的协议；`sockfd`为套接字返回的文件描述符

- 绑定套接字与本地地址信息：` bind(sockfd，(struct sockaddr*)&server_addr,sizeof(struct sockaddr));`

  > 将本地主机地址以及端口号与所创建的套接字绑定起来

- 监听连接：`listen(sockfd，backlog);`

  > 此函数表示服务器愿意接收连接，`backlog`指队列中允许的最大排队请求的个数

- 建立连接：`connect(sockfd，(struct sockaddr*) &server_addr，sizeof(struct sockaddr));`

  > `connect`用于建立连接，`server_addr`是保存着服务器IP地址和端口号的数据结构`struct sockaddr`

- 接收连接请求：`accept(sockfd，(struct sockaddr*) &client_addr，sizeof(struct sockaddr));`

  > 用于接收客户机发来的连接请求

- 发送数据：`send(sockfd，msg，len，flags);`

  > 将`len`字节的数据`msg`发送出去，`flags`通常为0

- 接收数据：`recv(sockfd，buf，len，flags);`

  > 从套接字缓冲区`buf`中读取`len`字节长度的数据

- 关闭套接字：`close(sockfd);`