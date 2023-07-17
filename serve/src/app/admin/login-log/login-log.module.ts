import { Module } from '@nestjs/common';
import { LoginLogService } from './login-log.service';
import { LoginLogController } from './login-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from '@/entity/log.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Log])
    ],
    controllers: [LoginLogController],
    providers: [LoginLogService]
})
export class LoginLogModule { }
