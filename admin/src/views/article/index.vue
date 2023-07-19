<script lang="ts" setup>
import QdevTable from "@/components/Qdev/Table/index.vue"
import { createTableOptions, defaultTableOptions } from "@/components/Qdev/Table/interface";
import { ArticleApi } from "@/api/article"
import { open } from "@/components/Qdev/Modal/help";
import Wangeditor from "@/components/Wangeditor/index.vue"
const options: defaultTableOptions = createTableOptions({
  SeachConfig: {
    show: false
  },
  TableConfig: {
    api: {
      ...ArticleApi
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
          label: "标题",
          prop: "title"
        }
      },
      {
        bind: {
          label: "发布人",
          prop: "createUser.userInfo.nickname"
        }
      },
      {
        bind: {
          label: "创建时间",
          prop: "createTime"
        }
      }
    ],
    operation: {
      btns: {
        look: {
          show: false
        },
        update: {
          find: true
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
          model: "title",
          label: "标题",
          component: "el-input"
        },
        {
          show: true,
          model: "content",
          label: "内容",
          component: Wangeditor,
        }
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