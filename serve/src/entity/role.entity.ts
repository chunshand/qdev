import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Base } from './base';
import { Auth } from './auth.entity';
import { User } from './user.entity';


@Entity()
/**
 * 角色表
 */
export class Role extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 角色名称
   */
  @Column()
  name: string;

  
  @ManyToMany(() => User, (user) => user.roles)
  users: User[]

  @JoinTable()
  @ManyToMany(() => Auth, (auth) => auth.roles)
  auths: Auth[]
}