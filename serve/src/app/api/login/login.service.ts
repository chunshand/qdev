import { User } from '@/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberLoginDto } from './dto/member.login.dto';
import { CreateMd5 } from '@/utils/crypto';
import { UserThrid } from '@/entity/userThrid.entity';

@Injectable()
export class LoginService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(UserThrid)
        private userThridRepository: Repository<UserThrid>
    ) { }
    /**
     * 账号密码登录
     * @param user 
     * @returns 
     */
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

    /**
     * 第三方登录
     */
    async thridLogin(openid: string, type: string): Promise<[boolean, string | User]> {
        let userThrid = await this.userThridRepository.findOne({
            where: {
                type,
                openid: openid
            },
            select: {
                user: {
                    id: true,
                    admin: true,
                    super: true
                }
            },
            relations: {
                user: true
            }
        })

        if (!userThrid) {
            // 新用户  未绑定账户
            return [false, "登录失败"]
        } else {
            if (userThrid.user) {
                return [true, userThrid.user]
            } else {
                return [false, "登录失败"]
            }
        }
    }
}
