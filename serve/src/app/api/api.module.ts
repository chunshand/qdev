import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [LoginModule, UserModule, ArticleModule]
})
export class ApiModule {}
