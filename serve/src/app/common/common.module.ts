import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';
import { MulterModule } from '@nestjs/platform-express';
import { localStorage } from '@/common/local.storage';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from '@/entity/file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    MulterModule.register({
      storage: localStorage
    })
  ],
  controllers: [CommonController],
  providers: [CommonService],
  exports: [CommonService,
    MulterModule.register({
      storage: localStorage
    })]
})
export class CommonModule { }
