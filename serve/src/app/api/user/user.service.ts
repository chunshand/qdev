import { User } from '@/entity/user.entity';
import { UserInfo } from '@/entity/userInfo.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(UserInfo)
        private userInfoRepository: Repository<UserInfo>

    ) {

    }
    /***
     * 获取用户信息
     */
    getUserInfo(userId: number) {
        return this.userInfoRepository.findOne({
            where: {
                user: {
                    id: userId,
                }
            },
        })

    }

}
