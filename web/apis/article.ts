export function useArticleList(query: any) {
    return useHttp("useArticleList", "/api/article/list", {
        method: "Get",
        query: query
    });
}

export function useArticleDetails(query: any) {
    return useHttp("useArticleDetails", "/api/article/details", {
        method: "Get",
        query: query
    });
}