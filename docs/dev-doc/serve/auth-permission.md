# 认证与权限

一个稍微复杂点的服务端，则就会带有认证与权限的机制。


## 说明

基于jwt机制，以及该项目有着 admin api 两个业务场景。但是用户体系则使用的同一个表，不同的是后台用户的admin字段为true作为区分，存储在jwt里。


## 装饰器


