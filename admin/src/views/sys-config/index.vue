<script lang="ts" setup>
import { sysConfigGroupApi, sysConfigGroup, sysConfigGroupItemApi } from '@/api/sys-config';
import { createFormOptions } from "@/components/Qdev/Form/interface";
import { open } from "@/components/Qdev/Modal/help"
import { nextTick, onMounted, ref, watch, computed } from 'vue';
import SysConfigGroupItemFormItemComponent from "./components/sysConfigGroupItemFormItemComponent.vue"
import { ElMessageBox } from 'element-plus'
import { RemoveFilled } from '@element-plus/icons-vue';
import { systemKeyModifiers } from '@vue/test-utils/dist/constants/dom-events';
// --------------------------------------------------- group
const SysConfigGroupActiveKey = ref<string>("")
const sysConfigGroupList = ref<sysConfigGroup[]>([])
const handleInitLoad = async () => {
  await handleGetSysConfigGroupList();
  if (sysConfigGroupList.value.length > 0) {

    let find = sysConfigGroupList.value[0];
    SysConfigGroupActiveKey.value = find.key;
  }
}
const handleGetSysConfigGroupList = async () => {
  let { data } = await sysConfigGroupApi.list();
  sysConfigGroupList.value = data.list;
  return data
}
const sysConfigGroupForm = createFormOptions({
  columns: [
    {
      show: true,
      model: "key",
      component: "el-input",
      label: "唯一标识",
    }, {
      show: true,
      model: "title",
      component: "el-input",
      label: "配置分组名称",
    },
  ]
})
/**
 *
 */
const handleSysConfigGroupModalOpen = () => {

}
/**
 * 打开配置分组弹窗
 */
const handleOpenCreateSysConfigGroupModal = () => {
  open("sysConfigGroup")
}

/**
 * 配置分组提交事件
 */
const handleSysConfigGroupSubmit = async (data: any) => {
  console.log(data);
  if (!data.id) {
    await sysConfigGroupApi.create(data)
  } else {
    await sysConfigGroupApi.update(data)
  }
  await handleGetSysConfigGroupList();
  return true
}
/**
 * 删除配置分组
 */
const handleRemoveSysConfigGroup = (name: string) => {
  ElMessageBox.confirm("确定是否删除该配置分组", "删除", {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    let find = sysConfigGroupList.value.find(item => item.key == name)
    if (!find) {
      return;
    }
    await sysConfigGroupApi.remove({ id: find.id })
    handleGetSysConfigGroupList();
  })
}
// --------------------------------------------------- item
const QdevFormRef = ref();
const SysConfigGroupItemForm = createFormOptions({
  columns: [
    {
      show: true,
      component: "el-input",
      model: "title",
      label: "标题",
    },
    {
      show: true,
      component: "el-input",
      model: "key",
      label: "唯一标识",
    },
    {
      show: true,
      component: "el-select",
      model: "type",
      label: "类型",
      options: [
        {
          label: "文本",
          value: "string"
        },
        {
          label: "数值",
          value: "number"
        },
        {
          label: "开关",
          value: "switch"
        },
        {
          label: "时间",
          value: "date"
        },
        {
          label: "文件",
          value: "file"
        },
      ]
    },
    {
      show: true,
      component: "el-input",
      model: "value",
      label: "初始值"
    }
  ]
})
/**
 * 打开配置项弹窗
 */
const handleOpenCreateSysConfigGroupItemModal = () => {
  open("sysConfigGroupItem")
}
const handleUpdateSysConfigGroupTitle = () => {
  let find = sysConfigGroupList.value.find(item => item.key = SysConfigGroupActiveKey.value)
  if (!find) {
    return;
  }
  ElMessageBox.prompt("修改名称", "修改", {
    inputValue: find.title,
  }).then(async ({ value }) => {
    await sysConfigGroupApi.update({
      id: find.id,
      title: value
    })
    handleGetSysConfigGroupList();
  })
}
/**
 * 配置项创建或编辑
 * @param data
 */
const handleSysConfigGroupItemSubmit = async (data: any) => {
  if (!data.id) {
    let find = sysConfigGroupList.value.find((item) => item.key == SysConfigGroupActiveKey.value);
    if (!find) {
      return;
    }
    data.sysConfigGroupId = find.id;
    await sysConfigGroupItemApi.create(data)
    handleFindSysConfigGroupItems();
  } else {
    await sysConfigGroupItemApi.update(data)
  }
  return true
}
const SysConfigGroupItemDetailsForm = createFormOptions();
const SysConfigGroupItemDetailsData = ref<any[]>([])
/**
 * 获取分组下配置项
 */
const handleFindSysConfigGroupItems = async () => {
  let find = sysConfigGroupList.value.find((item) => item.key == SysConfigGroupActiveKey.value);
  if (!find) {
    return;
  }
  let sysConfigGroupId = find.id;
  let { data } = await sysConfigGroupItemApi.list({
    sysConfigGroupId
  });
  SysConfigGroupItemDetailsData.value = data.list;
  SysConfigGroupItemDetailsForm.columns = data.list.map((item) => {
    return {
      show: true,
      label: `${item.title}(${item.key})`,
      component: SysConfigGroupItemFormItemComponent,
      bind: {
        itemType: item.type
      },
      defaultValue: item.value,
      model: item.key,
      on: {
        input: ({ value, item }) => {
          handleSaveSysConfigItemData(value, item);
        },
        change: ({ value, item }) => {
          handleSaveSysConfigItemData(value, item);
        }
      },
      after: {
        component: "el-button",
        content: "",
        bind: {
          type: "danger",
          link: true,
          icon: RemoveFilled
        },
        on: {
          click: ({ item }) => {
            handleRemoveSysConfigGroupItem(item);
          }
        }
      }
    }
  })
  nextTick(() => {
    QdevFormRef.value.handleResetformData();
  })
}
watch(() => SysConfigGroupActiveKey.value, () => {
  handleFindSysConfigGroupItems();
})

const handleSaveSysConfigItemData = async (value, item) => {
  let find = SysConfigGroupItemDetailsData.value.find((i) => i.key == item.model);
  if (!find) {
    return;
  }
  await sysConfigGroupItemApi.update({
    id: find.id,
    value,
  })
}

/**
 * 删除配置项
 */
const handleRemoveSysConfigGroupItem = (item) => {
  ElMessageBox.confirm("是否删除该选项？需注意是否存在使用该选项配置数据的存在", "删除", {
    type: "warning"
  }).then(async () => {
    let find = SysConfigGroupItemDetailsData.value.find((i) => i.key == item.model);
    if (!find) {
      return;
    }
    await sysConfigGroupItemApi.remove({
      id: find.id
    })
    handleFindSysConfigGroupItems();
  })
}
const sysGroupCurrent = computed(() => {
  return sysConfigGroupList.value.find(item => item.key == SysConfigGroupActiveKey.value)
})
onMounted(() => {
  handleInitLoad();
})
</script>

<template>
  <div class="app-container">
    <el-card>
      <div class="pb-2">
        <el-button type="primary" size="small" @click="handleOpenCreateSysConfigGroupModal">添加配置分组</el-button>
      </div>
      <el-tabs type="card" v-model="SysConfigGroupActiveKey" closable @tab-remove="handleRemoveSysConfigGroup">
        <el-tab-pane :label="item.title + '(' + item.key + ')'" :name="item.key" v-for="item in sysConfigGroupList"
          :key="item.id">
        </el-tab-pane>
      </el-tabs>
      <div v-if="sysGroupCurrent">
        <div class="pb-6">
          <el-space>
            <el-button size="small" type="primary" link @click="handleUpdateSysConfigGroupTitle">修改分组名</el-button>
            <el-button size="small" type="primary" link @click="handleOpenCreateSysConfigGroupItemModal">创建配置项</el-button>
          </el-space>
        </div>
        <div class="w-2xl">
          <QdevForm :Form="SysConfigGroupItemDetailsForm" ref="QdevFormRef" />
        </div>
      </div>
    </el-card>
    <QdevFormModal modalName="sysConfigGroup" :Form="sysConfigGroupForm" @open="handleSysConfigGroupModalOpen"
      :submit="handleSysConfigGroupSubmit" />
    <QdevFormModal modalName="sysConfigGroupItem" :Form="SysConfigGroupItemForm" @open="handleSysConfigGroupModalOpen"
      :submit="handleSysConfigGroupItemSubmit" />
  </div>
</template>

<style scoped></style>
