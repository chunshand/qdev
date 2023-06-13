import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Base } from './base';
import { UserThrid } from './userThrid.entity';
import { UserInfo } from './userInfo.entity';

@Entity()
/**
 * 用戶表
 */
export class User extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  admin: boolean;

  @OneToOne(() => UserInfo, (userInfo) => userInfo.user)
  userInfo: UserInfo

  @OneToMany(() => UserThrid, (user) => user.user)
  userThrid: UserThrid[]
}