import { request } from "@/utils/service"

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
