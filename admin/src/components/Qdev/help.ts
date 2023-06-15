import { getCurrentInstance } from "vue";

/**
 * on 与 bind 的转换 参数带有 this 和 当前对象 第三形参才是本参
 * @returns
 */
export const useTransformOnBind = () => {
  const { proxy, data } = getCurrentInstance() || { proxy: null };
  const CurrentInstance = getCurrentInstance();
  return (v: any, item: any) => {
    if (v != undefined) {
      if (typeof v == 'function') {
        return v(proxy, item)
      } else if (typeof v == 'object') {
        let _v: any = {};
        Object.keys(v).map((k) => {
          if (typeof v[k] == 'function') {
            _v[k] = (...args: any[]) => {
              return v[k].apply(null, [CurrentInstance, item].concat(...args));
            }
          } else {
            _v[k] = v[k];
          }

        })
        return _v;
      }
    }
    return {}
  }
}
