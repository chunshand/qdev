<script lang="ts" setup>
import { listAllRole, createRole, deleteRole } from "@/api/role"
import { Role } from "@/api/role/types/role"
import { ref, onMounted } from "vue";
import QdevFormModal from "@/components/Qdev/FormModal/index.vue"
import { FormOptions } from "@/components/Qdev/Form/interface";
import { open } from "@/components/Qdev/Modal/help";
import { ElMessage, ElMessageBox } from "element-plus";
import { createFormOptions } from "@/components/Qdev/Form/interface";
const roleList = ref<Role[]>([])
const emits = defineEmits(['change'])
/**
 * 获取角色列表
 */
const handleGetRoleList = async () => {
  let res = await listAllRole({});
  if (res.success) {
    roleList.value = res.data;
  }
}
const handleSelect = (index: any) => {
  let find = roleList.value.find((item) => item.id == +index)
  emits('change', find)
}
const FormConfig: FormOptions = createFormOptions({
  columns: [
    {
      label: '角色名称',
      component: 'el-input',
      model: 'name',
      bind: {

      }
    }
  ],
  rules: {
    name: [
      {
        required: true,
        message: '请填写角色名称'
      }
    ]
  }
});

/**
 * 创建角色
 */
const handleCreateRole = async (data: any) => {
  let res = await createRole(data)
  if (!res.success) {
    ElMessage.error(res.message);
    return false;
  }
  handleGetRoleList();
  return res.success;
}
const handleDeleteRole = (item: Role) => {
  ElMessageBox.confirm("确定删除该角色？", "删除提示", { type: "error" }).then(async () => {
    await deleteRole(item.id);
    handleGetRoleList();
  })
}
onMounted(() => {
  handleGetRoleList()
})
</script>
<template>
  <el-space>
    <el-text size="large">角色</el-text>
    <el-button type="text" @click="open('add-role')">添加</el-button>
  </el-space>
  <el-scrollbar height="600px">
    <el-menu @select="handleSelect">
      <el-menu-item v-for="item in roleList" :key="item.id" :index="item.id.toString()">
        <el-space>
          <span>{{ item.name }}</span>
          <el-button type="text" @click.stop="open('add-role', item)">修改</el-button>
          <el-button type="text" @click.stop="handleDeleteRole(item)">删除</el-button>
        </el-space>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
  <QdevFormModal modalName="add-role" :Form="FormConfig" :submit="handleCreateRole" />
</template>

<style scoped></style>
