<!-- form 和 mode 的结合 -->
<script lang="ts" setup>
import QdevModal from "@/components/Qdev/Modal/index.vue"
import QdevForm from "@/components/Qdev/Form/index.vue"
import { FormOptions } from "../Form/interface";
import { ref } from "vue";
import { nextTick } from "vue";
const props = defineProps<{
  modalName: string,
  submit?: { (a: any): Promise<boolean> | boolean },
  Form: FormOptions
}>();
const emits = defineEmits(['open'])
const QdevFormRef = ref();
/**
 * 提交前判断
 */
const handleModalBeforeSubmit = (): Promise<boolean> => {
  return new Promise(async (resolve) => {
    let bool = await QdevFormRef.value?.handleValidate();
    if (!bool) return resolve(false);
    if (!props.submit) return resolve(true);
    bool = await props.submit(QdevFormRef.value.handleGetformData());
    if (!bool) return resolve(false);
    resolve(true);
  })
}
/**
 * 打开事件
 */
const handleOpen = (arg: any) => {
  emits('open', arg)
  // props.Form.onMounted && props.Form.onMounted(props.Form);
  if (arg && arg[props.Form.idkey ?? 'id']) {
    nextTick(() => {
      QdevFormRef.value.handleSetformData(arg);
    })
  } else {
    nextTick(() => {
      QdevFormRef.value.handleResetformData();
    })
  }
}
</script>

<template>
  <span>
    <QdevModal :modalName="props.modalName" @open="handleOpen" :submit="handleModalBeforeSubmit">
      <QdevForm :Form="props.Form" ref="QdevFormRef"></QdevForm>
    </QdevModal>
  </span>
</template>

<style scoped></style>
