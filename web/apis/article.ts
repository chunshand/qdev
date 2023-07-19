export function useArticleList(query: any) {
    return useHttp("useArticleList", "/api/article/list", {
        method: "Get",
        query: query
    });
}