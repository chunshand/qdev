import { User } from '@/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberLoginDto } from './dto/member.login.dto';
import { CreateMd5 } from '@/utils/crypto';

@Injectable()
export class LoginService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }
    async login(user: MemberLoginDto): Promise<[boolean, string | User]> {
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
}
