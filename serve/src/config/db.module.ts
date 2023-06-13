import { TypeOrmModule } from '@nestjs/typeorm';

export const DBModule = TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'qdev',
    entities: [
        "dist/**/**.entity{.ts,.js}"
    ],
    synchronize: true,
})