# 快速上手


:::tip 提示
本项目为前后端分离架构，在使用本仓库代码时，你需要对前端有了一定的基础知识，以及Nestjs、Nuxt框架的基本使用。
假如还未有这些前置知识，可以先阅读对应技术文档，边学边写。
:::

## 安装


克隆项目

```shell
git clone https://github.com/chunshand/qdev
cd ./qdev
```
## 项目配置

数据库默认使用的是`mysql`，还需保证你有`mysql服务`开发环境。

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
**说明**

- 本项目的管理员与会员为一个表，使用`admin`字段区分，其中额外增加了`super`字段，无视任何权限限制的特殊存在。
- 初次使用无发生成动态菜单的话，可使用`./serve/sql/qdev.sql`数据导入使用

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






## 部署

### dockerfile

### docker-compose

### pm2

