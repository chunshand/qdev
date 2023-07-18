export function useLoginApi(data: any) {
    return useHttp("login", "/api/login/username", {
        body: data,
        method:"POST"
    })
}