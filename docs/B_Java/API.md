## `API`

`Java`系统官方为我们提供了基本的编程接口（系统提供的类和相关方法）

我们可以去`Java API`文档中快速的查找需要的`API`：[Java 8 中文版 - 在线API手册 - 码工具](https://www.matools.com/api/java8)

### `Java`类的组织形式

![image-20250313203233056](..\assets\image-20250313203233056.png)

我们查询文档的思路是：按照包去查找类，再去查找具体的方法，如果我们不知道这个类在哪个包的下面，我们可以直接进行搜索，找到这个类

***

### 包的概念

包的原理就是创建不同的文件夹\目录来保存类文件

![image-20250330195742103](..\assets\image-20250330195742103.png)

对于相同名称的类，在不同文件夹下是允许的，文件夹就相当于对应一个包

包具有三个主要的作用：

- 区分相同名字的类，放在不同的包下
- 当类很多时，使用包可以很好的管理类
- 包可以访问范围

包的基本语法：

```java
package com.myabc;
```

> - `package`关键字，表示打包
> - `com.myabc`表示包名
>
> 注意事项：
>
> 1. `package`的作用是声明当前类所在的包，需要放在`class`类的最上面，一个类中最多只有一句`package`
> 2. 我们在导入包的时候，`import`命令的位置放在`package`的下面，在类定义前面，可以有多句且没有顺序的要求
>
> ```java
> package com.myabc;
> 
> import java.util.Scanner;
> 
> public class Dog {
>     public static void main(String[] args) {
>         Scanner myScanner = new Scanner(System.in);
>     }
> }
> ```

在不同的包下创建`Dog`类：

在`src`文件夹下建立两个新的文件夹，代表两个不同的包，新建文件夹分别为`com.abc`和`com.efg`

其中`com`表示第一级目录，`abc`和`efg`表示`com`目录下的两个下一级目录

在`abc`文件夹下创建一个`Java Class`类`Dog`，我们只能在`abc`文件夹下创建一个`Dog`类，但是我们可以在`efg`文件夹下创建同名字的类`Dog`

我们后续在其他文件中使用`Dog`类，就需要进行对具体包中的类进行引用，如：

```java
import com.abc.Dog;

public class Test {
    public static void main(String[] args) {
        Dog dog = new Dog();
    }
}
```

如果引入不同包下名称相同的类，系统会在第二个类前面加上包名：

```java
import com.abc.Dog;

public class Test {
    public static void main(String[] args) {
        Dog dog = new Dog();
        com.efg.Dog dog1 = new com.efg.Dog();  // 不会直接引入了，引入会报错
    }
}
```

#### 包的命名

包的命名规则：只能包含数字、字母、下划线、小圆点，但不能用数字开头，不能是关键字和保留字

```java
demo.class.exec1   // 不正确，class是关键字
demo.12a   // 不正确，12a不能以数字开头
demo.ab12.oa   // 正确
```

包的命名规范：一般是小写字母+小圆点，具体而言：`com.公司名.项目名.业务模块名`

如：`com.sina.crm.user`    用户模块

#### 常用的包

一个包下包含很多的类，`Java`中常用的包有：

- `java.lang.*`：`lang`包是基本包，默认引入，不需要额外进行引入
- `java.util.*`：`util`包，系统提供的工具包，工具类，使用`Scanner`
- `java.net.*`：网络包，网络开发
- `java.awt.*`：`Java GUI`界面开发时需要引用的包

#### 包的引入

我们引入一个包的主要目的是要使用该包下面的类，如`import java.util.Scanner;`，引入了`java.util.*`包下面的`Scanner`类

我们也可以将整个包下的所有类都进行引入\导入：`import java.util.*;`  （推荐需要什么再导入什么）

