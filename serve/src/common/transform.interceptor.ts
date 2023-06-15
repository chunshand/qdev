import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Request } from 'express'

interface Response<T> {
  data: T
}

/**
 * 统一数据的返回结构
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>()
    // Logger.log(request.url, '正常接口请求')

    return next.handle().pipe(
      map(data => {
        return {
          data: data,
          code: 200,
          message: '请求成功',
          success: true
        }
      })
    )
  }
}