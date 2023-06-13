import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Base } from './base';
import { UserThrid } from './userThrid.entity';
import { User } from './user.entity';

@Entity()
/**
 * 用戶表
 */
export class UserInfo extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  avatar: string;

  @Column()
  email: string;

  @JoinColumn()
  @OneToOne(() => User)
  user: User
}