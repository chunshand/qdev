import { applyDecorators, Get, UseGuards } from '@nestjs/common';
import { AdminLoginGuard } from './admin.login.guard';
import { AdminActionGuard } from './admin.action.guard';
/**
 * admin 装饰器
 * @returns 
 */
export function AdminDecorators(config: { isAction: boolean } = { isAction: true }) {

    const applyDecoratorsArr = [];
    applyDecoratorsArr.push(UseGuards(AdminLoginGuard));
    if (config.isAction) {
        applyDecoratorsArr.push(UseGuards(AdminActionGuard));
    }
    return applyDecorators(...applyDecoratorsArr)
}