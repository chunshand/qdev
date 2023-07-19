import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindArticleDto } from './dto/find-article.dto';
import { ArticleService } from './article.service';

@ApiTags('前台文章模块')
@Controller('api/article')
export class ArticleController {
    constructor(
        private readonly articleService: ArticleService,
    ) {

    }

    @Get("list")
    list(@Query() query: FindArticleDto) {
        return this.articleService.list(query)
    }

    @Get("details")
    details(@Query("id") id: string) {
        return this.articleService.details(+id)
    }
}
