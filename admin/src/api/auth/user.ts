import { request } from "@/utils/service"

import { handleTableApi } from "@/api/types"

export interface User {
  id: string
  username: string
  password?: string
}
export const UserApi = handleTableApi<User>({ name: "user" })


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
export function getRoleList(data: { userId?: number }) {
  console.log(data);
  return request<any>({
    url: "user/getRoleList",
    method: "get",
    params: data
  })
}

/**
 * 设置权限
 */
export function setRole(data: { userId?: number, rolesIds: number[] }) {
  return request<any>({
    url: "user/setRole",
    method: "post",
    data: data
  })
}
