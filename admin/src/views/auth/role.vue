<!-- 角色管理 -->
<script lang="ts" setup>
import QdevTable from "@/components/Qdev/Table/index.vue"
import { createTableOptions, defaultTableOptions } from "@/components/Qdev/Table/interface";
import { listRole, createRole, deleteRole, updateRole } from "@/api/role"
const options: defaultTableOptions = createTableOptions({
  SeachConfig: {
    show: false
  },
  TableConfig: {
    api: {
      create: createRole,
      delete: deleteRole,
      update: updateRole,
      list: listRole
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
          prop: 'name',
          label: '角色名称'
        }
      },
    ],
    operation: {
      btns: {
        // setAuth: {
        //   show: true,
        //   content: "设置权限",
        //   bind: {
        //     type: "text"
        //   }
        // },
        look: {
          show: false
        },

      }
    }
  },
  ModalConfig: {
    form: {
      columns: [
        {
          show: true,
          label: '角色名称',
          component: "el-input",
          model: "name",
          bind: {
            placeholder: '请输入角色名称'
          }
        },

      ],
      rules: {

      }
    }
  },

});
</script>

<template>
  <div class="app-container">
    <QdevTable :options="options" />
  </div>
</template>

<style scoped></style>
