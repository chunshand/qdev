import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from './config.module';
import { ConfigService } from '@nestjs/config';

// export const DBModule = TypeOrmModule.forRoot({
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: 'root',
//   password: 'root',
//   database: 'qdev',
//   entities: [
//     "dist/**/**.entity{.ts,.js}"
//   ],
//   synchronize: true,
//   logging: true
// });

export const DBModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    return {
      type: 'mysql',
      entities: [
        "dist/**/**.entity{.ts,.js}"
      ],
      autoLoadEntities: true,
      keepConnectionAlive: true,
      ...config.get('db.mysql'),
    } as TypeOrmModuleOptions
  }
});