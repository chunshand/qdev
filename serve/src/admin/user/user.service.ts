import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  findInfo(userId: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id: userId
      },
      relations:[
        'userInfo'
      ]
    });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
