import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateMd5 } from '@/utils/crypto';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }
  async login(user: LoginDto): Promise<[boolean, string | User]> {
    const UserRes = await this.userRepository.findOne({
      where: {
        username: user.username,
      },
      select: ['username', 'password', 'admin', 'id', 'super']
    })
    if (!UserRes) {
      return [false, "用戶不存在"]
    }
    if (!UserRes.admin) {
      return [false, "该用户无法登录"]
    }
    if (UserRes.password != CreateMd5(user.password)) {
      return [false, "密码错误"]
    }
    return [true, UserRes]
  }
}
