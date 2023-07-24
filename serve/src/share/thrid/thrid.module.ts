import { Module } from '@nestjs/common';
import { ThridService } from './thrid.service';

@Module({
    providers: [ThridService],
    exports: [ThridService]
})
export class ThridModule { }
