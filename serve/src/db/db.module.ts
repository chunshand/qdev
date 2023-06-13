import { TypeOrmModule } from '@nestjs/typeorm';

export const DBModule = TypeOrmModule.forRoot({
    // type: 'mysql',
    // host: 'localhost',
    // port: 3306,
    // username: 'root',
    // password: 'root',
    // database: 'test',
    // entities: [],
    // synchronize: true,
    
    type: "sqlite",
    database: "./db/sqlite.db",
    entities: [
        "dist/**/**.entity{.ts,.js}"
    ],
    synchronize: true,
    logging: true
})