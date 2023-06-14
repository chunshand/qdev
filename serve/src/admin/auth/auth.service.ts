import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Request, Router } from 'express';
import { lastValueFrom } from 'rxjs';
import { HttpService } from "@nestjs/axios"
@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) { }
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
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
    const { data } = await lastValueFrom(this.httpService.get(`http://localhost:3000/api-json`))
    const routes = []
    if (data?.paths) {
      // 将 swagger 数据转换成需要的数据
      const paths = data.paths
      Object.keys(paths).forEach((path) => {
        Object.keys(paths[path]).forEach((method) => {
          const route = { path: path.replace(/\{/g, ':').replace(/\}/g, ''), method: method.toUpperCase(), desc: paths[path][method].summary }
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
