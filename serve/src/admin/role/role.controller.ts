import { Controller, Get, Post, Param, Query, Body, Delete, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/createRole.dto';
import { findRoleDto } from './dto/findRole.dto';

@Controller('admin/role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService

  ) { }
  /**
 * 获取角色权限
 */
  @Get("auth")
  getRoleAuth(@Query() query) {
    return this.roleService.getRoleAuth(+query.roleId);
  }
  /**
 * 设置角色权限
 */
  @Post("auth")
  setRoleAuth(@Body() body) {
    return this.roleService.setRoleAuth(+body.roleId, body.authIds);
  }
  /**
   * 获取角色列表
   * @returns 
   */
  @Get('all')
  findAll() {
    return this.roleService.findAll();
  }
  /**
   * 获取角色列表
   * @returns 
   */
  @Get()
  find(@Query() query: findRoleDto) {
    return this.roleService.find(query);
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
   * 修改角色
   * @param role 
   * @returns 
   */
  @Put(':id')
  async update(@Param('id') id: string, @Body() role: CreateRoleDto) {
    return this.roleService.update(+id, role);
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
