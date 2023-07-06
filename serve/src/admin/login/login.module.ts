import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/entity/user.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserModule],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule { }
