import { File } from '@/entity/file.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from '@/entity/log.entity';
/**
 * 登录日志
 */
@Injectable()
export class LogService {
    constructor(
        @InjectRepository(Log)
        private logRepository: Repository<Log>
    ) {

    }

    /**
     * 添加登录日志
     */
    createLoginLog() {
        // this.loginLogRepository.save()
    }

}
