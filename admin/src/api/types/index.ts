/**
 * 分页参数
 */
export interface PageData {
  /** 当前页码 */
  currentPage: number
  /** 查询条数 */
  pageSize: number
}
// --------------------------------------------------------------------- res
/**
 * 默认返回
 */
export type ResData<T> = ApiResponseData<T>

/**
 * 分页结构返回
 */
export type PageResData<T> = ApiResponseData<{
  list: T
  total: number
}>


