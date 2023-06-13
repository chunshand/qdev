import { applyDecorators, Get, UseGuards } from '@nestjs/common';
import { adminLoginGuard } from './adminLogin.guard';
export function AdminDecorators() {
  return applyDecorators(
    UseGuards(adminLoginGuard)
  )
}