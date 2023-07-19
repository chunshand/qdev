import { Controller, Get, Request, Query, Post, Body, Delete, Patch } from '@nestjs/common';
import { AdminDecorators } from '@/common/admin.decorators';
import { FindUserDto } from './dto/findUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { recursion } from '@/utils/tools';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdministratorService } from './administrator.service';
import { FileService } from '@/app/common/file.service';


@AdminDecorators()
@ApiTags('后台管理员管理')
@Controller('admin/administrator')
export class AdministratorController {
    constructor(
        private administratorService: AdministratorService,
        private fileService: FileService,
    ) { }
    /**
    * 获取用户的角色列表
    */
    @ApiOperation({ summary: '获取用户的角色列表' })
    @Get('getRoleList')
    // @ResDecorators(PageDto)
    getRoleList(@Request() req, @Query() query) {
        let userId = query.userId ? query.userId : req.user.userId;
        return this.administratorService.getUserRole(userId);
    }

    /**
     * 获取用户的菜单列表
     */
    @ApiOperation({ summary: '获取用户的菜单列表' })
    @Get('getMenuList')
    async getMenuList(@Request() req, @Query() query) {
        let userId = query.userId ? query.userId : req.user.userId;
        let auths = await this.administratorService.getUserAuth(userId);
        auths = auths.filter((item) => {
            return ["catalog", "menu", "page"].includes(item.type)
        })
        return recursion(auths);
    }

    /*
    * 获取用户的权限列表
    */
    @ApiOperation({ summary: '获取用户的权限列表' })
    @Get('getAuthList')
    async getAuthList(@Request() req, @Query() query) {
        let userId = query.userId ? query.userId : req.user.userId;
        let auths = await this.administratorService.getUserAuth(userId);
        return recursion(auths);
    }

    /**
    * 设置用户角色
    */
    @ApiOperation({ summary: '设置用的角色' })
    @Post('setRole')
    setRole(@Request() req, @Body() body) {
        let userId = body.userId ? body.userId : req.user.userId;

        return this.administratorService.setUserRole(userId, body.rolesIds);
    }
    // -------------------------------------------------------------------------------
    /**
     * 获取当前用户信息
     * @param req
     * @returns
     */
    @ApiOperation({ summary: '获取用户信息' })
    @Get('find')
    async find(@Request() req, @Query() query) {
        let userId = query.userId ? query.userId : req.user.userId;
        let user = await this.administratorService.findInfo(userId);
        return user
    }

    @ApiOperation({ summary: '获取用户列表' })
    @Get("list")
    list(@Query() query: FindUserDto) {
        return this.administratorService.findAll(query);
    }


    /**
     * 创建用户
     */
    @ApiOperation({ summary: '创建用户' })
    @Post("create")
    create(@Body() body: CreateUserDto) {
        return this.administratorService.create(body);
    }

    /**
     * 删除用户
     */
    @ApiOperation({ summary: '删除用户' })
    @Delete('remove')
    remove(@Query('id') id: string) {
        return this.administratorService.remove(id);
    }

    /**
     * 更新用户
     */
    @ApiOperation({ summary: '更新用户' })
    @Patch('update')
    update(@Body() updateAuthDto: UpdateUserDto) {
        return this.administratorService.update(updateAuthDto.id, updateAuthDto);
    }


}
