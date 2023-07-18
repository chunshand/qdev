export function useGetConfigApi(key: string) {
    return useHttp(key + "config", "/common/getConfig", {
        method: "Get",
        query: {
            groupKey: key
        }
    })
}



export function useLocalUpload(file: File) {
    const formData = new FormData();
    formData.append("file", file)
    return useHttp("useLocalUpload", "/common/upload", {
        method: "POST",
        body: formData,
        server: false,
        $: true
    })
}

export function useFileInfo(query: any) {
    return useHttp("useFileInfo", "/common/getFileInfo", {
        method: "POST",
        query: query
    })
}
