## `Form`表单

表单可以将我们日常填写的表联系起来，通过集合信息交付给指定的人或位置

从`Web`的角度来说，通过前端的表单模块填写后端服务所需要的信息，填写完后，提交给后端服务的一个工具

表单一般分为四个部分：提交地址，提交方法，表单组件，提交按钮

```html
<form action="", method="GET">
<input type="text">
<input type="submit" value="提交">
```

> `form`表单标签，用于定义一个表格，有两个方法（`attr`）：`action`（连接到哪里）和`method`（提交的方法）
>
> `input`标签，用于输入相关的信息，该标签有以下的`type`可选项：
>
> |    元素    |             描述             |
> | :--------: | :--------------------------: |
> |   `text`   |           文本字段           |
> | `password` |    密码域，用户输入不显示    |
> |  `radio`   |           单选按钮           |
> | `checkbox` |            复选框            |
> |  `button`  |           普通按钮           |
> |  `submit`  |           提交按钮           |
> |  `reset`   |           重置按钮           |
> |  `hidden`  | 隐藏域，一般是用于提交密钥的 |
> |   `file`   |    文本域，上传文件/图像     |

### 在`Django`中使用表单

表单只会处理`get`和`post`请求，在`get`中，实例化表单对象，将`form`表单渲染到模板；在`psot`中，实例化表单对象，并将`request.POST`对象传给表单

其他配置如`settings.py`，子路由，路由，模板配置参考之前的配置

在`templates`文件夹下创建`register.html`文件：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>注册</title>
</head>
<body>
    <form action="{% url 'regiser' %}" method="POST">
        {% csrf_token %}<!--传入密钥，是获取到的提交数据可以在网页显示-->
        <input type="text" placeholder="用户名" name="username"/>
        <br>
        <input type="password" placeholder="密码" name="password"/>
        <br>
        <input type="submit" value="注册"/>
    </form>
</body>
</html>    
```

在应用文件夹下中的`views.py`中编写视图

```py
from django.shortcuts import render
from django.views.generic import View
from django.http import HttpResponse

class Regiser(View):
    def get(self, request):
        return render(request, 'register.html')
    
    # 表单提交方法
    def post(self, request):
       	username = request.POST.get('username')
        password = request.POST.get('password')
        # 将获取到提交的数据渲染在网页的页面上
        return HttpResponse('username: {}, password: {}'.format(username, password))
```

在子路由中进行以下的配置：

```py
from django.urls import path
from .views import Regiser

urlpatterns = [
    # 同时设置路径的别名，用于表单的连接跳转
    path('', Regiser.as_view(), name=='regiser') 
]
```

以上的方法是通过`html`创建一个表单，也是推荐的创建表单的方法，这种方式创建的表单可以进行二次的美化

当然我们也可以使用`Django`中内置的方法进行表单的创建，在应用文件夹中创建一个`forms.py`文件来创建表单，文件内容如下：

```py
from django import froms  # 从forms中导入fields中的对象
from django,froms import fields  # 字段来源于fields

# 定义一个表单类
class Auth(froms.Form):
    # required=True表示表单中用户名是必须要填写的
    userame = fields.CharField(max_length=10, required=True)
    userame = fields.CharField(widget=forms.PasswordInput)
```

> 常见内置表单的字段类型：
>
> |          类型           |                       描述                        |
> | :---------------------: | :-----------------------------------------------: |
> |       `CharField`       |                     文本类型                      |
> |      `EmailField`       |            验证是否是有效的`email`格式            |
> |       `URLField`        |             验证是否是有效的`url`地址             |
> | `GenericIPAddressField` |                   验证`ip`类型                    |
> |       `TimeField`       |    验证是否为`datetime.time`或指定格式的字符串    |
> |       `DateField`       | 验证日期格式，通过参数`input_formats`定义日期格式 |
> |      `ChoiceField`      |        选择类型，通过参数`choices`设置内容        |
> |     `BooleanField`      |        复选框，当`required=True`时默认勾选        |
> |     `IntegerField`      |                 验证值是否为整形                  |
> |      `FloatField`       |               验证值是否为浮点类型                |
> |       `FileField`       |     文件上传，`allow_empty_file`设置是否为空      |
> |      `ImageField`       |             验证上传的文件是否为图片              |
>
> 内置表单字段属性：
>
> |       属性       |                     描述                     |
> | :--------------: | :------------------------------------------: |
> |    `required`    |            是否必填，默认为`True`            |
> |     `widget`     |           设置`input`的`type`样式            |
> |     `label`      |                  设置标签名                  |
> |    `initial`     |                  设置初始值                  |
> |    `localize`    | 是否支持时间本地化，时区不同时显示相应的时间 |
> |    `disabled`    |                  是否可编辑                  |
> | `error_messages` |  设置错误消息，字典类型，对属性错误进行说明  |
> |   `max_length`   |                 设置最大长度                 |
> |   `min_length`   |                 设置最小长度                 |
> |   `validators`   |                自定义验证规则                |

在`views.py`进行下述的修改：

```py
from django.shortcuts import render
from django.views.generic import View
from django.http import HttpResponse
from .forms import Auth

class Regiser(View):
    def get(self, request):
        form = Auth()
        return render(request, 'register.html', {'form': form})
    
    # 表单提交方法
    def post(self, request):
        form = Auth(request.POST)
        # 进行设置的规则验证
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            # 将获取到提交的数据渲染在网页的页面上
            return HttpResponse('username: {}, password: {}'.format(username, password))
        return HttpResponse('ERROR')
```

在`register.html`页面中进行渲染：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>注册</title>
</head>
<body>
    <form action="{% url 'regiser' %}" method="POST">
        {% csrf_token %}<!--传入密钥，是获取到的提交数据可以在网页显示-->
        {{ form.as_table }}
        <input type="submit" value="注册"/>
    </form>
</body>
</html> 
```

> 表单在前端自动展示的方法：
>
> | 方法（用两个大括号包裹） |                描述                |
> | :----------------------: | :--------------------------------: |
> |          `form`          |              直接使用              |
> |     `form.as_table`      |        在`table`标签中展示         |
> |       `form.as_p`        |          生成在`p`标签内           |
> |       `form.as_ul`       | 在`ul`标签中通过`li`标签的形式展示 |
>
> 表单在前端手动展示的方法：
>
> |  方法（用两个大括号包裹）   |                          描述                          |
> | :-------------------------: | :----------------------------------------------------: |
> |    `form.subject.errors`    |        展示项目验证失败时返回的错误，可迭代循环        |
> | `form.subject.id_for_label` | 展示项目`label`的名称（该标签需要手动书写`label`标签） |
> |  `form.subject.label_tag`   |    该字段的`label`封装在响应式的`html<label>`标签中    |
> |       `form.subject`        |                正式展示输入该字段的位置                |
> |    `form.subject.value`     |                    展示默认的初始值                    |
> |  `form.subject.is_hidden`   |           是否隐藏字段（`True`或者`False`）            |
>
> `For`循环展示错误：
>
> ```html
> {% if form.subject.errors %}
> 	<ol>
>      {% for error in form.subject.errors %}
>      	<li><strong>{{ error|escape }}</strong></li>
>      {% endfor %}
> 	</ol>
> {% endif %}
> ```

### 网站登录表单验证

在根目录中创建一个`templates`文件夹，在应用文件夹中创建表单文件`forms.py`，同时在`settings.py`中进行相关的配置（`TEMPLATES`中的`DIRS`）和配置根路由

在`forms.py`中进行编写，声明一个简单的表单：

```py
from django import forms
from django.forms import fields

class Auth(forms.Form):
    username = fields.CharField(
        max_length=10,
        min_length=4,
        # 设置表单的label标签
        label='用户名',
    )
    password = fields.CharField(
        # 设置进行密文处理
        widget=forms.PasswordInput(),
        label='密码',
        min_length=10,
    )
    
    # 全局验证
    def clean(self):
        username = self.cleaned_data.get('username', '')
        password = self.cleaned_data.get('password', '')
        
        if not username:
            raise forms.ValidationError('用户名不可为空')
            
        if len(username) > 10:
            raise forms.ValidationError('用户名不可超过十个字符')
            
        if not username:
            raise forms.ValidationError('用户名不可为空')
     
    # 局部验证（单独验证，对单个字段进行验证） clean必须要写在前面，为前缀
    def clean_username(self):
        username = self.cleaned_data.get('username', '')   
        if len(username) > 5:
            raise forms.ValidationError('用户名不可超过五个字符')
    	return username
```

在`views.py`中编写视图：

```py
from django.shortcuts import render
from django.views.generic import View
from django.http import HttpResponse
from .forms import Auth

class Register(View):
    def get(self, request):
        # 实例化表单
        form = Auth()
        return render(request, 'register.html', {'form': form})
    
    def post(self, request):
        form = Auth(request.POST)
        # 进行设置的规则验证
        if form.is_valid():
            # 获取数据，没有数据默认为空
            username = form.cleaned_data.get('username', '')
            password = form.cleaned_data.get('password', '')
            # 将获取到提交的数据渲染在网页的页面上
            return HttpResponse('username: {}, password: {}'.format(username, password))
        return render(request, 'register.html', {'form': form})  
```

配置子路由：

```python
from django.urls import path
from .views import Register

urlpatterns = [
    path('', Register.as_view(), name='register'),
]
```

在`templates`文件夹中创建一个页面文件`register.html`：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>注册</title>
</head>
<body>
    <!--通过别名指向路由-->
    <form action="{% url 'regiser' %}" method="POST">
        {% csrf_token %}<!--传入密钥，是获取到的提交数据可以在网页显示-->
        {% for item in form %}
        	<div>
                <label for="{{ item.id_for_label }}">{{ item.label }}</label>
                {{ item }}
        	</div>
        	<!--自定义消息显示：显示局部错误-->
        	<p>{{ item.errors.as_text }}</p>
        {% endfor %}
       		<!--自定义消息显示：显示全局错误-->
        	<span>{{ form.non_field_errors }}</span>
        <input type="submit" value="注册"/>
    </form>
</body>
</html> 
```

***

### 模型表单

模型表单是`model`层与`form`表单结合起来，通过表单层为中介，渲染出前端表单，并通过表单直接读取数据库

模型表单基础模块继承于：`forms.ModelForm`