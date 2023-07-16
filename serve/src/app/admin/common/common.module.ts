import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { CommonModule as CommonModuleAs } from '@/app/common/common.module';
@Module({
  imports: [
    CommonModuleAs,
  ],
  controllers: [CommonController],
  providers: []
})
export class CommonModule { }
