import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Base } from './base';
import { UserThrid } from './userThrid.entity';
import { User } from './user.entity';
import { File } from './file.entity';

@Entity()
/**
 * 用戶表
 */
export class UserInfo extends Base {

  @JoinColumn()
  @OneToOne(() => User)
  user: User

  @Column({
    default: ""
  })
  avatar: string

  @Column({
    comment: "邮箱",
    default: ""
  })
  email: string;


  @Column({
    comment: "手机号",
    default: ""
  })
  phone: string;

  @Column({
    comment: "昵称",
    default: ""
  })
  nickname: string;

}
