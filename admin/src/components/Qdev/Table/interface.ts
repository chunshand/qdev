import _ from 'lodash-es'
import { FormOptions, createFormOptions } from "../Form/interface"
import { Delete, Edit, Expand, Remove, Refresh, Download, Plus } from "@element-plus/icons-vue"
import { reactive } from "vue"
export const TableConfigBtnKeyArr: string[] = [
  // left
  "batchDelete",
  "batchUpdate",
  "recycleBin",
  // right
  "exportData",
  "refreshData",
  // columns
  "look",
  "update",
  "delete"

];
export type TableConfigBtnKey = typeof TableConfigBtnKeyArr[number];
export type ELbtnMap = { [key: string]: ELbtn }
interface ELbtn {
  key: TableConfigBtnKey | string
  content?: string | undefined
  show: boolean
  bind?: object
  on?: object
}
interface TableConfigColumns {
  bind?: object
  on?: object
  component?: string
  componentOn?: object
  componentBind?: object
  isSlot: boolean
  slotName: string

}
// 深层的Partial
type DeepPartial<T> = Partial<{ [P in keyof T]: DeepPartial<T[P]> }>;
/**
 * 创建Options 合并默认值
 * @param obj
 * @returns
 */
export const createTableOptions = (obj: DeepPartial<defaultTableOptions>): defaultTableOptions => {
  const r = reactive(_.merge(_.cloneDeep(DEFAULTTABLEOPTIONS), _.cloneDeep(obj)));
  r.ModalConfig.form = createFormOptions(r.ModalConfig.form)
  return r;
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
    rowKey: string,
    bind?: object
    on?: object
    // api方法
    api: {
      /**
       * 创建
       */
      create: { (...args: any): Promise<any> },
      /**
       * 删除
       */
      delete: { (...args: any): Promise<any> },
      /**
       * 更新
       */
      update: { (...args: any): Promise<any> },
      /**
       * 获取列表
       */
      list: { (...args: any): Promise<any> },
      /**
       * 搜索获取列表
       */
      seach?: { (...args: any): Promise<any> },
      /**
       * 查询单个
       */
      find?: { (...args: any): Promise<any> },
      /**
       * 批量删除
       */
      batchDelete?: { (...args: any): Promise<any> },
      /**
       * 批量删除
       */
      batchUpdate?: { (...args: any): Promise<any> },
    },
    // 选择列
    selection: {
      show: boolean,
      bind?: object
      on?: object
    },
    index: {
      show: boolean,
      bind?: object
      on?: object
    },
    expand: {
      show: boolean,
      bind?: object
      on?: object
    },
    // 列
    columns: TableConfigColumns[],
    /**
     * 操作列
     */
    operation: {
      show: boolean,
      btns: ELbtnMap,
      bind?: object
      on?: object
    }

    // left btns
    leftBtns: ELbtnMap,
    // right btns
    rightBtns: ELbtnMap,

  },
  // 分页配置
  PaginationConfig: {
    IsPagination: boolean // 是否存在分页
  },
  // 模态框配置
  ModalConfig: {
    modalName: string,
    form: FormOptions,
    onOpen: { (p: any): void }
  }
}
/**
 * btn 方法默认调用
 */
const DefaultBtnOn: object = {
  click: (E: any) => {
    E.that.exposed.handleBtnClick({
      key: E.item.key,
      item: E.item,
      value: E.meta
    })
  }
}

/**
 * 默认值
 */
export const DEFAULTTABLEOPTIONS: defaultTableOptions = {
  SeachConfig: {
    show: false,
  },
  TableConfig: {
    rowKey: 'id',
    api: {
      create: () => Promise.resolve({ code: 200, data: null, message: 'success' }),
      delete: () => Promise.resolve({ code: 200, data: null, message: 'success' }),
      update: () => Promise.resolve({ code: 200, data: null, message: 'success' }),
      list: () => Promise.resolve({ code: 200, data: [], message: 'success' }),
    },
    selection: {
      show: false,
    },
    index: {
      show: false,
    },
    expand: {
      show: false,
    },
    columns: [],
    leftBtns: {
      create: {
        key: 'create',
        content: "新增",
        show: true,
        on: DefaultBtnOn,
        bind: {
          type: 'primary',
          icon: Plus,
        }
      },
      batchDelete: {
        key: 'batchDelete',
        content: "批量删除",
        show: false,
        on: DefaultBtnOn,
        bind: {
          type: 'danger',
          icon: Remove,
        }
      },
      batchUpdate: {
        key: 'batchUpdate',
        content: "批量修改",
        show: false,
        on: DefaultBtnOn,
        bind: {
          type: 'warning',
          icon: Edit
        }
      },
      recycleBin: {
        key: 'recycleBin',
        content: "回收站",
        show: false,
        on: DefaultBtnOn,
        bind: {
          type: 'info',
          icon: Delete
        }
      }
    },
    rightBtns: {
      exportData: {
        key: 'exportData',
        content: undefined,
        show: false,
        on: DefaultBtnOn,
        bind: {
          icon: Download,
          title: "导出",
          type: "success"
        }
      },
      refreshData: {
        key: 'refreshData',
        content: "",
        show: true,
        on: DefaultBtnOn,
        bind: {
          icon: Refresh,
          title: '刷新',
          type: 'info'
        }

      }
    },
    operation: {
      show: true,
      bind: {
        label: '操作'
      },
      btns:
      {
        look: {
          key: "look",
          content: "查看",
          show: true,
          on: DefaultBtnOn,
          bind: {
            type: "text"
          }
        },
        update: {
          key: "update",
          content: "修改",
          show: true,
          on: DefaultBtnOn,
          bind: {
            type: "text"
          }
        },
        delete: {
          key: "delete",
          content: "删除",
          show: true,
          on: DefaultBtnOn,
          bind: {
            type: "text"
          }
        }
      }

    },

  },
  PaginationConfig: {
    IsPagination: true
  },
  ModalConfig: {
    modalName: "modename",
    form: createFormOptions({}),
    onOpen: () => { }
  }
}


