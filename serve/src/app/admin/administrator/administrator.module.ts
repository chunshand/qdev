import { Module } from '@nestjs/common';
import { User } from '@/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministratorController } from './administrator.controller';
import { AdministratorService } from './administrator.service';
import { Auth } from '@/entity/auth.entity';
import { AuthService } from './services/auth.service';
import { Role } from '@/entity/role.entity';
@Module({
    imports: [TypeOrmModule.forFeature([User, Auth, Role])],
    controllers: [AdministratorController],
    providers: [AdministratorService, AuthService],
    exports: [AdministratorService]
})
export class AdministratorModule { }
