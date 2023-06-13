import { Controller, Get, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { ResultData } from '@/common/result';
import { AdminDecorators } from '@/common/admin.AdminDecorators';

@AdminDecorators()
@Controller('admin/user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('info')
    async info(@Request() req) {
        // TODO 无id查询自身
        const userInfo = await this.userService.findInfo(req.user.userId);
        return ResultData.success(userInfo)
    }
    @Get()
    async find() {
        let users = await this.userService.findAll();
        return ResultData.success(users)
    }
}
