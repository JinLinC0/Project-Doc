## 基于`Socket`的`UDP`编程

基本介绍：

- `DatagramSocket`和`DtagramPacket`（数据包/报）类实现了基于`UDP`协议网络程序
- `UDP`数据通过数据报套接字`DatagramSocket`发送和接受，系统不保证`UDP`数据报一定能够安全送到目的地，也不确定什么时候可以抵达
- `DtagramPacket`对象封装了`UDP`数据报，在数据报中包含了发送端的`IP`地址和端口号以及接收端的`IP`地址和端口号
- `UDP`协议中每个数据报都给出了完整的地址信息，因此无需建立发送方和接收方的连接

基于`Socket`的`UDP`编程的基本流程：

1. 核心的两个类/对象`DatagramSocket`和`DtagramPacket`
2. 建立发送端和接受端（没有服务端和客户端的概念了）
   1. 在发送数据之前，建立数据包/报，即`DtagramPacket`对象

3. 调用`DatagramSocket`的发送、接收方法
4. 关闭`DatagramSocket`

![image-20250428141557445](..\assets\image-20250428141557445.png)

> 发送端可以变成接收端，接收端也可以变成发送端，没有服务端和客户端的概念了

应用案例：

- 编写一个接收端`A`和一个发送端`B`
- 接收端`A`在9999端口等待接收数据（`receive`）
- 发送端`B`向接收端`A`发送数据`"hello"`
- 接收端`A`接收到发送端`B`发送的数据，回复`“好的”`，再退出
- 发送端接收回复的数据，再退出

接收端`A`的代码实现：

```java
package com.test.udp;

public class UDPReceiverA {
    public static void main(String[] args) throws IOException {
        // 1.创建一个 DatagramSocket 对象，准备在9999端口接收数据
        DatagramSocket socket = new DatagramSocket(9999);
        // 2.创建一个 DtagramPacket 对象，准备接收数据
        byte[] buf = new byte[1024];  // UDP协议传输时一个数据包最大是64k
        DtagramPacket packet = new DtagramPacket(buf, buf.length);
        // 3.调用接收方法，将通过网络传输的DtagramPacket对象填充到空的packet对象中
        System.out.println("接收端A等待接收数据");
        socket.receive(packet);  // 当有数据包发送到本机的9999端口是，就会接收数据，否则就会阻塞
        // 4.把packet进行拆包，取出数据，并显示
        int length = packet.getLength();   // 实际接收到的数据字节长度
        byte[] data = packet.getData();   // 接收到的数据
        String s = new String(data, 0, length);
        System.out.println(s);
        // 5.发送回复给A端
        data = "好的".getBytes();  // 字节数组
        // 传入主机（通过IP地址获取主机）和端口
        packet = new DtagramPacket(data, data.length, InetAddress.getByName("10.20.18.73"), 9998);
        // 6.发送数据
        socket.send(packet);
        // 7.关闭资源
        socket.close();
        System.out.println("A端退出");
    }
}
```

发送端`B`的代码实现：

```java
package com.test.udp;

public class UDPSenderB {
    public static void main(String[] args) throws IOException {
        // 1.创建一个 DatagramSocket 对象，准备在9998端口接收数据（发送端后续也可以变成接收端接收数据）
        DatagramSocket socket = new DatagramSocket(9998);
        // 2.创建一个 DtagramPacket 对象
        byte[] data = "hello".getBytes();  // 字节数组
        // 传入主机（通过IP地址获取主机）和端口
        DtagramPacket packet = new DtagramPacket(data, data.length, InetAddress.getByName("10.20.18.73"), 9999);
        // 3.发送数据
        socket.send(packet);
        // 4.接收回复的数据
        byte[] buf = new byte[1024];  // UDP协议传输时一个数据包最大是64k
        packet = new DtagramPacket(buf, buf.length);
        // 5.调用接收方法，将通过网络传输的DtagramPacket对象填充到空的packet对象中
        socket.receive(packet);  // 当有数据包发送到本机的9999端口是，就会接收数据，否则就会阻塞
        // 6.把packet进行拆包，取出数据，并显示
        int length = packet.getLength();   // 实际接收到的数据字节长度
        data = packet.getData();   // 接收到的数据
        String s = new String(data, 0, length);
        System.out.println(s);
        // 7.关闭资源
        socket.close();
        System.out.println("B端退出");
    }
}
```

