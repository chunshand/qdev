import { PageData } from "@/api/types"

export interface CreateTableRequestData {
  title: string
}

export interface UpdateTableRequestData {
  id: string
  title: string
}

export interface GetTableRequestData extends PageData {

}

export interface GetTableData {
  createTime: string
  id: number
  title: string
}

export type GetTableResponseData = ApiResponseData<{
  list: GetTableData[]
  total: number
}>
