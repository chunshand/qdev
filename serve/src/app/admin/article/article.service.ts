import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '@/entity/article.entity';
import { Repository } from 'typeorm';
import { FindArticleDto } from './dto/find-article.dto';

@Injectable()
export class ArticleService {
    @InjectRepository(Article)
    private articleRepository: Repository<Article>

    create(createAuthDto: CreateArticleDto) {
        return this.articleRepository.save(createAuthDto)
    }

    find(query: FindArticleDto): Promise<{ list: Article[], total: number }> {
        return new Promise(async (resolve) => {
            const list = await this.articleRepository
                .find({
                    skip: +query.pageSize * (+query.currentPage - 1),
                    take: +query.pageSize,
                    select: {
                        id: true,
                        title: true,
                        createTime: true,
                        updateTime: true,
                        createUser: {
                            id: true,
                            userInfo: {
                                id: true,
                                nickname: true
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
    findAll(): Promise<Article[]> {
        return this.articleRepository
            .find()
    }
    findOne(id: number) {
        return this.articleRepository.findOne({
            where: { id }
        })

    }

    update(id: number, updateAuthDto: UpdateArticleDto) {
        return this.articleRepository.update(id, updateAuthDto)
    }

    async remove(id: number) {
        return this.articleRepository.delete(id)
    }
}
