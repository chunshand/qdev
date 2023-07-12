import { Entity, Column, ManyToMany } from 'typeorm';
import { Base } from './base';
import { Role } from './role.entity';
/**
 * catalog-目录
 * menu-菜单
 * action-动作
 */
export const AuthTypeArr: string[] = ["catalog", "menu", "page", "action"];
export type AuthType = typeof AuthTypeArr[number];

/**
 * 权限表
 */
@Entity()
export class Auth extends Base {

    /**
     * 标识
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
    @Column({
        default: ""
    })
    icon: string;

    /**
     * 权限类型
     */
    @Column({
        type: "enum",
        enum: AuthTypeArr,
        default: "catalog"
    })
    type: AuthType;

    /**
     * 是否显示
     */
    @Column({
        default: false
    })
    isShow: boolean;

    /**
     * 是否为外链
     */
    @Column({
        default: false
    })
    isLink: boolean;

    /**
     * 路径
     */
    @Column({
        default: ''
    })
    path: string;

    /**
     * 父级
     */
    @Column({
        default: null
    })
    parentId: string;

    @ManyToMany(() => Role, (role) => role.auths)
    roles: Role[]
}