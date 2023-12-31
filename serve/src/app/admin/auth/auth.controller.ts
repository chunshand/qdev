import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminDecorators } from '@/common/admin.decorators';

@AdminDecorators()
@ApiTags('后台权限')
@Controller('admin/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  /**
   * 获取权限列表
   */
  @ApiOperation({ summary: '获取全部权限' })
  @Get('allAuth')
  allAuth() {
    return this.authService.findAll();
  }
  /**
   * 获取全部动作列表
   */
  @ApiOperation({ summary: '获取全部动作列表' })
  @Get('allAction')
  allAction() {
    return this.authService.findAppAllRoutesBySwaggerApi();
  }

  /**
   * 获取全部菜单(菜单 目录 页面)
   */
  @ApiOperation({ summary: '获取全部菜单列表' })
  @Get('allMenu')
  allMenu() {
    return this.authService.findMenu();
  }

  // ------------------------------------------

  /**
 * 创建
 */
  @ApiOperation({ summary: '创建权限' })
  @Post("create")
  async create(@Body() createAuthDto: CreateAuthDto) {
    let obj: any = createAuthDto as any;
    if (obj.parent) {
      obj.parent = await this.authService.findOne(obj.parent);
    }
    return this.authService.create(obj);
  }

  /**
   * 更新详情
   */
  @ApiOperation({ summary: '更新权限' })
  @Patch('update')
  update(@Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+updateAuthDto.id, updateAuthDto);
  }

  /**
   * 删除
   * @param id 
   * @returns 
   */
  @ApiOperation({ summary: '删除权限' })
  @Delete('remove')
  remove(@Query('id') id: string) {
    return this.authService.remove(+id);
  }

  /**
   * 删除
   * @param id 
   * @returns 
   */
  @ApiOperation({ summary: '查询详情' })
  @Get('find')
  find(@Query('id') id: string) {
    return this.authService.findOne(+id);
  }
  
}
