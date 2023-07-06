import { PageData } from "@/api/types"
export interface Role {
  id: number
  name: string
}
export interface CreateTableRequestData {
  name: string
}

export interface UpdateTableRequestData {
  id: string
  name: string
}
export type CreateResponseData = ApiResponseData<null>

export interface GetAll {

}
export interface GetTableRequestData extends PageData {

}

