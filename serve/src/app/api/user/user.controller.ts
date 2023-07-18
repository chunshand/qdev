import { ApiDecorators } from '@/common/api.decorators';
import { Controller, Get, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { FileService } from '@/app/common/file.service';

@ApiDecorators()
@ApiTags('前台用户模块')
@Controller('api/user')
export class UserController {
    constructor(
        private userService: UserService,
        private fileService: FileService,
    ) {

    }
    /**
     * 获取用户信息
     */
    @Get("info")
    async getInfo(@Request() req) {
        let userinfo: any = await this.userService.getUserInfo(req.user.userId)
        userinfo.avatar = await this.fileService.getFileUrl(userinfo.avatar);
        userinfo.userId = req.user.userId;
        return userinfo;
    }
}
