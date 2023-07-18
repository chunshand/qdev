import { Body, Controller, Inject, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginService } from './login.service';
import { LogService } from '@/app/common/log.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/entity/user.entity';

@ApiTags('前台登录模块')
@Controller('api/login')
export class LoginController {
    constructor(
        private readonly loginService: LoginService,
        private readonly logService: LogService,

    ) { }

    @Inject(JwtService)
    private jwtService: JwtService;

    /**
     * 账号密码登录
     */
    @Post("username")
    async login(@Body() body) {
        let [status, value] = await this.loginService.login(body);
        if (!status) {
            throw new UnauthorizedException(value as string);
        }
        const userRes: User = value as User;
        const TOKEN = await this.jwtService.signAsync({
            userId: userRes.id,
            admin: userRes.admin,
            super: userRes.super
        });
        // 登录日志埋点
        await this.logService.createLoginLog(userRes.id, "username", "web");
        return { token: 'bearer ' + TOKEN }
    }

    // 三方与小程序登录 假如无关联账号则自动创建一个账号与之关联

    /**
     * 第三方登录 微信 微博 腾讯 钉钉 github gitee 等
     */
    @Post("third")
    third() {

    }

    /**
     * 小程序登录
     */
    @Post("mp")
    mp() {

    }

    /**
     * 微信公众号扫码登录
     */


}
