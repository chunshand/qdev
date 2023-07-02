import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/createRole.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '@/entity/role.entity';
import { Repository } from 'typeorm';
import { UpdateRoleDto } from './dto/updateRole.dto';
import { findRoleDto } from './dto/findRole.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) { }
  create(role: CreateRoleDto) {
    console.log(role);
    return this.roleRepository.save(role);
  }

  findAll(query: findRoleDto): Promise<{ list: Role[], total: number }> {
    return new Promise(async (resolve) => {
      const list = await this.roleRepository
        .find({
          skip: +query.pageSize * (+query.currentPage - 1),
          take: +query.pageSize,
        })
      const total = await this.roleRepository.count();
      resolve({ list, total })
    })
  }

  findOne(id: number) {
    console.log(id);
    return this.roleRepository.findOne({
      where: {
        id: +id
      }
    })
  }

  update(id: number, role: UpdateRoleDto) {
    return this.roleRepository.update(id, role)
  }

  remove(id: number) {
    return this.roleRepository.delete(id)
  }
}
