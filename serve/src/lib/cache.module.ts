import { CacheModule as CacheModuleAs } from '@nestjs/cache-manager';
export const CacheModule = CacheModuleAs.register({
    isGlobal: true
});