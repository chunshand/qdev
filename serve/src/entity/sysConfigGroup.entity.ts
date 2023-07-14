import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "./base";
import { SysConfigGroupItem } from "./sysConfigGroupItem.entity";

/**
 * 系统配置组
 */
@Entity()
export class SysConfigGroup extends Base {

    @OneToMany(() => SysConfigGroupItem, (s) => s.sysConfigGroup)
    sysConfigItem: SysConfigGroupItem[]
    
    @Column({
        comment: "配置Key"
    })
    key: string

    @Column({
        comment: "分组名称"
    })
    title: string

 
}