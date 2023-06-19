import { PageData } from "@/api/types"

export interface CreateTableRequestData {

}

export interface UpdateTableRequestData {
  id: number
}

export interface GetTableRequestData extends PageData {

}

export interface GetTableData {

}

export type GetTableResponseData = ApiResponseData<{
  list: GetTableData[]
  total: number
}>
