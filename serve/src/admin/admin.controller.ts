import { ResultData } from '@/common/result';
import { Controller, Get } from '@nestjs/common';

@Controller('admin')
export class AdminController {
    @Get()
    findAll() {
        return ResultData.success('This action returns all cats');
    }
}
