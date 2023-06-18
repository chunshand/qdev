import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { LoginModule } from './login/login.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';

@Module({
    controllers: [],
    imports: [
        UserModule,
        LoginModule,
        RoleModule,
        AuthModule
    ]
})
export class AdminModule { }
