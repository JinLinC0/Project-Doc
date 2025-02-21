## 自己开发`Docker`镜像

我们可以自己开发一个镜像，并将该镜像上传到远程服务器上，供他人进行下载使用

`Docker`主张每个镜像包含一个服务，但也可以通过开发一个镜像包含多种服务来形成`LAMP`环境

### 配置容器

1. 通过镜像产生一个容器：`docker run -tid -p 8080:80 -p 3309:3306 -v /www:/var/www/html --name web ubuntu /bin/bash`

   其中：

   - `-tid`表示在后台运行
   - `-p 8080:80`表示指定一个端口，将本地的8080端口映射到容器里面的80端口（通过`localhost`访问8080端口时，可以访问到容器内部的80端口）
   - `-p 3309:3306`表示在本地通过命令行或者`MySQL`连接工具需要连接到`MySQL`时，通过本地的3309可以连接到3306
   - `-v /www:/var/www/html`表示挂载点，将本地的`www`挂载映射到远程容器中的`html`中，这样在本地添加的代码会自动放到容器中（因为我们最终运行的环境是在远程的容器中）
   - `--name`表示给容器起一个名字，上式起名为`web`
   - `ubuntu`表示镜像名
   - `/bin/bash`表示我们要登录的`share`

2. 查看是否产生正在运行的容器：`docker ps`

3. 进入到容器当中：`docker exec -ti web /bin/bash`

4. 更新容器中的镜像源和软件：`apt update`

5. 更新软件(将容器内部的软件升级到最新版)：`apt upgrade`

6. 安装相关做镜像的软件：(该docker容器包括`nginx`, `php`, `mysql` 和 `vim`)

   `apt install -y nginx php-fpm mysql-client mysql-sever vim`    其中-y表示强制安装

   过程中会让你选择一个时区，选择对应的地区和时区即可

7. 在容器中配置`nginx`和`php`的连接：

   1. 修改`php`中的配置文件: `vim /etc/php/7.2/fpm/pool.d/www.conf`搜索文件中的连接方式，可以通过`ip`地址连接，可以通过`socket`进行连接，我们需要复制文件中的`/run/php/php7.2-fpm.sock`，之后不保存退出`q！`

   2. 修改`nginx`中的配置文件：`vim /etc/nginx/sites-enabled/default`

      修改为以下的内容：其中将`php`配置文件复制的内容放到这里

8. 启动脚本，可以先看一下`ls /etc/init.d/`位置下的脚本文件

   1. 启动php：`service php7.2-fpm start`

   2. 启动nginx：`service nginx start`

   3. 启动完后就可以在浏览器中进行访问：`localhost:8080`

9. 在容器中进入到`var/www/html`路径下：`cd /var/www/html`

   1. 将`abc`推送到`hd.html`中：`echo 'abc'>hd.html`
   2. `ls`发现路径下多了一个`hd.html`文件
   3. 在网页中访问：`localhost:8080/hd.html`，就会看到网页中出现的`abc`

10. 初始化容器中的`MySQL`

   11. 启动`MySQL`：`server mysql start`

   12. 进行`MySQL`的初始设置：`mysql_secure_installation`

   13. 输入y表示设置密码强度的插件；输入0表示设置密码的低复杂度

   14. 输入新密码，重复新密码，输入y表示使用密码保护，输入y表示移除匿名账号

   15. 输入y表示可以使用远程登陆，后续一路输入y即可

16. 对`MySQL`进行配置

    1. 在`/var/www/html`路径下，打开`MySQL`的配置文件：

       `vim /etc/mysql/mysql.conf.d/mysqld.cnf`

    2. 将`bind-address=127.0.0.1`这一行进行注释，使我们可以通过外部的IP进行连接

    3. 设置允许外部连接的一个登陆账号：

       - `mysql -uroot -p`  输入密码
       - `set global validate_password_policy=LOW`;
       - `grant all privileges on *.* to 'root'@'%' identified by 'admin888';`
       - 重新加载授权表：`FLUSH PRIVILEGES`
       - 退出mysql：`exit`
       - 正常启动`MySQL`：
       - `usermod -d /var/lib/mysql/ mysql`
       - `chown -R mysql:mysql /var/lib/mysql`

***

### 将配置好的容器生成镜像

我们最终需要将镜像推送到远程，我们一般通过容器来生成镜像

我们需要退回到系统环境，而不是在容器环境中配置

1. 提交：`docker commit -m="first commit" -a="jlc" web web:v1`

   - `-m="first commit"`表示提交信息

   - `-a="jlc"`表示作者
   - `web`表示提交容器
   - `web:v1`表示生成的版本号，在版本好前加上docker官网的账号用户名，表示向远程推送，如`jlc/web:v1`，如果不加用户名是没有办法推送到远程的，不加`v1`，会默认生成`latest`的版本
2. 查看生成出的镜像：`docker images`

***

### 镜像的标签操作

通过`docker images`，我们可以看到我们拥有的镜像，其中`TAG`表示镜像的标签，`latest`表示最新的标签

如果我们想要更改标签，可以通过`docker tag 镜像ID 新的镜像名字`，会生成同一个镜像的不同的版本，如果删除这个镜像，其所有的版本都不再存在

如果想要只删除一个版本，可以通过指定版本号进行删除：`docker rmi -f jlc/web:v1`，这样该镜像的另外版本是不受影响的