<!-- 菜单权限管理 -->
<script lang="ts" setup>
import QdevTable from "@/components/Qdev/Table/index.vue"
import { createTableOptions, defaultTableOptions } from "@/components/Qdev/Table/interface";
import { createApi, updateApi, deleteApi, getApi } from "@/api/auth/auth"
const options: defaultTableOptions = createTableOptions({
  SeachConfig: {
    show: false
  },
  TableConfig: {
    api: {
      create: createApi,
      delete: deleteApi,
      update: updateApi,
      list: getApi
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
          prop: 'title',
          label: '标题'
        }
      },
    ],
    operation: {
    },

  },
  ModalConfig: {
    form: {
      columns: [
        {
          label: '上级',
          component: "el-select",
          model: "p",
          bind: {
            placeholder: '选择上一级'
          }
        },
        {
          label: '唯一标识',
          component: "el-input",
          model: "key",
          bind: {
            placeholder: '请输入唯一标识'
          }
        },
        {
          label: '标题',
          component: "el-input",
          model: "title",
          bind: {
            placeholder: '请输入'
          }
        },
        {
          label: '图标',
          component: "el-input",
          model: "icon",
          bind: {
            placeholder: '请输入'
          }
        },
        {
          label: '类型',
          component: "el-select",
          model: "type",
          options: [
            { label: "目录", value: "catalog" }
          ],
          bind: {
            placeholder: '请输入',
          }
        },


      ],
      rules: {

      }
    }
  },
  PaginationConfig: {
    IsPagination: false
  }
});
</script>

<template>
  <QdevTable :options="options" />
</template>

<style scoped></style>
