import { Body, Controller, Inject, Post, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';
import { JwtService } from "@nestjs/jwt"
import { User } from '@/entity/user.entity';
import { ApiOperation } from '@nestjs/swagger';
@Controller('admin/login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService

  ) { }

  @Inject(JwtService)
  private jwtService: JwtService;

  @ApiOperation({ summary: '登录' })
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
