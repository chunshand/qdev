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
      createTableDataApi: { (...args: any): Promise<any> },
      deleteTableDataApi: { (...args: any): Promise<any> },
      updateTableDataApi: { (...args: any): Promise<any> },
      getTableDataApi: { (...args: any): Promise<any> }
    }
  },
  // 分页配置
  PaginationConfig: {
    IsPagination: boolean // 是否存在分页
  },
  // 模态框配置
  ModalConifg: {

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
    }
  },
  PaginationConfig: {
    IsPagination: true
  },
  ModalConifg: {

  }
}
