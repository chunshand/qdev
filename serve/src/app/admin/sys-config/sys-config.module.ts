import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SysConfigService } from "./sys-config.service";
import { SysConfigController } from "./sys-config.controller";
import { SysConfigGroup } from "@/entity/sysConfigGroup.entity";
import { SysConfigGroupItem } from "@/entity/sysConfigGroupItem.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SysConfigGroup,SysConfigGroupItem])],
  controllers: [SysConfigController],
  providers: [SysConfigService]
})
export class SysConfigModule { }
