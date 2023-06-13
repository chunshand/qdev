import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UserModule } from './user/user.module';

@Module({
    controllers: [AdminController],
    imports: [UserModule]
})
export class AdminModule { }
