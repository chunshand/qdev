# 目录结构

```
- src
    - app
        - admin 后台接口
        - api 前台接口
        - common 公共接口
    - common 公共
    - entity TypeOrm实体
    - lib 拓展模块
    - share 共享模块
    - utils 工具
- config.yml 项目配置文件
- uploads  文件下载目录
- app.module.ts
- app.service.ts
- main.ts
```

## app.module(主模块)

主模块为项目入口模块，不做任何功能性的作用，主模块主要加载其他模块完成依赖关系。主模块包含了：app/admin、app/api、app/common和lib/*。

```typescript
// app.module.ts
{
    imports: [
        AdminModule,
        ApiModule,
        CommonModule,
        ...LibModules,
    ],
}
```

## app

app下主要是针对后台、前台、公共三个业务场景的接口模块。


## common 公共

该目录的内容暂时比较有些杂乱，包含了一些装饰器、过滤器、dto、结构、配置之类的文件。属于app模块下必备的内容。

## lib 拓展模块

该文件夹下，为拓展模块，与app下模块功能注册在app.moddule同级。包含了缓存、配置、数据库、jwt等。

## share 功能模块

该目录下为功能模块，一个模块对应一个模块，模块导出功能服务，提供给app下模块的使用。这其中包含例如：三方登录、邮箱。

## utils 工具

该目录下主要为一些会使用到的工具方法，例如加密、解密、生成md5、uuid之类的方法。


## entity 实体

该目录下存储的全部都是typeorm实体文件，将该项目所用到实体聚集一处，方便管理。也方便不同模块引用路径问题。