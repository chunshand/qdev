import { Body, Controller, Inject, Get, Post, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';
import { JwtService } from "@nestjs/jwt"
import { User } from '@/entity/user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('后台登录')
@Controller('admin/login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService

  ) { }

  @Inject(JwtService)
  private jwtService: JwtService;

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
    return { token: 'bearer ' + TOKEN }
  }

}
