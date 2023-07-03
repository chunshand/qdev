import { Module } from '@nestjs/common';
import { User } from '@/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Auth } from '@/entity/auth.entity';
import { AuthService } from './services/auth.service';
import { Role } from '@/entity/role.entity';
@Module({
    imports: [TypeOrmModule.forFeature([User, Role, Auth])],
    controllers: [UserController],
    providers: [UserService, AuthService],
})
export class UserModule { }
