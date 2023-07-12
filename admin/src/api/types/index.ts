import { request } from "@/utils/service"

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


/**
 * 表格页通用型类型定义
 */
export interface defaultTableData<E> {
  entity: E
  createDto: E,
  updateDto: E,
  removeDto: {
    id: number
  },
  findOneDto: {
    id: number
  },
  findAllDto: {
  },
  /**
   * 创建返回
   */
  createResData: E,
  /**
   * 查询单个返回
   */
  findOneResData: E,
  /**
   * 查询多个分页返回
   */
  findAllResData: PageResData<E>
}


interface tableOption {
  name: string
}
/**
 * 表格下通用数据接口
 */
export function handleTableApi<E>(option: tableOption) {
  type MenberMeta = defaultTableData<E>
  const name = option.name;
  return {

    /**
     * 添加
     */
    create(data: MenberMeta["createDto"]) {
      return request({
        url: `/${name}/create`,
        method: "post",
        data
      })
    },

    /**
     * 删除
     */
    remove(params: MenberMeta["findOneDto"]) {
      return request({
        url: `/${name}/remove`,
        method: "delete",
        params: params
      })
    },

    /**
     * 修改
     */
    update(data: MenberMeta["updateDto"]) {
      return request({
        url: `/${name}/update`,
        method: "patch",
        data
      })
    },

    /**
     * 查询信息
     */
    find(params: MenberMeta["findOneDto"]) {
      return request<MenberMeta["findOneResData"]>({
        url: `/${name}/find`,
        method: "get",
        params
      })
    },

    /**
     * 获取列表
     */
    list(params: MenberMeta["findAllDto"]) {
      return request<MenberMeta["findAllResData"]>({
        url: `/${name}/list`,
        method: "get",
        params
      })
    }

  }
}
