import { ResData, handleTableApi } from "@/api/types"
import { request } from "@/utils/service"


export interface Menber {

}
export const MemberApi = handleTableApi<Menber>({ name: "member" })

export interface MenberInfo {
  avatar?: {
    id: number
  },
  avatarId?: number
}
export const getInfo = (params: { id: number }) => {
  return request<ResData<MenberInfo>>({
    url: "/member/getInfo",
    method: "get",
    params: params
  })
}

export const updateInfo = (data: any) => {
  return request<ResData<MenberInfo>>({
    url: "/member/updateInfo",
    method: "patch",
    data: data
  })
}
