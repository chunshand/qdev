import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';
import { MulterModule } from '@nestjs/platform-express';
import { localStorage } from '@/common/local.storage';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from '@/entity/file.entity';
import { FileService } from './file.service';
import { ConfigService } from './config.service';
import { SysConfigGroup } from '@/entity/sysConfigGroup.entity';
import { SysConfigGroupItem } from '@/entity/sysConfigGroupItem.entity';
import { LogService } from './log.service';
import { Log } from '@/entity/log.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([File, SysConfigGroup, SysConfigGroupItem, Log]),
        MulterModule.register({
            storage: localStorage
        })
    ],
    controllers: [CommonController],
    providers: [CommonService, FileService, ConfigService, LogService],
    exports: [
        CommonService,
        FileService,
        ConfigService,
        LogService,
        MulterModule.register({
            storage: localStorage
        })]
})
export class CommonModule { }
