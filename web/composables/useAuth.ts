export const useUser = () => useState<{ avatar: string } | null>("user", () => null)

export async function useLogin(_data: any) {
    const user = useUser()
    let { data }: any = await useLoginApi(_data)
    const token = useCookie('token');
    if (data.value.success) {
        token.value = data.value.data.token;
        let { data: _data }: any = await useGetUserInfoApi();
        if (_data.value.success) {
            user.value = _data.value.data;
        }
    }
    return data
}