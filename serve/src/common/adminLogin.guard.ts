import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

/**
 * admin 登录 守卫
 */
@Injectable()
export class adminLoginGuard implements CanActivate {
    @Inject(JwtService)
    private jwtService: JwtService;

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest();

        const authorization = request.header('authorization') || '';
        if (!authorization) {
            throw new UnauthorizedException('请先登录');
        }
        const BearerAndToken = authorization.split(' ');

        if (!BearerAndToken || BearerAndToken.length < 2) {
            throw new UnauthorizedException('请先登录');
        }
        const token = BearerAndToken[1];
        try {
            const user = this.jwtService.verify(token);
            (request as any).user = user;
            return true;
        } catch (e) {
            throw new UnauthorizedException('认证错误，请重新登录');
        }
    }
}