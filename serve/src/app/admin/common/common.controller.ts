import { AdminDecorators } from '@/common/admin.AdminDecorators';
import { Controller, Post, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CommonService } from './common.service';
import { ApiTags } from '@nestjs/swagger';

/**
 * 公共通用控制器
 * 处理通用性的事件 例如上传 获取配置
 */
@ApiTags('后台公共模块')
@Controller('admin/common')
export class CommonController {
    constructor(
        private readonly commonService: CommonService

    ) { }
    @AdminDecorators({
        isAction: false
    })
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
        return this.commonService.handleLocalFile(file, +req.user.userId);
    }

    // 暂时不支持多文件上传 
    // @AdminDecorators({
    //     isAction: false
    // })
    // @Post('uploads')
    // @UseInterceptors(FileInterceptor('files'))
    // uploadFiles(@UploadedFile() files: Express.Multer.File) {
    //     console.log(files);
    // }

    // 云对象存储 上传成功回调

}
