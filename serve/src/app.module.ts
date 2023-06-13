import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { ApiModule } from './api/api.module';
import { DBModule } from './db/db.module';

@Module({
    imports: [
        AdminModule,
        ApiModule,
        DBModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
