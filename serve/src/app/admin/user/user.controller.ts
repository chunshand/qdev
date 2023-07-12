import { Controller, Get, Request, Query, Post, Body, Delete, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { AdminDecorators } from '@/common/admin.AdminDecorators';
import { FindUserDto } from './dto/findUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { recursion } from '@/utils/tools';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResDecorators } from '@/common/res.decorators';
import { PageDto } from '@/common/page.dto';


@AdminDecorators()
@ApiTags('后台用户')
@Controller('admin/user')
export class UserController {
    constructor(private userService: UserService) { }
    /**
    * 获取用户的角色列表
    */
    @ApiOperation({ summary: '获取用户的角色列表' })
    @Get('getRoleList')
    @ResDecorators(PageDto)
    // @ApiOkResponse({
    //     type: IntersectionType(ResultData, v)
    // })
    getRoleList(@Request() req, @Query() query) {
        let userId = query.userId ? query.userId : req.user.userId;
        return this.userService.getUserRole(userId);
    }

    /**
     * 获取用户的菜单列表
     */
    @ApiOperation({ summary: '获取用户的菜单列表' })
    @Get('getMenuList')
    async getMenuList(@Request() req, @Query() query) {
        let userId = query.userId ? query.userId : req.user.userId;
        let auths = await this.userService.getUserAuth(userId);
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
        let auths = await this.userService.getUserAuth(userId);
        return recursion(auths);
    }

    /**
    * 设置用户角色
    */
    @ApiOperation({ summary: '设置用的角色' })
    @Post('setRole')
    setRole(@Request() req, @Body() body) {
        let userId = body.userId ? body.userId : req.user.userId;

        return this.userService.setUserRole(userId, body.rolesIds);
    }

    /**
     * 获取当前用户信息
     * @param req 
     * @returns 
     */
    @ApiOperation({ summary: '获取用户信息' })
    @Get('info')
    info(@Request() req, @Query() query) {
        let userId = query.userId ? query.userId : req.user.userId;
        return this.userService.findInfo(userId);
    }

    @ApiOperation({ summary: '获取用户列表' })
    @Get()
    find(@Query() query: FindUserDto) {
        return this.userService.findAll(query);
    }


    /**
     * 创建用户
     */
    @ApiOperation({ summary: '创建用户' })
    @Post()
    create(@Body() body: CreateUserDto) {
        return this.userService.create(body);
    }

    /**
     * 删除用户
     */
    @ApiOperation({ summary: '删除用户' })
    @Delete('del')
    remove(@Query('id') id: string) {
        return this.userService.remove(id);
    }

    /**
     * 更新用户
     */
    @ApiOperation({ summary: '更新用户' })
    @Patch('patch')
    update(@Body() updateAuthDto: UpdateUserDto) {
        return this.userService.update(updateAuthDto.id, updateAuthDto);
    }


}
