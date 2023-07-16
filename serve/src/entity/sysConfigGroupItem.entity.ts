import { Column, Entity, ManyToOne, Timestamp } from "typeorm";
import { Base } from "./base";
import { SysConfigGroup } from "./sysConfigGroup.entity";

/**
 * 系统配置项
 */
@Entity()
export class SysConfigGroupItem extends Base {

    @ManyToOne(() => SysConfigGroup)
    sysConfigGroup: SysConfigGroup;

    @Column({
        comment: "配置Key"
    })
    key: string

    @Column({
        comment: "配置项类型",
        default: 'string'
    })
    type: string

    @Column({
        comment: "配置项名称"
    })
    title: string

    @Column({
        comment: "文本类型值",
        default: ""
    })
    stringValue: string

    @Column({
        comment: "数值类型值",
        default: 0
    })
    numberValue: number


    @Column({
        comment: "时间类型值",
        default: null
    })
    dateValue: Date


    @Column({
        comment: "文件",
        default: null
    })
    fileValue: number

    @Column({
        comment: "开关",
        default: false
    })
    switchValue: boolean


}
