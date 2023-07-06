import { DBModule } from "./db.module"
import { JwtModule } from "./jwt.module"
import { ConfigModule } from "./config.module"
import { CacheModule } from "./cache.module"
export const LibModules = [DBModule, JwtModule, ConfigModule, CacheModule]