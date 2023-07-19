import { Article } from '@/entity/article.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindArticleDto } from './dto/find-article.dto';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private articleRepository: Repository<Article>,
    ) { }

    list(query: FindArticleDto): Promise<{ list: Article[], total: number }> {
        return new Promise(async (resolve) => {
            const list = await this.articleRepository
                .find({
                    skip: +query.pageSize * (+query.currentPage - 1),
                    take: +query.pageSize,
                    select: {
                        id: true,
                        title: true,
                        desc: true,
                        cover: true,
                        createTime: true,
                        createUser: {
                            id: true,
                            userInfo: {
                                id: true,
                                nickname: true,
                                avatar: true,
                            }
                        }
                    },
                    relations: {
                        createUser: {
                            userInfo: true
                        }
                    }
                })
            const total = await this.articleRepository.count();
            resolve({ list, total })
        })
    }

    details(id: number) {
        return this.articleRepository.findOne({
            where: {
                id
            },
            select: {
                createUser: {
                    id: true,
                    userInfo: {
                        id: true,
                        nickname: true,
                        avatar: true,
                    }
                }
            },
            relations: {
                createUser: {
                    userInfo: true
                }
            }

        })
    }
}
