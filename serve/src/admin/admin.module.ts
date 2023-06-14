import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UserModule } from './user/user.module';
import { LoginModule } from './login/login.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';

@Module({
    controllers: [AdminController],
    imports: [UserModule, LoginModule, RoleModule, AuthModule]
})
export class AdminModule { }
