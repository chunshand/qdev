export const useWebAppConigState = () => useState<{ openReg: boolean, openLogin: boolean } | null>("webAppConfig", () => null)
/**
 * 获取应用配置 
 * @returns 
 */
export async function useWebAppConig() {
    const appConfig = useWebAppConigState()
    let { data }: any = await useGetConfigApi("web")
    if (data.value.success) {
        appConfig.value = data.value.data;
    }
    return data
}