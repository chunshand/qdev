import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from '@/entity/user.entity';
import { FindUserDto } from './dto/findUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateMd5 } from '@/utils/crypto';
import { Role } from '@/entity/role.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Role)
        private roleRepository: Repository<Role>
    ) { }

    /**
     * 获取用户信息
     * @param userId 
     * @returns 
     */
    findInfo(userId: number): Promise<User> {
        return this.userRepository.findOne({
            select: {
                userInfo: {
                    avatar: {
                        object: true,
                    }
                }
            },
            where: {
                id: userId,
            },
            relations: {
                userInfo: {
                    avatar: true
                }
            }
        });
    }

    findAll(query: FindUserDto): Promise<{ list: User[], total: number }> {
        return new Promise(async (resolve) => {
            const list = await this.userRepository
                .find({
                    where: {
                        admin: true
                    },
                    skip: +query.pageSize * (+query.currentPage - 1),
                    take: +query.pageSize,
                })
            const total = await this.userRepository.count();
            resolve({ list, total })
        })
    }

    create(createUserDto: CreateUserDto) {
        createUserDto.admin = true;
        createUserDto.super = false;
        createUserDto.password = CreateMd5(createUserDto.password??"123456")
        return this.userRepository.save(createUserDto);
    }

    remove(id: string) {
        return this.userRepository.delete(id);
    }

    update(id: number, updateUser: UpdateUserDto) {
        if (updateUser.password) {
            updateUser.password = CreateMd5(updateUser.password)
        }
        return this.userRepository.update(id, updateUser)
    }

    /**
   * 设置用户角色
   */
    async setUserRole(userId: number, rolesIds: number[]) {
        let roles = await this.roleRepository.find({
            where: rolesIds.map((item) => {
                return {
                    id: item
                }
            })
        })
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        })
        user.roles = roles
        return this.userRepository.save(user)
    }

    /**
     * 获取用户权限
     */
    async getUserAuth(userId: number) {
        let roles = await this.getUserRole(userId);
        let user_auths = await this.roleRepository.find({
            where: {
                id: In(roles.map(item => item.id))
            },
            relations: {
                auths: true
            }
        })
        let auths = user_auths.map((item) => {
            return item.auths;
        }).flat()

        return [...new Set(auths)];
    }
    /**
       * 获取用户菜单
       */
    async getMenuList(userId: number) {
        let roles = await this.getUserRole(userId);
        let user_auths = await this.roleRepository.find({
            where: {
                id: In(roles.map(item => item))
            },
            relations: {
                auths: {

                }
            }
        })
        let auths = user_auths.map((item) => {
            return item.auths;
        }).flat()
        auths = [...new Set(auths)]
        function dg(arr, key = null) {
            let _arr = arr.filter((item => item.id == key)).map((item) => {
                item.children = dg(arr, item.id)
                return item;
            });
            return _arr
        }
        return dg(auths);
    }


    /**
     * 获取用户角色
     */
    async getUserRole(userId: number) {
        let user = await this.userRepository.findOne({
            where: {
                id: userId
            },
            relations: {
                roles: true
            }
        })
        return user ? user.roles : []
    }
}
