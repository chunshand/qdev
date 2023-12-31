import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { lastValueFrom } from 'rxjs';
import { HttpService } from "@nestjs/axios"
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from '@/entity/auth.entity';
import { TreeRepository } from 'typeorm';
import { Role } from '@/entity/role.entity';
import { recursion } from '@/utils/tools';
@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Auth)
    private authRepository: TreeRepository<Auth>,
    @InjectRepository(Role)
    private roleRepository: TreeRepository<Role>
  ) { }
  create(createAuthDto: any) {
    return this.authRepository.save(createAuthDto)
  }

  /**
   *
   * @returns
   */
  async findMenu() {
    let auths = await this.authRepository.find({
      where: [
        { type: 'catalog' },
      ]
    })
    return recursion(auths)
  }

  async findAll() {
    let auths = await this.authRepository.find({
      order:{
        sort:"DESC"
      }
    });
    return recursion(auths);
  }

  findOne(id: number) {
    return this.authRepository.findOne({
      where: { id }
    })

  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return this.authRepository.update(id, updateAuthDto)
  }

  async remove(id: number) {
    let auth = await this.authRepository.findOne({
      where: {
        id: id
      },
      relations: {
        roles: true
      }
    })
    let roles = await this.roleRepository.find({
      where: auth.roles.map((item) => {
        return { id: item.id }
      },
      ),
      relations: {
        auths: true
      }
    })
    roles = roles.map((item) => {
      let index = item.auths.findIndex(i => i.id == id)
      if (index != -1) {
        item.auths.splice(index, 1)
      }
      return item
    })
    await this.roleRepository.save(roles)
    return this.authRepository.delete(id)
  }
  /**
   * 获取所有的权限
   * @returns
   */
  // 来源：https://github.com/wenqiyun/nest-admin/blob/dev/servers/src/system/perm/perm.service.ts
  async findAppAllRoutesBySwaggerApi() {
    const { data } = await lastValueFrom(this.httpService.get(`http://localhost:3000/apidoc-json`))
    const routes = []
    if (data?.paths) {
      // 将 swagger 数据转换成需要的数据
      const paths = data.paths
      Object.keys(paths).forEach((path) => {
        Object.keys(paths[path]).forEach((method) => {
          const route = {
            path: path.replace(/\{/g, ':').replace(/\}/g, ''),
            method: method.toUpperCase(),
            summary: paths[path][method].summary,
            description: paths[path][method].description
          }
          routes.push(route)
        })
      })
    }
    return routes
  }

}
