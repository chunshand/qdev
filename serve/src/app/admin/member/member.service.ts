import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { findAllMemberDto } from './dto/findAll-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateMd5 } from '@/utils/crypto';
import { UserInfo } from '@/entity/userInfo.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserInfo)
    private userInfoRepository: Repository<UserInfo>,
  ) {

  }

  create(createMemberDto: CreateMemberDto) {
    createMemberDto.admin = false
    createMemberDto.super = false
    createMemberDto.password = CreateMd5(createMemberDto.password ?? "123456")
    return this.userRepository.save(createMemberDto);
  }

  /**
   * 查询用户列表
   * @param query
   * @returns
   */
  findAll(query: findAllMemberDto) {
    return new Promise(async (resolve) => {
      const list = await this.userRepository
        .find({
          where: {
            admin: false
          },
          skip: +query.pageSize * (+query.currentPage - 1),
          take: +query.pageSize,
          select: {
            userInfo: {
              id: true
            }
          },
          relations: {
            userInfo: true
          }
        })
      const total = await this.userRepository.count();
      resolve({ list, total })
    })
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: {
        id
      }
    })
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    delete (updateMemberDto as any).username
    return this.userRepository.update(id, updateMemberDto)
  }

  remove(id: number) {
    return this.userRepository.delete(id)
  }

  async getInfo(id: number) {
    return this.userInfoRepository.findOne({
      where: {
        id
      },
    })
  }

  async updateInfo(data) {
    return this.userInfoRepository.update(data.id, data)
  }
}
