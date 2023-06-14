import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionsFilter } from './common/exceptions-filter';
import { HttpExceptionsFilter } from './common/http-exceptions-filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ExceptionsFilter())
  app.useGlobalFilters(new HttpExceptionsFilter())
  const config = new DocumentBuilder().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-json', app, document);
  await app.listen(3000);
}
bootstrap();
