<script lang="ts" setup>
import { computed, ref } from 'vue';
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
  if (props.mode == modeEnum.AVATAR) {
    ListTYpe = 'picture'
  }
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
    return uploadRes;
  }
}

const handleLocalUpLoad = (file) => {
  return localUpload(file)
}
const fileUrl = ref("")
const handleSuccess = (response, uploadFile) => {
  console.log(response);
  fileUrl.value = URL.createObjectURL(uploadFile.raw!)
}
</script>

<template>
  <div>
    <el-upload action="#" v-bind="option" :http-request="handleRequest" :on-success="handleSuccess">
      <!--  v-if="props.mode == modeEnum.FILE" -->
      <!-- <template> -->
      <!-- </template> -->
      <el-card v-if="props.mode == modeEnum.AVATAR" shadow="never" class="mode-avatar">
        <div class="container">
          <el-image v-if="fileUrl" :src="fileUrl"></el-image>
          <el-icon size="32px" v-else>
            <Plus />
          </el-icon>
        </div>
      </el-card>
      <div v-else-if="props.mode == modeEnum.FILE">
        <el-button>点击上传</el-button>
      </div>
    </el-upload>
  </div>
</template>

<style lang="scss" scoped>
.mode-avatar {
  width: 96px;
  height: 96px;
  display: flex;

  --el-card-padding: 0px;

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ::v-deep .el-card__body {
    width: 100%;
    height: 100%;
  }

  .el-image {
    width: 100%;
    height: 100%;
  }
}
</style>
