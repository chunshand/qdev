import { Entity, Column, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@Entity()
/**
 * 用户三方表
 */
export class UserThrid {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    openid: string;

    @Column()
    type: string;
}