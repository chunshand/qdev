<script lang="ts" setup>
import { createFormOptions } from "@/components/Qdev/Form/interface";
import QdevFormModal from "@/components/Qdev/FormModal/index.vue";
import { ref } from "vue";
import QdevUpload from "@/components/Qdev/Upload/index.vue"
import { getInfo, updateInfo } from "@/api/member"
const form = ref();
const Form = createFormOptions({
  columns: [
    {
      show: false,
      label: '主键',
      component: 'el-input',
      model: 'id',
    },
    {
      show: true,
      label: '头像',
      component: QdevUpload,
      model: 'avatar',
      bind: {
        mode: "avatar",
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

  let res = await getInfo({ id: arg.id })
  if (res.success) {
    let data = res.data;
    form.value.getForm().handleMergeData(data)
  }

}
const handleSubmit = async (data: any) => {
  let res = await updateInfo(data)
  return res.success;
}
</script>
<template>
  <QdevFormModal modalName="update-user-info" :Form="Form" ref="form" @open="handleOpen" :submit="handleSubmit" />
</template>

<style scoped></style>
