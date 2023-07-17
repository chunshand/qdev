import { ResData, handleTableApi } from "@/api/types"
import { request } from "@/utils/service"
export interface LoginLog {
}
export const LoginLogApi = handleTableApi<LoginLog>({ name: "login-log" })