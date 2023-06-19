import { request } from "@/utils/service"
import type * as Auth from "./types/auth"

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
