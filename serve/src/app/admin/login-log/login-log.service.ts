import { Injectable } from '@nestjs/common';
import { FindLoginLogDto } from './dto/find-login-log.dto';
import { Log } from '@/entity/log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LoginLogService {
    constructor(
        @InjectRepository(Log)
        private logRepository: Repository<Log>,
    ) { }

    list(query: FindLoginLogDto) {
        return new Promise(async (resolve) => {
            const list = await this.logRepository
                .find({
                    where: {
                        type: "login"
                    },
                    skip: +query.pageSize * (+query.currentPage - 1),
                    take: +query.pageSize,
                    select: {
                        user: {
                            id: true,
                            userInfo: {
                                id: true,
                                nickname: true
                            }
                        }
                    },
                    order: {
                        createTime: "desc"
                    },
                    relations: {
                        user: {
                            userInfo: true
                        }
                    }

                })
            const total = await this.logRepository.count();
            resolve({ list, total })
        })
    }

}
