<script lang="ts" setup>
import { computed } from 'vue';
import { localUpload } from "@/api/common"
// ------------------------------------------------+
// 封装上传组件 支持v-model
// 暂时只开发单文件上传
// ------------------------------------------------+
enum modeEnum {
  /**
   * 图片
   */
  IMAGE = "image",
  /**
   * 头像
   */
  AVATAR = "avatar",
  /**
   * 文件
   */
  FILE = "file",
  /**
   * 视频
   */
  VIDEO = "video"
}
/**
 * 上传类型定义
 */
interface uploadInterface {
  /**
   * 模式
   */
  mode: modeEnum,
  /**
   * 存储 local oss cos =
   */
  store: string
}
const props = withDefaults(
  defineProps<uploadInterface>(),
  {
    mode: modeEnum.IMAGE,
    store: "local"
  }
)

const option = computed(() => {
  let ShowFileList = false;
  let ListTYpe = "text"
  return {
    "show-file-list": ShowFileList,
    "list-type": ListTYpe
  }
})
/**
 * 文件上传
 */
const handleRequest = async (_) => {
  const file = _.file;
  // 根据mode 开始进行上传流程
  if (props.store == 'local') {
    let uploadRes = await handleLocalUpLoad(file);
    console.log(uploadRes);
  }
}

const handleLocalUpLoad = (file) => {
  return localUpload(file)
}
</script>

<template>
  <div>
    <el-upload action="#" v-bind="option" :http-request="handleRequest">
      <!--  v-if="props.mode == modeEnum.FILE" -->
      <!-- <template> -->
      <el-button>点击上传</el-button>
      <!-- </template> -->
    </el-upload>
  </div>
</template>

<style scoped></style>
