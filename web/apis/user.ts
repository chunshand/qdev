export function useGetUserInfoApi() {
    return useHttp("userinfo", "/api/user/info", {
        method: "Get"
    })
}
export function useLazyGetUserInfoApi() {
    return useHttp("userinfo", "/api/user/info", {
        method: "Get",
        lazy: true
    })
}