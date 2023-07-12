import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/entity/user.entity';
import { AdministratorModule } from '../administrator/administrator.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AdministratorModule],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule { }
