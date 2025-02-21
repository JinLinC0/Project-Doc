## `psycopg2`库的增删改查操作

预先通过`Terminal`安装好第三方库：`pip install psycopg2`

`Psycopg2`是一个用于`python`编程语言的第三方库，用于访问`PostgreSQL`数据库系统。它提供了一组工具和方法，可以轻松地在`Python`程序中进行数据库操作，包括查询、插入、更新、删除等操作

使用时需要进行包的导入：`import psycopg2`

### 增操作

```python
# 创建cursor来访问数据库，psycopg2提供了一个cursor类，用来在数据库Session里执行PostgresSQL命令
cur = conn.cursor()

# 通过python为postgresql数据库创建表
# 创建表，本次创建的表是student1，用于存放学生的name，age，class三种信息
cur.execute('''create table student1(id serial primary key, name varchar(10),age int,class int);''')
print("table created successfully!")   # 成功创建表，提示表创建成功

# 插入数据，通过数据库插入数据语句在表中输入相关信息
cur.execute("insert into student1(name,age,class) values('xiaoming',20,3)")
cur.execute("insert into student1(name,age,class) values('xiaohong',21,1)")
cur.execute("insert into student1(name,age,class) values('xiaogang',19,2)")
print("table inserted successfully!")  # 成功输入数据，提示表中数据输入成功

# 查询并打印数据
cur.execute("select * from student1")
rows = cur.fetchall()
print("----------------------------------------------------")
for row in rows:
   print("id=" + str(row[0]) + " name=" + str(row[1]) + " age=" + str(row[2]) + " class=" + str(row[3]))
print("----------------------------------------------------\n")

# 提交事务
conn.commit()

# 关闭连接
conn.close()
```

通过上述代码，完成了`python`通过库`psycopg2`对数据库进行增操作，在与`PostgreSQL`数据库连接后，`python`中表信息的创建可以同步到数据库中

***

### 删操作

```python
# 删除表student1某行的数据，删除部分的python代码
cur.execute("delete from student1 where id=1")
cur.execute("select * from student1")
rows = cur.fetchall()
print("----------------------------------------------------")
for row in rows:
    print('id=' + str(row[0]) + ' name=' + str(row[1]) +' age=' + str(row[2]) + ' class=' + str(row[3]))
print("----------------------------------------------------\n")
```

通过上述代码，完成了`python`通过库`psycopg2`对数据库进行删操作，在与`PostgreSQL`数据库连接后，`python`中表信息的相关删除操作可以同步到数据库中

通过库`psycopg2`对数据库进行删操作还包括删除整个表，其删除表的代码如下：

`cur.execute("drop table student")`

***

### 改操作

```python
# 更新数据，将id为2数据中的age改为23，class改为3，代码如下：
cur.execute("update student1 set age=23,class=3 where id=2")
cur.execute("select * from student1")
rows = cur.fetchall()
print("----------------------------------------------------")
for row in rows:
    print('id=' + str(row[0]) + ' name=' + str(row[1]) + ' age=' + str(row[2]) + ' class=' + str(row[3]))
print("----------------------------------------------------\n")
```

通过上述代码，完成了`python`通过库`psycopg2`对数据库进行改操作，在与`PostgreSQL`数据库连接后，`python`中表信息的相关更改操作可以同步到数据库中

***

### 查操作

```python
# 数据库中的表信息显示在python中，实现一个查找操作，代码如下：
cur.execute("select * from student1")
rows = cur.fetchall()
print("----------------------------------------------------")
for row in rows:
    print('id=' + str(row[0]) + ' name=' + str(row[1]) +' age=' + str(row[2]) + ' class=' + str(row[3]))
print("----------------------------------------------------\n")
```

通过上述代码，完成了`python`通过库`psycopg2`对数据库进行查操作，在与`PostgreSQL`数据库连接后，数据库中的信息可以同步到`python`中