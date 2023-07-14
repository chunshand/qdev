import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from './base';
import { User } from './user.entity';

@Entity()
/**
 * 用户三方表
 */
export class UserThrid extends Base {

    @ManyToOne(() => User)
    user: User;

    @Column({
        comment:"三方openid"
    })
    openid: string;

    @Column({
        comment: "三方类型"
    })
    type: string;
}