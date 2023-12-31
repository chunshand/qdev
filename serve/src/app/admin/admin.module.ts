import { Module } from '@nestjs/common';
import { AdministratorModule } from './administrator/administrator.module';
import { LoginModule } from './login/login.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { MemberModule } from './member/member.module';
import { CommonModule } from './common/common.module';
import { SysConfigModule } from './sys-config/sys-config.module';
import { LoginLogModule } from './login-log/login-log.module';
import { ArticleModule } from './article/article.module';
@Module({
    controllers: [],
    imports: [
        AdministratorModule,
        LoginModule,
        RoleModule,
        AuthModule,
        MemberModule,
        CommonModule,
        SysConfigModule,
        LoginLogModule,
        ArticleModule,
    ]
})
export class AdminModule { }
