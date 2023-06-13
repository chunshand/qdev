import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ResultData } from '@/common/result';
@Controller('admin/user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    async find() {
        let users = await this.userService.findAll();
        return ResultData.success(users)
    }
}
