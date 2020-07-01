
## 小张酷炫生活小程序（小张私厨小程序）

> 基于`Taro v2.2.9`开发，技术栈主要是：`React+taro+taro-ui+redux`,目前主要是着重小程序端的展示，主要也是借此项目强化下上述几个技术栈的使用，欢迎`watch`和`star`～

<hr/>

### 快速开始

#### 注意事项

**目前已将`taro`的版本升级到最新版本`2.2.9`,确保你本地的`taro-cli`的版本也是这个版本，可以通过`taro info`查看版本号，如果不是最新的话，可以通过执行`taro update self`(`mac`或者`linux`前面需要加上`sudo`)以及`taro update project`进行`cli`与项目依赖的更新保持一致，否则将会导致项目无法正常运行，了解更多详情可查看[Taro 环境及依赖检测](http://taro-docs.jd.com/taro/docs/GETTING-STARTED.html#%E7%8E%AF%E5%A2%83%E5%8F%8A%E4%BE%9D%E8%B5%96%E6%A3%80%E6%B5%8B)**

**首先修改在 config 目录下的`dev.js/prod.js`**,可以根据自己的需要将其替换成线上地址，接口服务是使用的[weapp-MrsZhangPrivateKitchen-Backend](https://github.com/54853315/weapp-MrsZhangPrivateKitchen-Backend)

```
const HOST = '"http://192.168.31.98:8080/api"' // 这里配置的这个url是后端服务的请求地址

```

> 在运行本项目前，请先确保已经全局安装了 Taro，安装可见[官网指导](https://nervjs.github.io/taro/docs/GETTING-STARTED.html)

```
启动后端接口服务

git clone https://github.com/54853315/weapp-MrsZhangPrivateKitchen-Backend

cd weapp-MrsZhangPrivateKitchen-Backend

# 使用docker-compose启动
docker-compose up -d 

# 或 编译启动
#go run main.go

接下来启动前端项目

git clone https://github.com/54853315/weapp-MrsZhangPrivateKitchen

cd weapp-MrsZhangPrivateKitchen

npm i

npm run dev:weapp

```

### 功能列表

- [x] 用户登陆
- [x] 动态时间线列表
- [x] 发布食品动态
- [ ] 我的发布列表
- [ ] 评论列表
- [ ] 搜索

由于在完成3个核心功能后尝试发布小程序时，才发现个人无法发布具有社交性质的小程序，因此只好弃坑了。