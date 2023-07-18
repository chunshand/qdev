export const HttpConfig = {
    baseURL: 'http://127.0.0.1:3000'
}

export function useHttpOptions(options: any) {
    options.baseURL = options.baseURL ?? HttpConfig.baseURL
    // 用户登录，默认传token
    const token = useCookie("token")
    if (token.value) {
        if (!options.headers) {
            options.headers = {};
        }
        options.headers.Authorization = token.value
    }
    return options
}

export async function useHttp(key: string, url: string, options: any) {
    options = useHttpOptions(options);
    options.key = key
    if (options.$) {
        return $fetch(url, options)
    }
    let res = await useFetch(url, {
        ...options,
        // 相当于响应拦截器
        transform: (res: any) => {
            return res
        },
    })
    return res
}