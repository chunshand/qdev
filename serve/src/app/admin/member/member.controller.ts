import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { findAllMemberDto } from './dto/findAll-member.dto';
import { AdminDecorators } from '@/common/admin.decorators';
import { ApiTags } from '@nestjs/swagger';

@AdminDecorators()
@ApiTags('后台会员管理')
@Controller('admin/member')
export class MemberController {
  constructor(private readonly memberService: MemberService) { }

  @Post('create')
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto);
  }

  @Get("list")
  list(@Query() query: findAllMemberDto) {
    return this.memberService.findAll(query);
  }

  @Get('find')
  find(@Query('id') id: string) {
    return this.memberService.findOne(+id);
  }

  @Patch('update')
  update(@Query('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.memberService.update(+id, updateMemberDto);
  }

  @Delete('remove')
  remove(@Query('id') id: string) {
    return this.memberService.remove(+id);
  }

  /**
   * 获取用户的资料
   * @param id
   */
  @Get("getInfo")
  getInfo(@Query('id') id: string) {
    return this.memberService.getInfo(+id)
  }

  /**
   * 更新资料
   */
  @Patch('updateInfo')
  updateInfo(@Body() body) {
    return this.memberService.updateInfo(body)
  }
}
