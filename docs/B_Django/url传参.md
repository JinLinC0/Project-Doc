## `url`传参

### `url`中的参数设置

在`Django`中有两种的`url`的传参方式：

- 在`url`后边用`?`开始，键与值用等号连接，每对键值用`&`号进行区分，如：`http://localhost:8000/index?name=jlc&age=24`

  > 这种方式就是在`url`中进行参数的传递，其传递的值会传递到我们的服务器上面去（通过浏览器传递了`name`和`age`参数给我们的网站后台）

  在`url`中设置参数，我们需要在`views.py`文件中进行参数的配置：

  ```py
  from django.shortcuts import render
  from django.http import HttpResponse  # 专门去返回一些字符串的包
  
  # 创建视图函数
  def index(request):
      name = request.GET.get('name', '')
      age = request.GET.get('age', 10)   # 设置了默认值为10
      # 我们需要将传递的值进行一个打印
      print(name, age)
      return HttpResponse('hello django')
  ```

  同时在子路由的`urls.py`也需要进行一定的配置：

  ```py
  from django.urls import path
  from .views import index  # 将视图函数进行导入
  
  urlpatterns = [
      path('index', index),  # 调用index函数
  ]
  ```

  这样，我们在网站中通过`url`传递的参数：

  `http://localhost:8000/index?name=jlc&age=24`就可以传递到后端中了

- 路由传参使用分格符分开，如：

  `http://localhost:8000/index/jlc/24`

  通过这种方式获取`url`传递的参数，我们需要对`views.py`文件中进行以下的配置：

  ```py
  from django.shortcuts import render
  from django.http import HttpResponse  # 专门去返回一些字符串的包
  
  # 创建视图函数
  def index(request, name, age):
      # 我们需要将传递的值进行一个打印
      print(name, age)
      return HttpResponse('hello django')
  ```

  同时在子路由的`urls.py`也需要进行一定的配置：

  ```py
  from django.urls import path
  from .views import index  # 将视图函数进行导入
  
  urlpatterns = [
      # 设置需要传递参数的类型
      path('index/<str:name>/<int:age>', index),  # 调用index函数
  ]
  
  # django的url的变量类型
  # 字符串类型，匹配任何非空字符串，但不包含斜杠：<str:name>
  # 整形，匹配0和正整数：<int:age>
  # 注释类型，后缀或附属等概念：<slug:day>
  # uuid格式的对象:<uuid:uid>   uuid类似的格式是:xxx-xx-xx
  ```

在`url`传参时，建议使用第二种传参方式，第二种传参方式比较简单明了

***

### 视图`View`

视图对应在`Django`中是`views.py`这个文件

视图的工作流程：

1. 用户使用浏览器向网站发送请求，传入一个`request`参数

   我们可以通过`print(dir(request))`来查看`request`有哪些具体的方法

   `request`常见的对象方法有：

   - `request.GET`：获取`url`上以`?`形式的参数
   - `request.POST`：获取`post`提交的数据
   - `request.path`：请求的路径，如：`127.0.0.1/test/1`，这个参数就是`/test/1/`
   - `request.method`：获取请求的方法，如：`get`，`post`
   - `request.COOKIES`：获取请求过来的`cookies`
   - `request.user`：请求的用户对象，可以来判断用户是否登录，并获取用户信息
   - `request.session`：一个既可以读又可以写的类似与字典的对象，表示当前会话
   - `request.META`：一个标准的`python`字典，包含所有的`HTTP`首部，具体的头部信息取决于客户端和服务器，里面保存的都是一些`http`协议

2. 对用户的请求做出相应的处理`handler`

3. 将处理后的数据返回格浏览器，返还一个`response`对象

常用的返回对象：

- `HttpResponse`：可以直接返回一些字符串内容

  导入方式：`from django.http import HttpResponse`

- `render`：将数据在模板中渲染并显示

  导入方式：`from django.shortcuts import render`

- `JsonResponse`：返回一个`json`类型，通常用于与前端进行`ajax`交互

  导入方式：`from django.http import JsonResponse`

视图面向对象的写法：(之前写的都是基于函数的写法，但是通过面向对象类的方法进行编写，对后续扩展更加有利，可阅读性也更强)，小案例：将路由传递过来的参数显示到网页上面去：

```py
from django.views.generic import View  # 导入通用摄图
from django.http import HttpResponse

class Message(View):  # 类继承于View
    def get(self, request):   # 重写类当中的方法
        naem = request.GET.get('name', '')
        age = request.GET.get('age', 10)
        return HttpResponse('My name is {}, age is {}'.format(name,age))
```

同时在子路由的`urls.py`也需要进行一定的配置：

```py
from django.urls import path
from .views import Message  # 将视图函数进行导入

urlpatterns = [
    path('message', Message,as_view()),
]
```

在网址上输入`url`：`http://localhost:8000/message?name=jlc&age=24`回车后，在网页上就会渲染以下的字符串：`My name is jlc, age is 24`

***

### `restful`规范

`restful`：`url`定位资源，通过一个`url`地址可以让我们知道这个地址所要提供的功能是什么，如：`127.0.0.1/add/user`我们可以看出这个`url`要做的是添加一个用户

目前的网站的架构是前后端分离的，浏览器一开始先去访问前端服务器，前端的服务器接收到用户的请求后，会继续访问后端的服务器（网站服务器），如用户发送了一个`get`请求给前端服务器，前端服务器会发送一个`http`请求给后端，内容为`get user 1`，后端服务器会访问我们的数据库`sql`，目前，后端服务器只需要提供给前端服务器`API`(数据接口)，一开始存在`API`定义的方式不统一，不利于前端的使用，后面推出了`restful`规范，这个规则是提供给前端工程师去看的，有了这个规范，方便前端工程师去调用接口

#### `restful`常用的方法

- `Get`：获取资源的使用，如查看一个网页
- `Post`：提交资源的使用，如注册一个用户提交的内容
- `Put`：修改资源，如用户修改自己的基本信息
- `Delete`：删除资源，如用户注销账号

***

### 模板`Template`

`Template`模板可以动态的生成`HTML`网页，包括部分`html`代码和特殊的语法

一般`Template`模板存放在`templates`目录（该目录与`manage.py`同级）中，通过在项目的`Settings`的`TEMPLATES`的`DIRS`列表中添加对应的路径即可，如：`os.path.join(BASE_DIR, 'TEMPLATES')`

#### `Template`与视图的绑定

我们在`tempaltes`的文件夹下创建一个`index.html`的文件，文件的内容如下：

```html
<!DOCT html>
<html lang="en">
<head>
	<meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <h1>hello django</h1>
</body>
</html>
```

在应用文件里的`views.py`进行绑定：

```py
from django.shortcuts import render  # render的主要功能是返回一个html页面
from django.views.generic import View

class Index(View):
    def get(self, request):
        # 绑定视图
        return render(request, 'index.html')
```

在应用文件的子路由中进行绑定：

```py
from django.urls import path
from .views import Index  # 将视图函数进行导入

urlpatterns = [
    path('', Index,as_view()),
]
```

在项目文件的根路由中将子路由绑定进来：

```py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('app.urls')),
]
```

这样就能加载`index.html`文件中的内容了

#### `Template`展示渲染的数据

在`html`中以`{{ }}`为标示，在双括号中传入视图中传入的数据

在`html`中渲染一个用户传入过来的值：

我们在`tempaltes`的文件夹下创建一个`index.html`的文件，文件的内容如下：

```html
<!DOCT html>
<html lang="en">
<head>
	<meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <h1>hello {{ name }}</h1>
</body>
</html>
```

在应用文件里的`views.py`进行绑定：

```py
from django.shortcuts import render  # render的主要功能是返回一个html页面
from django.views.generic import View

class Index(View):
    def get(self, request, name):
        # 绑定视图
        return render(request, 'index.html', {'name': name})
```

在应用文件的子路由中进行绑定：

```py
from django.urls import path
from .views import Index  # 将视图函数进行导入

urlpatterns = [
    path('<str:name>', Index,as_view()),
]
```

在项目文件的根路由中将子路由绑定进来：与之前步骤一致

这样我们在`url`中输入`localhost:8000/jlc`，传入的值就会渲染到`html`页面中，在网页中进行展示，实现了在页面中进行传参

#### 变量与标签

变量：使用`{{ }}`进行包裹，我们后端渲染过来的数据，用双大括号来包裹，如：`{{name}}`

内置标签：用`{% %}`大括号，左右各一个百分号包裹，常见的内置标签有：

```txt
{% for %}  {% endfor %} 遍历输出的内容，前面部分表示开始循环，后面部分表示结束循环
{% if %}  {% elif %}  {% endif %}  对变量进行条件判断
{% url name args %}   引用路由配置名
{% load %}  加载django的标签库  如加载静态库：{% load static %}

{% static static_path %}   读取静态资源
{% extends base_template %}   模板继承
{% block data %}   {% endblock %}  重写父模板的代码
{% csrf_token %}  跨域密钥，一般在表单（form）中使用
```

#### `for`标签模板

```txt
forloop.counter     从1开始计算获取当前索引
forloop.counter0    从0开始计算获取当前索引
forloop.revcounter  索引从最大数递减到1
forloop.revcounter0 索引从最大数递减到0
forloop.first       当前元素是否是第一个
forloop.last        当前元素是否为最后一个
empty               为空的情况
```

变量与标签的简单使用：

在应用文件里的`views.py`进行变量的声明和传递：

```py
from django.shortcuts import render  # render的主要功能是返回一个html页面
from django.views.generic import View

class Index(View):
    def get(self, request):
        list_data = range(3)
        # 绑定视图
        return render(request, 'index.html', {'list_data': list_data})
```

在`index.html`的文件中使用传递过来的列表数据，我们可以对其做循环：

```html
<!DOCT html>
<html lang="en">
<head>
	<meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    {% for item in list_data %}
    	<li>{{ item }} -- {{ forloop.counter }} -- {{ forloop.counter0 }} -- {{ forloop.revcounter }} -- {{ forloop.revcounter0 }}</li>
    
    	{% if forloop.first %}
    		this is first
    	{% elif forloop.last %}
    		this is last
    	{% endif %}
    	
    	{% empty %}
    		当前列表没有元素
    {% endfor %}
</body>
</html>
```

在应用文件的子路由中进行绑定：

```py
from django.urls import path
from .views import Index  # 将视图函数进行导入

urlpatterns = [
    path('', Index,as_view()),
]
```

在项目文件的根路由中将子路由绑定进来：

```py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('app.urls')),
]
```

在浏览器中的结果显示为：

```txt
0 -- 1 -- 0 -- 3 -- 2
this is first
1 -- 2 -- 1 -- 2 -- 1
2 -- 3 -- 2 -- 1 -- 0
this is last
```

#### 静态文件的配置

静态文件：`CSS`样式文件，`Javascript`文件，`Image`图片文件

在`templates`文件夹下，一般只是存放`.html`的文件，静态文件不会存放在这个地方，需要在项目的根目录下创建`static`文件夹（与`templates`文件夹同级），用来存放静态文件

同时在`settings.py`文件中进行相关的配置（需要在`settings.py`文件下另起一个配置项），其内容为：

```txt
STATICFILES_DIRS = [
	os.path.join(BASE_DIR, 'static')
]
```

> 其中`DIRS`表示我们的文件夹

简单案例：将我们的图片资源可以在浏览器中进行显示

- 我们先要在`static`资源文件夹中创建一个图片文件夹`images`，再将需要的图片拖到文件夹之下

- 在`index.html`的文件中写入静态文件标签`{% load staticfiles %}`，使静态文件可以在模板中进行显示

  ```html
  {% load staticfiles %}
  <!DOCT html>
  <html lang="en">
  <head>
  	<meta charset="UTF-8">
      <title>Title</title>
  </head>
  <body>
      <img src="{% static 'images/1.png' %}">
  </body>
  </html>
  ```

- 其他文件的操作可以参考之前的配置

#### 过滤器

在`html`模板中，对于渲染过的数据进行二次处理操作，过滤器就是用来处理这些数据模板引擎中使用的函数

##### 常用的内置过滤器

|       过滤器       |   使用（用两个大括号包裹）    |                             说明                             |
| :----------------: | :---------------------------: | :----------------------------------------------------------: |
|       `add`        |         value\|add:10         |                      给`value`的值加10                       |
|       `date`       |   value\|date:"Y-m-d H:i:s"   |               把日期格式按照规定的格式进行显示               |
|       `cut`        |        value\|cut:'-'         |                     将`value`中的`-`删除                     |
|     `catfirst`     |        value\|catfirst        |                    将`value`的首字母大写                     |
|     `default`      |      value\|default:'xx'      |                 值为`False`时使用默认值`xx`                  |
| `default_if_none`  |  value\|default_if_none:'xx'  |                  值为`None`时使用默认值`xx`                  |
|     `dictsort`     |     value\|dictsort:'key'     |                值值为字典列表，按照`key`排序                 |
| `dictsortreversed` | value\|dictsortreversed:'key' |               值为字典列表，按照`key`反向排序                |
|      `first`       |         value\|first          |                   返回列表中的第一个索引值                   |
|       `last`       |          value\|last          |                  返回列表中的最后一个索引值                  |
|   `floatformat`    |     value\|floatformat:2      |                     保留小数点后2位小数                      |
|       `join`       |        value\|join:"-"        |                       使用`-`进行连接                        |
|      `length`      |         value\|length         |                         返回值的长度                         |
|    `divisbleby`    |     value\|divisibleby:2      |                如果值可以被2整除即返回`true`                 |
|    `length_is`     |     value\|length_is:'2'      |                  如果长度值为2即返回`true`                   |
|       `safe`       |          value\|safe          | 将字符串中的`html`标签在前端安全展示，不添加这个过滤器时只会显示前端代码这行字符串 |
|      `random`      |         value\|random         |                    随机返回列表中的一个值                    |
|      `slice`       |       value\|silce:'2'        |                        截取前两个字符                        |
|     `slugify`      |        value\|slugify         |                    值小写，单词用`-`分隔                     |
|      `upper`       |         value\|upper          |                          字符串大写                          |
|      `urlize`      |         value\|urlize         |                     字符串中的链接可点击                     |
|    `wordcount`     |       value\|wordcount        |                       字符串中的单词数                       |
|    `timeuntil`     |       value\|timeuntil        |            距离当前日期的天数和小时数（未来时间）            |

简单使用：

- 在`views.py`文件中进行参数的声明和传递

  ```py
  from django.shortcuts import render  # render的主要功能是返回一个html页面
  from django.views.generic import View
  import datetime   # 引入时间
  
  class Index(View):
      def get(self, request):
          data = {}
          data['count'] = 20
          data['time'] = datetime.datetime.now()
          data['cut_str'] = 'hello-boy'
          data['first_big'] = 'hello django'
          data['result'] = False
          data['if_none'] = None
          data['dist_list'] = [{'name': 'jlc', 'age': 24}, {'name': 'JLC', 'age': 20}]
          data['float_num'] = 3.1415926
          data['array'] = range(3)
          data['html_str'] = '<div style="background-color:red;width:50px;height:50px"></div>'
          data['url_str'] = '请看 www.baidu.com'
          data['feature'] = data['time'] + datetime.timedelta(days=5)
          return render(request, 'index.html', data)
  ```

- 在`index.html`的文件中进行编写对应的过滤器

  ```html
  <!DOCT html>
  <html lang="en">
  <head>
  	<meta charset="UTF-8">
      <title>Title</title>
  </head>
  <body>
      add: {{ count|add:10 }}
      <br>
      time: {{ time|data:"Y-m-d H:i:s" }}
      <br>
      cut: {{ cut_str|cut:"-" }}
      <br>
      catfirst: {{ first_big|capfirst }}
      <br>
      default: {{ result|default:"空" }}
      <br>
      default_if_none: {{ if_none|default_if_none:"none是空" }}]
      <br>
      dictsort: {{ dict_list|dictsort:"age" }}
      <br>
      dictsortreversed: {{ dict_list|dictsortreversed:"age" }}
      <br>
      first: {{ dict_list|first }}
      <br>
      last: {{ dict_list|last }}
      <br>
      floatformat: {{ float_num|floatformat:2 }}
      <br>
      join: {{ array|join:"-" }}
      <br>
      length: {{ dict_list|length }}
      <br>
      divisibleby: {{ count|divisibleby:2 }}
      <br>
      length_is: {{ dict_list|length_is:3 }}
      <br>
      safe: {{ html_str|safe }}
      <br>
      random: {{ array|random }}
      <br>
      slice: {{ html_str|slice:":6" }}
      <br>
      urlize: {{ url_str|urlize }}
      <br>
      wordcount: {{ first_big|wordcount }}
      <br>
      timeuntil: {{ feature|timeuntil }}
  </body>
  </html>
  ```

- 网页中的结果显示为：

  ```txt
  add: 30
  time: 2024-09-04 11:09:20
  cut: helloboy
  catfirst: Hello django
  default: 空  // 如果在views.py中传入的result值为True，网页中就展示True
  default_if_none: none是空  // 如果传入的if_none值为1，网页中就展示1
  dictsort: [{'age': 20, 'name': 'JLC'}, {'age': 24}, 'name': 'jlc']
  dictsortreversed: [{'age': 24, 'name': 'jlc'}, {'age': 20, 'name': 'JLC'}]
  first: {'age': 24, 'name': 'jlc'}
  last: {'age': 20, 'name': 'JLC'}
  floatformat: 3.14
  join: 0-1-2
  length: 2
  divisibleby: True
  length_is: False
  random: 2   // 随机返回数组中的某个值
  slice: <div s
  urlize: 请看 www.baidu.com   // 后面的链接变的可以点击跳转
  wordcount: 2
  timeuntil: 4 日 23 小时
  ```

  > `if_none`的值`None`和空字符串‘’，是不等价的，传入‘’，在网页中不显示默认值，显示的内容是空字符串（不显示东西），也就是说空字符串不为空

##### 自定义过滤器

在`	Django`中有些内置的过滤器可能不太符合我们的应用场景，我们往往需要自定义过滤器，自定义过滤器的步骤为：

1. 在应用文件下创建一个`Python Package`的包，命名为`templatetags`

2. 在这个包中创建一个`Python`文件，命名为`myfilter.py`

3. 在`myfilter.py`中进行自定义过滤器的编写

   ```py
   from django import template
   
   # 自定义过滤器
   register = template.Library()
   @register.filter
   def test_filter(value, args):  # value是用户传入的值
       return value * args
   ```

4. 在模板中去使用：

   ```html
   {% load myfilter %}   <!--导入自定义的过滤器-->
   <!DOCT html>
   <html lang="en">
   <head>
   	<meta charset="UTF-8">
       <title>Title</title>
   </head>
   <body>
   	自定义: {{count|test_filter:3}}
   </body>
   </html>
   ```

   > 编写完自定义过滤器后，需要进行后端的重启，这个自定义过滤器才能生效

***

### 其他常用模板

#### `JinJa2`

`JinJa2`是一套模仿`Django`模板的模板引擎，由`Flask`开发者开发，使用场景与`Django`相似，速度较快，被广泛使用

`JinJa2`提倡让`Html`设计者和后端`Python`开发工作分离

##### 模板的配置

1. 我们需要先创建一个`Django`项目，在项目的应用文件中创建一个子路由`urls.py`，其内容为：

   ```py
   from django.urls import path
   from .views import Index
   urlpatterns = [
       path('', Index.as_view())
   ]
   ```

   在根路由与子路由进行绑定：

   ```py
   from django.contrib import admin
   from django.urls import path, include
   urlpatterns = [
       path('admin/', admin.site.urls),
       path('', include('app.urls')),
   ]
   ```

2. 在项目的根目录下创建两个文件夹：`templates`和`static`，在`templates`文件夹中创建一个`index.html`文件，其文件内容为：

   ```html
   <!DOCT html>
   <html lang="en">
   <head>
   	<meta charset="UTF-8">
       <title>Title</title>
   </head>
   <body>
   	自定义: {{count|test_filter:3}}
   </body>
   </html>
   ```

3. 在项目文件夹下的`settings.py`下做相应的配置

4. 在应用文件夹内创建一个`Python`文件：`base_jinja2.py`

5. 在终端中下载`jinja2`的插件：`pip install jinja2`

6. 在文件`base_jinja2.py`中进行以下的配置：

   ```py
   from jinja2 import Environment
   from django.contrib.staticfiles.storage import staticfiles_storage
   from django.urls import reverse
   
   def environment(**options):
       env = Environment(**options)
       env.globals.update({
           'static': staticfiles_storage.url,
           'url': reverse
       })
       return env
   ```

7. 在应用文件的视图`views.py`文件中创建视图函数：

   ```py
   from django.shortcuts import render
   from django.views.generic import View
   
   class Index(View):
       def get(self, request):
           data = {'name': 'jlc', 'age': 24}
           return render(request, 'index.html', data)
   ```

##### 常用的系统过滤器

|    过滤器    |                    说明                    |
| :----------: | :----------------------------------------: |
|    `safe`    |                渲染时不转义                |
| `capitalize` | 把值的首字母转换为大写，其他字母转换为小写 |
|   `lower`    |            把值转换成小写的形式            |
|   `upper`    |            把值转换成大写的形式            |
|   `title`    |     把值中每个单词的首字母都转换成大写     |
|    `trim`    |             把值的首尾空格去掉             |
| `striptags`  |     渲染前把值中所有的`HTML`标签都删掉     |

##### 自定义过滤器

直接在应用文件下创建一个`myfilter.py`的文件，在这个文件下编写自定义过滤器：

```py
def test(value, args):
    return value * args
```

在`base_jinja2.py`文件中配置自定义过滤器：

```py
from jinja2 import Environment
from django.contrib.staticfiles.storage import staticfiles_storage
from django.urls import reverse
from .myfilter import test

def environment(**options):
    env = Environment(**options)
    env.globals.update({
        'static': staticfiles_storage.url,
        'url': reverse
    })
    env.filters['test'] = test
    return env
```

在项目文件的`settings.py`文件中的`TEMPLATES`中修改配置信息：将`BACKEND`改为：

```py
'BACKEND': 'django.template.backends.jinja2.Jinja2'
'OPTIONS': {
    'CONTEXT_PROCESSORS': [
        ...
    ],
    'environment': 'app.base_jinja2.environment'#只是使用系统过滤器不需要配置
},
```

通过以上的配置（不管是系统过滤器还是自定义过滤器都需要进行配置），我们`jinja2`自定义的过滤器就可以使用了，在`index.html`文件，其文件内容为：

```html
<!DOCT html>
<html lang="en">
<head>
	<meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
	{{ name|title }}  <!---系统过滤器：将首字母进行大写-->
	<br>
    {{ age|test(2) }}   <!---自定义过滤器：乘2-->
</body>
</html>
```

##### 配置静态文件

在`static`文件夹内创建一个`css`样式文件：`test.css`，其内容为：

```css
* {
    background-color: red;
}
```

在`Django`模板中在`html`文件中导入静态文件需要在顶部写`{% load staticfiles %}`，但是在`Jinja2`中不需要，我们可以直接在`<link>`标签中进行导入：

```html
<!DOCT html>
<html lang="en">
<head>
	<meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
	<link rel="stylesheet" href="/static/test.css">
</body>
</html>
```

#### `Mako`

`Mako`模板比`Jinja2`有更快的解析速度和更多的语法支持，可以允许开发者在`HTML`中随意书写`Python`代码

##### 模板的配置

1. 下载`mako`：`pip install mako`

2. 配置路由，子路由，`settings.py`，`static`和`templates`文件参考`Jinja2`的配置

3. 在应用文件夹下创建`mako`的配置文件：`base_render.py`，其内容为：

   ```py
   from mako.lookup import TemplateLookup
   from django.template import RequestContext
   from django.conf import settings
   from django.template.context import Context
   from django.http import HttpResponse
   
   def render_to_response(request, template, data=None):
       context_instance = RequestContext(request)
       path = settings.TEMPLATES[0]['DIRS'][0]
       lookup = TemplateLookup(
       	directories=[path],
           output_encoding='utf-8',
           input_encoding='utf-8'
       )
       mako_template = lookup.get_template(template)
       
       if not data:
           data = {}
           
       if context_instance:
           context_instance.update(data)
       else:
           context_instance = Context(data)
        
       result = {}
       for d in context_instance:
           result.update(d)
           
       result['csrf_token'] = '<input type="hidden" name="csrfmiddlewaretoken" value="{}" />'.format(request.META.get('CSRF_COOKIE', ''))
       return HttpResponse(mako_template.render(**result))
   ```


***

### 枚举文件

枚举是一个数据类型，相当于一个字典，我们在这个字典中去选择相应的键，这个键对应着一个值

一般在`app`应用文件夹下创建枚举文件`consts.py`，该文件的内容格式如下：

```py
from enum import Enum

class MessageType(Enum):
    info = 'info'
    warning = 'warning'
    error = 'error'
    danger = 'danger'
    
# 定义内容和颜色
MessageType.info.label = '信息'
MessageType.warning.label = '警告'
MessageType.error.label = '错误'
MessageType.danger.label = '危险'

MessageType.info.color = 'green'
MessageType.warning.color = 'orange'
MessageType.error.color = 'gray'
MessageType.danger.color = 'red'
```

> `python`自身是没有枚举类型的，在`python3.4`之后引入了枚举包`Enum`

之后在编写我们的视图函数`views.py`（在应用程序文件夹下）：

```py
from django.shortcuts import render
from django.view.generic import View
from .consts import MessageType   # 导入当前路径下consts.py文件中的类

# 定义类视图
class Message(View):
    def get(self, request, message_type):
        data = {}
        # 用户路由传参传过来值的类型，传入的枚举类型必须是已经被定义的，否则进行异常处理
        try:
            # 接收message_type
            message_type_obj = MessageType[message_type]
        except:
            data['error'] = '没有这个消息类型'
            return render(request, 'message.html', data)
        
        # 获取用户传递过来的message的值
        message = request.GET.get('message', '')
        if not message:
            data['error'] = '消息不可为空'
            return render(request, 'message.html', data)
        data['message'] = message
        data['message_type'] = message_type_obj
        return render(request, 'message.html', data)
```

在模板文件夹中创建一个`message.html`的文件：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
{% if error %}
    <h3>error: {{ error }}</h3>
{% else %}
    <span style="color:{{message_type.color}}">{{message}}</span>
{% endif %}
</body>
</html>    
```

在应用文件夹中创建子路由`urls.py`：

```py
from django.urls import path
from .views import Message

urlpatterns = [
    path('message/<str:message_type>', Message.as_view()),
]
```

在项目文件夹下的主路由中进行绑定子路由：

```py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('app.urls')),
]
```

在浏览器中输入`localhost: 8000/message/danger?message=aaa`

会在网页中渲染对应枚举类型颜色的`aaa`样式
