<script lang="ts" setup>
import { createFormOptions } from "@/components/Qdev/Form/interface";
import QdevFormModal from "@/components/Qdev/FormModal/index.vue";
import { ref } from "vue";
import QdevUpload from "@/components/Qdev/Upload/index.vue"
const form = ref();
const Form = createFormOptions({
  columns: [
    {
      show: false,
      label: '用户id',
      component: 'el-input', // 多选
      model: 'userId',
    },
    {
      show: true,
      label: '头像',
      component: QdevUpload, // 多选
      model: 'avatar',
      bind: {
      },
    }
  ]
});
const handleOpen = async (arg: any) => {
  console.log(arg);

  form.value.getForm().handleMergeData(arg)



}
const handleSubmit = async (data: any) => {
  return false;
}
</script>
<template>
  <QdevFormModal modalName="update-member-info" :Form="Form" ref="form" @open="handleOpen" :submit="handleSubmit" />
</template>

<style scoped></style>
