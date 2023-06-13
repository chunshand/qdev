import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';
import { ResultData } from '@/common/result';
import { JwtService } from "@nestjs/jwt"
import { Response } from 'express';
import { User } from '@/entity/user.entity';
@Controller('admin/login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService

  ) { }

  @Inject(JwtService)
  private jwtService: JwtService;

  @Post()
  async login(@Body() user: LoginDto, @Res({ passthrough: true }) res: Response) {
    let [status, value] = await this.loginService.login(user);
    if (!status) {
      return ResultData.error(401, value.toString())
    }
    const userRes: User = value as User;
    const TOKEN = await this.jwtService.signAsync({
      userId: userRes.id,
      admin: true
    });
    res.setHeader('authorization', 'bearer ' + TOKEN);
    return ResultData.success({ token: 'bearer ' + TOKEN });
  }
}
