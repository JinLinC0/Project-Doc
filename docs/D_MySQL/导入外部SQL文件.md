## 导入外部`SQL`文件

有时候，我们会把`sql`语句存储在一个`SQL`文件里面（一般是我们备份出来的`SQL`文件，`SQL`文件是以`.sql`后缀结尾的），如果恢复备份的时候，我们需要导入这些`SQL`文件，相当于把这些`sql`语句重新执行一遍

如我们有一个`mysql`的`SQL`文件，其内容为：

```sql
create database article charset utf8;
show databases;
```

在命令行进行数据库文件的导入：`mysql -uroot -p < mysql.sql`

我们也可以先进入数据库，在通过`source mysql.sql`进行导入

