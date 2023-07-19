<script lang="ts" setup>
import QdevTable from "@/components/Qdev/Table/index.vue"
import { createTableOptions, defaultTableOptions } from "@/components/Qdev/Table/interface";
import { ArticleApi } from "@/api/article"
import { open } from "@/components/Qdev/Modal/help";
import Wangeditor from "@/components/Wangeditor/index.vue"
import QdevUpload from "@/components/Qdev/Upload/index.vue"

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
    modalWidth: '50%',
    form: {
      columns: [
        {
          show: true,
          model: "title",
          label: "标题",
          component: "el-input",
          bind:{
            placeholder:"请输入标题"
          }
        },
        {
          show: true,
          model: "cover",
          label: "封面",
          component: QdevUpload
        },
        {
          show: true,
          model: "desc",
          label: "描述",
          component: "el-input",
          bind:{
            type:"textarea",
            placeholder:"请输入描述"
          }
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