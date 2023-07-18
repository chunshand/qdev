import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/entity/user.entity';
import { CommonModule } from '@/app/common/common.module';
import { UserInfo } from '@/entity/userInfo.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User,UserInfo]),CommonModule
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule { }
