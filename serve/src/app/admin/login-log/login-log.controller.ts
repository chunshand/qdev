import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LoginLogService } from './login-log.service';
import { CreateLoginLogDto } from './dto/create-login-log.dto';
import { UpdateLoginLogDto } from './dto/update-login-log.dto';
import { FindLoginLogDto } from './dto/find-login-log.dto';

@Controller('admin/login-log')
export class LoginLogController {
    constructor(private readonly loginLogService: LoginLogService) { }

    @Get("list")
    list(@Query() query: FindLoginLogDto) {
        return this.loginLogService.list(query);
    }

}
