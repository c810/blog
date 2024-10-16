---
title: dev-flow
publish: true
---

## 0. Linux 常用命令

### 0.1. chmod

```bash
# +x 表示增加执行权限。这里的 x 代表 execute（执行），而 + 符号意味着为指定的用户类别增加权限。
# 对于目录来说：允许进入目录，即使用 cd 命令切换到该目录。没有执行权限的用户无法访问目录内的文件，即使这些文件本身具有适当的权限。
# 对于文件来说：允许将文件作为程序来运行。例如，脚本或二进制可执行文件需要有执行权限才能被直接运行。
chmod +x myscript.sh
./myscript.sh

# 如果没有特别指定用户类别（例如 u 用户、g 组、o 其他用户），那么默认情况下 +x 会同时为文件的所有者、组用户以及其他所有用户增加执行权限。
# u ：目录或者文件的当前的用户
# g ：目录或者文件的当前的群组
# o ：除了目录或者文件的当前用户或群组之外的用户或者群组
# a ：所有的用户及群组
# 即等同于：chmod a+x /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose


-rw-r--r-- 1 root root 296K 11-13 06:03 log2012.log
# 第一列共有 10 个位置，第一个字符指定了文件类型。
# 如果第一个字符是横线，表示是一个非目录的文件。
# 如果是 d，表示是一个目录。
# 从第二个字符开始到第十个 9 个字符，3 个字符一组，分别表示了 3 组用户对文件或者目录的权限。
# -代表空许可（删除权限），r 代表只读，w 代表写，x 代表可执行。


# 读权限 (r) = 4
# 写权限 (w) = 2
# 执行权限 (x) = 1
# chmod u=rwx,g=rx,o=x t.log -c
chmod 751 t.log -c
```

| 分类  | 命令/操作                             | 描述                                                         |
|-------|----------------------------------------|--------------------------------------------------------------|
| 重要  | top                                    | 查看内存/显示系统当前进程信息                                 |
|       | df -h                                  | 查看磁盘储存状况                                             |
|       | iotop (需安装)                         | 查看 IO 读写                                                   |
|       | iotop -o                               | 直接查看比较高的磁盘读写程序                                 |
|       | netstat -tunlp \| grep 端口号          | 查看端口号占用情况 (方法 1)                                   |
|       | lsof -i: 端口号                         | 查看端口号占用情况 (方法 2)                                   |
|       | uptime                                 | 查看报告系统运行时长及平均负载                               |
|       | ps aux                                 | 查看进程                                                     |
| 基础  | ls                                     | 查看目录与文件                                               |
|       | ls -la                                 | 显示当前目录下所有文件的详细信息                             |
|       | cd /home                               | 进入 '/home' 目录                                            |
|       | cd ..                                  | 返回上一级目录                                               |
|       | cd ../..                               | 返回上两级目录                                               |
|       | pwd                                    | 显示当前目录                                                 |
|       | touch desc.txt                         | 在当前目录下创建空文件 desc.txt                               |
|       | mkdir test                             | 在当前目录下创建 test 目录                                     |
|       | mkdir -p /opt/test/img                 | 在/opt/test 目录下创建目录 img，若无 test 目录，先创建 test 目录    |
|       | cat desc.txt                           | 查看 desc.txt 的内容                                           |
|       | more desc.txt                          | 分页查看 desc.txt 的内容                                       |
|       | tail -100 desc.txt                     | 查看 desc.txt 的最后 100 行内容                                  |
|       | cp desc.txt /mnt/                      | 拷贝 desc.txt 到/mnt 目录下                                     |
|       | cp -r test /mnt/                       | 拷贝 test 目录到/mnt 目录下                                     |
|       | mv desc.txt /mnt/                      | 剪切文件 desc.txt 到目录/mnt 下                                 |
|       | mv 原名 新名                           | 改名文件                                                     |
|       | rm -rf test                            | 删除 test 目录，-r 递归删除，-f 强制删除                         |
|       | find /opt -name '*.txt'                | 在 opt 目录下查找以.txt 结尾的文件                              |
|       | ifconfig                               | 显示网络设备情况                                             |
|       | netstat -a                             | 列出所有端口                                                 |
|       | netstat -tunlp \| grep 端口号          | 查看进程端口号                                               |
|       | ps -ef                                 | 显示当前所有进程                                             |
|       | ps -ef \| grep java                    | 显示当前所有 java 相关进程                                     |
|       | du -h /opt/test                        | 查看/opt/test 目录的磁盘使用情况                               |
|       | df -h                                  | 查看磁盘空间使用情况                                         |
|       | top                                    | 显示系统当前进程信息                                         |
|       | kill -s 9 27810                        | 杀死进程号为 27810 的进程，强制终止                             |
|       | tar -zcvf test.tar.gz ./test           | 打包 test 目录为 test.tar.gz 文件，-z 表示用 gzip 压缩               |
|       | tar -zxvf test.tar.gz                  | 解压 test.tar.gz 文件                                          |
|       | chown nginx: nginx desc.txt             | 变更文件 desc.txt 的拥有者为 nginx，用户组为 nginx               |
|       | chown -R nginx: nginx test              | 变更 test 及目录下所有文件的拥有者为 nginx，用户组为 nginx        |
|       | chmod u+x test.sh                      | 给文件拥有者增加 test.sh 的执行权限                             |
|       | chmod u+x -R test                      | 给文件拥有者增加 test 目录及其下所有文件的执行权限             |
|       | vim desc.txt                           | 编辑 desc.txt 文件                                             |
|       | shutdown -h now                        | 立刻关机                                                     |
|       | shutdown -r -t 60                      | 60 秒后重启                                                   |
|       | reboot                                 | 重启                                                         |
|       | man ls                                 | 查看 ls 命令的帮助文档                                         |
| 快捷键 | Ctrl + a                               | 光标到开头                                                   |
|       | Ctrl + c                               | 中断当前程序                                                 |
|       | Ctrl + d                               | 退出当前窗口或当前用户                                       |
|       | Ctrl + e                               | 光标到结尾                                                   |
|       | Ctrl + l                               | 清屏 相当于 clear                                             |
|       | Ctrl + u                               | 剪切、删除（光标以前的）内容                                 |
|       | Ctrl + k                               | 剪切、删除（光标以后的）内容                                 |
|       | Ctrl + r                               | 查找（最近用过的命令）                                       |
|       | tab                                    | 所有路径以及补全命令                                         |
|       | Ctrl+shift+c                           | 命令行复制内容                                               |
|       | Ctrl+shift+v                           | 命令行粘贴内容                                               |
|       | Ctrl + q                               | 取消屏幕锁定                                                 |
|       | Ctrl + s                               | 执行屏幕锁定                                                 |

## 1. 用远程工具连接

### 1.1. 连接

我这里是用 `MobaXterm`。

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/image-20240414211728797.png)

连接后，会有一个服务不可用：

[MobaXterm 里的 X11-forwarding-云社区-华为云](https://bbs.huaweicloud.com/blogs/359538 'Linux系统也是有图像界面的。它的方式和Windows不一样，叫做 X Window，采用的是X11协议。X11 中的 X 指的就是 X 协议；11 指...')

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/image-20240414212317221.png)

### 1.2. 安装 X 认证包

```bash
yum install xorg-x11-xauth
```

### 1.3. 编辑 sshd_config 文件

```bash
vi /etc/ssh/sshd_config
```

```bash
#AllowAgentForwarding yes
AllowTcpForwarding yes   #这里打开
#GatewayPorts no
X11Forwarding yes      #这里原本就是打开的
#X11DisplayOffset 10
#X11UseLocalhost yes
#PermitTTY yes
```

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/image-20240414212012225.png)

同时，解决 MobaXterm 通过 ssh 连接虚机慢的问题。

[解决 SSH 连接 Linux 系统特别慢的问题 - 胖胖 123 - 博客园](https://www.cnblogs.com/Linux-guowen/p/16417167.html '一、场景：通过XShell或MobaXterm等外部工具连接Linux服务器时，会很慢 二、分析原因：1、SSH的反向DNS解析会消耗大量时间2、GSS认证会消耗时间 三、解决办法编辑ssh配置文件 # 编辑配置文件vi /etc/ssh/sshd_config # 关闭DNS解析UseDNS no')

```bash
UseDNS no # 关闭DNS解析
GSSAPIAuthentication no # 关闭GSS认证
```

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/image-20240414213321563.png)

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/image-20240414214257577.png)

### 1.4. 重启 sshd 服务

```bash
service sshd restart
```

然后重新连接即可。

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/image-20240414212605959.png)

### 1.5. SCP

MobaXterm 左侧没有文件列表，没有 SCP，不显示文件夹问题处理。

[解决 MobaXterm 左侧没有文件列表，没有 SCP，不显示文件夹_mobaxterm 看不到文件夹-CSDN 博客](https://blog.csdn.net/zpkosmos/article/details/87868882 '文章浏览阅读2.9w次，点赞25次，收藏16次。具体原理说不太清楚，应该是什么协议的问题，直接说解决方法吧1.第一步换一个比较新的MobaXterm版本，我用的V11.0，可以通过软件界面的help，about...来查看2.第二步，说两种方法，第一个，如果是只有你的电脑是这样，别人的电脑正常，那就把你以前的MobaXterm的文件都删掉，尤其是.ini这类的配置文件，然后安装新的MobaXterm.exe，把别人的ini文件拷过来放到..._mobaxterm看不到文件夹')

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/image-20240414214452097.png)

## 2. 安装 Docker

[云服务器 docker pull mysql 报 missing signature key 错误 - 八艾云](https://www.8a.hk/news/content/8235.html '云服务器docker pull mysql报missing signature key错误')

### 2.1. 更新 yum

```bash
sudo yum update -y
```

### 2.2. 关闭 selinux

```bash
vi /etc/sysconfig/selinux
```

```java
SELINUX=disabled
```

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/image-20240414215502343.png)

重启 linux 系统

```bash
reboot
```

### 2.3. 安装依赖包

```bash
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
```

### 2.4. 添加 Docker 的官方 yum 源

```bash
# 如果开VPN，则用官方源就行（可能）
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# 或者是阿里云
sudo yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

### 2.5. 安装/卸载 Docker

```bash
sudo yum install docker-ce docker-ce-cli containerd.io

# 或指定版本安装
# 先查看可以安装的版本
sudo yum list docker-ce --showduplicates | sort -r
# 然后可以挑选比最新版本小一个版本的最后一个小版本
sudo yum install -y docker-ce-25.0.5 docker-ce-cli-25.0.5 containerd.io
# 验证安装
sudo docker --version
```

卸载 Docker

```bash
sudo yum remove docker \
                docker-client \
                docker-client-latest \
                docker-common \
                docker-latest \
                docker-latest-logrotate \
                docker-logrotate \
                docker-selinux \
                docker-engine-selinux \
                docker-engine
```

### 2.6. 启动并设置开机自启

```bash
# 启动
sudo systemctl start docker
# 开机自启
sudo systemctl enable docker
# 重启
sudo systemctl restart docker
```

### 2.7. Docker 命令别名

给常用 Docker 命令起别名，方便我们使用。

修改 `/root/.bashrc` 文件。

```bash
vi /root/.bashrc
```

```java
# .bashrc

# User specific aliases and functions

alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'
alias dps='docker ps --format "table {{.ID}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}\t{{.Names}}"'
alias dis='docker images'

# Source global definitions
if [ -f /etc/bashrc ]; then
        . /etc/bashrc
fi
```

执行命令使别名生效

```bash
source /root/.bashrc
```

验证

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/image-20240414215903150.png)

### 2.8. 使用

| 命令              | 说明                           |
| ----------------- | ------------------------------ |
| docker pull \< image \>      | 拉取镜像，如：docker pull mysql                       |
| docker push       | 推送镜像到 DockerRegistry       |
| **docker images** | **查看已经拉取下来的所有镜像**               |
| **docker rmi \< image \>**    | **删除指定镜像**               |
|					|								|
| docker run        | 创建并运行容器（不能重复创建） 		|
| docker rm 		| 删除指定容器 					|
| **docker ps** 	| **查看正在运行的所有容器** 				|
| **docker ps -a** 	| **查看所有容器** 				|
| docker stop       | 停止指定容器                   |
| docker start      | 启动指定容器                   |
| docker restart    | 重新启动容器                   |
|					|								|
| docker --help		| Docker 帮助						|
| docker --version	| 查看 Docker 版本					|
| docker search \< image \> | 搜索镜像文件，如：docker search mysql |
|					|								|
| docker logs       | 查看容器运行日志               |
| docker exec -it b3449a912030 /bin/bash | 进入容器                       |
| docker save       | 保存镜像到本地压缩文件         |
| docker load       | 加载本地压缩文件到镜像         |
| docker inspect    | 查看容器详细信息               |

### 2.9. 安装 Docker-Compose

```bash
# 官方地址
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# 或用镜像地址：
# 默认路径
wget https://gitee.com/fustack/docker-compose/releases/download/v2.24.1/docker-compose-linux-x86_64
# 指定路径【推荐】
sudo curl -L https://gitee.com/fustack/docker-compose/releases/download/v2.24.1/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
```

```bash
# 设置权限
sudo chmod +x /usr/local/bin/docker-compose
```

### 2.10. 配置 Docker 镜像源

```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
"registry-mirrors": [
  "https://docker.1panel.live",
  "https://dc.j8.work",
  "https://docker.m.daocloud.io",
  "https://dockerproxy.com",
  "https://docker.mirrors.ustc.edu.cn",
  "https://docker.nju.edu.cn"
]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## 3. 安装 JDK 和 Maven

jdk1.8.0_202 和 maven3.8.8

若符合要求，可以去 `E:\UserDev\dev-ops`，将 `dev-ops` 文件夹放到服务器的 `/` 根目录下，然后依次执行：

```bash
cd /dev-ops/
ls

# 安装git
chmod +x git.sh
./git.sh

# 安装jdk
chmod +x java.sh
./java.sh
# 如果报错误，-bash: ./install-java.sh: /bin/sh^M: bad interpreter: No such file or directory。
# 这是因为Windows和Unix/Linux系统使用不同的行结束符:Windows使用CRLF (回车+换行, \r\n)。Unix/Linux使用LF (仅换行, \n)。
# 解决办法，安装dos2unix
sudo yum install dos2unix
dos2unix java.sh
dos2unix java/install-java.sh 
dos2unix maven.sh
dos2unix maven/install-maven.sh
./java.sh
source /etc/profile
java -version

# 安装maven
chmod +x maven.sh
./maven.sh
source /etc/profile
mvn -version
```

## 安装 Node.js 和 npm

```bash
sudo yum install nodejs npm
node -v # v16.20.2
npm -v # 8.19.4
which node # /usr/bin/node
which npm # /usr/bin/npm

# 安装cnpm
npm install cnpm -g
cnpm -v # 9.4.0
```

## \==> 下面是应用环境的安装 <\==

## 4. 安装 MySQL

### 4.1. 查看 MySQL 版本

```bash
docker search mysql
```

### 4.2. 拉取 MySQL

```bash
docker pull mysql
```

### 4.3. 创建容器并运行

```bash
docker run -it -d --name mysql \
-p 3306:3306 \
-e MYSQL_ROOT_PASSWORD=xxxxxx \
mysql
```

### 4.4. 查看是否运行

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/image-20240414224241990.png)

### 4.5. 进入容器

```bash
docker exec -it mysql bash
```

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/image-20240414224433533.png)

### 4.6. 打开防火墙

在云服务器平台开放端口 `3306`。

### 4.7. 连接 Navicat

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/image-20240414224717121.png)

## 安装 Nginx

```bash
docker pull nginx

# 创建挂载目录
mkdir -p /home/nginx/conf
mkdir -p /home/nginx/log
mkdir -p /home/nginx/html
mkdir -p /home/nginx/html/dev

# 生成 demo 容器，后面会删除
docker run --name demo-nginx -p 9001:80 -d nginx
# 将容器文件复制到宿主机
docker cp demo-nginx:/etc/nginx/nginx.conf /home/nginx/conf/nginx.conf
docker cp demo-nginx:/etc/nginx/conf.d /home/nginx/conf/conf.d
docker cp demo-nginx:/usr/share/nginx/html/. /home/nginx/html/
docker cp demo-nginx:/var/log/nginx /home/nginx/log


# 停止 nginx 容器
docker stop demo-nginx
# 删除  nginx 容器
docker rm -f demo-nginx


# 创建容器
docker run \
-p 9002:80 \
--name nginx \
-v /home/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
-v /home/nginx/conf/conf.d:/etc/nginx/conf.d \
-v /home/nginx/log:/var/log/nginx \
-v /home/nginx/html:/usr/share/nginx/html \
-d nginx:latest

# 在主机上设置权限
# 设置目录权限
chown -R 101:101 /home/nginx/html
chmod -R 755 /home/nginx/html
chown -R 101:101 /home/nginx/html/dev
chmod -R 755 /home/nginx/html/dev
# 设置日志目录权限
chown -R 101:101 /home/nginx/log
chmod -R 755 /home/nginx/log


docker exec -it 72350f8f9207 chown -R nginx:nginx /usr/share/nginx/html/dev/.next
docker exec -it 72350f8f9207 chmod -R 755 /usr/share/nginx/html/dev/.next


chown -R 101:101 /usr/share/nginx/html
chmod -R 755 /usr/share/nginx/html
chown -R nginx:nginx /usr/share/nginx/html/dev
chmod -R 755 /usr/share/nginx/html/dev
chown -R nginx:nginx /usr/share/nginx/html/dev/.next
chmod -R 755 /usr/share/nginx/html/dev/.next


# 将主机 /etc/nginx/conf.d/default.conf 中 server_name 改成服务器地址，或者域名。
cd /etc/nginx/conf.d/default.conf
# 直接打开，修改 server_name 117.72.86.192;
```

/etc/nginx/conf.d/default.conf：

```nginx
server {
    listen       80;
    listen  [::]:80;
    server_name  117.72.86.192;

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html; # 使用容器内的路径
        index  index.html index.htm;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html; # 使用容器内的路径
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```

而且确保主机目录 /home/nginx/html 下有 html 文件。

去服务器开放端口，然后访问 <http://117.72.86.192:9002>，`Welcome to nginx!` 就成功了。

## 5. 安装 Jenkins

### 安装并运行

```bash
# 拉取镜像
docker pull jenkins/jenkins:2.426.2-lts # 需要指定版本号，不然拉取的镜像版本是比较老的版本

# 查看拉取的镜像
dis # docker images

# 创建挂载目录
mkdir -p /usr/docker/jenkins_home # 创建目录
chmod 777 jenkins_home # 授权权限

# 创建并运行容器
docker run -d -p 9090:8080 -p 50001:50000 \
-v /usr/docker/jenkins_home:/var/jenkins_home \
-v /etc/localtime:/etc/localtime \
-v /usr/bin/docker:/usr/local/bin/docker \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /usr/local/maven/apache-maven-3.8.8/conf/settings.xml:/usr/local/maven/conf/settings.xml \
-v /usr/local/maven/apache-maven-3.8.8:/usr/local/maven/apache-maven-3.8.8 \
-v /usr/local/java/jdk1.8.0_202:/usr/local/jdk1.8.0_202 \
--restart=on-failure \
-u 0 \
--name myjenkins \
jenkins/jenkins:2.426.2-lts

# 查看创建的容器
dps # docker ps

# 查看管理员密码
docker logs myjenkins

# 修改插件源
cd /usr/docker/jenkins_home/updates
sed -i 's#https://updates.jenkins.io/download#https://mirrors.tuna.tsinghua.edu.cn/jenkins#g' default.json && sed -i 's#https://www.google.com#https://www.baidu.com#g' default.json
cd /usr/docker/jenkins_home
sed -i 's#https://updates.jenkins.io#http://mirror.esuni.jp/jenkins/updates#g' hudson.model.UpdateCenter.xml
# 或
sed -i 's#https://updates.jenkins.io#https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates#g' hudson.model.UpdateCenter.xml
```

**-d** ：[后台运行](https://so.csdn.net/so/search?q=后台运行&spm=1001.2101.3001.7020) 容器

**-p**：端口映射， 左边是本地端口，右边是 docker 容器端口 ，8080 是 Jenkins Web 界面的工作端口,50000 是 JNLP（Java Network Launch Protocol）工作端口。这个端口用于 Jenkins 节点和主控节点之间的通信。

**-v** ：目录挂载，将主机上的 /usr/docker/jenkins_home 目录挂载到容器内的 /var/jenkins_home 目录，用于持久化 Jenkins 的数据。/etc/localtime:/etc/localtime：将本地主机上的时区信息文件挂载到容器内的 /etc/localtime 文件中，确保容器内的时间与主机上的时间一致

-v /usr/bin/docker:/usr/bin/docker: 将主机上的 /usr/bin/docker 文件挂载到容器中的 /usr/bin/docker，这样容器内的 Jenkins 可以直接使用宿主机上的 Docker 命令。在使用 GitLab/Jenkins 等 CI 软件的时候需要使用 Docker 命令来构建镜像，需要在容器中使用 Docker 命令；通过将宿主机的 Docker 共享给容器

-v /var/run/docker.sock:/var/run/docker.sock: 将主机上的 Docker socket 文件挂载到容器中的相同位置，这样容器内的 Jenkins 可以与宿主机上的 Docker 引擎进行通信。

**–restart = on-failure**：设置容器的重启策略为在容器以非零状态退出（异常退出）时重启。

**-u 0**：将容器内进程的用户身份设置为 root 用户，等同于 -u root。

**–name myjenkins**：给容器指定一个名称为 myjenkins。

如果需要修改创建容器时的某些配置，比如加一个挂载点，可以执行以下操作：

```bash
# 停止并移除旧的容器
docker stop myjenkins
docker rm myjenkins

# 重新创建容器并包含新的挂载点
docker run -d -p 9090:8080 -p 50001:50000 \
-v /usr/docker/jenkins_home:/var/jenkins_home \
-v /etc/localtime:/etc/localtime \
-v /usr/bin/docker:/usr/local/bin/docker \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /usr/local/maven/apache-maven-3.8.8/conf/settings.xml:/usr/local/maven/conf/settings.xml \
-v /usr/local/maven/apache-maven-3.8.8:/usr/local/maven/apache-maven-3.8.8 \
-v /usr/local/java/jdk1.8.0_202:/usr/local/jdk1.8.0_202 \
--restart=on-failure \
-u 0 \
--name myjenkins \
jenkins/jenkins:2.426.2-lts
```

### 登录

先去服务器开启防火墙 9090 端口。

在主机访问 <http://117.72.86.192:9090> 进行登录。密码就是上面获取到的管理密码。然后安装推荐的插件即可。

然后创建管理员用户。实例配置一般默认 URL 即可。<http://117.72.86.192:8080>

### 安装插件

除了推荐安装的插件之外，还有一些插件自行选择安装：

- Maven Integration（maven 构建工具）
- Docker
- NodeJS
- Publish Over SSH（远程推送工具）
- Gitlab Plugin （拉取 gitlab 中的源代码）
- Role-based Authorization Strategy（权限管理）
- Deploy to container（自动化部署工程所需要插件，部署到容器插件）
- git parameter（用户参数化构建过程里添加 git 类型参数）

在 Manage Jenkins--> Plugins --> Available plugins 中进行安装。安装完重启即可。

### 配置全局工具

找到系统管理 --> 全局工具配置

**JDK**

可以在 portainer 中，进入 jenkins 的控制台，找 jenkins 内部的 java，jenkins 默认提供一个 jdk17。当然，在上面创建并运行 jenkins 的时候，将主机上的 jdk1.8 也挂载到了 jenkins 中。挂载到了/usr/local/jdk1.8.0_202。可以根据项目情况进行选择。

```bash
java -version
which java
```

![[image-20241006221829002.png]]

```java
jdk1.8
/usr/local/jdk1.8.0_202
```

**maven**

```java
apache-maven-3.8.8
/usr/local/maven/apache-maven-3.8.8
```

**docker**

```java
docker
/usr/local/bin/docker
```

**NodeJS**

直接自动安装即可，当然也可以自己安装在主机上，然后通过创建 jenkins 容器时挂载。但没必要了，这里可选择的版本很多。

```java
nodejs
```

![[image-20241007091711672.png]]

### 配置凭据

系统管理 --> 凭据管理，创建一个凭据，用户名是 GitHub（或其他平台）的用户名，密码是 GitHub 的密码，然后其他可以默认。

![[image-20241006225304365.png]]

### 配置 SSH

#### 公钥

```bash
# 在jenkins容器内部使用以下命令在 /root/.ssh 目录下生成公钥和私钥文件：
# 进入容器
dps
docker exec -it b3449a912030 /bin/bash
ssh-keygen -t rsa # 敲三下回车
cat /root/.ssh/id_rsa.pub # 复制公钥内容

# GitHub 中添加 SSH keys

# 测试ssh连接
ssh -T git@github.com
```

#### 私钥

```bash
cat /root/.ssh/id_rsa
```

在 jenkins 中凭据管理，添加新的全局凭据。

![[image-20241007102343554.png]]

### Publish Over SSH

系统配置中，找到 `Publish over SSH` 下的 `SSH Server` 点击新增，并填写如下配置信息：

```bash
# 名称随意
jdcloud-dev

# 服务器 IP
117.72.86.192

# 服务器登录的用户名
root

# 登录后访问的服务器的地址
/

# 高级
# 勾选使用密码，然后输入登录服务器的密码
# 服务器端口默认22
```

点击下方的测试按钮进行测试，出现 `Success` 表示成功连接到服务器

### 后端 maven 项目构建

直接在首页新建任务 `lhp-01-big-market`。

如果是后端项目，则选择构建一个 maven 项目。

**Git**

填写仓库的 http 地址，然后选择凭据。

注意，GitHub 的分支要改成 `*/main`。

**Build--> Goals and options**

```java
clean install -Dmaven.test.skip=true
```

**Post Steps**

Add post-build step 中选择 `执行shell`

```shell
# 先删除之前的容器和镜像文件
if [ "$(docker ps -a | grep big-market-app)" ]; then
docker stop big-market-app
docker rm big-market-app
fi
if [ "$(docker images -q big-market-app)" ]; then
docker rmi big-market-app
fi

# 重新生成
cd /var/jenkins_home/workspace/lhp-01-big-market/big-market-app
docker build -t lhp/big-market-app .
docker run -itd -p 8091:8091 --name big-market-app lhp/big-market-app
```

当然，很多配置可以根据需求自行添加。

然后，在首页就可以看到 `lhp-01-big-market` 任务了。点击构建即可。

### 前端 React 项目构建

新建任务 `lhp-01-big-market-front `。

如果是前端项目，可以选择构建一个自由风格的软件项目。

**Git**

填写仓库的 http 地址，然后选择凭据。

注意，GitHub 的分支要改成 `*/main`。

然后点击立即构建，成功后进行后续操作。

**Build Steps**

选择 Execute NodeJS script，然后选择之前自动安装的 nodejs，然后点击立即构建。

![[image-20241007122829035.png]]

然后在上面步骤后，选择增加构建步骤，选执行 shell。输入以下命令，然后立即构建，查看一下，再换一下源。

```shell
#!/bin/bash
node -v 
npm -v 
echo $PATH
npm config set registry http://registry.npm.taobao.org # 换源（只换一次就行）
```

![[image-20241007123701086.png]]

然后再往上补充：

```shell
#!/bin/bash
node -v 
npm -v 
npm install
# npm i esbuild-linux-64@0.13.4 -D
echo "依赖安装成功"
npm run build
echo "打包成功"
echo $PATH
```

如果构建出现这个错误，就取消 `npm i esbuild-linux-64@0.13.4 -D` 注释。

![[image-20241007124002980.png]]

打包成功后显示：

![[image-20241007124052001.png]]

可以在服务器中看到打包后的 dist 文件（当然，Next.js 项目中生成的是.next 目录）。

```bash
cd /usr/docker/jenkins_home/workspace/lhp-01-big-market-front/
```

![[image-20241007124934433.png]]

然后就要将打包后的项目自动推送到 Nginx 配置的项目目录下。

```shell
#!/bin/bash
node -v 
npm -v 
npm install
# npm i esbuild-linux-64@0.13.4 -D
echo "依赖安装成功"
npm run build
echo "打包成功"
rm -rf dist.tar     # 每次构建删除已存在的dist压缩包
tar -zcvf dist.tar ./.next  #将.next文件压缩成dist.tar
echo "压缩 .next 目录为 dist.tar 成功"
echo $PATH
```

需要提前在本机安装好 Nginx。

在/home/nginx/html/下新建 dev 文件夹。

修改/etc/nginx/conf.d/default.conf：

```nginx
server {
    listen       80;
    listen  [::]:80;
    server_name  117.72.86.192;

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html/dev/.next; # 使用容器内的路径
        index  index.html index.htm;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html/dev/.next; # 使用容器内的路径
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```

然后再增加构建步骤，选 Send files or execute commands over SSH。

![[image-20241007125854627.png]]

- Source files：准备发送的文件，该文件是相对于这个项目的 workspace 目录。例如要发送/docker/jenkins_home/workspace/gitlab_web/dist.tar 到目标目录，则设置 Source files 为 dist.tar
- Remove prefix：目标文件前缀添加，例如要操作 src 下面的某个文件，就设置成 src, 本案例是跟目录，无需设置
- Remote directory：目标目录，本案例要复制到 dev 环境下的 dist 文件，/docker/html/dev
- Exec command：最后执行的命令，可在这里进行解压，删除，复制等操作

然后点击立即构建，构建成功后，访问 <http://117.72.86.192:9002>。

### 前端 Vue 项目构建

新建任务 `lhp-01-big-market-front-vue `。

如果是前端项目，可以选择构建一个自由风格的软件项目。

**Git**

填写仓库的 http 地址（如果配置了 SSH，最好使用 SSH）），然后选择凭据。

注意，GitHub 的分支要改成 `*/main`。

然后点击立即构建，成功后进行后续操作。

**Build Steps**

选择 Execute NodeJS script，然后选择之前自动安装的 nodejs，然后点击立即构建。

![[image-20241007122829035.png]]

然后在上面步骤后，选择增加构建步骤，选执行 shell。输入以下命令，然后立即构建，查看一下环境变量，再换一下源

```shell
#!/bin/bash
node -v 
npm -v 
npm config set registry http://registry.npm.taobao.org # 换源（只换一次就行）
npm install pnpm # 还是pnpm好用，下面构建的时候不知道为什么npm就不成功，pnpm就可以
pnpm -v
pnpm install -g vite # 如果之前没安装过vite，那么需要加上这一句（只执行一次即可）
echo $PATH
```

没问题再往上补充：

```shell
#!/bin/bash
node -v 
npm -v 
pnpm -v
pnpm install
echo "依赖安装成功"
pnpm run build
echo "打包成功"
echo $PATH
```

打包成功后显示：

![[image-20241008114408245.png]]

可以在服务器中看到打包后的 dist 文件（Next.js 项目中生成的是.next 目录）。

```bash
cd /usr/docker/jenkins_home/workspace/lhp-01-big-market-front-vue/
```

![[image-20241008114454759.png]]

然后就要将打包后的项目自动推送到 Nginx 配置的项目目录下。

```shell
#!/bin/bash
node -v 
npm -v 
pnpm -v
pnpm install
echo "依赖安装成功"
pnpm run build
echo "打包成功"
rm -rf dist.tar # 每次构建删除已存在的dist压缩包
tar -zcvf dist.tar ./dist  #将dist文件压缩成dist.tar
echo "压缩 dist 目录为 dist.tar 成功"
echo $PATH
```

需要提前在本机安装好 Nginx。

在/home/nginx/html/下新建 dev 文件夹。

修改/etc/nginx/conf.d/default.conf：

```nginx
server {
    listen       80;
    listen  [::]:80;
    server_name  117.72.86.192;

    # 设置前端静态文件的根目录
    location / {
        root   /usr/share/nginx/html/dev/dist; # 使用容器内的路径
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;  # 确保单页应用 (SPA) 的路由正常工作
    }

    # 代理 /api 请求到后端服务
    location /api/ {
        proxy_pass http://117.72.86.192:8091/api/; # 一定要注意，因为是代理的 /api 请求，所以也要跟上 api/
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 错误页面配置
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html; # 使用容器内的路径
    }
}
```

然后再增加构建步骤，选 Send files or execute commands over SSH。

![[image-20241008115359555.png]]

```shell
dist.tar
/home/nginx/html/dev

cd /home/nginx/html/dev
rm -rf dist/
rm -rf .next/
tar zxvf dist.tar
rm dist.tar
```

- Source files：准备发送的文件，该文件是相对于这个项目的 workspace 目录。例如要发送/docker/jenkins_home/workspace/gitlab_web/dist.tar 到目标目录，则设置 Source files 为 dist.tar
- Remove prefix：目标文件前缀添加，例如要操作 src 下面的某个文件，就设置成 src, 本案例是跟目录，无需设置
- Remote directory：目标目录，本案例要复制到 dev 环境下的 dist 文件，/docker/html/dev
- Exec command：最后执行的命令，可在这里进行解压，删除，复制等操作

然后点击立即构建，构建成功后，访问 <http://117.72.86.192:9002>。

如果域名有备案，则可以将 docker 中的 nginx 端口映射改成 80:80，这样不需要输入端口即可直接访问。

```bash
docker stop nginx
docker rm -f nginx

docker run \
-p 80:80 \
--name nginx \
-v /home/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
-v /home/nginx/conf/conf.d:/etc/nginx/conf.d \
-v /home/nginx/log:/var/log/nginx \
-v /home/nginx/html:/usr/share/nginx/html \
-d nginx:latest
```

否则就还是用 9002 端口吧。

在域名解析中添加：

![[image-20241008134308152.png]]

然后就可以通过域名 + 端口号的方式访问了。<http://pro.lhp.pub:9002>

## 前端 Vue

这里使用 vue3 + vite +

### 创建项目

在一个空的文件夹（要放项目的上一级）下，在终端创建 vue 项目：

```bash
pnpm create vite
cd big-market-front-vue
pnpm install
pnpm run dev
```

### 项目初始化

创建好项目后，进行如下操作：

- 删掉 `style.css` 文件和 `HelloWorld.vue` 文件
- 删除 `main.js` 中 `import './style.css'`
- 在 `package.json` 配置文件中，将 `"dev": "vite"` 改为 `"dev": "vite --open"`
- 删除 `App.vue` 中的内容，换成如下内容：

```vue
<template>
  <div>
    <h1>这是App</h1>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped></style>
```

将 `public` 包下的 `vite.svg` 删除，改成自己的 `logo.svg`。

在 `index.html` 中修改标题和 logo 文件名：

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/logo.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>抽奖系统</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

### 配置 vue 路由

```bash
pnpm i vue-router
```

修改 App.vue：

```vue
<template>
  <router-view />
</template>
```

在 src 目录下创建 views 文件夹，用来存放我们的 vue 页面，当然真正开发过程中还是需要根据需求划分好页面目录。

创建 Home.vue：

```vue
<template>
    <div>
        <h1>Home</h1>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped></style>
```

在 src 目录下创建 router 文件夹，并创建 index.js 文件，真正开发过程中随着路由的增多，可以划分不同模块的路由 js 文件，在 index.js 文件中引入。

创建 index.js：

```js
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component: () => import("../views/Home.vue"),
            meta: {
                title: "首页",
            },
        },
    ],
});

export default router;
```

在 main.js 中引入路由：

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 获取应用实例
const app = createApp(App)

// 引入路由
app.use(router)

// 将应用实例挂载到 DOM
app.mount('#app')
```

### 配置 pinia

```bash
pnpm i pinia
```

在 src 目录下创建 store 文件夹，自定义 js 文件，例如 user.js 可以用来缓存用户相关的数据（后续可以根据需求自定义不同模块的 js 文件）。

```js
import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            userInfo: {},
        }
    },
    getters: {
        
    },
    actions: {
        async getUserInfo() {
            // this.userInfo = await fetchUserInfo();
            this.userInfo = {
                name: '张三',
                age: 18
            };
        }
    }
});
```

在 main.js 中注册 pinia：

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// 获取应用实例
const app = createApp(App)

// 引入路由
app.use(router)

// 引入 Pinia
const pinia = createPinia()
app.use(pinia)

// 将应用实例挂载到 DOM
app.mount('#app')
```

使用 pinia：

在 Home.vue 中：

```vue
<template>
    <div>
        <h1>Home首页</h1>
    </div>
</template>

<script setup>

import { useUserStore } from '../store/user';
const userStore = useUserStore();

userStore.getUserInfo();
console.log(userStore.userInfo);

</script>

<style lang="scss" scoped></style>
```

### 配置 less

```bash
pnpm i less
```

这样，在 vue 页面中就可以使用 less 了：

```vue
<style lang="less" scoped>
</style>
```

### 引入 vuetify

```bash
pnpm i vuetify
```

main.js

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// 获取应用实例
const app = createApp(App)

// 引入路由
app.use(router)

// 引入 Pinia
const pinia = createPinia()
app.use(pinia)

// 引入 Vuetify
const vuetify = createVuetify({
    components,
    directives,
})
app.use(vuetify)

// 将应用实例挂载到 DOM
app.mount('#app')
```

然后安装图标和字体。

有两个选择：

[Material Design Icons - Icon Library - Pictogrammers](https://pictogrammers.com/library/mdi/ 'The original. Following Google&#x27;s Material Design guidelines for system icons, MDI is our largest library, touting over 7200 unique icons!')

```bash
pnpm add @mdi/font -D
```

然后在 src/plugins/vuetify.js 中配置：

```js
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import { createVuetify } from 'vuetify'

export default createVuetify({
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
  },
})
```

在 main.js 中添加：

```js
import vuetifyOptions from './plugins/vuetify' // 引入 vuetify.js 配置

...

// 引入 Vuetify
const vuetify = createVuetify({
    vuetifyOptions, // 使用 vuetify.js 中的配置
    components,
    directives,
})
```

然后在项目中使用：

```vue
<template>
  <v-icon icon="mdi-home" />
</template>
```

或者：（但这个不知道为什么不显示）

<https://fonts.google.com/icons>

```bash
pnpm add material-design-icons-iconfont -D
```

然后在 src/plugins/vuetify.js 中配置：

```js
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure your project is capable of handling css files
import { createVuetify } from 'vuetify'
import { aliases, md } from 'vuetify/iconsets/md'

export default createVuetify({
  icons: {
    defaultSet: 'md',
    aliases,
    sets: {
      md,
    },
  },
})
```

然后在项目中使用：

```vue
<template>
  <v-icon icon="home" />
</template>
```

### 配置 axios

```bash
pnpm i axios
```

在 src 目录下，创建 api 文件夹，然后创建 index.js：

```js
import axios from "axios";

axios.interceptors.request.use((config) => {
    // 拦截请求，做需要的处理，比如：
    // 1. 添加 token
    // 2. 添加全局 loading
    // 3. 添加全局错误处理
    // 4. ...
    return config;
}, (error) => {
    // 拦截http code为非200的请求，可以做提示或者其他处理
    // ...
})

axios.interceptors.response.use((response) => {
    // 拦截响应，做需要的处理，比如根据后端返回的code做全局提示处理，封装返回值等
    return response;
}, (error) => {
    // 拦截http code为非200的请求，可以做提示或者其他处理
    // ...
})

export default axios;
```

在 main.js 中引入封装好的 axios：

```js
import './api/index.js'
```

然后在 vite.config.js 中配置开发时代理，解决跨域问题：

```js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';
import path from 'path';

// 获取当前文件的目录
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const url = 'http://localhost:8081'; // 后端地址

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: url, // 需要代理的后端地址
        changeOrigin: true, // 允许跨域
        // 如果需要重写路径，可以取消注释下面这行
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 设置别名
    },
  },
});
```

在 api 文件夹下创建对应模块的 js 文件，例如 home.js（后续根据需求可以分成不同模块的 api 文件）。

因为我们上面的代理路径配置的是 `/api`，则这里的 url 路径是 `/api/home/info`，若配置的是 `/`，所以这里的 url 以 `/` 开头，为 `/home/info`。

```js
import http from './index.js'

export const getHomeData = () => {
    return http({
        url: '/api/home/info',
        method: 'get',
    })
}
```

在 vue 文件中调用接口：

```vue
<script setup>

import { getHomeData } from '../api/home';
async function getHomeData() {
    const res = await getHomeData();
    console.log(res);
}

</script>
```

## 16. Git

### 16.1. GitFlow 工作流

```java
docs: 文档说明
feat: init project
```

项目采用 GitFlow 工作流进行项目的版本控制。

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/20240429170912.png)

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/%E5%9B%BE%E7%89%871.png)

然后整理了一份我关于 GitFlow 的理解的表格。

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/20240429172852.png)

### 16.2. 配置 SSH 密钥

#### 16.2.1. 清空.ssh 文件夹下所有文件

清除在 `C:\Users\75286\.ssh\` 下的所有文件。

#### 16.2.2. 重新配置用户名和邮箱

```bash
git config --global user.name 'lihaopeng'
git config --global user.email '752869xxx@qq.com'
git config --list
```

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/20240428215846.png)

#### 16.2.3. 生成 ssh key

```bash
ssh-keygen -t rsa -C '752869xxx@qq.com'
```

连续回车即可，第一个回车是代表在默认文件 `id_rsa` 上生成 `ssh key`，第二个回车表示不设置密码，第三个回车是重复确认密码，不设置就不用管。

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/20240428220027.png)

#### 16.2.4. 查看 key

```bash
cat ~/.ssh/id_rsa.pub
```

#### 16.2.5. 配置 GitHub、Gitee

将 key 粘贴到 GitHub、Gitee 的 ssh 设置中。

GitHub

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/20240428220737.png)

Gitee

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/20240428220344.png)

这样就配置完成了。

### 16.3. 创建仓库

分别创建四个仓库，`shanyi`、`shanyi-api`、`shanyi-mis`、`shanyi-mis-api`。（以下只演示 `shanyi`）

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/20240429145105.png)

添加成员。

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/20240429150213.png)

然后在自己的账号上确认加入。

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/20240429150316.png)

这样，项目账号这里就能看到成员了。

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/20240429150427.png)

最后四个仓库创建完成。

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/20240429155750.png)

### 16.4. 本地初始化

来到我们的项目目录下，先修改一下 `.gitignore` 文件，排除配置文件（后端是 `application.yml`）。

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/20240429144820.png)

打开 `git bash`，执行以下命令。

```bash
git init 
git add .
git commit -m "init: 初始化项目"
git remote add origin https://gitee.com/sdu-xmsx/shanyi.git
git push -u origin "main"
```

注意，一定要加入开发成员，才能推送成功，否则会提示没有权限。

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/20240429150613.png)

这样，就可以看到远程 main 分支的代码了。

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/20240429150653.png)

### 16.5. 创建 develop 分支

在 main 分支下创建 develop 分支，并切换到该分支。

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/20240429151028.png)

然后推送该分支到远程。

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/20240429151243.png)

可以看到远程有该分支了。

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/20240429151329.png)

### 16.6. 创建 feature 分支

在 develop 分支下创建 feature 分支并切换到该分支（因为项目规模不大，这里就不按照功能创建分支了）。

然后推送到远程。

### 16.7. 创建 v1.0 标签

在 main 分支下创建标签 `v1.0`，并推送到远程。

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/20240429152039.png)

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/20240429152108.png)

看一眼仓库，已经有一标签了。

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/20240429152144.png)

## 其他

### RESTKit 工具环境配置

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/image-20240413162136946.png)

如果有要用到 token 的地方，到浏览器中复制，然后在该工具中进行配置。

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/image-20240414003841840.png)

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/image-20240414003954951.png)

然后在发请求时，就可以在请求头中看到了。

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/image-20240414004152761.png)

![](https://lhplanet-1316168555.cos.ap-beijing.myqcloud.com/shanyi/development-documentation/development-documentation-v3.0.assets/image-20240415011600264.png)
