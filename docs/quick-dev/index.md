# 快速上手


:::tip 提示
本项目为前后端分离架构
:::

## 安装


克隆项目

```shell
git clone https://github.com/chunshand/qdev
cd ./qdev
```


## 开发


```shell

# 我用的是yarn 其他把管理器随意 大同小异

# 启动服务
cd ./serve
yarn
yarn run dev

# 启动后台
cd ./admin
yarn
yarn run dev

# 启动前台
cd ./web
yarn
yarn run dev
```



## 项目配置

```yml
# serve/configyml
# 该文件为后端配置文件 目前主要是数据库的配置信息
# 应用
app:
  port: 3000

# 数据库
db:
  default: "mysql"
  mysql:
    host: "localhost"
    port: 3306
    username: "root"
    password: "root"
    database: "qdev"

# 存储
storage:
  default: "local"
  local:
  oss:
  cos:
# 第三方登录
# 微信
# 小程序
# 存储

```
## 说明

- 本项目的管理员与会员为一个表，使用`admin`区分，其中额外增加了`super`字段，无视任何权限限制的特殊存在。
- 初次使用无发生成动态菜单的话，可使用`./serve/sql/qdev.sql`数据导入使用


## 部署

### dockerfile

### docker-compose

### pm2

