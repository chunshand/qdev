import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';
import { ResultData } from '@/common/result';

@Controller('admin/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Post()
  async login(@Body() user: LoginDto) {
    let [status, value] = await this.loginService.login(user);
    if (!status) {
      return ResultData.error(401, value.toString())
    }
    return ResultData.success();
  }
}
