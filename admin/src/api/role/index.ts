import { request } from "@/utils/service"
import { ResData, handleTableApi } from "../types"


export interface Role {
  id: number
  name: string
}
export const RoleApi = handleTableApi<Role>({ name: "role" })


/** 查 */
export function listAllRole(params: {}) {
  return request<ResData<Role[]>>({
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
