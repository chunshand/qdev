import { request } from "@/utils/service"
// import type * as Menu from "./types/menu"

/** 获取菜单列表 */
export function getMenuList() {
  return request<any>({
    url: "user/getMenuList",
    method: "get"
  })
}

/** 获取权限列表 */
export function getAuthList() {
  return request<any>({
    url: "user/getAuthList",
    method: "get"
  })
}

/** 获取角色列表 */
export function getRoleList() {
  return request<any>({
    url: "user/getRoleList",
    method: "get"
  })
}
