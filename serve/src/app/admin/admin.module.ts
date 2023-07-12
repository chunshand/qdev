import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { LoginModule } from './login/login.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { MemberModule } from './member/member.module';

@Module({
    controllers: [],
    imports: [
        UserModule,
        LoginModule,
        RoleModule,
        AuthModule,
        MemberModule
    ]
})
export class AdminModule { }
