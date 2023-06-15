import { getCurrentInstance } from "vue";

/**
 * on 与 bind 的转换
 * @returns 
 */
export const useTransformOnBind = () => {
  const { proxy } = getCurrentInstance() || { proxy: null };
  return (v: any, item: any) => {
    if (v) {
      return typeof v == 'function' ? v(proxy, item) : v
    }
    return {}
  }
}
