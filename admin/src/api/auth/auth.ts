import { request } from "@/utils/service"
import type * as Auth from "./types/auth"
import { ResData } from "../types"

/** 增 */
export function createApi(data: Auth.CreateTableRequestData) {
  return request({
    url: "auth",
    method: "post",
    data
  })
}

/** 删 */
export function deleteApi(id: string) {
  return request({
    url: `auth/${id}`,
    method: "delete"
  })
}

/** 改 */
export function updateApi(data: Auth.UpdateTableRequestData) {
  return request({
    url: `auth/${data.id}`,
    method: "patch",
    data
  })
}

/** 查 */
export function getApi(params: Auth.GetTableRequestData) {
  return request<Auth.GetTableResponseData>({
    url: "auth",
    method: "get",
    params
  })
}

/**
 * 获取菜单目录
 */
export function getMenuList() {
  return request<Auth.MenuTreeData>({
    url: "auth/menu",
    method: "get",
    params: {}
  })
}

/**
 * 获取权限列表
 */
export function listAllAuth() {
  return request<any>({
    url: "/auth/all",
    method: "get",
  })
}

/**
 * 获取所有动作列表
 */
export function allAction() {
  return request<ResData<any>>({
    url: "/auth/allAction",
    method: "get",
  })
}
