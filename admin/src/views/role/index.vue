<!-- 角色管理 -->
<script lang="ts" setup>
import QdevTable from "@/components/Qdev/Table/index.vue"
import { createTableOptions } from "@/components/Qdev/Table/interface";
import { RoleApi } from "@/api/role"
import { open } from "@/components/Qdev/Modal/help"
import { ref } from "vue";
import SetAuthModal from "./modal/setAuth.modal/setAuth.modal.vue"

/**
 * 设置权限弹窗name
 */
const table_ref = ref();
const options = createTableOptions({
  SeachConfig: {
    show: false
  },
  TableConfig: {
    api: {
      ...RoleApi
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
        look: {
          show: false
        },
        setAuth: {
          show: true,
          content: "设置权限",
          bind: {
            type: "text"
          },
          on: {
            click({ meta }: any) {

              open('setRoleAuth', {
                roleId: meta.id
              });
            }
          }
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
  <QdevTable ref="table_ref" :options="options" />
  <SetAuthModal />
</template>
<style scoped></style>
