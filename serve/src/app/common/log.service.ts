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
     * platform 平台 web h5 app mp
     * loginMethod 登录方式 username 
     * client 登录方式 front admin
     */
    createLoginLog(userId: number, platform: string, loginMethod: string, client: string = 'front') {
        return this.logRepository.save({
            user: { id: userId },
            platform,
            loginMethod,
            client,
            type: "login"
        })
    }

}
