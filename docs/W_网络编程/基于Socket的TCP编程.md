## 基于`Socket`的`TCP`编程

注意事项：

当客户端连接到服务端后，实际上客户端也是通过一个端口和服务进行通信的，这个端口是`TCP/IP`来分配的（这个端口是不确定的，是随机的）（服务器端的端口是我们进行指定的）

基于`Socket`的`TCP`编程的基本流程图：

![image-20250428094801594](..\assets\image-20250428094801594.png)

***

### 使用字节流进行基于`Socket`的`TCP`编程

要求：

1. 编写一个服务器端和一个客户端
2. 服务器端在9999端口监听
3. 客户端连接到服务器端，发送`"hello, server"`，然后退出
4. 服务器端接收到客户端发送的信息，输出，并退出

基本思路：

![image-20250428095428870](..\assets\image-20250428095428870.png)

服务器端的`Java`代码实现：

```java
package com.test.socket;

public class SocketTCPServer {
    public static void main(String[] args) throws IOException {
        // 1.创建一个Socket对象，并指定端口为9999（要求9999端口是没有被占用的）
        ServerSocket serverSocket = new ServerSocket(9999);
        // 2.监听：如果有客户端连接，则会返回Socket对象，程序继续
        System.out.println("服务端在9999端口监听，等待连接");
        Socket socket = serverSocket.accept();// 如果没有客户端连接，程序会在这里阻塞，后面不会执行
        System.out.println("服务器端socket", socket.getClass());
        // 3.通过socket.getInputStream()读取客户端写入到数据通道的数据，并显示
        InputStream inputStream = socket.getInputStream();
        byte[] buf = new byte[1024];
        int readLen = 0;
        while ((readLen = inputStream.read(buf)) != -1) {
            System.out.println(new String(buf, 0, readLen);
        }
        // 4.关闭流对象和socket
        inputStream.close();
        socket.close();
        serverSocket.close();
        System.out.println("服务器端退出");
    }
}
```

> `serverSocket`和`Socket`的区别：`serverSocket`可以创建很多的`Socket`，只要有一次`accept`就会返回一个`socket `，是服务器端可以满足多个客户端来进行连接

客户端的`Java`代码实现：

```java
package com.test.socket;

public class SocketTCPClient throws IOException {
    public static void main(String[] args) {
        // 1.连接服务器（ip，端口）
        // 连接当前主机InetAddress.getLocalHost()的9999端口，如果连接成功返回Socket对象
        Socket socket = new Socket(InetAddress.getLocalHost(), 9999); // 连接的是本机中的端口
        // 2.连接的是远程的服务器，需要指定具体的IP地址和端口
        // Socket socket = new Socket("110.242.68.3", 9999);
        System.out.println("客户端socket", socket.getClass());
        // 3.连接成功后，通过socket.getOutputStream()得到对象关联的输出流对象
        OutputStream outputStream = socket.getOutputStream();
        // 4.通过输出流，写入数据到数据通道
        outputStream.write("hello, server".getBytes());
        // 5.关闭流对象和socket
        outputStream.close();
        socket.close();
        System.out.println("客户端退出");
    }
}
```

要求：

1. 编写一个服务器端和一个客户端
2. 服务器端在9999端口监听
3. 客户端连接到服务器端，发送`"hello, server"`，并接收服务端发的`”hello, client“`，显示，再退出
4. 服务器端接收到客户端发送的信息，显示，并发送`”hello, client“`，再退出
5. 在数据来回发送时，要设置结束标记，提示对方，本次数据发送已经结束了（防止继续等待导致的阻塞）

服务器端的`Java`代码实现：

```java
package com.test.socket;

public class SocketTCPServer {
    public static void main(String[] args) throws IOException {
        // 1.创建一个Socket对象，并指定端口为9999（要求9999端口是没有被占用的）
        ServerSocket serverSocket = new ServerSocket(9999);
        // 2.监听：如果有客户端连接，则会返回Socket对象，程序继续
        System.out.println("服务端在9999端口监听，等待连接");
        Socket socket = serverSocket.accept();// 如果没有客户端连接，程序会在这里阻塞，后面不会执行
        System.out.println("服务器端socket", socket.getClass());
        // 3.通过socket.getInputStream()读取客户端写入到数据通道的数据，并显示
        InputStream inputStream = socket.getInputStream();
        byte[] buf = new byte[1024];
        int readLen = 0;
        while ((readLen = inputStream.read(buf)) != -1) {
            System.out.println(new String(buf, 0, readLen));
        }
        // 4.获取socket相关联的输出流，写入数据到数据通道
        OutputStream outputStream = socket.getOutputStream();
        outputStream.write("hello, client".getBytes());
        // 设置结束标记
        socket.shutdownOutput();
        // 5.关闭流对象和socket
        inputStream.close();
        outputStream.close();
        socket.close();
        serverSocket.close();
        System.out.println("服务器端退出");
    }
}
```

客户端的`Java`代码实现：

```java
package com.test.socket;

public class SocketTCPClient throws IOException {
    public static void main(String[] args) {
        // 1.连接服务器（ip，端口）
        // 连接当前主机InetAddress.getLocalHost()的9999端口，如果连接成功返回Socket对象
        Socket socket = new Socket(InetAddress.getLocalHost(), 9999); // 连接的是本机中的端口
        // 2.连接的是远程的服务器，需要指定具体的IP地址和端口
        // Socket socket = new Socket("110.242.68.3", 9999);
        System.out.println("客户端socket", socket.getClass());
        // 3.连接成功后，通过socket.getOutputStream()得到对象关联的输出流对象
        OutputStream outputStream = socket.getOutputStream();
        // 4.通过输出流，写入数据到数据通道
        outputStream.write("hello, server".getBytes());
        // 设置结束标记
        socket.shutdownOutput();
        // 5.获取和socket相关联的输入流，读取数据，并显示
        InputStream inputStream = socket.getInputStream();
        byte[] buf = new byte[1024];
        int readLen = 0;
        while ((readLen = inputStream.read(buf)) != -1) {
            System.out.println(new String(buf, 0, readLen));
        }
        // 6.关闭流对象和socket
        inputStream.close();
        outputStream.close();
        socket.close();
        System.out.println("客户端退出");
    }
}
```

***

### 使用字符流进行基于`Socket`的`TCP`编程

要求：使用字符流

1. 编写一个服务器端和一个客户端
2. 服务器端在9999端口监听
3. 客户端连接到服务器端，发送`"hello, server"`，并接收服务端发的`”hello, client“`，显示，再退出
4. 服务器端接收到客户端发送的信息，显示，并发送`”hello, client“`，再退出
5. 在数据来回发送时，要设置结束标记，提示对方，本次数据发送已经结束了（防止继续等待导致的阻塞），写入标记可以使用`socket.shutdownOutput()`的方式，也可以使用`writer.newLine()`的方式（实际上就是输入一个换行符），但是使用该方式需要用`readLine()`的方式进行读取

服务器端的`Java`代码实现：

```java
package com.test.socket;

public class SocketTCPServer {
    public static void main(String[] args) throws IOException {
        // 1.创建一个Socket对象，并指定端口为9999（要求9999端口是没有被占用的）
        ServerSocket serverSocket = new ServerSocket(9999);
        // 2.监听：如果有客户端连接，则会返回Socket对象，程序继续
        System.out.println("服务端在9999端口监听，等待连接");
        Socket socket = serverSocket.accept();// 如果没有客户端连接，程序会在这里阻塞，后面不会执行
        System.out.println("服务器端socket", socket.getClass());
        // 3.通过字符流读取客户端写入到数据通道的数据，并显示
        InputStream inputStream = socket.getInputStream();
        // 使用了转换流，使用InputStreamReader将inputStream转换成字符流
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
        // 从数据通道中获取数据，并输出
        String s = bufferedReader.readLine();
        System.out.println(s);
        // 4.获取socket相关联的输出流，写入数据到数据通道
        OutputStream outputStream = socket.getOutputStream();
        // 使用字符输出流的方式回复信息
        BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(outputStream));
        bufferedWriter.write("hello, client");  // 在数据通道中写入数据
        // 插入一个换行符，表示写入内容结束（要求对方使用readLine()读取，否则是读取不到的）
        bufferedWriter.newLine();   
        bufferedWriter.flush();   // 如果使用字符流，需要手动刷新，否则数据无法进行写入
        // 5.关闭流对象和socket
        bufferedReader.close();  // 关闭外层流
        bufferedWriter.close();  // 关闭外层流
        socket.close();
        serverSocket.close();
        System.out.println("服务器端退出");
    }
}
```

客户端的`Java`代码实现：

```java
package com.test.socket;

public class SocketTCPClient throws IOException {
    public static void main(String[] args) {
        // 1.连接服务器（ip，端口）
        // 连接当前主机InetAddress.getLocalHost()的9999端口，如果连接成功返回Socket对象
        Socket socket = new Socket(InetAddress.getLocalHost(), 9999); // 连接的是本机中的端口
        // 2.连接的是远程的服务器，需要指定具体的IP地址和端口
        // Socket socket = new Socket("110.242.68.3", 9999);
        System.out.println("客户端socket", socket.getClass());
        // 3.连接成功后，通过socket.getOutputStream()得到对象关联的输出流对象
        OutputStream outputStream = socket.getOutputStream();
        // 4.使用字符流来发送数据，将字节流转化为字符流
        BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(outputStream));
        bufferedWriter.write("hello, server");  // 在数据通道中写入数据
        // 插入一个换行符，表示写入内容结束（要求对方使用readLine()读取，否则是读取不到的）
        bufferedWriter.newLine();   
        bufferedWriter.flush();   // 如果使用字符流，需要手动刷新，否则数据无法进行写入
        // 5.获取和socket相关联的输入流，读取数据，并显示
        InputStream inputStream = socket.getInputStream();
        // 使用了转换流，使用InputStreamReader将inputStream转换成字符流
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
        // 从数据通道中获取数据，并输出
        String s = bufferedReader.readLine();
        System.out.println(s);
        // 6.关闭流对象和socket
        bufferedReader.close();  // 关闭外层流
        bufferedWriter.close();  // 关闭外层流
        socket.close();
        System.out.println("客户端退出");
    }
}
```

***

### 网络上传文件

要求：

1. 编写一个服务器端和一个客户端

2. 服务器端在8888端口监听

3. 客户端连接到服务器端，发送一张图片：`d:\\new.png`

4. 服务器端接收到客户端发送的图片，保存到`src`目录下，并发送`”收到图片“`，再退出

5. 客户端接收到服务端发送的`”收到图片“`，再退出

6. 我们直接使用自己写的类`StreamUtils.java`在`package com.test.upload;`包中

   ```java
   import java.io.BufferedReader;
   import java.io.ByteArrayOutputStream;
   import java.io.IOException;
   import java.io.InputStream;
   import java.io.InputStreamReader;
   
   // 该类的功能：
   // 1.将输入流转换为byte[]（即可以把文件的内容读入到byte[]数组中）
   // 2.将输入的InputStream转换成String
   public class StreamUtils {
       public static byte[] streamToByteArray(InputStream is) throws Exception {
           ByteArrayOutputStream bos = new ByteArrayOutputStream();  // 创建输出流对象
           byte[] b = new byte[1024];   // 字节数组
           int len;
           while((len = is.read(b)) != -1) {
               bos.write(b, 0, len);
           }
           // 将bos转成字节数组，就是思路图中的文件字节数组
           byte[] array = bos.toByteArray();
           bos.close();
           return array;
       }
       public static String streamToString(InputStream is) throws Exception {
           BufferedReader reader = new BufferedReader(new InputStreamReader(is));
           StringBuilder builder = new StringBuilder();
           String line;
           while((line = reader.readLine()) != null) {  // 当读取到null时，就表示结束了
               builder.append(line + "\r\n");
           }
           return builder.toString();
       }
   }
   ```

思路图：

![image-20250428111401967](..\assets\image-20250428111401967.png)

服务器端的`Java`代码实现：

```java
package com.test.upload;

public class TCPFileUploadServer {
    public static void main(String[] args) throws IOException {
        // 1.创建一个Socket对象，并指定端口8888（要求8888端口是没有被占用的）
        ServerSocket serverSocket = new ServerSocket(8888);
        // 2.监听：如果有客户端连接，则会返回Socket对象，程序继续
        System.out.println("服务端在8888端口监听，等待连接");
        Socket socket = serverSocket.accept();// 如果没有客户端连接，程序会在这里阻塞，后面不会执行
        System.out.println("服务器端socket", socket.getClass());
        // 3.读取客户端发送的数据
        // 通过Socket得到输入流
        BufferedInputStream bis = new BufferedInputStream(socket.getInputStream());
        byte[] bytes = StreamUtils.streamToByteArray(bis);  // 得到传输过来的bytes数组
        // 将bytes数组写入到指定的路径
        String destFilePath = "src\\new.png";
        BufferedOutputStream bos = new BufferedOutputStream(new FileOutoutStream(destFilePath));
        bos.write(bytes);   // 将字节数组写入到文件中
        // 4.向客户端回复收到图片
        // 通过socket获取到输出流（字符）
        BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(socket.getOutoutStream()));
        writer.write("收到图片");
        writer.flush();  // 把内容刷新到数据通道
        socket.shutdownOutput();  // 设计结束标记
        // 5.关闭流
        writer.close();
        bos.close();
        bis.close();
        socket.close();
        serverSocket.close();
    }
}
```

客户端的`Java`代码实现：

```java
package com.test.upload;

public class TCPFileUploadClient throws IOException {
    public static void main(String[] args) {
        // 1.连接服务器（ip，端口）
        // 连接当前主机InetAddress.getLocalHost()的8888端口，如果连接成功返回Socket对象
        Socket socket = new Socket(InetAddress.getLocalHost(), 8888); // 连接的是本机中的端口
        // 2.连接的是远程的服务器，需要指定具体的IP地址和端口
        // Socket socket = new Socket("110.242.68.3", 9999);
        System.out.println("客户端socket", socket.getClass());
        // 3.连接成功后，创建读取磁盘文件的输入流
        String filePath = "d:\\new.png";
        BufferedInputStream bis = new BufferedInputStream(new FileInputStream(filePath));
        // 使用自定义的工具类StreamUtils，得到图片文件对应的字节数组
        byte[] bytes = StreamUtils.streamToByteArray(bis);
        // 4.通过socket获取到输出流，将bytes数据发送给服务端
        BufferedOutputStream bos = new BufferedOutputStream(socket.getOutputStream());
        bos.write(bytes);  // 将文件对应的字节数组的内容，写入到数据通道
        socket.shutdownOutout();  // 设置写入数据的结束标记
        // 5.接收从服务端回复的消息
        InputStream inputStream = socket.getInputStream();
        // 使用StreamUtilsd的streamToString方法，直接将inputStream读取到的内容转换成字符串
        String s = StreamUtilsd.streamToString(inputStream);
        System.out.println(s);
        // 6.关闭相关的流
        inputStream.close();
        bis.close();
        bos.close();
        socket.close();
    }
}
```

***

### 文件下载

要求：

1. 编写客户端和服务端程序
2. 客户端可以输入一个文件名，服务端收到了文件名后，可以给客户端返回这个文件，如果没有这个文件，返回一个默认的文件即可
3. 客户端收到文件后，保存到本地：`d:\\`
4. 该程序使用自己写的类`StreamUtils.java`

思路分析：

![image-20250428162957006](..\assets\image-20250428162957006.png)

> 客户端发送一个下载文件的请求，服务端收到了这个请求后， 去查找有没有对应的文件内容，如果找到了，直接将文件读到字节数组中，如果没有找到，将默认的文件读到字节数组中，再通过输出流，将字节数组写入到数据通道中，之后，客户端通过`socket`的输入流，得到读入的文件字符数组，最后将其写入到磁盘中

服务器端的`Java`代码实现：

```java
package com.test.download;

public class TCPFileDownloadServer {
    public static void main(String[] args) throws IOException {
        // 1.创建一个Socket对象，并指定端口8888（要求8888端口是没有被占用的）
        ServerSocket serverSocket = new ServerSocket(8888);
        // 2.监听：如果有客户端连接，则会返回Socket对象，程序继续
        System.out.println("服务端在9999端口监听，等待连接");
        Socket socket = serverSocket.accept();// 如果没有客户端连接，程序会在这里阻塞，后面不会执行
        System.out.println("服务器端socket", socket.getClass());
        // 3.读取客户端发送的要下载的文件名
        InputStream inputStream = socket.getInputStream();
        byte[] b = new byte[1024];
        int len = 0;
        String downLoadFileName = "";
        // 这里使用了while循环来读取文件名，是考虑后续客户端发送的数据量较大可以拓展，但文件名的读取可以不使用while循环
        while((len = inputStream.read(b)) != -1) {
            downLoadFileName += new String(b, 0, len);
        }
        System.out.println("客户端希望下载的文件名为：" + downLoadFileName);
        // 将读取的文件名与服务器文件中的文件进行比较
        // 如果客户端要下载的是new.png，我们就返回该文件；否则一律返回no.png文件（默认返回的文件）
        String resFileName = "";
        if("new.png".equals(downLoadFileName)) {
            resFileName = "src:\\new.png";
        } else {
            resFileName = "src:\\no.png";
        }
        // 4.创建一个输入流来读取文件
        BufferedInputStream bis = new BufferedInputStream(new FileInputStream(resFileName));
        // 5.使用工具类StreamUtils的streamToByteArray方法，读取文件到一个字节数组
        byte[] bytes = StreamUtils.streamToByteArray(bis);   // 对应于思路图中的字节数组
        // 6.得到Socket关联的输出流
        BufferedOutputStream bos = new BufferedOutputStream(socket.getOutputStream());
        // 7.写入到数据通道，返回给客户端
        bos.write(bytes);
        socket.shutdownOutput();  // 设置结束标记
        // 8.关闭相关的流
        bis.close();
        inputStream.close();
        socket.close();
        serverSocket.close();
        System.out.println("服务器端退出");
    }
}
```

客户端的`Java`代码实现：

```java
package com.test.download;
import java.util.Scanner;

public class TCPFileDownloadClient throws IOException {
    public static void main(String[] args) {
        // 1.接收用户输入，指定下载文件名
        Scanner scanner = new Scanner(System.in);
        System.out.println("请输入要下载的文件名");
        String downloadFileName = scanner.next();
        // 2.连接服务器（ip，端口）
        // 连接当前主机InetAddress.getLocalHost()的8888端口，如果连接成功返回Socket对象
        Socket socket = new Socket(InetAddress.getLocalHost(), 8888); // 连接的是本机中的端口
        System.out.println("客户端socket", socket.getClass());
        // 3.连接成功后，获取和Socket关联的输出流
        OutputStream outputStream = socket.getOutputStream();
        outputStream.write(downloadFileName.getBytes());  // 向数据通道发送字节流
        socket.shutdownOutout();  // 设置写入数据的结束标记
        // 4.读取服务端返回的文件（字节数组）
        BufferedInputStream bis = new BufferedInputStream(socket.getInputStream());
        byte[] bytes = StreamUtils.streamToByteArray(bis);
        // 5.得到一个输出流，将bytes写入到磁盘文件
        String filePath = "d:\\" + downloadFileName + ".png";
        BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(filePath));
        bos.write(bytes);  // 将数据写入到磁盘
        // 6.关闭相关的流
        outputStream.close();
        bis.close();
        bos.close();
        socket.close();
        System.out.println("客户端退出");
    }
}
```

