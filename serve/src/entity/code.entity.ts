import { Column, Entity } from "typeorm";
import { Base } from "./base";

/**
 * 验证码表
 */
@Entity()
export class Code extends Base {

  @Column({
    comment: "验证码"
  })
  code: string

  @Column({
    comment: "类型|image email"
  })
  type: string

  @Column({
    comment: "消费者"
  })
  userId: number

  @Column({
    comment: "是否已消费",
    default: false
  })
  isUse: boolean
}
