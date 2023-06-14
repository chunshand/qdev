<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { handleEmitOpenModal, handleOnOpenModal, handleOffModal, handleOnCloseModal } from "./index"
const props = defineProps<{
  modalName: string
}>();
const modalShow = ref(false);
const handleOpen = () => {
  handleEmitOpenModal(props.modalName, {});

}
const handleOpened = () => {
  handleEmitOpenModal(props.modalName, {});
}
onMounted(() => {
  handleOnOpenModal(props.modalName, () => {
    modalShow.value = true;
  })
  handleOnCloseModal(props.modalName, () => {
    modalShow.value = false;
  })
})
onUnmounted(() => {
  handleOffModal(props.modalName)
})
</script>

<template>
  <el-dialog v-model="modalShow" title="Tips" width="30%" @open="handleOpen" @opened="handleOpened">
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped></style>
