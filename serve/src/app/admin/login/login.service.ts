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
      return [false, "登录失败"]
    }
    if (!UserRes.admin) {
      return [false, "用户无权登录"]
    }
    if (UserRes.password != CreateMd5(user.password)) {
      return [false, "用户名或密码错误"]
    }


    return [true, UserRes]
  }

  async findUserById(id: number) {
    const UserRes = await this.userRepository.findOne({
      where: {
        id,
      },
      select: ['username', 'password', 'admin', 'id', 'super']
    })
    if (!UserRes) {
      return [false, "登录失败"]
    }
    if (!UserRes.admin) {
      return [false, "用户无权登录"]
    }
    return [true, UserRes]
  }
}
