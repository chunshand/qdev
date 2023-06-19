import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Request, Router } from 'express';
import { lastValueFrom } from 'rxjs';
import { HttpService } from "@nestjs/axios"
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from '@/entity/auth.entity';
import { TreeRepository } from 'typeorm';
@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Auth)
    private authRepository: TreeRepository<Auth>

  ) { }
  create(createAuthDto: CreateAuthDto) {
    return this.authRepository.save(createAuthDto)
  }

  findAll() {
    return this.authRepository.findTrees()
  }

  findOne(id: number) {
    return this.authRepository.findOne({
      where: { id }
    })

  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return this.authRepository.update(id, updateAuthDto)
  }

  remove(id: number) {
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
