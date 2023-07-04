import { ApiProperty } from "@nestjs/swagger"

/**
 * 常用分页Dto
 */
export class PageDto {
  /** 当前页码 */
  @ApiProperty({
    description: '当前页码',
    type: Number
  })
  currentPage: string
  /** 查询条数 */
  @ApiProperty({
    description: '查询条数',
    type: Number
  })
  pageSize: string
}