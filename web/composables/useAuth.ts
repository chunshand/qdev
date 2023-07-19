export const useUser = () => useState<{ avatar: string, nickname: string } | null>("user", () => null)

/**
 * username 方式登录 
 * @returns 
 */
export async function useLogin(_data: any) {
    const user = useUser()
    let { data }: any = await useLoginApi(_data)
    const token = useCookie('token');
    if (data.value.success) {
        token.value = data.value.data.token;
        setTimeout(async () => {
            let { data: _data }: any = await useGetUserInfoApi();
            if (_data.value.success) {
                user.value = _data.value.data;
            }
        }, 300);

    }
    return data
}

/**
 * 刷新用户信息
 */
export async function useRefreshUserInfo() {
    const token = useCookie("token");
    const user = useUser();
    // 用户已登录，直接获取用户信息
    if (token.value) {
        let { data }: any = await useGetUserInfoApi();

        if (data.value) {
            user.value = data.value.data;
        }
    }
}


/**
 * 退出登录
 */

export async function useLoginOut() {
    const token = useCookie("token");
    const user = useUser();
    token.value = null
    user.value = null
}