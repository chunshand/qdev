import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, TreeChildren, TreeParent, Tree, ManyToMany } from 'typeorm';
import { Base } from './base';
import { Role } from './role.entity';

export type AuthType = "menu" | "page" | "auth" | "link";
/**
 * 权限表
 */
@Entity()
@Tree("materialized-path")
export class Auth extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 权限标识
   */
  @Column()
  key: string;

  /**
   * 标题
   */
  @Column()
  title: string;


  /**
   * icon
   */
  @Column()
  icon: string;

  

  /**
   * 权限类型
   */
  @Column({
    type: "enum",
    enum: ["menu", "page", "auth", "link"],
    default: "menu"
  })
  type: AuthType;

  /**
   * 路径
   */
  @Column()
  path: string;


  @TreeChildren()
  children: Auth[];

  @TreeParent()
  parent: Auth;

  @ManyToMany(() => Role, (role) => role.auths)
  roles: Role[]
}