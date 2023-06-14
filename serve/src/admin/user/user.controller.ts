import { Controller, Get, Param, Request, Query, Post, Body, Delete, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { AdminDecorators } from '@/common/admin.AdminDecorators';
import { FindUserDto } from './dto/findUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

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
  find(@Query() query: FindUserDto) {
    return this.userService.findAll(query);
  }
  /**
   * 设置用户角色
   */
  @Get('setRole')
  async setRole() {
  }

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateUserDto) {
    return this.userService.update(+id, updateAuthDto);
  }
}
