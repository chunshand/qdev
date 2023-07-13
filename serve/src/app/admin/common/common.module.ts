import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { MulterModule } from '@nestjs/platform-express';
import { localStorage } from '@/common/local.storage';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from '@/entity/file.entity';
import { CommonModule as CommonModuleAs } from '@/app/common/common.module';
@Module({
  imports: [
    CommonModuleAs,
    // TypeOrmModule.forFeature([File]),
    // MulterModule.register({
    //   storage: localStorage
    // })
  ],
  controllers: [CommonController],
  providers: []
})
export class CommonModule { }
