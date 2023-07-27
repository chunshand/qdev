export interface LoginRequestData {
  /** admin 或 editor */
  username: string
  /** 密码 */
  password: string
  /** 验证码 */
  code: string
}

export type LoginCodeResponseData = ApiResponseData<string>

export type LoginResponseData = ApiResponseData<{ access_token: string, refresh_token: string }>

export type UserInfoResponseData = ApiResponseData<{ username: string; roles: string[] }>
