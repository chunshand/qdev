import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { findAllMemberDto } from './dto/findAll-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MemberService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {

    }

    create(createMemberDto: CreateMemberDto) {
        return 'This action adds a new member';
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
                })
            const total = await this.userRepository.count();
            resolve({ list, total })
        })
    }

    findOne(id: number) {
        return `This action returns a #${id} member`;
    }

    update(id: number, updateMemberDto: UpdateMemberDto) {
        return `This action updates a #${id} member`;
    }

    remove(id: number) {
        return `This action removes a #${id} member`;
    }
}
