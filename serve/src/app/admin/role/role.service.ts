import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/createRole.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '@/entity/role.entity';
import { Repository, In } from 'typeorm';
import { UpdateRoleDto } from './dto/updateRole.dto';
import { findRoleDto } from './dto/findRole.dto';
import { Auth } from '@/entity/auth.entity';
import { User } from '@/entity/user.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }
  create(role: CreateRoleDto) {
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
    return this.roleRepository.findOne({
      where: {
        id: id
      }
    })
  }

  update(id: number, role: UpdateRoleDto) {
    return this.roleRepository.update(id, role)
  }

  async remove(id: number) {
    let role = await this.roleRepository.findOne({
      where: {
        id: id
      },
      relations: {
        users: true
      }
    })
    let users = await this.userRepository.find({
      where: role.users.map((item) => {
        return { id: item.id }
      }),
      relations: {
        roles: true
      }
    })
    users = users.map((item) => {
      let index = item.roles.findIndex((i) => i.id == id)
      if (index != -1) {
        item.roles.splice(index, 1)
      }
      return item
    })
    await this.userRepository.save(users)
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
      where: {
        id: In(authIds)
      }
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
