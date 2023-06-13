import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { ApiModule } from './api/api.module';
import { DBModule } from './config/db.module';
import { JwtModule } from './config/jwt.module';

@Module({
  imports: [
    AdminModule,
    ApiModule,
    DBModule,
    JwtModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
