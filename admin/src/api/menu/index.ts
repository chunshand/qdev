import { request } from "@/utils/service"
// import type * as Menu from "./types/menu"

/** 获取我的菜单列表 */
export function getMyMenuList() {
  return request<any>({
    url: "user/getMenuList",
    method: "get"
  })
}

/** 获取我的权限列表 */
export function getMyAuthList() {
  return request<any>({
    url: "user/getAuthList",
    method: "get"
  })
}

