export function useGetConfigApi(key: string) {
    return useHttp(key + "config", "/common/getConfig", {
        method: "Get",
        query: {
            groupKey: key
        }
    })
}


// -------------------------------------------------------------- 上传
/**
 * 本地上传
 * @param file 
 * @returns 
 */
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


