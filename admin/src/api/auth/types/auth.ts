import { PageData, PageResData } from "@/api/types"

export interface CreateTableRequestData {

}

export interface UpdateTableRequestData {
  id: number
}

export interface GetTableRequestData extends PageData {

}

export interface GetTableData {

}

export type GetTableResponseData = PageResData<GetTableData[]>
