import { AdminDecorators } from '@/common/admin.AdminDecorators';
import { Controller, Post, UseInterceptors, UploadedFile, Req, Get, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CommonService } from './common.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileService } from './file.service';
import { ConfigService } from './config.service';

/**
 * 公共通用控制器
 * 处理通用性的事件 例如上传 获取配置
 */
@ApiTags('公共模块')
@Controller('common')
export class CommonController {
    constructor(
        private readonly fileService: FileService,
        private readonly configService: ConfigService,

    ) { }

    @AdminDecorators({
        isAction: false
    })
    @Post('upload')
    @ApiOperation({ summary: '上传文件' })
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
        return this.fileService.handleLocalFile(file, +req.user.userId);
    }

    /**
     * 获取文件信息
     */
    @Get('getFileInfo')
    @ApiOperation({ summary: '获取文件信息' })
    find(@Query("id") id: string) {
        return this.fileService.getFileInfo(+id)
    }


    /**
    * 获取配置
    */
    @Get('getConfig')
    @ApiOperation({ summary: '获取配置' })
    getConfig(@Query("groupKey") groupKey: string) {
        return this.configService.handleGetConfig(groupKey)
    }
}
