<script lang="ts" setup>
const props = defineProps<{
  value: string,
  label: string,
  meta: any
}>()
</script>

<template>
  <el-space>
    <el-text>{{ props.meta.summary }}</el-text>
    <el-tag size="small">{{ props.meta.method }}</el-tag>
    <el-text>{{ props.value }}</el-text>
  </el-space>
</template>

<style scoped></style>
