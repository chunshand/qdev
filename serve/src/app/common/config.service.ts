import { SysConfigGroup } from "@/entity/sysConfigGroup.entity";
import { SysConfigGroupItem } from "@/entity/sysConfigGroupItem.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

/**
 * 配置
 */
@Injectable()
export class ConfigService {
    constructor(
        @InjectRepository(SysConfigGroup)
        private sysConfigGroupRepository: Repository<SysConfigGroup>,
        @InjectRepository(SysConfigGroupItem)
        private sysConfigGroupItemRepository: Repository<SysConfigGroupItem>
    ) {

    }

    convertConfig(arr: SysConfigGroupItem[]): object {
        let config: object = {};
        for (let i in arr) {
            let item = arr[i];
            config[item.key] = item[item.type + "Value"]
        }
        return config;
    }

    /**
     * 获取分组下配置项
     */
    async handleGetConfig(GroupKey: string): Promise<object> {
        let GroupData = await this.sysConfigGroupRepository.findOne({
            where: {
                key: GroupKey
            }
        })
        if (!GroupData) {
            return {}
        }
        let GroupDataArr = await this.sysConfigGroupItemRepository.find({
            where: {
                sysConfigGroup: {
                    id: GroupData.id
                }
            }
        })
        return this.convertConfig(GroupDataArr)
    }

    /**
     * 获取单独的配置项
     */
    async handleGetConfigItem(GroupKey: string, GroupItemKey: string): Promise<object> {
        let GroupData = await this.sysConfigGroupRepository.findOne({
            where: {
                key: GroupKey
            }
        })
        if (!GroupData) {
            return {}
        }
        let GroupDataArr = await this.sysConfigGroupItemRepository.find({
            where: {
                sysConfigGroup: {
                    id: GroupData.id
                },
                key: GroupItemKey
            }
        })
        return this.convertConfig(GroupDataArr)
    }
}