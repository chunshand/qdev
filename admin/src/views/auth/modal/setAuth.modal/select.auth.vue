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
  treeRef.value!.setCheckedKeys(value.map((item: any) => { id: item }))
  // treeRef.value!.setCheckedNodes(value.map((item: any) => { id: item }), false)
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
    {{ props.modelValue }}
    <el-tree ref="treeRef" node-key="id" :data="props.options" show-checkbox :props="defaultProps" default-expand-all
      @node-click="handleCheckChange">
    </el-tree>
  </div>
</template>

<style scoped></style>
