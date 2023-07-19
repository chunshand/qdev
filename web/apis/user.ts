export function useGetUserInfoApi() {
    return useHttp("userinfo", "/api/user/info", {
        method: "Get"
    })
}
export function useGetUserInfoApi$() {
    return useHttp("userinfo", "/api/user/info", {
        method: "Get",
        $: true
    })
}

export function useLazyGetUserInfoApi() {
    return useHttp("userinfo", "/api/user/info", {
        method: "Get",
        lazy: true
    })
}


export function useUpdateUserInfoApi(data: any) {
    return useHttp("updateUserinfo", "/api/user/update-info", {
        method: "POST",
        body: data
    })
}