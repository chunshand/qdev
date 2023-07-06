<script lang="ts" setup>
import { computed } from "vue"
const props = defineProps<{
  value: string,
  label: string,
  meta: any
}>()
const type = computed(() => {
  let type = "";
  switch (props.meta.method) {
    case 'GET':
      type = "success"
      break;
    case 'POST':
      type = ""
      break;
    case 'DELETE':
      type = "danger"
      break;
    case 'PUT':
      type = "info"
      break;
    case 'PATCH':
      type = "warning"
      break;
    default:
      break;
  }
  return type;
})
</script>

<template>
  <el-space>
    <el-tag size="small" effect="dark" :type="type">{{ props.meta.method }}</el-tag>
    <el-text>{{ props.meta.summary }}</el-text>
    <el-text>{{ props.value }}</el-text>
  </el-space>
</template>

<style scoped></style>
