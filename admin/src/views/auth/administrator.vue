<!-- 管理员管理 -->
<script lang="ts" setup>
import QdevTable from "@/components/Qdev/Table/index.vue"
import { createTableOptions, defaultTableOptions } from "@/components/Qdev/Table/interface";
import { createTableDataApi, deleteTableDataApi, updateTableDataApi, getTableDataApi } from "@/api/auth/user"
import { open } from "@/components/Qdev/Modal/help";
import SetRoleModal from "./modal/setRole.modal.vue"
const options: defaultTableOptions = createTableOptions({
  SeachConfig: {
    show: false
  },
  TableConfig: {
    api: {
      create: createTableDataApi,
      delete: deleteTableDataApi,
      update: updateTableDataApi,
      list: getTableDataApi
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
      btns: {
        setRole: {
          show: true,
          content: "设置角色",
          bind: {
            type: "text"
          },
          on: {
            click({ value }: any) {
              open('setUserRole', {
                userId: value.id
              })
            }
          }
        },
      }
    },
    leftBtns: {
      batchDelete: {
        show: false
      },
      batchUpdate: {
        show: false
      },
      recycleBin: {
        show: false
      }
    },
    rightBtns: {
      exportData: {
        show: false
      }
    }
  },
  ModalConfig: {
    form: {
      columns: [
        {
          show: true,
          label: '账户',
          component: "el-input",
          model: "username",
          bind: {
            placeholder: '输入账户'
          }
        },
        {
          show: true,
          label: '密码',
          component: "el-input",
          model: "password",
          bind: {
            placeholder: '输入密码'
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
    <QdevTable ref="tableRef" :options="options" />
    <SetRoleModal />
  </div>
</template>

<style scoped></style>
