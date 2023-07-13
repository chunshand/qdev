import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/entity/user.entity';
import { UserInfo } from '@/entity/userInfo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserInfo])],
  controllers: [MemberController],
  providers: [MemberService]
})
export class MemberModule { }
