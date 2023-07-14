import { AdminDecorators } from '@/common/admin.AdminDecorators';
import { Controller, Post, UseInterceptors, UploadedFile, Req, Get, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CommonService } from './common.service';
import { ApiTags } from '@nestjs/swagger';

/**
 * 公共通用控制器
 * 处理通用性的事件 例如上传 获取配置
 */
@ApiTags('公共模块')
@Controller('common')
export class CommonController {
  constructor(
    private readonly commonService: CommonService,

  ) { }

  @AdminDecorators({
    isAction: false
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
    return this.commonService.handleLocalFile(file, +req.user.userId);
  }

  /**
   * 获取文件信息
   */
  @Get('getFileInfo')
  find(@Query("id") id: string) {
    return this.commonService.getFileInfo(+id)
  }

}
