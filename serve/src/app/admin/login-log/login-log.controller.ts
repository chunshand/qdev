import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LoginLogService } from './login-log.service';

import { FindLoginLogDto } from './dto/find-login-log.dto';
import { AdminDecorators } from '@/common/admin.decorators';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@AdminDecorators()
@ApiTags('后台登录日志')
@Controller('admin/login-log')
export class LoginLogController {
    constructor(private readonly loginLogService: LoginLogService) { }

    @ApiOperation({ summary: '获取登录日志' })
    @Get("list")
    list(@Query() query: FindLoginLogDto) {
        return this.loginLogService.list(query);
    }

}
