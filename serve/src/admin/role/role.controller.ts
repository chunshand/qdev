import { Controller, Get, Post, Param, Query, Body, Delete, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/createRole.dto';
import { findRoleDto } from './dto/findRole.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('后台角色')
@Controller('admin/role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService

  ) { }
  /**
 * 获取角色权限
 */
  @ApiOperation({ summary: '获取角色权限' })
  @Get("auth")
  getRoleAuth(@Query() query) {
    return this.roleService.getRoleAuth(+query.roleId);
  }
  /**
 * 设置角色权限
 */
  @ApiOperation({ summary: '设置角色权限' })
  @Post("auth")
  setRoleAuth(@Body() body) {
    return this.roleService.setRoleAuth(+body.roleId, body.authIds);
  }
  /**
   * 获取角色列表
   * @returns 
   */
  @ApiOperation({ summary: '获取角色列表-无分页' })
  @Get('all')
  findAll() {
    return this.roleService.findAll();
  }
  /**
   * 获取角色列表
   * @returns 
   */
  @ApiOperation({ summary: '获取角色列表-分页' })
  @Get()
  find(@Query() query: findRoleDto) {
    return this.roleService.find(query);
  }


  /**
   * 获取单个角色详情
   * @param id 
   * @returns 
   */
  @ApiOperation({ summary: '获取单个角色详情' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  /**
 * 删除单个角色
 * @param id 
 * @returns 
 */
  @ApiOperation({ summary: '删除角色' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
  /**
   * 修改角色
   * @param role 
   * @returns 
   */
  @ApiOperation({ summary: '修改角色' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() role: CreateRoleDto) {
    return this.roleService.update(+id, role);
  }


  /**
   * 创建角色
   * @param role 
   * @returns 
   */
  @ApiOperation({ summary: '创建角色' })
  @Post()
  async create(@Body() role: CreateRoleDto) {
    return this.roleService.create(role);
  }
}
