import { handleTableApi } from "../types"

export interface sysConfigGroup {
  id: number
  key: string
  title: string
}
export const sysConfigGroupApi = handleTableApi<sysConfigGroup>({ name: "sysConfig/sysConfigGroup" })

export interface sysConfigGroupItem {
  id: number
  key: string;
  title: string;
  type: string;
  value: string;
}
export const sysConfigGroupItemApi = handleTableApi<sysConfigGroupItem>({ name: "sysConfig/sysConfigGroupItem" })
