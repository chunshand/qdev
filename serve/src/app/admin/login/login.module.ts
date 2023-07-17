import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/entity/user.entity';
import { AdministratorModule } from '../administrator/administrator.module';
import { LogService } from '@/app/common/log.service';
import { CommonModule } from '@/app/common/common.module';
import { Log } from '@/entity/log.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User,Log]), AdministratorModule, CommonModule],
    controllers: [LoginController],
    providers: [LoginService, LogService]
})
export class LoginModule { }
