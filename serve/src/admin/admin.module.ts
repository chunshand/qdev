import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UserModule } from './user/user.module';
import { LoginModule } from './login/login.module';

@Module({
    controllers: [AdminController],
    imports: [UserModule, LoginModule]
})
export class AdminModule { }
