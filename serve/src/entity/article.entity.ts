import { Column, Entity, ManyToOne } from "typeorm";
import { Base } from "./base";
import { User } from "./user.entity";

@Entity()
export class Article extends Base {
    @Column({
        comment: "标题"
    })
    title: string

    @Column({
        comment: "封面",
        default:""
    })
    cover: string

    @Column({
        comment: '简短描述',
        default:""
    })
    desc: string

    @Column({
        comment: "内容"
    })
    content: string


    @ManyToOne(() => User)
    createUser: User
}