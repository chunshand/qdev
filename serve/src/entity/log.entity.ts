import { Column, Entity, ManyToOne } from "typeorm";
import { Base } from "./base";
import { User } from "./user.entity";
/**
 * 登录日志
 */
@Entity()
export class Log extends Base {

    @ManyToOne(() => User)
    user: User

    @Column({
        comment: "登录平台 例如 default  pc mobile app",
        default: "default"
    })
    platform: string


    @Column({
        comment: "记录类型 例如 login action",
        default: "default"
    })
    type: string

}