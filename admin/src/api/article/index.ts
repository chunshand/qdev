import { ResData, handleTableApi } from "@/api/types"
import { request } from "@/utils/service"
export interface Article {
}
export const ArticleApi = handleTableApi<Article>({ name: "article" })