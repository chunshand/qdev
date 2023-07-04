<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { ElTree } from 'element-plus'
const props = defineProps({
  options: [],
  modelValue: []
})
const emits = defineEmits(['update:modelValue'])
const treeRef = ref<InstanceType<typeof ElTree>>()
watch(() => props.modelValue, (value: any) => {
  treeRef.value!.setCheckedKeys(value)
})
const handleCheckChange = () => {

  const values = treeRef.value!.getCheckedKeys()
  emits('update:modelValue', values)
}
const defaultProps = {
  children: 'children',
  label: 'label',
}
</script>

<template>
  <div style="width: 100%;">
    <el-tree ref="treeRef" node-key="id" :data="props.options" show-checkbox :props="defaultProps" default-expand-all
      @check-change="handleCheckChange" />
  </div>
</template>

<style scoped></style>
