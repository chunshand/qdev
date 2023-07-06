<script lang="ts" setup>
import { createFormOptions } from "@/components/Qdev/Form/interface";
import { FormOptions } from "@/components/Qdev/Form/interface";
import QdevFormModal from "@/components/Qdev/FormModal/index.vue";
import { listAllAuth } from "@/api/auth/auth"
import { getAuth, setAuth } from "@/api/role/index"
import { ref } from "vue";
import SelectAuth from "./select-auth.vue"
const form = ref();
const setAuthForm = createFormOptions({
  columns: [
    {
      show: false,
      label: '角色id',
      component: 'el-input', // 多选
      model: 'roleId',
    },
    {
      show: true,
      label: '权限设置',
      component: SelectAuth, // 多选
      model: 'authIds',
      bind: {
        multiple: true
      },
      options: [],
      defaultValue: []
    }
  ]
});
const handleOpen = async (arg: any) => {
  form.value.getForm().handleMergeData(arg)
  // 查询全部权限
  setAuthForm.help.setOptions({
    key: "authIds",
    apifunc: () => listAllAuth,
    recursionProps: {
      id: "id",
      label: "title",
      value: "title",
      children: "children",
      isTree: true
    }
  })

  // 查询用户的角色
  let res = await getAuth(arg);
  if (res.success) {
    const authIds = res.data.map((item: any) => item.id)
    form.value.getForm().handleMergeData({ authIds })
  }
}
const handleSubmit = async (data: any) => {
  let res = await setAuth(data)
  return res.success;
}
</script>
<template>
  <QdevFormModal modalName="setRoleAuth" :Form="setAuthForm" ref="form" @open="handleOpen" :submit="handleSubmit" />
</template>

<style scoped></style>
