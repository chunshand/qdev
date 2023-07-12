import { applyDecorators, Get, UseGuards } from '@nestjs/common';
import { adminLoginGuard } from './adminLogin.guard';
import { adminActionGuard } from './adminAction.guard';
/**
 * admin 装饰器
 * @returns 
 */
export function AdminDecorators(config: { isAction: boolean } = { isAction: true }) {

    const applyDecoratorsArr = [];
    applyDecoratorsArr.push(UseGuards(adminLoginGuard));
    if (config.isAction) {
        applyDecoratorsArr.push(UseGuards(adminActionGuard));
    }
    return applyDecorators(...applyDecoratorsArr)
}