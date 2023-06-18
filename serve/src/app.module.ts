import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AdminModule } from './admin/admin.module';
import { ApiModule } from './api/api.module';
import { DBModule } from './config/db.module';
import { JwtModule } from './config/jwt.module';
import { TransformInterceptor } from './common/transform.interceptor';
import { AppService } from './app.service';
@Module({
  imports: [
    AdminModule,
    ApiModule,
    DBModule,
    JwtModule
  ],
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor
    }
  ],
})
export class AppModule {

}
