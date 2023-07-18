import { Body, Controller, Inject, Get, Post, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';
import { JwtService } from "@nestjs/jwt"
import { User } from '@/entity/user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdministratorService } from '../administrator/administrator.service';
import { CACHE_MANAGER } from "@nestjs/cache-manager"
import { Cache } from 'cache-manager';
import { LogService } from '@/app/common/log.service';
@ApiTags('后台登录')
@Controller('admin/login')
export class LoginController {
    constructor(
        private readonly loginService: LoginService,
        private readonly administratorService: AdministratorService,
        private readonly logService: LogService,

    ) { }

    @Inject(JwtService)
    private jwtService: JwtService;
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache
    /**
     * 登录
     */
    @ApiOperation({ summary: '账号密码登录' })
    @Post()
    async login(@Body() user: LoginDto) {
        let [status, value] = await this.loginService.login(user);
        if (!status) {
            throw new UnauthorizedException(value as string);
        }

        const userRes: User = value as User;
        const TOKEN = await this.jwtService.signAsync({
            userId: userRes.id,
            admin: userRes.admin,
            super: userRes.super
        });
        let auths = await this.administratorService.getUserAuth(+userRes.id);
        const cacheAuths: string[] = auths.map((item) => {
            return item.path
        }).filter(item => item)
        const jsonStr = JSON.stringify(cacheAuths);
        await this.cacheManager.set(`auth:${userRes.id}`, jsonStr, 0);
        // 登录日志埋点
        await this.logService.createLoginLog(userRes.id, "web", "username", "admin");
        return { token: 'bearer ' + TOKEN }
    }

}
