import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { lastValueFrom } from 'rxjs';
import { HttpService } from "@nestjs/axios"
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from '@/entity/auth.entity';
import { TreeRepository } from 'typeorm';
import { Role } from '@/entity/role.entity';
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

  findAll(where: any = {}) {

    return this.authRepository.findTrees({
      depth: 10,
    })
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
  // /**
  //  * 获取服务端所有路由
  //  * @param req 
  //  * @returns 
  //  */
  // async findAppAllRoutesByStack(req: Request) {
  //   const router = req.app._router as Router
  //   const routes = router.stack
  //     .map((layer) => {
  //       if (layer.route) {
  //         const path = layer.route.path
  //         const method = layer.route.stack[0].method.toUpperCase()
  //         return { path, method }
  //       }
  //       return null
  //     })
  //     .filter((v) => !!v)
  //   return routes
  // }
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

  findAppAllRoutes() {
    return this.findAppAllRoutesBySwaggerApi()
  }


}
