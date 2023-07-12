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

    const defaultDb = config.get('db.default');
    const DbConfig  = config.get(`db.${defaultDb}`);
    
    return {
      type: defaultDb,
      entities: [
        "dist/**/**.entity{.ts,.js}"
      ],
      autoLoadEntities: true,
      keepConnectionAlive: true,
      ...DbConfig,
      synchronize: true,
      logging: true,
    } as TypeOrmModuleOptions
  }
});