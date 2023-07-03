import { FormRules } from 'element-plus';
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
  component: string
  defaultValue?: string | number | undefined
  // 选择列表
  options?: FormItemInterfaceOption[]
  // 是否button形式
  optionIsBtn?: boolean
  bind?: object
  on?: object
}
export interface FormOptions {
  idkey?: string,
  // 列
  columns: FormItemInterface[],
  // 规则
  // rules: { (): FormRules }
  rules?: FormRules,

  help: {
    getColumn: {
      (form: FormOptions, key: string): FormItemInterface | undefined
    },
    setOptions: {
      (
        form: FormOptions,
        key: string,
        apifunc: { (): any },
        recursion?: { (b: any): any }): void
    },
    initData: { (data: any): any },
    returnData: { (data: any): any },

  }
}

export const DEFAULTFORM: FormOptions = {
  idkey: 'id',
  columns: [],
  rules: {}, //规则
  help: {
    getColumn(form: FormOptions, key: string): FormItemInterface | undefined {
      return form.columns.find(item => item.model == key) || undefined
    },
    async setOptions(
      form: FormOptions,
      key: string,
      apifunc: { (): any },
      recursionProps: any = {
        id: "id",
        label: "label",
        value: "value",
        children: "children",
        isTree: true
      },
      recursion: {
        (b: any): any,
      } = (_arr: any[], props: any = recursionProps) => {
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
      }) {
      let res = await apifunc()
      if (res.success) {
        let find = form.help.getColumn(form, key)
        if (find) {
          const options = recursion(res.data)
          find.options = options
          // eslint-disable-line
          // @ts-ignore
          find.bind.options = options;
        }
      }


    },
    initData: (data: any): any => { return data },
    returnData: (data: any): any => { return data }

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
  return _.merge(_.cloneDeep(DEFAULTFORM), _.cloneDeep(obj))
}


