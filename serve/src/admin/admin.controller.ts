import { ResultData } from '@/common/result';
import { Controller, Get } from '@nestjs/common';

@Controller('admin')
export class AdminController {
    @Get()
    findAll() {
        return ResultData.ok('This action returns all cats');
    }
}
