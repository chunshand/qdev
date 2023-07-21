# QDEV

Qdev是一个包含前台(web)、后台(admin)、后端(serve)、开发文档(docs)全栈项目。

其中后端使用的是 Nestjs 开发的，后台则是在[v3-admin-vite](https://github.com/un-pany/v3-admin-vite)基础上开发，其中也增加了很多常用的业务组件。docs暂时还未开始。

具体的进度可以看后面的任务列表。

欢迎大家一起学习交流（新建了个群：**532164577**）共同进步，感觉好不错的话，来一发 **Star** 吧


## 项目

- admin-后台 port:3000（开发中）
- serve-后端 port:3333（开发中）
- docs-文档 port:8080（未开始）
- web-前台 port:5173（开发中）

## 预览
![Alt text](/images/image-2.png)
![Alt text](/images/image-6.png)
![Alt text](/images/image-7.png)
![Alt text](/images/image-4.png)
![Alt text](/images/image-3.png)
![Alt text](/images/image-5.png)

## 任务列表

- [x] 登录
- [x] 安全认证
- [x] 权限认证
- [x] 权限菜单
- [x] 角色管理
- [x] 管理员管理
- [x] 会员管理
- [x] 资料修改
- [x] 文章管理
- [x] 输入验证 wip
- [ ] API文档
- [x] 系统配置管理
- [ ] 系统日志
- [x] 登录日志
- [ ] 附件管理
- [ ] 验证码登录
- [ ] 邮件功能
- [ ] 导出功能
- [ ] 文件存储
  - [x] 本地文件存储
  - [ ] OSS 阿里云对象存储
  - [ ] COS 腾讯云对象存储
  - [ ] VOD 阿里云视频点播
  - [ ] 直播等
- [ ] 消息管理
  - [ ] 消息模板
  - [ ] 发布消息
  - [ ] 定时消息
- [ ] 定时任务
  - [ ] 动态添加任务
- [ ] 三方登录
- [ ] 微信公众号
- [ ] 微信小程序
- [ ] WebSocket
- [ ] 部署
    - [ ] dockerfile 部署配置
    - [ ] docker-compose.yml 部署配置

# 最后

- 关于权限数据问题，可以使用最新导出的 `./sql/qdev.sql`