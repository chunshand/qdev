import { ConfigModule as ConfigModuleAs } from '@nestjs/config';
import configConfiguration from './config.configuration';
export const ConfigModule = ConfigModuleAs.forRoot({
    isGlobal: true,
    load: [configConfiguration],
})