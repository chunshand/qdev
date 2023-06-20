import { FormRules } from 'element-plus';
import _ from 'lodash-es'
interface FormItemInterfaceOption {
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
  rules?: FormRules
}

export const DEFAULTFORM: FormOptions = {
  idkey: 'id',
  columns: [],
  rules: {} //规则
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


