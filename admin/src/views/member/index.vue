<!-- 管理员管理 -->
<script lang="ts" setup>
import QdevTable from "@/components/Qdev/Table/index.vue"
import { createTableOptions, defaultTableOptions } from "@/components/Qdev/Table/interface";
import { MemberApi } from "@/api/member"
const options: defaultTableOptions = createTableOptions({
  SeachConfig: {
    show: false
  },
  TableConfig: {
    api: {
      ...MemberApi
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
        look: {
          show: false
        },
        update: {
          content: "修改密码"
        },
        updateInfo: {
          show: true,
          content: "修改资料"
        }

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
      rules: {}
    }
  }
});

</script>

<template>
  <QdevTable ref="tableRef" :options="options" />
</template>

<style scoped></style>
