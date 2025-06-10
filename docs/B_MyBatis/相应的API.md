## 相应的`API`

### `SqlSession`工厂构造器相关`API`

#### `SqlSessionFactoryBuilder`

通过加载`mybatis`的核心配置文件的输入流形式构建一个`SqlSessionFactory`对象（`Session`工厂对象）

```java
String resource = "org/mybatis/builder/mybatis-config.xml";  // 这个地址是相对于类加载路径的
InputStream inputStream = Resources.getResourceAsStream(resource);
SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
SqlSessionFactory factory = builder.build(inputStream);
```

> 其中，`Resources`是一个工具类，这个类在`org.apache.ibatis.io`包中。`Resources`类帮助我们从类路径下、文件系统或一个`Web URL`中加载资源文件

***

### `SqlSession`工厂对象相关`API`

`SqlSessionFactory`工厂对象有多个方法创建`SqlSesson`实例，常用的有如下两个：

- `openSession`：会默认开启一个事务，但事务不会自动提交，也就意味着需要手动提交该事务，更新操作数据才会持久化到数据库中

- `openSession(boolean autoCommit)`：参数为是否自动提交，如果设置为`true`，那么不需要手动提交事务

  `openSession(true)`：设置为自动提交事务

***

### `SqlSession`会话对象相关`API`

`SqlSession`实例在`MyBatis`中是非常强大的一个类，涉及到所有的执行语句、提交或回滚事务和获取映射器实例的方法：

- 执行语句的方法有：

  ```java
  <T> T selectOne(String statement, Object parameter)    // 查询一个
  <E> List<E> selectList(String statement, Object parameter)  // 查询所有
  int insert(String statement, Object parameter)   // 插入
  int update(String statement, Object parameter)   // 修改
  int delete(String statement, Object parameter)   // 删除
  ```

- 操作事务的方法有：

  ```java
  void commit()
  void rollback()    
  ```

  