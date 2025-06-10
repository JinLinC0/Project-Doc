## `XML`配置解析

`SpringMVC`的`XML`配置文件的解析，该配置文件除了可以配置组件扫描外，还可以配置其他的内容：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:context="http://www.springframework.org/schema/context"
xsi:schemaLocation="http://www.springframework.org/schema/beans
http://www.springframework.org/schema/beans/spring-beans.xsd
http://www.springframework.org/schema/context
http://www.springframework.org/schema/context/spring-context.xsd">
    
	<!-- Controller的组件扫描 -->
    <context:component-scan base-package="com.jlc.controller"/>
    
</beans>
```

> 注解的使用需要配置组件扫描，扫描指定的包
>
> `Spring`和`SpringMVC`要各自扫描各自层的包，`SpringMVC`主要扫描的是`Web`（`Controller`）层的包，其他层的包由`Spring`去进行扫描
>
> ```xml
> <!--扫描方式也可以改写为-->
> <context:component-scan base-package="com.jlc">
>  <context:include-filter type="annotation" expression="org.springframework.stereotype.Controller">
> </context:component-scan>
> ```
>
> `context:include-filter`表示包括（只扫描）；`context:exclude-filter`表示排除（不扫描）

***

### 配置内部资源视图解析器

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:context="http://www.springframework.org/schema/context"
xsi:schemaLocation="http://www.springframework.org/schema/beans
http://www.springframework.org/schema/beans/spring-beans.xsd
http://www.springframework.org/schema/context
http://www.springframework.org/schema/context/spring-context.xsd">
    
	<!-- 配置内部资源视图解析器，配置其前缀和后缀 -->
    <bean id="viewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/jsp/"></property>
        <property name="suffix" value=".jsp"></property>
    </bean>
    
</beans>
```

> 配置完内部资源视图解析器后，我们进行视图跳转时，就可以不需要写前缀和后缀了，直接写视图的文件名
>
> ```java
> @Controller   // 放到Spring容器中
> @RequestMapping("/new")
> public class UserController {
>  @RequestMapping("/quick")  // 请求映射，访问/quick时，就会映射到save()方法
>  public String save() {
>      System.out.println("Controller save running");
>      return "success";
>  }
> }
> ```

