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
