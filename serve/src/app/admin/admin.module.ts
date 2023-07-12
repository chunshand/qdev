import { Module } from '@nestjs/common';
import { AdministratorModule } from './administrator/administrator.module';
import { LoginModule } from './login/login.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { MemberModule } from './member/member.module';

@Module({
    controllers: [],
    imports: [
        AdministratorModule,
        LoginModule,
        RoleModule,
        AuthModule,
        MemberModule
    ]
})
export class AdminModule { }
