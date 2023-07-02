<!-- 角色分配 -->
<script lang="ts" setup>
import QdevTable from "@/components/Qdev/Table/index.vue"
import { createTableOptions, defaultTableOptions } from "@/components/Qdev/Table/interface";
import { createTableDataApi, deleteTableDataApi, updateTableDataApi, getTableDataApi } from "@/api/auth/user"
import RoleSelect from "./components/role.select.vue"

import { ref } from "vue";
const tableRef = ref();
const roleId = ref(undefined);
/**
 * 角色选择
 */
const handleRoleChange = (role: any) => {
  roleId.value = role.id;
  tableRef.value.handleSetFixedData({ roleId: role.id })
  tableRef.value.handleRefreshData();
}

// ------------------------------------------------------------------ 表格
const handleGetList = (q: any) => {
  q.roleId = roleId.value ?? undefined;
  return getTableDataApi(q);
}
const options: defaultTableOptions = createTableOptions({
  SeachConfig: {
    show: false
  },
  TableConfig: {
    api: {
      create: createTableDataApi,
      delete: deleteTableDataApi,
      update: updateTableDataApi,
      list: handleGetList
    },
    index: {
      show: true,
      bind: {
        label: '序号',
        width: 55,
        align: 'center'
      }
    },
    columns: [
      {
        bind: {
          prop: 'username',
          label: '用户名'
        }
      },
    ],
    operation: {
    }
  },
  ModalConfig: {
    form: {
      columns: [
        {
          show: true,
          label: '选择用户',
          component: "el-select",
          model: "userids",
          bind: {
            placeholder: '选择用户'
          }
        },

      ],
      rules: {

      }
    }
  }
});
</script>

<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4">
        <el-card shadow="never" class="search-wrapper">
          <RoleSelect @change="handleRoleChange" />
        </el-card>
      </el-col>
      <el-col :span="20" style="padding-left: 8px;box-sizing: border-box;">
        <el-card shadow="never" class="search-wrapper">
          <QdevTable ref="tableRef" :options="options" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped></style>
