## 第一个`PyQt5`应用

```python
# -*- coding: UTF-8 -*-      # 避免在所生成的PyQt程序中出现中文乱码问题
# UTF-8是一种针对Unicode的可变长度字符编码，又称万国码，用在网页上可以统一页面显示中文简体/繁体及其他语言。
import sys
from PyQt5.QtWidgets import QApplication, QWidget     # 上述两行代码用来载入必须的包和模块

app = QApplication(sys.argv)   
'''
创建一个应用程序，每一个PyQt5程序都需要有一个QApplication对象，QApplication类包含在QTWidgets模块中
我们的代码有两种执行方式：1.右击，点击执行的方式。2.命令行执行：python 代码名称
sys.argv的作用：当别人通过命令行启动这个程序的时候，可以设定一种功能（接收命令行传递的参数，来执行不同的业务逻辑），sys.argv是一个命令行参数列表，使python脚本可以从shell中执行。
'''
window = QWidget()# 创建控件声明QWidget控件是PyQt5中所有用户界面类的父类，该处使用了没有参数的默认构造函数，它没有继承其他类
# 我们称没有父类的控件为窗口，窗口和控件都继承自QWidget类，如果不为控件指定一个父对象，那么该控件就会当做窗口处理，这时#setWindowTitle()：窗口命名和setWindowIcon()：窗口图标函数就会生效
# 当我们创建一个控件后，如果这个控件没有父控件，则当做顶层控件（窗口），系统会为其添加一些装饰（标题栏），窗口控件可设置标题，图标
window.resize(300, 200)     # resize()方法可以改变窗口控件的大小，长度和宽度单位是像素，大小不包括标题栏的部分
window.move(250, 150)      # move()方法可以设置窗口初始化的位置（x,y），将窗口移动到桌面的某个位置
window.setWindowTitle('Hello PyQt5')     # 设置窗口控件的标题，在标题栏中显示
window.show()    # 展示控件，使用show()方法将窗口控件显示在屏幕上，如果父控件展示了，那么子控件也会展示

sys.exit(app.exec_())  
'''
app.exec_()进入该程序的主循环，事件的处理从本行代码开始，主循环接收事件消息并将其分发给程序给个控件。让整个程序无限循环，来检测整个程序所接收到的用户的交互信息。
如果调用exit()或主控件被销毁，主循环就会结束，使用sys.exit()方法退出可以确保程序完整的结束，使系统环境变量记录程序退出
在python3下运行程序，可以将exec_()简写成exec()
如果exec_()的返回值为0，则程序运行成功，否则为非零
'''
```

```python
window = QWidget()   # 创建了一个控件，作为一个顶层窗口
label = QLabel(window)  # 创建了一个label控件，将其插入window控件中，默认位置是在左上角
```

该案例是通过面向过程风格编写的，`PyQt`编程的精髓是面向对象编程，后续编程大多数通过面向编程进行

通过面向对象进行编程，可以将多个模块封装到一个类中，在把该类抽离到某个文件中当做某个模块来使用吗，到时候想使用该模块，可以先导入该模块中某个想要的类，直接拿这个类来使用，提高了程序的可维护性。

被封装的文件如下：设置文件名为`Menu.py`

```python
from PyQt5.Qt import *

class Window(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("pyqt学习")
        self.resize(500,500)
        self,setup_ui()
        
    def setup_ui(self):
        label = QLabel(self)
        label.setText("xxx")
        
# 判断当前模块是被右击执行还是被调用导入执行的
# 右击执行则使用以下代码（测试时用到），文件被导入时则不会执行下面的代码
if __name__ == '__main__':  
	import sys
	app = QApplication(sys.argv)
	window = Window()
	window.show()
	sys.exit(app.exec_())
```

主文件，用于调用封装的文件：

```python
from PyQt5.Qt import *
import sys
from Menu import Window   # 调用Menu.py文件的Window类

app = QApplication(sys.argv)
window = Window()
window.show()
sys.exit(app.exec_())
```

这样使用的好处是，其他文件如果也想使用该封装的控件，直接调用就行