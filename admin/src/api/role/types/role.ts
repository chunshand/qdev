import { PageData } from "@/api/types"
export interface Role {
  id: number
  title: string
}
export interface CreateTableRequestData {
  title: string
}

export interface UpdateTableRequestData {
  id: string
  title: string
}
export type CreateResponseData = ApiResponseData<null>

export interface GetAll {

}
export interface GetTableRequestData extends PageData {

}

export interface GetTableData {
  createTime: string
  id: number
  title: string
}
export type GetAllResponseData = ApiResponseData<Role[]>
export type GetTableResponseData = ApiResponseData<{
  list: GetTableData[]
  total: number
}>

