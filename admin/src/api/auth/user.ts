import { request } from "@/utils/service"
import type * as User from "./types/user"

/** 增 */
export function createTableDataApi(data: User.CreateTableRequestData) {
  return request({
    url: "user",
    method: "post",
    data
  })
}

/** 删 */
export function deleteTableDataApi(id: string) {
  return request({
    url: `user/${id}`,
    method: "delete"
  })
}

/** 改 */
export function updateTableDataApi(data: User.UpdateTableRequestData) {
  return request({
    url: `user/${data.id}`,
    method: "patch",
    data
  })
}

/** 查 */
export function getTableDataApi(params: User.GetTableRequestData) {
  return request<User.GetTableResponseData>({
    url: "user",
    method: "get",
    params
  })
}


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
export function getRoleList(params?: { userId?: number }) {
  return request<any>({
    url: "user/getRoleList",
    method: "get",
    params
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
