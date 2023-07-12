import { request } from "@/utils/service"
import { ResData, handleTableApi } from "../types"
export interface Auth {
  id: number
  name: string
}
export const AuthApi = handleTableApi<Auth>({ name: "auth" })


/**
 * 获取菜单目录 为了子级选择上级
 */
export function allMenu() {
  return request<any>({
    url: "/auth/allMenu",
    method: "get",
    params: {}
  })
}

/**
 * 获取权限列表 全部
 */
export function allAuth() {
  return request<any>({
    url: "/auth/allAuth",
    method: "get",
  })
}

/**
 * 获取所有动作列表 相当于接口权限了
 */
export function allAction() {
  return request<ResData<any>>({
    url: "/auth/allAction",
    method: "get",
  })
}
