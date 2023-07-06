<!-- 菜单权限管理 -->
<script lang="ts" setup>
import QdevTable from "@/components/Qdev/Table/index.vue"
import { createTableOptions } from "@/components/Qdev/Table/interface";
import { createApi, updateApi, deleteApi, getApi, getMenuList, allAction } from "@/api/auth/auth"
import { onMounted } from "vue";
import ActionOption from "./components/action.option.vue"
const options = createTableOptions({
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
        },
        isSlot: true,
        slotName: "type"
      },
    ],
    operation: {
      btns: {
        look: {
          show: false
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
    }

  },
  ModalConfig: {
    form: {
      columns: [
        // 上级
        {
          show: true,
          label: '选择上级',
          component: "el-cascader",
          model: "parentId",
          bind: {
            placeholder: '选择上一级',
            "show-all-levels": false,
            props: {
              checkStrictly: true,
              emitPath: false
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
            change({ value }: any) {
              handletypeChange(value);


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
        {
          show: true,
          label: '是否显示',
          component: "el-switch",
          model: "isShow",
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
          },
          optionComponent: ActionOption,
          optionIsComponent: true
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
    onOpen(arg: any) {
      options.ModalConfig.form.help.setOptions({
        key: "parentId",
        apifunc: () => getMenuList,
        recursionProps: {
          id: "id",
          label: "title",
          value: "id",
          children: "children",
          isTree: true
        },

      })
      options.ModalConfig.form.help.setOptions({
        key: "path",
        apifunc: () => allAction,
        recursion: function (_arr: any[]) {
          let arr: any[] = [];
          for (let i in _arr) {
            let item = _arr[i];
            let obj: any = {
              id: `${item.method}:${item.path}`,
              label: `${item.method}:${item.path}`,
              value: `${item.method}:${item.path}`,
              children: [],
              meta: item
            }
            arr.push(obj)
          }
          return arr;
        }
      })

      let type = options.ModalConfig.form.help.getColumn('type')
      let bind = type?.bind as any;
      bind.disabled = arg && arg.id ? true : false;
      if (arg) {
        handletypeChange(arg['type']);
      }
    },
  },
  PaginationConfig: {
    IsPagination: false
  }
});
const handletypeChange = (value: any) => {
  let [icon, isLink, isShow, path] = options.ModalConfig.form.help.getColumns(['icon', 'isLink', 'isShow', 'path'])

  if (value == 'action') {
    icon.show = false
    isLink.show = false
    isShow.show = false
    path.component = 'el-select'
  } else {
    icon.show = true
    isLink.show = true
    isShow.show = true
    path.component = 'el-input'

  }
}
onMounted(() => {

})
</script>

<template>
  <QdevTable :options="options">
    <template #type="scope">
      <el-tag v-if="scope.row.type == 'catalog'" type="success">目录</el-tag>
      <el-tag v-else-if="scope.row.type == 'menu'">菜单</el-tag>
      <el-tag v-else-if="scope.row.type == 'action'" type="warning">权限</el-tag>
    </template>
  </QdevTable>
</template>

<style scoped></style>
