<template>
  <template v-if="props.itemType == 'string'">
    <el-input />
  </template>
  <template v-else-if="props.itemType == 'number'">
    <el-input type="number" />
  </template>
  <template v-else-if="props.itemType == 'switch'">
    <el-switch />
  </template>
  <template v-else-if="props.itemType == 'date'">
    <el-date-picker type="date" />
  </template>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
const props = defineProps<{
  itemType: string
}>()

onMounted(() => {
  console.log('mounted!')
})
</script>
<style lang="scss" scoped></style>
