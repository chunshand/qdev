import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class Base {
  @CreateDateColumn({
    comment: '创建时间'
  })
  createTime: Date;

  @UpdateDateColumn({
    comment: '更新时间'
  })
  updateTime: Date;
}