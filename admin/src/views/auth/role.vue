<script lang="ts" setup>
import QdevDefaultTable from "@/components/Qdev/Table/index.vue"
import { createTableOptions, defaultTableOptions } from "@/components/Qdev/Table/interface";
import _ from 'lodash-es'
import { createTableDataApi, deleteTableDataApi, updateTableDataApi, getTableDataApi } from "@/api/auth/user"

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
    }
  },
  ModalConifg: {
    form: {
      columns: [
        {
          label: '用户名',
          component: "el-input",
          model: "username",
          attr: (t: any, i: any) => {
            console.log(t, i)
            return {
              placeholder: '请输入内容'
            }
          }
        },
        {
          label: '是否VIP',
          component: "el-input",
          model: "isVip",
          attr: () => {
            return {
              placeholder: '请输入内容'
            }
          }
        }
      ],
      rules: {
        username: [{ required: true, trigger: "blur", message: "请输入用户名" }],
        isVip: [{ required: true, trigger: "blur", message: "请输入密码" }]
      }
    }
  }
});
console.log(options);
</script>

<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4">
        <el-card shadow="never" class="search-wrapper">
          <el-space>
            <el-text size="large">角色</el-text>
            <el-button type="text">添加</el-button>
          </el-space>
          <el-scrollbar height="600px">
            <el-menu>
              <el-menu-item index="2">
                <span>Navigator Two</span>
              </el-menu-item>
            </el-menu>
          </el-scrollbar>
        </el-card>
      </el-col>
      <el-col :span="20" style="padding-left: 8px;box-sizing: border-box;">
        <el-card shadow="never" class="search-wrapper">
          <QdevDefaultTable :options="options" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped></style>
