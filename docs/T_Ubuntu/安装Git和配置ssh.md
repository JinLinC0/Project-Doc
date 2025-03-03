## 安装`Git`和配置`ssh`

在开发的过程中，经常需要在代码的拖放平台进行克隆和提交代码，我们需要在`Ubuntu`中配置`ssh`，与代码托管平台建立连接

在`ubuntu`中下载`Git`：

- `sudo apt update`
- `sudo apt install git`
- `git --version`来查看是否下载完成

配置`Git`和`SSH`：

- `git config --global user.name jlc`
- `git config --global user.email 2794810071@qq.com`
- `git config --list`来查看是否配置完成
- `ssh-keygen`    回车
- `ls ~/.ssh`   点击ctrl+h查看隐藏文件，找到`id_rsa.pub`文件复制其密钥在`GitHub`中添加