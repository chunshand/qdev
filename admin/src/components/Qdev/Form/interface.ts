import { FormRules } from 'element-plus';
import { Component, reactive } from "vue"
import _ from 'lodash-es'
export interface FormItemInterfaceOption {
  label: string | number | undefined,
  value: string | number | boolean,
  children: FormItemInterfaceOption[]
}
export interface FormItemInterface {
  show: boolean
  label?: string
  model: string | number
  component: string | Component
  defaultValue?: string | number | string[] | number[]
  // 选择列表
  options?: FormItemInterfaceOption[]
  optionComponent: string | Component
  optionIsComponent: boolean
  // 是否button形式
  optionIsBtn?: boolean
  bind?: object
  on?: object
}
export interface FormOptionsHelpSetOptionsParamsType {
  key: string,
  /**
   * 请求方法
   */
  apifunc: Function,
  /**
   * 递归的props
   */
  recursionProps?: any,
  /**
   * 自定义递归方法
   */
  recursion?: { (b: any): any }
}
export interface FormOptions {
  idkey?: string,
  // 列
  columns: FormItemInterface[],
  // 规则
  // rules: { (): FormRules }
  rules?: FormRules,

  help: {
    getColumn: { (key: string): FormItemInterface | undefined },
    getColumns: { (key: string[]): FormItemInterface[] },
    /**
     * 设置属性
     */
    setOptions: { (t: FormOptionsHelpSetOptionsParamsType): void },
    initData: { (data: any): any },
    returnData: { (data: any): any },
    getForm: { (): FormOptions }

  }
}

export const DEFAULTFORM: FormOptions = {
  idkey: 'id',
  columns: [],
  rules: {}, //规则
  help: {
    getColumn(key: string): FormItemInterface | undefined {
      const form = this.getForm()
      return form.columns.find(item => item.model == key)
    },
    getColumns(keys: string[]): FormItemInterface[] {
      const form = this.getForm()
      return form.columns.filter(item => keys.includes(item.model.toString()));
    },
    async setOptions(params: FormOptionsHelpSetOptionsParamsType) {
      const form = this.getForm();
      let res = await params.apifunc()()
      if (res.success) {
        let find = form.help.getColumn(params.key)
        if (find) {
          const props = params.recursionProps ? params.recursionProps : {
            label: 'label',
            value: 'value',
            children: 'children',
            isTree: true,
          }
          function recursion(_arr: any[]) {
            let arr: any[] = [];
            for (let i in _arr) {
              let item = _arr[i];
              let obj: any = {
                id: item[props.id],
                label: item[props.label],
                value: item[props.value],
                children: [],
                meta: item
              }
              if (item[props.children] && props.isTree) {
                obj[props.children] = recursion(item[props.children]);
              }
              arr.push(obj)
            }
            return arr;
          }
          const options = params.recursion ? params.recursion(res.data) : recursion(res.data)
          console.log(options);
          find.options = options
          // eslint-disable-line
          // @ts-ignore
          find.bind.options = options;
        }
      }
    },
    initData: (data: any): any => { return data },
    returnData: (data: any): any => { return data },
    getForm: () => { return DEFAULTFORM }
  }
}

// 深层的Partial
type DeepPartial<T> = Partial<{ [P in keyof T]: DeepPartial<T[P]> }>;
/**
 * 创建Options 合并默认值
 * @param obj
 * @returns
 */
export const createFormOptions = (obj: DeepPartial<FormOptions>): FormOptions => {
  const r = reactive(_.merge(_.cloneDeep(DEFAULTFORM), _.cloneDeep(obj)));
  r.help.getForm = function () {
    return r
  }
  return r
}


