<script lang="ts" setup>
import { createFormOptions } from "@/components/Qdev/Form/interface";
import QdevFormModal from "@/components/Qdev/FormModal/index.vue";
import { listAllRole } from "@/api/role/index"
import { getRoleList, setRole } from "@/api/auth/user"
import { ref } from "vue";
const form = ref();
const setRoleForm = createFormOptions({
  columns: [
    {
      show: false,
      label: '用户id',
      component: 'el-input', // 多选
      model: 'userId',
    },
    {
      show: true,
      label: '角色设置',
      component: 'el-select', // 多选
      model: 'rolesIds',
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
  // 查询全部角色
  setRoleForm.help.setOptions({
        key:"rolesIds",
        apifunc: ()=>listAllRole,
        recursionProps: {
            id: "id",
            label: "name",
            value: "id",
            children: "children",
            isTree: false
        }
    })

  // 查询用户的角色

  let res = await getRoleList(arg);
  if (res.success) {
    const rolesIds = res.data.map((item:any) => item.id)
    form.value.getForm().handleMergeData({ rolesIds })
  }

}
const handleSubmit = async (data: any) => {
  console.log(data);
  let res = await setRole(data)
  return res.success;
}
</script>
<template>
  <QdevFormModal modalName="setUserRole" :Form="setRoleForm" ref="form" @open="handleOpen" :submit="handleSubmit" />
</template>

<style scoped></style>
