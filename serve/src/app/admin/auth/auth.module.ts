import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from '@/entity/auth.entity';
import { Role } from '@/entity/role.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Auth, Role])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
