## 搭建`Django`项目

### 在`ubuntu`上搭建

1. 创建一个`python`的虚拟环境：`python3 -m venv py3-django`

   > 使用系统自带的`venv`创建虚拟环境
   >
   > 执行上述操作后，会在当前的目录下创建一个目录，我们进入目录下的`bin`文件下，我们可以看到里面包含了一些`python`的依赖，以及一些下载的包和环境

2. 进入创建的`python`虚拟环境：`source activate`

   查看当前的虚拟环境下有哪些包：`pip list`

3. 在虚拟环境中安装`Django`框架：`pip install django==2.1.2`

4. 在新的项目目录下创建一个`Django`工程：`django-admin startproject pydjango`

   > 创建项目之前，一定要确保是在虚拟环境之下
   >
   > 创建完后，会在当前的路径下生成一个以项目名命名(`pydjango`)的文件夹，其文件结构如下：
   >
   > ```diff
   > |_manage.py
   > |_pydjango
   > |__settings.py：配置我们的网站基本项的文件
   > |__urls.py：配置我们的网站入口的文件
   > |__wsgi.py：配置我们网站的线上服务的，部署到服务器上使用的
   > ```

5. 在项目目录下（有`manage.py`文件的目录下）创建一个应用：

   `python manage.py startapp app`

   > 创建完之后会在目录下生成一个`app`(应用名)的文件夹，文件夹的目录结构如下：
   >
   > ```diff
   > |_admin.py：配置后台管理系统的配置文件
   > |_apps.py：在settings.py文件中注册子应用的文件
   > |_models.py：数据模型，与数据库交互的文件
   > |_tests.py：做单元测试的文件
   > |_views.py：网站的交互文件，网站中的跳转，登录，支付功能都在该文件中实现，我们在浏览器中设置想要显示的内容，都是需要在views.py文件中编写的，我们需要先创建一个视图函数
   > ```

6. 在`manage.py`文件的路径下启动项目：`python manage.py runserver 0.0.0.0:8000`

7. 在浏览器中输入`localhost:8000`进行查看是否启动成功