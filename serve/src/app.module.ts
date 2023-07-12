import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AdminModule } from '@/app/admin/admin.module';
import { ApiModule } from '@/app/api/api.module';
import { CommonModule } from '@/app/common/common.module';
import { TransformInterceptor } from './common/transform.interceptor';
import { AppService } from '@/app.service';
import { LibModules } from '@/lib';
@Module({
    imports: [
        AdminModule,
        ApiModule,
        ...LibModules,
        CommonModule,

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
