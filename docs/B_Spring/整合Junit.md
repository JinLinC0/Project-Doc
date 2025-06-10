## 整合`Junit`

原始的`Junit`测试出现的问题：在测试类中，每个测试方法都需要添加两行代码：

```java
ApplicationContext ac = new ClassPathXmlApplicationContext("bean.xml");
IAccountService as = ac.getBean("accountService", IAccountService.class);
```

> 上述两行代码的作用是获取容器，如果不写的话，会提示空指针异常

因此，每次使用`Junit`进行单元测试，都需要加上述两行代码，是比较麻烦的，需要进行整合`Junit`：

- 让`SpringJunit`负责创建`Spring`容器，但是需要将配置文件的名称告知
- 将需要进行测试的`Bean`直接在测试类中进行注入

`Spring`集成`Junit`的步骤：

1. 导入`Spring`集成`Junit`的坐标

   在具体模块的`pom.xml`文件中导入基本的包坐标

   ```xml
   <dependency>
       <groupId>org.springframework</groupId>
       <artifactId>spring-context</artifactId>
       <version>5.0.5.RELEASE</version>
   </dependency>
   <dependency>
   	<groupId>junit</groupId>
       <artifactId>junit</artifactId>
       <version>4.12</version>
       <scpoe>test</scpoe>
   </dependency>
   <!--导入Spring集成Junit的坐标-->
   <dependency>
   	<groupId>org.springframework</groupId>
       <artifactId>spring-test</artifactId>
       <version>5.0.5.RELEASE</version>
   </dependency>
   ```

2. 使用`@Runwith`注解替换原来的运行器（先找`Spring`，再找`Junit`）

3. 使用`@ContextConfiguration`指定配置文件或配置类

4. 使用`@Autowired`注入需要测试的对象

5. 创建测试方法进行测试

   ```java
   package com.jlc.test;
   
   import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
   import org.junit.runner.RunWith;
   import org.springframework.test.ContextConfiguration;
   import com.jlc.service.UserService;
   import org.springframework.beans.factory.annotation.Autowired;
   
   @Runwith(SpringJUnit4ClassRunner.class)
   //@ContextConfiguration("classpath:applicationContext.xml")  // 加载配置文件
   @ContextConfiguration(classes = {SpringConfiguration.class})   // 加载全注解的方式
   public class SpringJunitTest {  // 搭建测试环境，后续测试都可以在这里进行测试
       @Autowired
       private UserService userService;
       
       @Test
       public void test1() {
           userService.save();
       }
   }
   ```

   后续函数方法的测试都可以注入到这个文件中，从而进行相应的功能测试