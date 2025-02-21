## 正则表达式在`MySQL`中的使用

正则表达式是一个数组语言，在`MySQL`中使用可以方便我们进行简单而快速的操作，有了正则表达式，我们可以匹配到任何我们想要的内容和结果

- 查看班级表单名称字段中第二个字母是`h`的记录：

  `select * from class where cname REGEXP '^.h';`

- 查看班级表中的介绍字段中包括`php`和`mysql`内容的记录：

  `select * from class where description REGEXP 'php|mysql';`