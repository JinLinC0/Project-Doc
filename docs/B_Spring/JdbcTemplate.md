## `JdbcTemplate`

`JdbcTemplate`是`spring`框架中提供的一个对象，是对原始繁琐的`Jdbc API`对象的简单封装。`spring`框架为我们提供了很多的操作模板类。例如：操作关系型数据的`JdbcTemplate`和`HibernateTemplate`，操作`nosql`数据库的`RedisTemplate`，操作消息队列的J`msTemplate`等等

`JdbcTemplate`的开发步骤：

1. 在`pom.xml`文件中导入`spring-jdbc`和`spring-tx`（事务相关）坐标

   ```xml
   <dependency>
       <groupId>org.springframework</groupId>
       <artifactId>spring-jdbc</artifactId>
       <version>5.0.5.RELEASE</version>
   </dependency>
   <dependency>
       <groupId>org.springframework</groupId>
       <artifactId>spring-tx</artifactId>
       <version>5.0.5.RELEASE</version>
   </dependency>
   ```

2. 创建数据库表和实体

   创建数据库和数据表，简单创建`account`数据表，其中有字段`name`和`money`

   在项目中创建一个实体，及`Account`对象，在`src/main/java`文件夹中创建：

   ```java
   package com.jlc.domain;
   
   public class Account {
       private String name;
       private double money;
       public String getName() {
           return name;
       }
       public void setName(String name) {
           this.name = name;
       }
       public double getMoney() {
           return monsy;
       }
       public void setMoney(double money) {
           this.money = money;
       }
       public String toString() {
           return "Account{" + "name='" + name + '\'' + ", money=" + money + '}';
       }
   }
   ```

3. 创建`JdbcTemplate`对象（传统的方式进行创建）

   ```java
   package com.jlc.test;
   
   import org.junit.Test;
   import org.springframework.jdbc.core.JdbcTemplate;
   
   public class JdbcTemplateTest throws Exception {
       @Test
       // 测试JdbcTemplate的开发步骤
       public void test() {
           // 创建数据源对象
           ComboPooledDataSource dataSource = new ComboPooledDataSource();
           dataSource.setDriverClass("com.mysql.jdbc.Driver");
           dataSource,setJdbcUrl("jdbc:mysql://localhost:3306/test");
           dataSource.setuser("root");
           dataSource.setPassword("admin");
           // 创建JdbcTemplate对象
           JdbcTemplate jdbcTemplate = new JdbcTemplate();
           // 设置数据源对象
           jdbcTemplate.setDataSource(dataSource);
           // 执行数据库操作
           int row = jdbcTemplate.update("insert into account value(?,?)", "jlc", 1000);
       }
   }
   ```

   通过`Spring`进行创建`JdbcTemplate`对象，我们将`DataSource`和`JdbcTemplate`的创建权交给`Spring`，在`Spring`容器内部将数据源`DataSource`注入到`JdbcTemplate`模板对象中，`Spring`配置文件`applicationContext.xml`的内容为：

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <beans xmlns="http://www.springframework.org/schema/beans"
   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   xmlns:context="http://www.springframework.org/schema/context"
   xsi:schemaLocation="http://www.springframework.org/schema/beans
   http://www.springframework.org/schema/beans/spring-beans.xsd
   http://www.springframework.org/schema/context
   http://www.springframework.org/schema/context/spring-context.xsd">
       
       <!--加载jdbc.properties数据库信息配置文件-->
       <context:property-placeholder location="classpath:jdbc.properties"/>
   	<!-- 数据源DataSource-->
       <bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
           <property name="driverClass" value="${jdbc.driver}"></property>
           <property name="jdbcUrl" value="${jdbc.url}"></property>
           <property name="user" value="${jdbc.username}"></property>
           <property name="password" value="${jdbc.password}"></property>
       </bean>
       <!--JdbcTemplate-->
       <bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
           <property name="dataSource" ref="dataSource"></property>
       </bean>
       
   </beans>
   ```

   将数据库连接的配置信息抽取到`resources/jdbc.properties`文件中：

   ```properties
   jdbc.driver=com.mysql.jdbc.Driver
   jdbc.url=jdbc:mysql://localhost:3306/test
   jdbc.username=root
   jdbc.password=admin
   ```

   对应的使用文件修改为：

   ```java
   package com.jlc.test;
   
   rt org.junit.Test;
   
   public class JdbcTemplateTest throws Exception {
       @Test
       // 测试Spring去产生JdbcTemplate模板对象
       public void test() {
           ApplicationContext app = new ClassPathXmlApplicationContext(configLocation:"applicationContext.xml");
           JdbcTemplate jdbcTemplate = app.getBean(JdbcTemplate.class);
           // 执行数据库操作
           int row = jdbcTemplate.update("insert into account value(?,?)", "jlc", 1000);
       }
   }
   ```

4. 执行数据库操作

   `JdbcTemplate`模板的常用数据库操作：

   - 添加操作：`jdbcTemplate.update("insert into account value(?,?)", "jlc", 1000);`

   - 修改操作：`jdbcTemplate.update("update account set money=? where name=?", 2000, "jlc");`

   - 删除操作：`jdbcTemplate.update("delete from account where name=?", "jlc");`

   - 查询操作

     - 查询全部

       ```java
       List<Account> accountList = jdbcTemplate.query("select * from account", new BeanPropertyRowMapper<Account>(Account.class));
       ```

     - 查询单个

       ```java
       List<Account> accountList = jdbcTemplate.queryForObject("select * from account where name=?", new BeanPropertyRowMapper<Account>(Account.class), "jlc");
       ```

     - 聚合查询

       ```java
       Long count = jdbcTemplate.queryForObject("select count(*) from account", Long.class);
       ```

       