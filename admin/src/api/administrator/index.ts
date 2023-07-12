import { request } from "@/utils/service"

import { handleTableApi } from "@/api/types"

export interface Administrator {
  id: string
  username: string
  password?: string
}
export const UserApi = handleTableApi<Administrator>({ name: "administrator" })


/** 获取菜单列表 */
export function getMenuList() {
  return request<any>({
    url: "administrator/getMenuList",
    method: "get"
  })
}

/** 获取权限列表 */
export function getAuthList() {
  return request<any>({
    url: "administrator/getAuthList",
    method: "get"
  })
}

/** 获取角色列表 */
export function getRoleList(data: { userId?: number }) {
  return request<any>({
    url: "administrator/getRoleList",
    method: "get",
    params: data
  })
}

/**
 * 设置权限
 */
export function setRole(data: { userId?: number, rolesIds: number[] }) {
  return request<any>({
    url: "administrator/setRole",
    method: "post",
    data: data
  })
}
