import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('admin/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }



  /**
   * 创建
   */
  @Post()
  async create(@Body() createAuthDto: CreateAuthDto) {
    let obj: any = createAuthDto as any;
    if (obj.parent) {
      obj.parent = await this.authService.findOne(obj.parent);
    }
    return this.authService.create(obj);
  }

  /**
   * 获取全部
   */
  @Get('menu')
  findMenuAll() {
    return this.authService.findMenu();
  }
  /**
 * 获取全部
 */
  @Get()
  findAll() {
    return this.authService.findAll();
  }
  /**
   * 获取权限列表
   */
  @Get('all')
  all(@Query() query) {
    return this.authService.findAll(+query.roleId);
  }

  /**
   * 获取详情
   * @param id 
   * @returns 
   */
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
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  /**
   * 删除
   * @param id 
   * @returns 
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }


}
