import { Controller, Get, Post, Param, Query, Body, Delete, Put, Patch } from '@nestjs/common';
import { CreateSysConfigGroupDto } from './dto/createSysConfigGroup.dto';
import { findSysConfigGroupDto } from './dto/findSysConfigGroup.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminDecorators } from '@/common/admin.AdminDecorators';
import { UpdateSysConfigGroupDto } from './dto/updateSysConfigGroup.dto';
import { SysConfigService } from './sys-config.service';
import { findSysConfigGroupItemDto } from './dto/findSysConfigGroupItem.dto';
import { UpdateSysConfigGroupItemDto } from './dto/updateSysConfigGroupItem.dto';
import { CreateSysConfigGroupItemDto } from './dto/createSysConfigGroupItem.dto';

@AdminDecorators()
@ApiTags('后台系统配置')
@Controller('admin/sys-config')
export class SysConfigController {
  constructor(
    private readonly sysConfigService: SysConfigService

  ) { }
  // ---------------------------------------------------------配置分组
  /**
   * 获取配置分组列表
   * @returns
   */
  @ApiOperation({ summary: '获取配置分组列表' })
  @Get("sys-config-group/list")
  sysConfigGroupList(@Query() query: findSysConfigGroupDto) {
    return this.sysConfigService.sysConfigGroupFind(query);
  }

  /**
 * 删除单个配置分组
 * @param id
 * @returns
 */
  @ApiOperation({ summary: '删除单个配置分组' })
  @Delete('sys-config-group/remove')
  sysConfigGroupRemove(@Query('id') id: string) {
    return this.sysConfigService.sysConfigGroupRemove(+id);
  }
  /**
   * 修改配置分组
   * @returns
   */
  @ApiOperation({ summary: '修改配置分组' })
  @Patch('sys-config-group/update')
  async sysConfigGroupUpdate(@Body() role: UpdateSysConfigGroupDto) {
    return this.sysConfigService.sysConfigGroupUpdate(+role.id, role);
  }


  /**
   * 创建配置分组
   * @returns
   */
  @ApiOperation({ summary: '创建配置分组' })
  @Post("sys-config-group/create")
  async sysConfigGroupCreate(@Body() role: CreateSysConfigGroupDto) {
    return this.sysConfigService.sysConfigGroupCreate(role);
  }
  // ---------------------------------------------------------配置项
  /**
   * 获取配置分组列表
   * @returns
   */
  @ApiOperation({ summary: '获取配置分组列表' })
  @Get("sys-config-group-item/list")
  sysConfigGroupItemList(@Query() query: findSysConfigGroupItemDto) {
    return this.sysConfigService.sysConfigGroupItemFind(query);
  }

  /**
 * 删除单个配置分组
 * @param id
 * @returns
 */
  @ApiOperation({ summary: '删除单个配置分组' })
  @Delete('sys-config-group-item/remove')
  sysConfigGroupItemRemove(@Query('id') id: string) {
    return this.sysConfigService.sysConfigGroupItemRemove(+id);
  }
  /**
   * 修改配置分组
   * @returns
   */
  @ApiOperation({ summary: '修改配置分组' })
  @Patch('sys-config-group-item/update')
  async sysConfigGroupItemUpdate(@Body() role: UpdateSysConfigGroupItemDto) {
    return this.sysConfigService.sysConfigGroupItemUpdate(+role.id, role);
  }


  /**
   * 创建配置分组
   * @returns
   */
  @ApiOperation({ summary: '创建配置分组' })
  @Post("sys-config-group-item/create")
  async sysConfigGroupItemCreate(@Body() role: CreateSysConfigGroupItemDto) {
    return this.sysConfigService.sysConfigGroupItemCreate(role);
  }
}
