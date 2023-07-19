import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminDecorators } from '@/common/admin.decorators';
import { FindArticleDto } from './dto/find-article.dto';

@AdminDecorators()
@ApiTags('后台文章管理')
@Controller('admin/article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) { }

    /**
     * 创建
     */
    @ApiOperation({ summary: '创建权限' })
    @Post("create")
    async create(@Request() req, @Body() createAuthDto: CreateArticleDto) {
        let obj: any = createAuthDto as any;
        obj.createUser = {
            id: req.user.userId
        }
        return this.articleService.create(obj);
    }

    /**
     * 更新详情
     */
    @ApiOperation({ summary: '更新权限' })
    @Patch('update')
    update(@Body() updateAuthDto: UpdateArticleDto) {
        return this.articleService.update(+updateAuthDto.id, updateAuthDto);
    }

    /**
     * 删除
     * @param id 
     * @returns 
     */
    @ApiOperation({ summary: '删除权限' })
    @Delete('remove')
    remove(@Query('id') id: string) {
        return this.articleService.remove(+id);
    }

    /**
     * 删除
     * @param id 
     * @returns 
     */
    @ApiOperation({ summary: '查询详情' })
    @Get('find')
    find(@Query('id') id: string) {
        return this.articleService.findOne(+id);
    }

    /**
  * 获取角色列表
  * @returns 
  */
    @ApiOperation({ summary: '获取角色列表' })
    @Get("list")
    list(@Query() query: FindArticleDto) {
        return this.articleService.find(query);
    }
}
