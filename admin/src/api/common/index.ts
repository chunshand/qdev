import { request } from "@/utils/service"
import { ResData } from "../types";

/**
 * 本地上传
 * @param file
 */
export const localUpload = (file: File) => {
  const formData = new FormData();
  formData.append("file", file)
  return request({
    url: "/common/upload",
    method: "post",
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
}

/**
 * 获取文件详情
 * @param file
 */
export const getFileInfo = (params: { id: number }) => {
  return request<ResData<any>>({
    url: "/common/getFileInfo",
    method: "get",
    params: params
  })
}
