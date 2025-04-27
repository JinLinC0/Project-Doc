## `IO`流

### 文件

文件的概念：是用于保存数据的地方，如经常使用的`word`文档，`txt`文档等。文件既可以保存一张图片，也可以保存视频，声音等

#### 文件流

文件在程序中是以流的形式来操作的

![image-20250425153439580](..\assets\image-20250425153439580.png)

流：数据在数据源（文件）和程序（内存）之间经历的路径

输入流：数据从数据源（文件）到程序（内存）的路径

输出流：数据从程序（内存）到数据源（文件）的路径

输入流和输出流是针对内存而言的，到内存的为输入流，出内存的为输出流

#### 常用的文件操作

`File`文件类的继承关系：

![image-20250425154806581](..\assets\image-20250425154806581.png)

##### 创建文件

创建文件对象相关的构造器方法：

- `new File(String filePath)`：根据路径构建一个`File`对象
- `new File(File parent, String child)`：根据父目录文件+子路径构建一个`File`对象
- `new File(String parent, String child)`：根据父目录+子路径构建一个`File`对象

创建文件代码实现：

```java
public class FileAdd {
    public static void main(String[] args) {
        
    }
    // 方式一：通过new File(String pathname)构造器创建文件
    public void create01() {
        String filePath = "d:\\news.txt";    // 路径的分隔符使用/也是可以的
        File file = new File(filePath);  // 实例化文件对象  这里只是在内存中创建一个文件对象
        try {
            // 调用createNewFile()方法创建文件，输出信息流，在磁盘中写入文件
            file.createNewFile();  
            System.out.println("文件创建成功");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    // 方式二：通过new File(File parent, String child)构造器创建文件
    public void create02() {
        File parentFile = new File("d:\\");
        String fileName = "news.txt";
        File file = new File(parentFile, fileName);  // 实例化文件对象
        try {
            file.createNewFile();  // 调用createNewFile()方法创建文件
            System.out.println("文件创建成功");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    // 方式三：通过new File(String parent, String child)构造器创建文件
    public void create03() {
        String parentPath = "d:\\";
        String filePath = "news.txt";
        File file = new File(parentPath, filePath);  // 实例化文件对象
        try {
            file.createNewFile();  // 调用createNewFile()方法创建文件
            System.out.println("文件创建成功");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

##### 获取文件相关信息

首先需要实例化出具体的文件对象：`File file = new File("d:\\news.txt");`

- `getName`：获取文件的名字：`file.getName()`
- `getAbsolutePath`：获取文件的绝对路径
- `getParent`：获取文件的父级目录
- `length`：获取文件的大小（多少个字节）
- `exists`：判断是否存在这个文件
- `isFile`：判断是不是一个文件
- `isDirectory`：判断是不是一个目录

##### 目录的操作

- `mkdir`：创建一级目录

- `mkdirs`：创建多级目录

  ```java
  // 判断d:\\demo\\a\\b目录是否存在，如果存在就提示已经存在，否则就创建
  public void mkdirTest() {
      String dirPath = "d:\\demo\\a\\b";
      File file = new File(dirPath);
      if(file.exists()) {
          System.out.println("目录已经存在");
      } else {
          if(file.mkdirs()) {
              System.out.println("创建成功");
          } else {
              System.out.println("创建失败");
          } 
      }
  }
  ```

##### 删除文件或目录

- `delete`：删除空目录或文件（在`Java`编程中，目录也被当做文件处理）

  目录的删除前通常要判断一下目录或者文件是否存在

  ```java
  // 判断d:\\new.txt文件是否存在，如果存在就删除
  public void del() {
      String filePath = "d:\\new.tex";
      File file = new File(filePath);
      if(file.exists()) {
          if(file.delete()) {
              System.out.println("删除成功");
          } else {
              System.out.println("删除失败");
          }  
      } else {
          System.out.println("该文件不存在");
      }
  }
  ```

***

### `IO`流

`I/O`是`Input/Output`的缩写，`I/O`技术是非常实用的技术，用于处理数据传输，如读/写文件，网络通讯等

在`Java`程序中，对于数据的输入/输出操作以流(`stream`)的方式进行，`java.io`包下提供了各种流类和接口，用于获取不同种类的数据，并通过方法输入或输出数据

- 输入`input`：读取外部数据（磁盘、光盘等存储设备的数据）到程序（内存）中
- 输出`output`：将程序（内存）数据输出到磁盘、光盘等存储设备中

流是用于传输文件的一个中间媒介，流的分类：

- 按操作数据单位不同分：字节流（8`bit`）（一般用于操作二进制文件，操作二进制文件时可以保证文件是无损操作），字符流（按字符）（一般用于操作文本文件，字符流的效率更高一点）
- 按数据流的流向不同分：输入流，输出流
- 按流的角色的不同分：节点流，处理流/包装流

![image-20250426095644680](..\assets\image-20250426095644680.png)

> 字节流分为：字节输入流和字节输出流，对应的顶级父类为`InputStream`和`OutputStream`
>
> 字符流分为：字符输入流和字符输出流，对应的顶级父类为`Reader`和`Writer`
>
> 上述的这些类都是抽象基类，不能直接进行实例化，要去实例化对应的子类对象
>
> `Java`的`IO`流共涉及40多个类，都是从上述4个抽象基类派生的，由这个四个类派生出来的子类名称都是以其父类名作为子类名后缀

#### 字节流

##### `InputStream`

`InputStream`字节输入流作为抽象的基类，其常用的子类如下：

- `InputStream`：字节输入流常用的子类
- `FileInputStream`：字节文件输入流
- `BufferedInputStream`：缓冲字节输入流
- `ObjectInputStream`：对象字节输入流

继承关系如下所示：

![image-20250426101404536](..\assets\image-20250426101404536.png)

###### `FileInputStream`

`FileInputStream`是字节文件输入流（将文件输入到程序（内存）中），其常见的构造方法有：

- `FileInputStream(File file)`：通过打开一个到实际文件的连接来创建一个`FileInputStream`，该文件通过文件系统中的`File`对象`file`指定
- `FileInputStream(FileDescriptor fdObj)`：通过使用文件描述符`fdObj`创建一个`FileInputStream`，该文件描述符表示到文件系统中某个实际文件的现有连接
- `FileInputStream(String name)`：通过打开一个到实际文件的连接来创建一个`FileInputStream`，该文件通过文件系统中的路径`name`指定

`FileInputStream`类常用的方法：

- `available()`：返回下一次对输入流调用的方法可以不受阻塞地从此输入流读取（或跳过）的估计剩余字节数
- `close()`：关闭此文件输入流并释放与此流有关的所有系统资源
- `finalize()`：确保不再引用文件输入流时调用其`close`方法
- `getChannel()`：返回与此文件输入流有关的唯一`FileChannel`对象
- `getFD()`：返回表示到文件系统中实际文件的连接的`FileDescriptor`对象，该文件系统正被此`FileInputStream`使用
- `read()`：从此输入流中读取一个数据字节，如果达到文件的尾部，则返回-1（单个字节的读取，效率比较低）
- `read(byte[] b)`：从此输入流中将最多`b.length`个字节的数据读入一个`byte`数组中（效率相对较高）
- `read(byte[] b. int off, int len)`：从此输入流中将最多`len`个字节的数据读入一个`byte`数组中
- `skip(long n)` ：从输入流中跳过并丢弃`n`个字节的数据

```java
// 读取文件，将文件的内容输出到控制台中
public void readFile01() {
    String filePath = "d:\\new.txt";
    int readData = 0;
    FileInputStream fileInputStream = null;
    try {
        // 创建FileInputStream对象，用于读取文件
        fileInputStream = new FileInputStream(filePath);
        // 如果返回-1，表示文件读取完毕
        while((readData = fileInputStream.read()) != -1) {
            // readData是int，我们在输出的时候要转换成char类型
            // 这种方式是字节流，适合读取二进制文件，读取英文显示正常，但读汉字有乱码（用字符流读取）
            // 同时单个字节的读取方式效率比较低
            System.out.print((char)readData);
        }
    } catch (IOExcetion e) {
        e.printStackTrace();
    } finally {
        // 文件读取完毕后，我们要关闭连接，防止资源浪费
        try {
            fileInputStream.close();
        } catch (IOExcetion e) {
            e.printStackTrace();
        }
    }
}
```

使用单个字节的方式进行读取，效率低，通过`read(byte[] b)`读取方式进行优化：

```java
// 读取文件，将文件的内容输出到控制台中
public void readFile02() {
    String filePath = "d:\\new.txt";
    // 定义字节数组，一次读取8个字节
    byte[] buf = new byte[8];
    int readLen = 0;
    FileInputStream fileInputStream = null;
    try {
        // 创建FileInputStream对象，用于读取文件
        fileInputStream = new FileInputStream(filePath);
        // 如果读取正常，返回的是实际读取的字节数（最多是我们声明的8个，如果不够可以小于8个）
        // 如果返回-1，表示文件读取完毕
        while((readLen = fileInputStream.read(buf)) != -1) {
            System.out.print(new String(buf, 0, readLen));  // 构建字符串显示
        }
    } catch (IOExcetion e) {   // IO异常可以用于处理更多的异常
        e.printStackTrace();
    } finally {
        // 文件读取完毕后，我们要关闭连接，防止资源浪费
        try {
            fileInputStream.close();
        } catch (IOExcetion e) {
            e.printStackTrace();
        }
    }
}
```

***

##### `OutputStream`

`OutputStream`字节输出流作为抽象的基类，其类继承结构如下：

![image-20250426112815170](..\assets\image-20250426112815170.png)

###### `FileOutputStream`

`FileOutputStream`字节输出流，其父类是`OutputStream`，其常见的构造方法有：

- `FileOutputStream(File file)`：创建一个向指定`File`对象表示的文件中写入数据的文件输出流
- `FileOutputStream(File file, boolean append)`：创建一个向指定`File`对象表示的文件中写入数据的文件输出流，如果`append`设置为`true`，就会将新传入的字节流数据追加到文件的末尾，该值默认为`false`，就是将新的内容进行覆盖
- `FileOutputStream(FileDescriptor fdObj)`：创建一个向具有指定名称的文件中写入数据的输出文件流
- `FileOutputStream(String name, boolean append)`：创建一个向具有指定名称的文件中写入数据的输出文件流，如果`append`设置为`true`，就会将新传入的字节流数据追加到文件的末尾，该值默认为`false`，就是将新的内容进行覆盖

`FileOutputStream`类常用的方法：

- `close()`：关闭此文件输出流并释放与此流有关的所有系统资源
- `finalize()`：清理到文件的连接，确保不再引用文件输出流时调用其`close`方法
- `getChannel()`：返回与此文件输出流有关的唯一`FileChannel`对象
- `getFD()`：返回与此流有关的文件描述符
- `write(int b)`：将指定字节写入文件输出流
- `write(byte[] b)`：将`b.length`个字节从指定`byte`数组中写入此文件的输出流中
- `write(byte[] b. int off, int len)`：将指定`byte`数组中从偏移量`off`开始的`len`个字节写入此文件输出流

```java
// 使用字节输出流在new.txt文件中写入 hello,world，如果文件不存在，先创建文件
public void writeFile() {
    String filePath = "d:\\new.txt";
    // 创建文件输出流对象
    FileOutputStream fileOutputStream = null;
    try {
        // 得到FileOutputStream对象
        fileOutputStream = new FileOutputStream(filePath);
        // 写入一个字节的方式
        // fileOutputStream.write('h');  
        // 写入字符串，推荐使用，效率更高
        String str = "hello,world";
        // str.getBytes()方法可以将字符串转化成字节数组
        fileOutputStream.write(str.getBytes());  
        // 使用write(byte[] b. int off, int len)方式进行字符串的写入，指定开始位置和长度
        fileOutputStream.write(str.getBytes(), 0, str.length());  
    } catch (IOExcetion e) {
        e.printStackTrace();
    } finally {
        // 文件写入完毕后，我们要关闭连接，防止资源浪费
        try {
            fileOutputStream.close();
        } catch (IOExcetion e) {
            e.printStackTrace();
        }
    }
}
```

> 使用`new FileOutputStream(filePath)`的方式创建字节输出流的方式每次传入字节数据，都是将新的内容将之前的内容进行覆盖，如果我们不想要将之前的内容进行覆盖，我们可以使用以下的方法进行修改：`new FileOutputStream(filePath, true)`

##### 综合小案例

通过字节输入流和字节输出流完成文件的拷贝

```java
// 思路分析：
// 创建文件的输入流，将文件读入到程序
// 创建文件的输出流，将读取到的文件数据，写入到指定的文件
// 在完成程序时，应该是读取部分数据，就写入到指定文件，这里使用了循环操作
public class FileCopy {
    public static void main(String[] args) {
        // 要读取文件的路径
        String srcFilePath = "d:\\sun.jpg";
        // 目标文件的路径（要拷贝到哪个地方）
        String destFilePath = "c:\\sun.jpg";
        FileInputStream fileInputStream = null;
        FileOutputStream fileOutputStream = null;
        try {
            fileInputStream = new FileInputStream(srcFilePath);
            fileOutputStream = new FileOutputStream(destFilePath);
            // 定义一个字节数据，提高数据的读取效率
            byte[] buf = new byte[1024];
            int readLen = 0;
            while((readLen = fileInputStream.read(buf)) != -1) {
                // 读取到文件后，写入到新的文件中，即边读边写
                fileOutputStream.write(buf, 0, readLen);  // 一定要readLen指定，因为读最后可能会不够数组的长度，导致写入操作出现问题
            }
            System.out.println("拷贝成功");
        } catch (IOExcetion e) {
            e.printStackTrace();
        } finally {
            // 关闭输入流和输出流，防止资源浪费
            try {
                if(fileInputStream != null) {
                    fileInputStream.close();
                }
                if(fileOutputStream != null) {
                    fileOutputStream.close();
                }
            } catch (IOExcetion e) {
                e.printStackTrace();
            }
        }
    }
}
```

#### 字符流

字符流，就是按照字符来操作`IO`，常见的输入字符流和输出字符流有：`FileReader`和`FileWriter`

##### `FileReader`

`FileReader`类是字符输入流，其继承关系图为：

![image-20250426133647298](..\assets\image-20250426133647298.png)

`FileReader`的相关方法：

- 常见的构造器方法：`new FileReader(File/String)`
- `read`：每次读取单个字符（对于汉字，一个字符按三个字节进行读取），返回该字符，如果到文件末尾则返回-1，该方式的效率较高
- `read(char[])`：批量读取多个字符到数组，返回读取到的字符串，如果到文件末尾则返回-1

相关的字符串方法：

- `new String(char[])`：将`char[]`转换成`String`
- `new String(char[], off, len)`：将`char[]`的指定部分转换成`String`

读取文件代码实例：

```java
// 读取文件，将文件的内容输出到控制台中
public void readFile01() {
    String filePath = "d:\\new.txt";
    int data = 0;
    FileReader fileReader = null;
    try {
        // 创建FileReader对象，用于读取文件
        fileReader = new FileReader(filePath);
        // 如果返回-1，表示文件读取完毕
        // 一个一个的读取，效率比较低
        while((data = fileReader.read()) != -1) {
            System.out.print((char)data);
        }
    } catch (IOExcetion e) {
        e.printStackTrace();
    } finally {
        // 文件读取完毕后，我们要关闭连接，防止资源浪费
        try {
            if(fileReader != null) {
                fileReader.close();
            }
        } catch (IOExcetion e) {
            e.printStackTrace();
        }
    }
}

// 使用字符数组来读取文件
public void readFile02() {
    String filePath = "d:\\new.txt";
    int readLen = 0;
    char[] buf = new char[8];   // 设置一次性读取8个长度的字符数组
    FileReader fileReader = null;
    try {
        // 创建FileReader对象，用于读取文件
        fileReader = new FileReader(filePath);
        // 如果返回-1，表示文件读取完毕
        // 循环读取，使用read(buf)，返回的是实际读取到的字符数
        while((readLen = fileReader.read(buf)) != -1) {
            System.out.print(new String(buf, 0, readLen));
        }
    } catch (IOExcetion e) {
        e.printStackTrace();
    } finally {
        // 文件读取完毕后，我们要关闭连接，防止资源浪费
        try {
            if(fileReader != null) {
                fileReader.close();
            }
        } catch (IOExcetion e) {
            e.printStackTrace();
        }
    }
}
```

##### `FileWriter`

`FileWriter`类是字符输出流，其类的常用方法：

- `new FileWriter(File/String)`：覆盖模式，相当于流的指针在首端
- `new FileWriter(File/String, true)`：追加方式，相当于流的指针在尾端
- `write(int)`：写入单个字符
- `write(char[])`：写入指定的数组
- `write(char[], off, len)`：写入指定数组的指定部分
- `write(string)`：写入整个字符串
- `write(string, off, len)`：写入字符串的指定部分

相关`API`：`toCharArry`：将`String`转换成`char[]`

注意：`FileWriter`使用后，必须关闭`close`或者刷新`flush`，否则写入不到指定的文件（只有关闭或者刷新了，才能将内存中的内容写入到指定的文件中）

使用案例：将一段中文写入到一个文件中：

```java
// 使用字符输出流在new.txt文件中写入一句中文，如果文件不存在，先创建文件
public void writeFile() {
    String filePath = "d:\\new.txt";
    // 创建文件输出流对象
    FileWriter fileWriter = null;
    try {
        // 得到FileWriter对象
        fileWriter = new FileWriter(filePath);
        // 写入一个字符的方式
        // fileWriter.write('H');  
        // 写入指定的字符数组，推荐使用，效率更高
        char[] chars = {'a', 'b', 'c'};
        fileWriter.write(chars);  
        // 写入数组，可以指定字符串的写入区域
        fileOutputStream.write("这个是一段中文内容".toCharArray(), 0, 3);  
        // 直接写入整个字符串
        fileOutputStream.write("这个是一段中文内容"); 
        // 写入字符串的某一个部分
        fileOutputStream.write("这个是一段中文内容", 0, 2); 
    } catch (IOExcetion e) {
        e.printStackTrace();
    } finally {
        // 必须关闭close或者刷新flush，才能将真正的数据写入到具体的文件中（不然只是创建了文件，没有将具体的内容写入，这点是非常关键的）
        try {
            // 关闭文件，等价于flush()+关闭操作
            fileWriter.close();  // 使用fileWriter.flush();也是可以将文件写入生效的
        } catch (IOExcetion e) {
            e.printStackTrace();
        }
    }
}
```

#### 节点流和处理流

节点流可以从一个特定的数据源读写数据（文件、数组、管道和字符串等），如`FileReader`、`FileWriter`（对文件进行读和写的）（节点流是比较底层的流，和数据源有直接的对接关系，这种流比较直接，但是功能性不是很强大）

处理流（也叫包装流，对节点流进行包装）是“连接”在已存在流（节点流或处理流）之上，为程序提供更强大的读写功能，而且也更加的灵活，如`BufferedReader`、`BufferedWriter`

```java
// BufferedReader底层源码
public class BufferedReader extends Reader {
    private Reader in;   // BufferedReader类中，有属性Reader属性，即可以封装一个节点流，该节点流可以是任意的，只要是Reader的子类即可，即如果将FileReader放到Reader属性中，我们就可以对文件进行操作，这样就无形的增强了性能
}

// 构造器
BufferedReader(Reader);  // 可以将Reader的子类放进去
```

![image-20250426145916937](..\assets\image-20250426145916937.png)

节点流和处理流的区别和联系：

- 节点流是底层流/低级流，直接跟数据源相接
- 处理流包装节点流，既可以消除不同节点流的实现差异，也可以提供更方便的方法来完成输入输出
- 处理流（也叫包装流）对节点流进行包装，使用了修饰器设计模式，不会直接与数据源相连

处理流的功能主要体现在以下的两个方面：

- 性能的提高：主要以增加缓冲的方式来提高输入输出的效率
- 操作的便捷：处理流可能提供了一系列便捷的方法来一次输入输出大批量的数据，使用更加灵活方便

##### `BufferedReader`

`BufferedReader`处理流类的继承结构如下所示：

![image-20250426155342423](..\assets\image-20250426155342423.png)

`BufferedReader`属于字符流，是按照字符来读取数据的，关闭处理流时，只需要关闭外层流即可（关闭外层的会自动把内层的也关闭了）

```java
// 使用BufferedReader读取文本文件，并显示在控制台
public class BufferedReader_ {
    public static void main(String[] args) throws Exception {
        String filePath = "d:\\new.txt";
        // 创建BufferedReader对象
        BufferedReader bufferedReader = new BufferedReader(new FileReader(filePath));
        // 读取数据
        String line;  // 按行读取，效率高
        // 当返回null时，表示文件读取完毕
        while((line = bufferedReader.readLine()) != null) {
            System.out.println(line);
        }
        
        // 关闭流，这里只需要关闭BufferedReader，因为底层会自动去关闭FileReader节点流（从底层看，关闭的是我们传递进去的节点流对象的close）
        bufferedReader.close();
    }
}
```

##### `BufferedWriter`

```java
// 使用BufferedWriter向文件中写入数据
public class BufferedWriter_ {
    public static void main(String[] args) throws Exception {
        String filePath = "d:\\new.txt";
        // 创建BufferedWriter对象  new FileWriter(filePath, true)表示追加数据模式
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(filePath));
        // 写入数据
        bufferedWriter.write("这是一段数据");
        bufferedWriter.newLine();  // 插入一个和系统相关的换行符
        bufferedWriter.write("这第二段段数据");
        
        // 关闭流，这里只需要关闭BufferedWriter，因为底层会自动去关闭FileWriter节点流（从底层看，关闭的是我们传递进去的节点流对象的close）
        bufferedWriter.close();
    }
}
```

##### `Buffered`文件拷贝

```java
// 使用Buffered进行文件的拷贝
public class BufferedCopy {
    public static void main(String[] args) throws Exception {
        String srcFilePath = "d:\\new.txt";
        String destFilePath = "c:\\new.txt";
        
        // 创建BufferedReader和BufferedWriter对象 
        BufferedReader br = null;
        BufferedWriter bw = null;
        br = new BufferedReader(new FileReader(srcFilePath));
        bw = new BufferedWriter(new FileWriter(destFilePath));
        
        // 读取数据
        String line;  // 按行读取，效率高
        // 当返回null时，表示文件读取完毕
        // readLine()是读取一行的内容，但是没有读取到换行符
        while((line = br.readLine()) != null) {
            // 每读取一行，就写入数据
            bw.write(line);
            bw.newLine();  // 插入一个换行符
        }
        
        // 关闭流，关闭外层的处理流即可
        if(br != null) {
            br.close();
        }
        if(bw != null) {
            bw.close();
        }  
    }
}
```

> `BufferedReader`和`BufferedWriter`是按照字符操作，不要去操作二进制文件，可能会造成文件损坏
>
> 常见的二进制文件有：声音、视频、`doc`和`pdf`等等

##### `BufferedInputStream`

`BufferedInputStream`是字节流，在创建`BufferedInputStream`时，会创建一个内部缓冲区数组，可以将`InputStream`的实现子类赋给`BufferedInputStream`

`BufferedInputStream`类的继承关系图：`InputStream`是之前介绍的抽象类

![image-20250426165106143](..\assets\image-20250426165106143.png)

##### `BufferedOutputStream`

`BufferedOutputStream`是字节流，实现缓冲的输出流，可以将多个字节写入底层输出流中，而不必对每次字节写入调用底层系统，可以将`OutPutStream`的实现子类赋给`BufferedOutputStream`

`BufferedOutputStream`类的继承关系图：

![image-20250426165628902](..\assets\image-20250426165628902.png)

##### 拷贝二进制文件

```java
// 通过BufferedInputStream和BufferedOutputStream来实现二进制文件的拷贝
public class BufferedCopy02 {
    public static void main(String[] args) throws Exception {
        String srcFilePath = "d:\\new.jpg";
        String destFilePath = "c:\\new.jpg";
        
        // 创建BufferedInputStream和BufferedOutputStream对象
        BufferedInputStream bis = null;
        BufferedOutputStream bos = null;
        bis = new BufferedInputStream(new FileInputStream(srcFilePath));
        bos = new BufferedOutputStream(new FileOutputStream(destFilePath));
        
        // 读取数据
        byte[] buff = new byte[1024];   // 通过数组，提高效率
        int readLen = 0;
        // 当返回读取的长度为-1时，表示文件读取完毕
        // readLine()是读取一行的内容，但是没有读取到换行符
        while((readLen = bis.read()) != -1) {
            // 写入数据
            bos.write(buff, 0, readLine);
        }
        
        // 关闭流，关闭外层的处理流即可
        if(bis != null) {
            bis.close();
        }
        if(bos != null) {
            bos.close();
        }  
    }
}
```

> 字节流不仅可以操作二进制文件，同时也可以操作文本文件

##### 对象流

对象流又叫对象处理流，常用的对象流有：`ObjectInputStream`和`ObjectOutputStream`

在开发中，我们希望在保存数据的时候，希望将其数据类型也同时进行保存（之前保存的仅仅是这个值，没有保存类型），如保存`int 100`，从文件读取后也能恢复为`int 100`（保存的是值和其数据类型），对于上述的要求，就是将基本数据类型或者对象进行序列化（将数据类型和其值进行保存）和反序列化操作（将数据类型和其值恢复回来）

序列化和反序列化

- 序列化就是在保存数据时，保存数据的值和数据类型

- 反序列化就是在恢复数据时，恢复数据的值和数据类型

- 需要让某个对象支持序列化机制，则必须让其类是可以序列化的，为了让某个类是可以序列化的，该类必须实现两个接口之一：推荐选择第一个

  - `Serializable`：这是一个标记接口，只有声明形式，里面没有任何方法

    ```java
    // Serializable底层源码
    public interface Serializable {
    }
    ```

  - `Externalizable`：该接口有方法需要实现，一般不推荐使用

对于对象处理流中：`ObjectOutputStream`类提供了序列化功能；`ObjectInputStream`类提供了反序列化功能（但是两个的本质都还是一个处理流，在构造器函数中可以接受`InputStream`或者`OutputStream`的子类，还遵守修饰器模式）

对象处理流使用的注意事项：

- 读写顺序要一致，如果顺序不正确，会抛出异常

- 要求事项序列化或反序列化对象，需要实现`Serializable`接口

- 序列化中的类中建议添加`SerialVersionUID`，为了提高版本的兼容性

  ```java
  class Dog implements Serializable {
      private String name;
      private int age;
      // SerialVersionUID为序列化的版本号，可以提高版本的兼容性
      // 如果类的属性只有name和age，后续又加入了一个属性，如果有序列化的版本号时，系统就会认为该修改是一个版本的修改，而不认为其是一个新的类
      private static final long SerialVersionUID = 1L;
      
      public Dog(String name, int age) {
          this.name = name;
          this.age = age;
      }
  }
  ```

- 序列化对象时，默认将里面所有属性都进行序列化，但除了`static`或`transient`修饰的成员（系统不会进行序列化，在序列化保存信息的时候，不会对上述两种修饰符的属性进行保存，反序列化时读取的值为`null`）

- 序列化对象时，要求里面属性的类型也需要实现序列化接口

  ```java
  class Dog implements Serializable {
      private String name;  // 这里的属性是String类型，系统已经实现了Serializable序列化接口
      private int age;
      // 序列化对象时，要求里面属性的类型也需要实现序列化接口，否则会报错
      private Master master = new Master();
      
      public Dog(String name, int age) {
          this.name = name;
          this.age = age;
      }
  }
  
  // 让Master类也实现序列化接口
  class Master implements Serializable {}
  ```

- 序列化具备可继承性，也就是如果某类已经实现了序列化，则它的所有子类也已经默认实现了序列化

###### `ObjectOutputStream`

我们一般使用`ObjectOutputStream`对象处理流完成数据的序列化

```java
// 将基本数据类型和一个Dog对象(name, age)，保存到data.dat文件中
public class ObjectOutputStream_ {
    public static void main(String[] args) throws Exception {
        // 序列化后，保存的文件格式，不是纯文本，而是按照它的格式来保存
        String filePath = "d:\\data.dat";
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(filePath));
        // 序列化数据到 d:\\data.dat文件中  如果只使用write()方式进行保存，只能保存数据，不能保存类型
        // 对于具体类型的数据，我们要使用相应的方式进行序列化保存
        // int基本数据类型会在底层进行自动装箱为Intege类（Integer类实现了Serializable接口）
        oos.writeInt(100);   
        // boolean基本数据类型在底层进行自动装箱为Boolean类（Boolean类实现了Serializable接口）
        oos.writeBoolean(true);
        // char基本数据类型在底层进行自动装箱为Character类（Character类实现了Serializable接口）
        oos.writeChar('a');
        // double基本数据类型在底层进行自动装箱为Double类（Double类实现了Serializable接口）
        oos.writeDouble(9.5);
        // String类型可以直接使用writeUTF()方式进行序列化操作
        oos.writeUTF("这是一个字符串");
        // 将dog对象进行序列化保存   Dog需要实现Serializable接口才可以进行序列化保存
        oos.writeObject(new Dog("小黑", 8));
        
        // 关闭流，关闭外层流即可，底层会自动关闭FileOutputStream流
        oos.close();
        System.out.println("数据保存完毕，以序列化的形式保存");
    }
}

// 如果需要序列化某个类的对象，需要实现Serializable接口
class Dog implements Serializable {
    private String name;
    private int age;
    
    public Dog(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

> 通过序列化进行数据的保存，可以将数据的值和类型一同进行保存
>
> 序列化保存的时候，数据是按照数据序列化的顺序进行保存的

###### `ObjectInputStream`

我们可以使用`ObjectInputStream`类通过反序化的方式，读取`data.dat`数据并进行反序列化恢复数据

```java
public class ObjectInputStream_ {
    public static void main(String[] args) throws Exception {
        // 指定要反序列化的文件
		String filePath = "d:\\data.dat";
        
        ObjectInputStream ois = new ObjectInputStream(new FileInputStream(filePath));
        
        // 读取（反序列化）的顺序要和保存的数据（序列化）的数据顺序一致，否则会出现异常
        System.out.println(ois.readInt());
        System.out.println(ois.readBoolean());
        System.out.println(ois.readChar());
        System.out.println(ois.readDouble());
        System.out.println(ois.readUTF());
        Object dog = ois.readObject();  // 这里的dog编译类型是Object，运行类型是Dog
        System.out.println(dog);
        
        // 如果我们希望调用Dog的方法，需要向下转型，同时需要将Dog类的定义，放在可以引用的位置，一般是同文件下（序列化文件和反序列化文件在同一个包下），或者将Dog类做成公用的，单独放在一个文件中，使用的时候去引入即可（可以用于序列化文件和反序列化文件在不同的包下）
        Dog dog2 = (Dog)dog; 
        dog2.cry();   // 不会报错
        
        // 关闭流，关闭外层流即可，底层会自动关闭FileInputStream流
        ois.close();
        System.out.println("数据读取完毕，以反序列化的形式读取");
    }
}

// 在反序列化时，要将具体的类写回来，否则会出现无效的类型异常
class Dog implements Serializable {
    private String name;
    private int age;
    
    public Dog(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    @Override
    public String toString() {  // 重写toString方法，用于反序列化展示
        return "Dog{" + "name='" + name + '\'' + "age='" + age + '}';
    }
    
    public void cry() {
        ...
    }
}
```

> 读取（反序列化）的顺序要和保存的数据（序列化）的数据顺序一致

#### 标准输入输出流

- `System.in`：标准输入，类型：`InputStream`，默认设备：键盘

  ```java
  // System.in 的编译类型是InputStream；运行类型是BufferedInputStream（按照包装流的方式进行输入）
  System.out.println(System.in.getClass());  // 查看运行类型
  ```

  具体使用：

  ```java
  Scanner scanner = new Scanner(System.in);
  String next = scanner.next();   // 获取键盘的输入
  ```

- `System.out`：标准输出，类型：`PrintStream`，默认设备：显示器

  ```java
  // System.out 的编译类型是PrintStream；运行类型也是PrintStream
  System.out.println(System.out.getClass());  // 查看运行类型
  ```

  具体使用：

  ```java
  System.out.println("hello");   // 将输出显示在显示器上
  ```

#### 转换流

我们有时会遇到文件乱码的问题，在默认情况下通过字符流读取的文件（包含中文的）应该是`UTF-8`字符集的文件，如果不是`UTF-8`编码的文件，就很有可能出现乱码问题（中文的部分显示乱码），如`gbk`编码，出现了乱码问题的根本是没有指定文件读取的编码方式，但是往往字节流是可以指定编码方式的，而字符流不支持指定编码方式，因此，需要使用转换流，将字节流转换成字符流

转换流就是将一种字节流转换成字符流，常见的有两种方式的转换流：

- `InputStreamReader`，对应着是`Reader`的子类，最重要的构造器方法为：`InputStreamReader(InputStream, Charset)`可以传入字节流的子类（`Charset`表示指定具体的编码）（可以将`InputStream`字节流通过指定的编码转换成（包装成）字符流`Reader`）

- `OutputStreamWriter`，对应着是`Writer`的子类，最重要的构造器方法为：`OutputStreamWriter(OutputStream, Charset)`，可以将`OutputStream`字节流通过指定的编码转换成（包装成）字符流`Writer`

注意事项：

- 当处理纯文本数据时，如果使用字符流效率更高，并且可以有效的解决中文问题，所以建议将字节流转换成字符流
- 可以在使用时指定编码格式，如：`utf-8`、`gbk`、`gb312`、`ISO8859-1`等

```java
// 使用InputStreamReader转换流解决中文乱码问题，将字节流转化成字符流，并指定编码方式
public class InputStreamReader_ {
    public static void main(String[] args) throws Exception {
        String filePath = "d:\\new.txt";
        // 将字节流FileInputStream转换成了字符流InputStreamReader，并指定gbk的编码方式
        InputStreamReader isr = new InputStreamReader(new FileInputStream(filePath), "gbk");
        // 将InputStreamReader传入BufferedReader
        BufferedReader br = new BufferedReader(isr);
        // 读取内容
        String s = br.readLine();
        System.out.println(s);
        
        // 关闭流，关闭外层流即可
        br.close();
    }
}
```

> 大多数情况下会进行简写：
>
> `BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(filePath), "gbk"));`

```java
// 将字节流FileOutputStream转换成字符流OutputStreamWriter，对文件进行写入，编码方式为gbk
public class OutputStreamReader_ {
    public static void main(String[] args) throws Exception {
        String filePath = "d:\\new.txt";
        OutputStreamWriter  osw = new OutputStreamWriter(new FileOutputStream(filePath), "gbk");
        osw.write("hi,写入内容");
        
        // 关闭流，关闭外层流即可
        osw.close();
    }
}
```

#### 打印流

打印流只有输出流，没有输入流，可以将我们指定的信息打印到指定的区域（不仅可以打印到显示上，也可以打印到指定的文件中）

常见的打印流有两种，`PrintStream`和`PrintWriter`，分别对应字节打印流和字符打印流

```java
// 演示PrintStream字节打印流的常用方法
public class PrintStream_ {
    public static void main(String[] args) {
        PrintStream out = System.out;
        // 在默认的情况下，PrintStream 输出数据的位置是标准输出，即显示器
        out.print("hello");
        // 因为print底层使用的是write，所以我们可以直接调用write进行打印输出  out.write("hello");
        
        // 关闭流
        out.close();
        
        // 我们可以去修改打印流输出的位置，将输出放到指定的文件中
        System.setOut(new PrintStream("d:\\new.txt"));
        System.out.println("hello");   // 这句话就会打印到文件中
    }
}
```

```java
// 演示PrintWriter字符打印流的常用方法
public class PrintWriter {
    public static void main(String[] args) {
        // PrintWriter printWriter = new PrintWriter(System.out); // 默认输出，打印到显示器
        // 指定打印输出流输出的位置，将输出打印到指定的文件中
        PrintWriter printWriter = new PrintWriter(new FileWriter("d:\\new.txt"));
        printWriter.print("hi，这是一段文本");  
        // 关闭流
        printWriter.close();   // 关闭或者刷新了，才能将数据真正的写入
    }
}
```

***

### 配置文件

在开发中，我们一般会将重要的内容放到配置文件中，在程序运行的过程中去读取配置文件的内容

如一个数据库的配置文件`mysql.properties`：

```properties
ip=192.168.0.96
user=root
pwd=admin
```

使用传统的方式进行读写，对于大量数据和文件的修改不是很方便，只读一个配置项内容也不是很方便，传统方式会进行循环遍历的读取内容

通常使用`Properties`类进行配置文件的读取是比较方便的

#### `Properties`类

`Properties`类是`Hashtable`类下面的子类，专门用于读写配置文件的集合类，要求配置文件的格式为：`键=值`

（键值对不需要有空格，值不需要用引号括起来，默认类型是`String`）

`Properties`类的常用方法：

- `load`：加载配置文件的键值对到`Properties`对象中
- `list`：将数据显示到指定设备
- `getProperty(key)`：根据键获取值
- `setProperty(key, value)`：设置键值对到`Properties`对象
- `store`：将`Properties`中的键值对存储到配置文件，在`IDEA`中，保存信息到配置文件，如果含有中文，会存储为`unicode`码

##### 读取配置文件

```java
// 使用Properties类来读取mysql.properties文件的配置项
public class Properties01 {
    public static void main(String[] args) throws IOException {
        // 创建Properties对象
        Properties properties = new Properties();
        // 加载配置文件，以字符流的方式进行读取
        properties.load(new FileReader("src\\mysql.properties"));
        // 把全部的键值对显示在控制台，做一个标准的输出
        properties.list(System.out);
        
        // 根据key来获取对应的值
        String user = properties.getProperty("user");   // 获取用户名
        System.out.println(user);
    }
}
```

##### 修改/新建配置文件

```java
// 使用Properties类来创建新的配置文件
public class Properties02 {
    public static void main(String[] args) throws IOException {
        // 创建Properties对象
        Properties properties = new Properties();
        // 设置键值对到Properties对象中  setProperty()设置键值对，如果key存在则修改值，不存在就创建
        properties.setProperty("charset", "utf8");
        properties.setProperty("user", "名称");   // 中文保存时，保存的是unicode码值
        properties.setProperty("pwd", "123456");
        // 将键值对存储到配置文件中，不存在则新建这个文件
        // null表示不添加注释，如果添加了字符串注释，会将注释写在配置文件的最上面
        properties.store(new FileOutputStream("src\\mysql2.properties"), null);
    }
}
```

