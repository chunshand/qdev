import { DBModule } from "./db.module"
import { JwtModule } from "./jwt.module"
import { ConfigModule } from "./config.module"
import { CacheModule } from "./cache.module"

import { ServeStaticModule } from "@nestjs/serve-static"
import { join } from "path"
export const LibModules = [DBModule,
  JwtModule,
  ConfigModule,
  CacheModule,
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, "../../uploads"),
    serveRoot: "/uploads"
  })]
