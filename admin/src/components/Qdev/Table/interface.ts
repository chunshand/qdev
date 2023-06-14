import { type FormRules } from "element-plus"
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
      list: { (...args: any): Promise<any> }
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
      createTableDataApi: () => Promise.resolve({ code: 200, data: null, message: 'success' }),
      deleteTableDataApi: () => Promise.resolve({ code: 200, data: null, message: 'success' }),
      updateTableDataApi: () => Promise.resolve({ code: 200, data: null, message: 'success' }),
      getTableDataApi: () => Promise.resolve({ code: 200, data: [], message: 'success' }),
    },
    columns: [],
    leftBtns: [],
    rightBtns: [],

  },
  PaginationConfig: {
    IsPagination: true
  },
  ModalConifg: {
    modalName: 'DefaultModal',
    form: {
      columns: [],
      rules: []
    }
  }
}
