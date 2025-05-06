## `MQTT`平台的搭建和使用

### `MQTT`服务端平台的搭建

- 在`Ubuntu`下搭建`mqtt-broker`中心服务器：
  1. 下载安装包：`wget https:www.emqx.com/zh/downloads/broker/5.0.11/emqx-5.0.11-ubuntu18.04-amd4.deb`
  2. 安装：`sudo apt install ./emqx-5.0.11-ubuntu18.04-amd64.deb`
  3. 运行：`sudo systemctl start emqx`

- 在`Windows`下搭建`mqtt-broker`中心服务器：
  1. 下载`windows`版本`emqx`网址：[EMQX Cloud 或 EMQX Enterprise | 下载 EMQX](https://www.emqx.com/zh/try?tab=self-managed)
  2. 打开`cmd`进入安装路径`D:\emqx\bin`运行：`emqx console`
  3. 浏览器登陆控制台：[http://10.234.75.59:18083/](http://10.0.2.15:18083/)      `10.234.75.59`为本电脑的`ip`地址
  4. 输入默认账号和密码：`admin`  `public`  

***

### `MQTT`客户端平台的搭建

1. 下载 MQTT客户端软件`MQTT.fx`
2. 建立新客户端`mqtt`连接，相关参数进行配置，连接服务端地址`10.234.75.59`
3. 将客户端和服务端进行连接，同时在浏览器登陆控制台我们可以看到成功连接了一个`MQTT_FX_Client1`的客户端
4. 为了实现客户端间的通信，需要进行订阅主题，在`Subscribe`界面订阅了`test`的主题
5. 在`Publish`进行发布信息
6. 订阅了`test`主题的客户端都可以收到相关信息

***

### 通过`python`进行客户端的创建和连接的访问

`MQTT`的`python`接口实现：

首先需要安装相关的库：`pip install paho-mqtt`

`MQTT`客户端的发布信息程序范例如下：

```py
import paho.mqtt.client as mqtt
import threading
import random
import time
class Mqtt_Publisher:
    # central_ip是服务端的ip地址；端口号port是特定的1883端口
    def __init__(self,central_ip='10.234.75.59',port=1883,
                 node_name='bci_',anonymous=True,timeout=60):
        self.broker_ip=central_ip
        self.broker_port=port
        self.timeout=timeout
        self.connected=False
        self.node_name=node_name
        if anonymous:
            self.node_name=self.node_name+str(random.randint(100000,999999))
        self.Start()

    def Start(self):
        self.client = mqtt.Client(self.node_name)   # 创建客户端，客户端可以发送信息，也可以接收
        self.client.on_connect = self.on_connect  # 指定回调函数，判断是否连接成功
        # 客户端连接服务端
        self.client.connect(self.broker_ip, self.broker_port, self.timeout)   
        self.client.loop_start()    #开启一个独立的循环通讯线程

    def Publish(self,topic,payload,qos=0,retain=False):   # 发布消息，（topic主题，消息内容）
        if self.connected:      # 判断客户端是否连接到服务端上
            return self.client.publish(topic,payload=payload,qos=qos,retain=retain)
        else:
            raise Exception("mqtt server not connected! you may use .Start() function to connect to server firstly.")

    def on_connect(self,client, userdata, flags, rc):      # 回调函数，判断是否连接成功
        if rc==0:
            self.connected=True
        else:
            raise Exception("Failed to connect mqtt server.")

if __name__=='__main__':
    p=Mqtt_Publisher()
    while not p.connected:
        pass
    while True:
        p.Publish('test','this is a test message')   
        p.Publish('test_2','this is test 2')
        time.sleep(1)     #延迟一秒
```

> 执行代码后，浏览器控制台可以看到监控节点不断收到进来的消息，同时检测到了一个客户端在往外发送消息

MQTT客户端的接收信息程序范例如下：客户端连接过程与发送信息客户端同理

```py
import paho.mqtt.client as mqtt
import threading
import random
import time
class Mqtt_Subscriber:
    def __init__(self,central_ip='10.234.75.59',port=1883,
                 topic_name='test',callback_func=None,
                 node_name='bci_',anonymous=True,timeout=60):
               self.topic=topic_name
        self.callback=callback_func
        self.broker_ip=central_ip
        self.broker_port=port
        self.timeout=timeout
        self.connected=False
        self.node_name=node_name
        if anonymous:
            self.node_name=self.node_name+str(random.randint(100000,999999))
        self.Start()

    def Start(self):
        self.client = mqtt.Client(self.node_name)      # 创建客户端
        self.client.on_connect = self.on_connect  # 指定回调函数
        self.client.on_message=self.default_on_message    # 绑定打印输出回调函数
        self.client.connect(self.broker_ip, self.broker_port, self.timeout)  # 开始连接
        self.client.subscribe(self.topic)     # 绑定名称相同的topic，接收收到同topic消息
        self.client.loop_start()    # 开启一个独立的循环通讯线程。

    def default_on_message(self,client, userdata, msg):   # 回调函数
        print(msg.payload.decode('utf-8'))      # 将收到的消息以utf-8的格式打印出来

    def on_connect(self,client, userdata, flags, rc):
        if rc==0:
            self.connected=True
        else:
            raise Exception("Failed to connect mqtt server.")

if __name__=='__main__':
    p=Mqtt_Subscriber()
    while not p.connected:
        pass
    while True:
        time.sleep(1)
```

运行接收端程序后，就会时时收到同`topic`客户端发出的消息

监控台不仅有信息流入，也有信息流出，出现了两个已连接的客户端，一个发送端，一个接收端

