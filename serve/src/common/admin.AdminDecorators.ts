import { applyDecorators, Get, UseGuards } from '@nestjs/common';
import { adminLoginGuard } from './adminLogin.guard';
/**
 * admin 装饰器
 * @returns 
 */
export function AdminDecorators() {
  return applyDecorators(
    UseGuards(adminLoginGuard)
  )
}