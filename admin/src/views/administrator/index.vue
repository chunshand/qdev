<!-- 管理员管理 -->
<script lang="ts" setup>
import QdevTable from "@/components/Qdev/Table/index.vue"
import { createTableOptions, defaultTableOptions } from "@/components/Qdev/Table/interface";
import { UserApi } from "@/api/administrator"
import { open } from "@/components/Qdev/Modal/help";
import SetRoleModal from "./modal/setRole-modal.vue"
import UpdateMemberInfoModal from "@/components/modal/update-user-info/index.vue"

const options: defaultTableOptions = createTableOptions({
  SeachConfig: {
    show: false
  },
  TableConfig: {
    api: {
      ...UserApi
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
        setRole: {
          show: true,
          content: "设置角色",
          bind: {
            type: "text"
          },
          on: {
            click({ meta }: any) {
              open('setUserRole', {
                userId: meta.id
              })
            }
          }
        },
        updateInfo: {
          show: true,
          content: "修改资料",
          on: {
            click: ({ meta }: any) => {
              open("update-user-info", { id: meta.userInfo.id })
            }
          }
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
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 25, message: "长度在 5 到 25 个字符", trigger: "blur" }

        ],
        password: [
          { message: "请输入密码", trigger: "blur" },
          { min: 5, max: 25, message: "长度在 5 到 25 个字符", trigger: "blur" }
        ],
      }
    }
  }
});

</script>

<template>
  <QdevTable ref="tableRef" :options="options" />
  <SetRoleModal />
  <UpdateMemberInfoModal />
</template>

<style scoped></style>
