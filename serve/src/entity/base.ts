import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from "typeorm";
// import { ulid } from 'ulid';
export class Base {
    // constructor() {
    //     this.id = ulid();
    // }

    @PrimaryGeneratedColumn()
    id: number

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