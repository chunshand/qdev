<script lang="ts" setup>
import { allAction } from "@/api/auth";
import { onMounted, ref } from "vue"

const toType = (method: string): any => {
  let type = "";
  switch (method) {
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
}
const optionsList = ref<any[]>([])
const options = ref<any[]>([])
const remoteMethod = (query: string) => {
  options.value = optionsList.value.filter((item) => {
    const label = `${item.summary}${item.method}:${item.path}`
    return label.toLowerCase().includes(query.toLowerCase())
  })
}
onMounted(async () => {
  let res = await allAction();
  if (res.success) {
    optionsList.value = res.data
    remoteMethod('');
  }
})
</script>

<template>
  <el-select filterable remote :remote-method="remoteMethod">
    <el-option :value="`${option.method}:${option.path}`" v-for="option in options" :key="String(option.path)">
      <el-space>
        <el-tag size="small" effect="dark" :type="toType(option.method)">{{ option.method }}</el-tag>
        <el-text>{{ option.summary }}</el-text>
        <el-text>{{ option.path }}</el-text>
      </el-space>
    </el-option>
  </el-select>
</template>

<style scoped></style>
