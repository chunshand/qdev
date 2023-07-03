import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/createRole.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '@/entity/role.entity';
import { Repository } from 'typeorm';
import { UpdateRoleDto } from './dto/updateRole.dto';
import { findRoleDto } from './dto/findRole.dto';
import { Auth } from '@/entity/auth.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>
  ) { }
  create(role: CreateRoleDto) {
    console.log(role);
    return this.roleRepository.save(role);
  }

  find(query: findRoleDto): Promise<{ list: Role[], total: number }> {
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
  findAll(): Promise<Role[]> {
    return this.roleRepository
      .find()
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
  /**
 * 获取角色下权限
 */
  async getRoleAuth(roleId: number) {
    let role = await this.roleRepository.findOne({
      where: {
        id: roleId
      },
      relations: {
        auths: true
      }
    })
    return role.auths
  }
  /**
   * 设置角色权限
   */
  async setRoleAuth(roleId: number, authIds: number[]) {
    let auths = await this.authRepository.find({
      where: authIds.map((item) => {
        return { id: item }
      })
    })
    let role = await this.roleRepository.findOne({
      where: {
        id: roleId
      }
    });
    role.auths = auths;
    return this.roleRepository.save(role);

  }
}
