import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('后台权限')
@Controller('admin/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /**
   * 获取全部动作列表
   */
  @Get('allAction')
  getAllAction() {
    return this.authService.findAppAllRoutesBySwaggerApi();
  }

  /**
   * 创建
   */
  @ApiOperation({ summary: '创建权限' })
  @Post()
  async create(@Body() createAuthDto: CreateAuthDto) {
    let obj: any = createAuthDto as any;
    if (obj.parent) {
      obj.parent = await this.authService.findOne(obj.parent);
    }
    return this.authService.create(obj);
  }

  /**
   * 获取全部菜单(菜单 目录 页面)
   */
  @ApiOperation({ summary: '获取全部菜单列表' })
  @Get('menu')
  findMenuAll() {
    return this.authService.findMenu();
  }
  /**
 * 获取全部权限
 */
  @ApiOperation({ summary: '获取全部权限' })
  @Get()
  findAll() {
    return this.authService.findAll();
  }
  /**
   * 获取权限列表
   */
  @ApiOperation({ summary: '获取全部权限' })
  @Get('all')
  all() {
    return this.authService.findAll();
  }

  /**
   * 获取详情
   * @param id 
   * @returns 
   */
  @ApiOperation({ summary: '获取权限详情' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  /**
   * 更新详情
   * @param id 
   * @param updateAuthDto 
   * @returns 
   */
  @ApiOperation({ summary: '更新权限' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  /**
   * 删除
   * @param id 
   * @returns 
   */
  @ApiOperation({ summary: '删除权限' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }


}
