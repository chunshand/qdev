export function useGetConfigApi(key: string) {
    return useHttp(key + "config", "/common/getConfig", {
        method: "Get",
        query: {
            groupKey: key
        }
    })
}