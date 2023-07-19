import { ApiDecorators } from '@/common/api.decorators';
import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiDecorators()
@ApiTags('前台用户模块')
@Controller('api/user')
export class UserController {
    constructor(
        private userService: UserService,
    ) {

    }
    /**
     * 获取用户信息
     */
    @Get("info")
    async getInfo(@Request() req) {
        let userinfo: any = await this.userService.getUserInfo(req.user.userId)
        userinfo.userId = req.user.userId;
        return userinfo;
    }

    /**
     * 保存个人信息
     */

    @Post("update-info")
    async updateInfo(@Request() req, @Body() body) {
        return this.userService.updateUserInfo(req.user.userId, body)
    }
}
