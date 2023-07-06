<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { on, off } from "./help"
const props = defineProps<{
  modalName: string,
  submit?: { (): Promise<boolean> | boolean }
}>();
const emit = defineEmits(['open', 'opened', 'close', 'submit'])
const modalShow = ref(false);
const argData = ref()
/**
 * 关闭弹窗
 */
const handleBtnCloeModal = () => {
  modalShow.value = false;
}
const handleBtnSubmit = async () => {
  if (!props.submit) return true;
  let bool = await props.submit();
  if (bool) {
    modalShow.value = false;
  }
  emit('submit')
}
onMounted(() => {
  on(props.modalName, {
    open: (arg: any) => {
      modalShow.value = true;
      argData.value = arg
    },
    close: (arg: any) => {
      modalShow.value = false;
    }
  })

})
const handleModalOpen = () => {
  emit('open', argData.value)
}
const handleModalOpened = () => {
  emit('opened', argData.value)
}
const handleModalClose = () => {
  emit('close', argData.value)
}
onUnmounted(() => {
  off(props.modalName);
})
</script>

<template>
  <el-dialog v-if="props.modalName" v-model="modalShow" width="600px" @open="handleModalOpen" @opened="handleModalOpened"
    @close="handleModalClose">
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleBtnCloeModal">取消</el-button>
        <el-button type="primary" @click="handleBtnSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped></style>
