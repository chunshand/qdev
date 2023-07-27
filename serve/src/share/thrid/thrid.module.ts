import { Module } from '@nestjs/common';
import { ThridService } from './thrid.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ThridService],
  exports: [ThridService]
})
export class ThridModule { }
