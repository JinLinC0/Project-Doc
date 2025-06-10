## 相关`API`

```java
// Spring相关的API
ApplicationContext app = new ClassPathXmlApplicationContext(configLocation:"applicationContext.xml");
UserService userService = (UserService) app.getBean(s:"userService");
userService.save();  // 调用save()方法
```

> `ApplicationContext`的继承体系：`ApplicationContext`是一个接口，代表应用上下文，可以通过其实例获得`Spring`容器中的`Bean`对象，`ClassPathXmlApplicationContext`是该接口对应的接口实现，使用多态的方式接收，`ApplicationContext`接口的所有实现类有：
>
> - `ClassPathXmlApplicationContext`：从类的根路径（`resources`文件夹）下加载配置文件
>
>   ```java
>   new ClassPathXmlApplicationContext(configLocation:"applicationContext.xml");
>   ```
>
> - `FileSystemXmlApplicationContext`：从磁盘路径上加载配置文件，配置文件可以在磁盘的任意位置
>
>   ```java
>   new FileSystemXmlApplicationContext(configLocation:"D:\\src\\mian\\resources\\applicationContext.xml");
>   ```
>
> - `AnnotationConfigApplicationContext`：使用注解配置容器对象时，需要使用此类来创建`Spring`容器，从而读取注解

### `getBean()`

`getBean()`的参数有两种方式：

- `getBean("id")`

  如：`UserService userService = (UserService) app.getBean(s:"userService");`

  当参数的数据类型是字符串时，表示根据配置文件中`Bean`的`id`从容器中获得`Bean`实例，返回的是`Object`，需要进行强转

- `getBean(class)`

  如：`UserService userService = app.getBean(UserService.class);`

  当参数的数据类型是`Class`类型时，表示根据类型从容器中匹配`Bean`实例，但是当容器中相同类型的`Bean`有多个时（即`id`不同，`class`的内容相同），则此方法会报错。