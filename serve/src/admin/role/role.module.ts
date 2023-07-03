import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '@/entity/role.entity';
import { Auth } from '@/entity/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Auth])],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule { }
