<script lang="ts" setup>
import { ref } from 'vue';
const props = defineProps<{
  modalName: string
}>();
const modalShow = ref(false);
</script>

<template>
  <el-dialog v-model="modalShow" title="Tips" width="30%">
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
