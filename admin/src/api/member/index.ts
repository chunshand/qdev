import { handleTableApi } from "@/api/types"

export interface Menber {

}
export const MemberApi = handleTableApi<Menber>({ name: "member" })
