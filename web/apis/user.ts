export function useGetUserInfoApi() {
    return useHttp("login", "/api/user/info", {
        method:"Get"
    })
}