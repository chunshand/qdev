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
   * 获取用的权限列表
   */
    @Get('getAuthList')
    getAuthList(@Request() req) {
        let userId = req.user.userId;
        // 查询
        return this.userService.getUserAuth(userId);
    }

    /**
     * 获取用户的菜单列表
     */
    @Get('getMenuList')
    async getMenuList(@Request() req) {
        let userId = req.user.userId;
        let auths = await this.userService.getUserAuth(userId);
        auths = auths.filter((item) => {
            return ["catalog", "menu", "page"].includes(item.type)
        })
        return auths;
    }

    /**
    * 设置用户角色
    */
    @Post('setRole')
    setRole(@Request() req, @Body() body) {
        let userId = req.user.id;
        return req.user;
    }

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
     * 创建用户
     */
    @Post()
    create(@Body() body: CreateUserDto) {
        return this.userService.create(body);
    }

    /**
     * 删除用户
     */
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }

    /**
     * 更新用户
     */
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAuthDto: UpdateUserDto) {
        return this.userService.update(+id, updateAuthDto);
    }


}
