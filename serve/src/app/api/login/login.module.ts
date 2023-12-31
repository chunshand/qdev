import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/entity/user.entity';
import { Log } from '@/entity/log.entity';
import { CommonModule } from '@/app/common/common.module';
import { ThridModule } from '@/share/thrid/thrid.module';
import { UserThrid } from '@/entity/userThrid.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Log, UserThrid]), CommonModule, ThridModule],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule { }
