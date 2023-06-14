import { FormRules } from 'element-plus';
import _ from 'lodash-es'
interface FormItemInterfaceOption {
  label: string | number | undefined,
  value: string | number | boolean,
  children: FormItemInterfaceOption[]
}
export interface FormItemInterface {
  label: string
  model: string | number
  component: string
  // 选择列表
  options: FormItemInterfaceOption[]
  // 是否button形式
  optionIsBtn: boolean
  attr?: { (): object }
  on?: { (): object }
}
export interface FormOptions {
  // 列
  columns: FormItemInterface[],
  // 规则
  // rules: { (): FormRules }
  rules: FormRules
}

export const DEFAULTFORM: FormOptions = {
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


