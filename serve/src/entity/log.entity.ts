import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Base } from "./base";
import { User } from "./user.entity";
/**
 * 登录日志
 */
@Entity()
export class Log extends Base {


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


    @Column({
        comment: "请求地址",
        default: ""
    })
    url: string

    @Column({
        comment: "参数",
        default: ""
    })
    meta: string

    @Column({
        comment: "登录方式",
        default: ""
    })
    loginMethod: string

    @ManyToOne(() => User)
    user: User
}