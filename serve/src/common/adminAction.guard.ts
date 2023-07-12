import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from "@nestjs/cache-manager"

/**
 * admin 动作守卫
 */
@Injectable()
export class adminActionGuard implements CanActivate {
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        return new Promise(async (resolve) => {
            const request: Request = context.switchToHttp().getRequest();
            const user = (request as any).user
            if (user.super) {
                resolve(true);
                return;
            }
            const userId = user.userId;
            const action = `${request.method}:${request.path}`
            const auths: string = await this.cacheManager.get<string>(`auth:${userId}`);
            let authArr = [];
            try {
                authArr = JSON.parse(auths)
            } catch (error) {
                resolve(false)
            }
            if (authArr.includes(action)) {
                resolve(true)
            } else {
                resolve(false)
            }
        })
    }
}