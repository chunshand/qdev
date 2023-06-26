<!-- 菜单权限管理 -->
<script lang="ts" setup>
import QdevTable from "@/components/Qdev/Table/index.vue"
import { createTableOptions } from "@/components/Qdev/Table/interface";
import { createApi, updateApi, deleteApi, getApi, getMenuList } from "@/api/auth/auth"
import { ref } from "vue";
import { onMounted } from "vue";
const options = ref(createTableOptions({
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
      show: false,
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
      {
        bind: {
          prop: 'type',
          label: '类型'
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
          component: "el-cascader",
          model: "parent",
          bind: {
            placeholder: '选择上一级',
            "show-all-levels": false,
            props: {
              checkStrictly: true
            }
          },
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
            // change(data: any) {
            //   console.log("change");
            //   console.log(data);
            //   let value = data.args[0];
            //   let item = data.item;
            //   const help = options.value.ModalConfig.form.help;
            //   const form = options.value.ModalConfig.form;
            //   let find = help.getColumn(form, item.model)
            //   if (find) {
            //     let pathf = help.getColumn(form, "path");
            //     let isLinkf = help.getColumn(form, "isLink");
            //     let componentf = help.getColumn(form, "component");
            //     let iconf = help.getColumn(form, "icon");

            //     switch (value) {
            //       case "catalog":
            //         if (pathf && isLinkf && componentf && iconf) {
            //           pathf.show = false;
            //           isLinkf.show = false;
            //           componentf.show = false;
            //           iconf.show = false;
            //         }
            //         break;
            //       case "menu":
            //         if (pathf && isLinkf && componentf && iconf) {
            //           pathf.show = true;
            //           isLinkf.show = true;
            //           componentf.show = true;
            //           iconf.show = true;
            //         }
            //         break;
            //       case "action":
            //         if (pathf && isLinkf && componentf && iconf) {
            //           pathf.show = false;
            //           isLinkf.show = false;
            //           componentf.show = false;
            //           iconf.show = false;
            //         }
            //         break;
            //       default:
            //         break;
            //     }
            //   }

            // }
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

      },
      help: {
        returnData(data: any) {
          data.parent = data.parent ? data.parent[data.parent.length - 1] : undefined;
          return data
        }
      }

    },
    onOpen: () => {
      // const help = options.value.ModalConfig.form.help;
      // const form = options.value.ModalConfig.form;
      // let find = help.getColumn(form, 'type')
      // if (find) {
      //   find?.on?.change({
      //     args: [find.defaultValue]
      //   })
      // }
    }

  },
  PaginationConfig: {
    IsPagination: false
  }
}));


onMounted(() => {
  options.value.ModalConfig.form.help.setOptions(options.value.ModalConfig.form, 'parent', getMenuList)
})
</script>

<template>
  <QdevTable :options="options" />
</template>

<style scoped></style>
