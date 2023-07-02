import { Controller, Get, Post, Param, Query, Body, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/createRole.dto';
import { findRoleDto } from './dto/findRole.dto';

@Controller('admin/role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService

  ) { }

  /**
   * 获取角色列表
   * @returns 
   */
  @Get()
  findAll(@Query() query: findRoleDto) {
    return this.roleService.findAll(query);
  }


  /**
   * 获取单个角色详情
   * @param id 
   * @returns 
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  /**
 * 删除单个角色
 * @param id 
 * @returns 
 */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }



  /**
   * 创建角色
   * @param role 
   * @returns 
   */
  @Post()
  async create(@Body() role: CreateRoleDto) {
    return this.roleService.create(role);
  }

  /**
   * 设置角色菜单权限
   */
  @Post('setAuth')
  async setAuth() {

  }
}
