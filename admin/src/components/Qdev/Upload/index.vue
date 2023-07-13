<script lang="ts" setup>
import { computed, ref } from 'vue';
import { localUpload, getFileInfo } from "@/api/common"
import { watch } from 'vue';
import { onMounted } from 'vue';
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
  /**
   * modelValue
   */
  modelValue: number | null
}
const props = withDefaults(
  defineProps<uploadInterface>(),
  {
    mode: modeEnum.IMAGE,
    store: "local",
    modelValue: null
  }
)

const emits = defineEmits(['update:modelValue'])

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
const handleRequest = async ({ file }: any) => {
  // 根据mode 开始进行上传流程
  if (props.store == 'local') {
    let uploadRes = await handleLocalUpLoad(file);
    return uploadRes;
  }
}

const handleLocalUpLoad = (file: File) => {
  return localUpload(file)
}
const fileUrl = ref("")
const handleSuccess = (response: any, uploadFile: any) => {
  fileUrl.value = URL.createObjectURL(uploadFile.raw!)
  if (response.success) {
    emits("update:modelValue", response.data.id)
  }
}

watch(
  () => props.modelValue,
  () => {
    // 获取文件地址
    handleValueChange();
  })
const handleCleat = () => {
  fileUrl.value = "";
}
const handleValueChange = async () => {
  if (!props.modelValue) {
    return;
  }
  let res = await getFileInfo({ id: props.modelValue })
  if (res.success) {
    fileUrl.value = res.data.url;
  }
}
onMounted(() => {
  handleCleat();
  handleValueChange();
})
</script>

<template>
  <div>
    <el-upload action="#" v-bind="option" :http-request="handleRequest" :on-success="handleSuccess">
      <!-- 头像 -->
      <el-card v-if="props.mode == modeEnum.AVATAR" shadow="never" class="mode-avatar">
        <div class="container">
          <div class="image" v-if="fileUrl">
            <el-image :src="fileUrl"></el-image>
          </div>
          <el-icon size="32px" v-else>
            <Plus />
          </el-icon>
        </div>
      </el-card>
      <!-- 图片 -->
      <el-card v-if="props.mode == modeEnum.IMAGE" shadow="never" class="mode-image">
        <div class="container">
          <div class="image" v-if="fileUrl">
            <el-image :src="fileUrl"></el-image>
          </div>
          <el-icon size="32px" v-else>
            <Plus />
          </el-icon>
        </div>
      </el-card>
      <!-- 文件 -->
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

  :deep(.el-card__body) {
    width: 100%;
    height: 100%;
  }

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .image {
      width: 100%;
      height: 100%;
      position: relative;

      .el-image {
        width: 100%;
        height: 100%;
      }
    }
  }


}

.mode-image {
  width: 96px;
  height: 96px;
  display: flex;

  --el-card-padding: 0px;

  :deep(.el-card__body) {
    width: 100%;
    height: 100%;
  }

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .image {
      width: 100%;
      height: 100%;
      position: relative;

      .el-image {
        width: 100%;
        height: 100%;
      }
    }
  }

}
</style>
