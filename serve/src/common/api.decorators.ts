import { applyDecorators, Get, UseGuards } from '@nestjs/common';
import { ApiLoginGuard } from './api.login.guard';
/**
 * api 装饰器
 * @returns 
 */
export function ApiDecorators() {
    return applyDecorators(UseGuards(ApiLoginGuard))
}