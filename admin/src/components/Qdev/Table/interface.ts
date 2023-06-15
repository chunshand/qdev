import _ from 'lodash-es'
import { FormOptions } from "../Form/interface"
interface ELbtn {
  key: string
  content: string
  show: boolean
  attr?: { (): object }
  on?: { (): object }
}
interface TableConfigColumns {
  component: string
  attr: object
}
// 深层的Partial
type DeepPartial<T> = Partial<{ [P in keyof T]: DeepPartial<T[P]> }>;
/**
 * 创建Options 合并默认值
 * @param obj
 * @returns
 */
export const createTableOptions = (obj: DeepPartial<defaultTableOptions>): defaultTableOptions => {
  return _.merge(_.cloneDeep(DEFAULTTABLEOPTIONS), _.cloneDeep(obj))
}
/**
 * 类型定义
 */
export interface defaultTableOptions {
  // 搜索区配置
  SeachConfig: {
    show: boolean // 是否显示搜索区
  },
  // 表格配置
  TableConfig: {
    // api方法
    api: {
      create: { (...args: any): Promise<any> },
      delete: { (...args: any): Promise<any> },
      update: { (...args: any): Promise<any> },
      list: { (...args: any): Promise<any> },
      find?: { (...args: any): Promise<any> },
    },
    // 列
    columns: TableConfigColumns[],
    // left btns
    leftBtns: ELbtn[],
    rightBtns: ELbtn[],
    // right btns
    // 是否多选
    // 排序字段
  },
  // 分页配置
  PaginationConfig: {
    IsPagination: boolean // 是否存在分页
  },
  // 模态框配置
  ModalConifg: {
    modalName: string,
    form: FormOptions
  }
}

/**
 * 默认值
 */
export const DEFAULTTABLEOPTIONS: defaultTableOptions = {
  SeachConfig: {
    show: true,
  },
  TableConfig: {
    api: {
      create: () => Promise.resolve({ code: 200, data: null, message: 'success' }),
      delete: () => Promise.resolve({ code: 200, data: null, message: 'success' }),
      update: () => Promise.resolve({ code: 200, data: null, message: 'success' }),
      list: () => Promise.resolve({ code: 200, data: [], message: 'success' }),
    },
    columns: [],
    leftBtns: [
      {
        key: 'batchRemove',
        content: "批量删除",
        show: true
      },
      {
        key: 'batchUpdate',
        content: "批量修改",
        show: true
      },
      {
        key: 'recycleBin',
        content: "回收站",
        show: true
      }
    ],
    rightBtns: [
      {
        key: 'export',
        content: "导出",
        show: true
      },
      {
        key: 'refresh',
        content: "刷新",
        show: true
      }
    ],

  },
  PaginationConfig: {
    IsPagination: true
  },
  ModalConifg: {
    modalName: 'DefaultModal',
    form: {
      columns: [],
      rules: {}
    }
  }
}
