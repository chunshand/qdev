<script lang="ts" setup>
import QdevTable from "@/components/Qdev/Table/index.vue"
import { createTableOptions, defaultTableOptions } from "@/components/Qdev/Table/interface";
import { LoginLogApi } from "@/api/login-log"
import { open } from "@/components/Qdev/Modal/help";
const options: defaultTableOptions = createTableOptions({
  SeachConfig: {
    show: false
  },
  TableConfig: {
    api: {
      ...LoginLogApi
    },
    index: {
      show: true,
      bind: {
        label: "序号",
        width: 55,
        align: "center"
      }
    },
    columns: [
      {
        bind: {
          label: "登录平台",
          prop: "platform"
        }
      },
      {
        bind: {
          label: "登录方式",
          prop: "loginMethod"
        }
      },
      {
        bind: {
          label: "登录人",
          prop: "user.userInfo.nickname"
        }
      },
      {
        bind: {
          label: "登录时间",
          prop: "createTime"
        }
      }
    ],
    operation: {
      show: false,
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
      ],
      rules: {}
    }
  }
});

</script>

<template>
  <QdevTable ref="tableRef" :options="options" />
</template>
<style lang="scss" scoped></style>