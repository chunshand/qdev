import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { ExceptionsFilter } from '@/common/exceptions-filter';
import { HttpExceptionsFilter } from '@/common/http-exceptions-filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService)
  app.useGlobalFilters(new ExceptionsFilter())
  app.useGlobalFilters(new HttpExceptionsFilter())
  const docConfig = new DocumentBuilder().build();
  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('apidoc', app, document);
  const port: number = config.get<number>('app.port');
  console.log(port);
  await app.listen(port);
}
bootstrap();
