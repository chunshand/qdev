import { Controller, Get, Param, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { AdminDecorators } from '@/common/admin.AdminDecorators';

@AdminDecorators()
@Controller('admin/user')
export class UserController {
  constructor(private userService: UserService) { }

  /**
   * 获取当前用户信息
   * @param req 
   * @returns 
   */
  @Get('info')
  info(@Request() req) {
    return this.userService.findInfo(req.user.userId);
  }

  /**
   * 获取当前用户信息
   * @param {number} id - 用户id 
   * @returns 
   */
  @Get('info:id')
  infoid(@Param('id') id: number) {
    return this.userService.findInfo(id);
  }

  @Get()
  find() {
    return this.userService.findAll();
  }
  /**
   * 设置用户角色
   */
  @Get('setRole')
  async setRole() {
  }

}
