import { Body, Controller, Inject, Get, Post, UnauthorizedException, Req, Res, Query } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';
import { JwtService } from "@nestjs/jwt"
import { User } from '@/entity/user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdministratorService } from '../administrator/administrator.service';
import { CACHE_MANAGER } from "@nestjs/cache-manager"
import { Cache } from 'cache-manager';
import { LogService } from '@/app/common/log.service';
import * as svgCaptcha from 'svg-captcha';

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
  async login(@Body() user: LoginDto, @Req() req) {
    if (
      req.session.code.toLocaleLowerCase() != user?.code?.toLocaleLowerCase() //读取前端传来的验证码和存储的验证码对比
    ) {
      throw new UnauthorizedException("验证码错误");
    }
    let [status, value] = await this.loginService.login(user);
    if (!status) {
      throw new UnauthorizedException(value as string);
    }

    const userRes: User = value as User;
    const access_token = this.jwtService.sign({
      userId: userRes.id,
      admin: userRes.admin,
      super: userRes.super
    });
    const refresh_token = this.jwtService.sign({
      userId: userRes.id
    }, {
      expiresIn: '7d'
    });

    let auths = await this.administratorService.getUserAuth(+userRes.id);
    const cacheAuths: string[] = auths.map((item) => {
      return item.path
    }).filter(item => item)
    const jsonStr = JSON.stringify(cacheAuths);
    await this.cacheManager.set(`auth:${userRes.id}`, jsonStr, 0);
    // 登录日志埋点
    await this.logService.createLoginLog(userRes.id, "web", "username", "admin");

    return { access_token: "bearer " + access_token, refresh_token: "bearer " + refresh_token }
  }


  @Get('refresh')
  async refresh(@Query('refresh_token') refreshToken: string) {
    try {
      const data = this.jwtService.verify(refreshToken);
      let [status, value] = await this.loginService.findUserById(+data.userId);
      if (!status) {
        throw new UnauthorizedException(value as string);
      }
      const userRes: User = value as User;
      const access_token = this.jwtService.sign({
        userId: userRes.id,
        admin: userRes.admin,
        super: userRes.super
      });
      const refresh_token = this.jwtService.sign({
        userId: userRes.id
      }, {
        expiresIn: '7d'
      });

      return {
        access_token: "bearer " + access_token, refresh_token: "bearer " + refresh_token
      }
    } catch (e) {
      throw new UnauthorizedException('token 已失效，请重新登录');
    }
  }

  /**
   * 验证码
   */
  @ApiOperation({ summary: '获取验证码' })
  @Get("captcha")
  captcha(@Req() req, @Res() res) {
    const captcha = svgCaptcha.createMathExpr({
      size: 4, //生成几个验证码
      fontSize: 56, //文字大小
      width: 100, //宽度
      height: 40, //高度
      background: '#dddddd', //背景颜色
      color: false,
      noise: 4
    });
    //存储验证码记录到session
    req.session.code = captcha.text;
    res.type('image/svg+xml');
    res.send(captcha.data);
  }

}
