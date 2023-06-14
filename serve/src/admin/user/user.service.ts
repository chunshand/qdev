import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/entity/user.entity';
import { FindUserDto } from './dto/findUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateMd5 } from '@/utils/crypto';

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
      relations: [
        'userInfo'
      ]
    });
  }

  findAll(query: FindUserDto): Promise<{ list: User[], total: number }> {
    return new Promise(async (resolve) => {
      const list = await this.userRepository
        .find({
          skip: +query.pageSize * (+query.currentPage - 1),
          take: +query.pageSize,
        })
      const total = await this.userRepository.count();
      resolve({ list, total })
    })
  }

  create(createUserDto: CreateUserDto) {
    createUserDto.admin = true;
    createUserDto.password = CreateMd5(createUserDto.password)
    return this.userRepository.save(createUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  update(id: number, updateUser: UpdateUserDto) {
    if (updateUser.password) {
      updateUser.password = CreateMd5(updateUser.password)
    }
    return this.userRepository.update(id, updateUser)
  }
}
