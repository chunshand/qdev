import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
// import { ulid } from 'ulid';
export class Base {
    // constructor() {
    //     this.id = ulid();
    // }
    
    // @PrimaryColumn()
    // id: string

    @PrimaryGeneratedColumn("uuid")
    id: string

    @CreateDateColumn({
        comment: '创建时间'
    })
    createTime: Date;

    @UpdateDateColumn({
        comment: '更新时间'
    })
    updateTime: Date;

    @DeleteDateColumn({
        comment: '删除时间'
    })
    deleteTime: Date;
}