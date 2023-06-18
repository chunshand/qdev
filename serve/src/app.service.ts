import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {
  onModuleInit() {

  }
  onApplicationBootstrap() {
    // 系统加载完成 模块全部加载完成
    console.log(`onApplicationBootstrap...`);
    console.log(this);
  }
}
