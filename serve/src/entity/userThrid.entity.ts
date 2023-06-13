import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from './base';
import { User } from './user.entity';

@Entity()
/**
 * 用户三方表
 */
export class UserThrid extends Base {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    user: User;

    @Column()
    openid: string;

    @Column()
    type: string;
}