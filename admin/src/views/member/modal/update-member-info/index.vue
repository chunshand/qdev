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
      component: 'el-input',
      model: 'userId',
    },
    {
      show: true,
      label: '头像',
      component: QdevUpload,
      model: 'avatar',
      bind: {
        mode: "avatar"
      },
    },
    {
      show: true,
      label: '用户昵称',
      component: 'el-input',
      model: 'nickname',
      bind: {

      },
    },
    {
      show: true,
      label: '手机号',
      component: 'el-input',
      model: 'phone',
      bind: {

      },
    },
    {
      show: true,
      label: '邮箱',
      component: 'el-input',
      model: 'email',
      bind: {

      },
    }
  ]
});
const handleOpen = async (arg: any) => {
  console.log(arg);
  const info = {}
  form.value.getForm().handleMergeData(info)



}
const handleSubmit = async (data: any) => {
  return false;
}
</script>
<template>
  <QdevFormModal modalName="update-member-info" :Form="Form" ref="form" @open="handleOpen" :submit="handleSubmit" />
</template>

<style scoped></style>
