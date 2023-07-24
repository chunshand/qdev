import { Module } from '@nestjs/common';
import { User } from '@/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministratorController } from './administrator.controller';
import { AdministratorService } from './administrator.service';
import { Auth } from '@/entity/auth.entity';
import { Role } from '@/entity/role.entity';
import { CommonModule } from '@/app/common/common.module';
@Module({
    imports: [TypeOrmModule.forFeature([User, Auth, Role]),CommonModule],
    controllers: [AdministratorController],
    providers: [AdministratorService],
    exports: [AdministratorService]
})
export class AdministratorModule { }
