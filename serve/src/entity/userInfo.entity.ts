import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
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

    @OneToOne(() => File)
    @JoinColumn()
    avatar: File;

    @Column({
        comment: "邮箱"
    })
    email: string;


    @Column({
        comment: "手机号"
    })
    phone: string;

}