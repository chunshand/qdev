import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
/**
 * 用戶表
 */
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

}