import { Body, Controller, Inject, Get, Post, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';
import { JwtService } from "@nestjs/jwt"
import { User } from '@/entity/user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { CACHE_MANAGER } from "@nestjs/cache-manager"
import { Cache } from 'cache-manager';
@ApiTags('后台登录')
@Controller('admin/login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly userService: UserService,

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
      throw new UnauthorizedException(value.toString());
    }
    const userRes: User = value as User;
    const TOKEN = await this.jwtService.signAsync({
      userId: userRes.id,
      admin: true
    });
    let auths = await this.userService.getUserAuth(userRes.id);
    const cacheAuths: string[] = auths.map((item) => {
      return item.path
    }).filter(item => item)
    const jsonStr = JSON.stringify(cacheAuths);
    await this.cacheManager.set(`auth:${userRes.id}`, jsonStr, 0);
    let r: string = await this.cacheManager.get(`auth:${userRes.id}`);
    return { token: 'bearer ' + TOKEN, jsonStr, r: JSON.parse(r) }
  }

}
