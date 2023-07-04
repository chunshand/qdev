import { request } from "@/utils/service"
import type * as Table from "./types/role"

/** 增 */
export function createRole(data: Table.CreateTableRequestData) {
  return request<Table.CreateResponseData>({
    url: "/role",
    method: "post",
    data
  })
}

/** 删 */
export function deleteRole(id: number) {
  return request({
    url: `/role/${id}`,
    method: "delete"
  })
}

/** 改 */
export function updateRole(data: Table.UpdateTableRequestData) {
  return request({
    url: `/role/${data.id}`,
    method: "put",
    data
  })
}

/** 查 */
export function listRole(params: Table.GetTableRequestData) {
  return request<Table.GetTableResponseData>({
    url: "/role",
    method: "get",
    params
  })
}

/** 查 */
export function listAllRole(params: {}) {
  return request<Table.GetAllResponseData>({
    url: "/role/all",
    method: "get",
    params
  })
}


/**
 * 获取角色下权限
 */
export function getAuth(params: { roleId: number }) {
  return request<any>({
    url: "/role/auth",
    method: "get",
    params
  })
}
/**
 * 设置角色权限
 */
export function setAuth(data: { roleId: number, authIds: number[] }) {
  return request<any>({
    url: "/role/auth",
    method: "post",
    data
  })
}
