import { request } from "@/utils/service"
import type * as Menu from "./types/menu"

/** 获取我的菜单列表 */
export function getMyMenuListApi() {
  return request<Menu.MenusResponseData>({
    url: "user/getMyMenuList",
    method: "get"
  })
}

/** 获取我的权限列表 */
export function getMyAuthListApi() {
  return request<Menu.MenusResponseData>({
    url: "user/getMyAuthList",
    method: "get"
  })
}

