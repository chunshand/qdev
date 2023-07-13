import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { ExceptionsFilter } from '@/common/exceptions-filter';
import { HttpExceptionsFilter } from '@/common/http-exceptions-filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config'
import * as compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  const config = app.get(ConfigService)
  app.useGlobalFilters(new ExceptionsFilter())
  app.useGlobalFilters(new HttpExceptionsFilter())
  app.use(compression());
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    })
  );
  const docConfig = new DocumentBuilder().build();
  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('apidoc', app, document);
  const port: number = config.get<number>('app.port');
  console.log(port);
  await app.listen(port);
}
bootstrap();
