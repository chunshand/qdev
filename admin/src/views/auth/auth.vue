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
        // 上级
        {
          show: true,
          label: '选择上级',
          component: "el-select",
          model: "p",
          bind: {
            placeholder: '选择上一级'
          }
        },

        // 唯一标识
        {
          show: true,
          label: '唯一标识',
          component: "el-input",
          model: "key",
          bind: {
            placeholder: '请输入唯一标识'
          }
        },
        // 标题
        {
          show: true,
          label: '标题',
          component: "el-input",
          model: "title",
          bind: {
            placeholder: '请输入'
          }
        },
        // 类型 
        {
          show: true,
          label: '类型',
          component: "el-radio-group",
          model: "type",
          optionIsBtn: true,
          defaultValue: "catalog",
          options: [
            { label: "目录", value: "catalog" },
            { label: "菜单", value: "menu" },
            { label: "动作", value: "action" },
          ],
          bind: {
            placeholder: '请输入',
          },
          on: {
            change() {
              // TODO 这里需要通过变化改变 其他item 的show
              console.log(arguments);
            }
          }
        },
        // 图标
        {
          show: true,
          label: '图标',
          component: "el-input",
          model: "icon",
          bind: {
            placeholder: '请输入'
          }
        },
        // 是否为外链
        {
          show: true,
          label: '是否为外链',
          component: "el-switch",
          model: "isLink",
          bind: {
            placeholder: '请输入'
          }
        },
        // 路径
        {
          show: true,
          label: '路径',
          component: "el-input",
          model: "path",
          bind: {
            placeholder: '请输入',
          }
        },
        // 组件路径
        {
          show: true,
          label: '组件',
          component: "el-input",
          model: "component",
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
