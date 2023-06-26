import { getCurrentInstance } from "vue";
import _ from "lodash-es"
/**
 * on 与 bind 的转换 参数带有 this 和 当前对象 第三形参才是本参
 * @returns
 */
export const useTransformOnBind = () => {
  const { proxy, data } = getCurrentInstance() || { proxy: null };
  const CurrentInstance = getCurrentInstance();
  // v-当前绑定对象 item-绑定元数据 value-用户自定义传进来的数据
  return (v: any, item: any, value?: any) => {
    value ? value = _.clone(value) : null;
    if (v != undefined) {
      if (typeof v == 'function') {
        return v(proxy, item)
      } else if (typeof v == 'object') {
        let _v: any = {};
        Object.keys(v).map((k) => {
          if (typeof v[k] == 'function') {
            // args 事件返回数据
            _v[k] = (...args: any[]) => {
              return v[k].call(null, {
                args: args,
                that: CurrentInstance,
                item: item,
                value: value
              });
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
