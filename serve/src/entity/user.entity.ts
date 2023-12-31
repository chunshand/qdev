import { Entity, Column, OneToMany, OneToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Base } from './base';
import { UserThrid } from './userThrid.entity';
import { UserInfo } from './userInfo.entity';
import { Role } from './role.entity';

@Entity()
/**
 * 用戶表
 */
export class User extends Base {

  /**
   * 用户名
   */
  @Column()
  username: string;

  /**
   * 密码
   */
  @Column({ select: false })
  password: string;

  /**
   * 是否是管理员
   */
  @Column({
    default: false
  })
  admin: boolean;


  /**
  * 超级管理员
  */
  @Column({
    default: false
  })
  super: boolean;


  @OneToOne(() => UserInfo, (userInfo) => userInfo.user)
  userInfo: UserInfo

  @OneToMany(() => UserThrid, (user) => user.user)
  userThrid: UserThrid[]

  @JoinTable()
  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[]
}