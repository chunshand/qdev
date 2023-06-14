<!-- 针对一般情况表格制作 常用组件 -->
<!-- 搜索区 表格区 弹窗区 插槽的方式 -->

<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { type FormInstance, type FormRules, ElMessage, ElMessageBox } from "element-plus"
import { Search, Refresh, CirclePlus, Delete, Download, RefreshRight } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"
import { defaultTableOptions, DEFAULTTABLEOPTIONS } from "./interface"
import { onMounted } from "vue"
const props = withDefaults(
  defineProps<{
    options: defaultTableOptions
  }>(),
  {
    options: () => DEFAULTTABLEOPTIONS
  }
)


const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

//#region 增
const dialogVisible = ref<boolean>(false)
const formRef = ref<FormInstance | null>(null)
const formData = reactive({
  username: "",
  password: ""
})
const formRules: FormRules = reactive({
  username: [{ required: true, trigger: "blur", message: "请输入用户名" }],
  password: [{ required: false, trigger: "blur", message: "请输入密码" }]
})
const handleCreate = () => {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      if (currentUpdateId.value === undefined) {
        props.options.TableConfig.api.createTableDataApi({
          username: formData.username,
          password: formData.password
        }).then(() => {
          ElMessage.success("新增成功")
          dialogVisible.value = false
          getTableData()
        })
      } else {
        props.options.TableConfig.api.updateTableDataApi({
          id: currentUpdateId.value,
          username: formData.username,
          password: formData.password ? formData.password : undefined
        }).then(() => {
          ElMessage.success("修改成功")
          dialogVisible.value = false
          getTableData()
        })
      }
    } else {
      return false
    }
  })
}
const resetForm = () => {
  currentUpdateId.value = undefined
  formData.username = ""
  formData.password = ""
}
//#endregion

//#region 删
const handleDelete = (row: any) => {
  ElMessageBox.confirm(`正在删除用户：${row.username}，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    props.options.TableConfig.api.deleteTableDataApi(row.id).then(() => {
      ElMessage.success("删除成功")
      getTableData()
    })
  })
}
//#endregion

//#region 改
/**
 * 修改对象的主键
 */
const currentUpdateId = ref<undefined | string>(undefined)
/**
 * 修改操作
 * @param row 
 */
const handleUpdate = (row: any) => {
  currentUpdateId.value = row.id
  formData.username = row.username
  dialogVisible.value = true
}
//#endregion

//#region 查

/**
 * 表格数据
 */
const tableData = ref<any[]>([])

/**
 * 搜索区 ref
 */
const searchFormRef = ref<FormInstance | null>(null)

/**
 * 搜索数据
 */
const searchData = reactive({
  username: "",
  phone: ""
})

/**
 * 获取列表数据
 */
const getTableData = async () => {
  loading.value = true
  try {
    const res = await props.options.TableConfig.api.getTableDataApi({
      currentPage: paginationData.currentPage,
      pageSize: paginationData.pageSize
    })
    paginationData.total = res.data.total
    tableData.value = res.data.list
  } catch (error) {
    tableData.value = []
  }
  loading.value = false
}
/**
 * 条件搜索
 */
const handleSearch = () => {
  if (paginationData.currentPage === 1) {
    getTableData()
  }
  paginationData.currentPage = 1
}
/**
 * 重置搜索
 */
const resetSearch = () => {
  searchFormRef.value?.resetFields()
  if (paginationData.currentPage === 1) {
    getTableData()
  }
  paginationData.currentPage = 1
}
/**
 * 刷新列表
 */
const handleRefresh = () => {
  getTableData()
}
/**
 * 首次加载列表数据
 */
const handleInitLoadData = () => {
  if (paginationData.currentPage === 1) {
    getTableData()
  }
  paginationData.currentPage = 1
}
//#endregion

/** 
 * 监听分页参数的变化
 * 
 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })

onMounted(() => {
  handleInitLoadData();
})
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <slot name="SearchForm"></slot>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <slot name="TableLeft"></slot>
        </div>
        <div>
          <slot name="TableRight"></slot>
          <template>
            <el-tooltip content="下载">
              <el-button type="primary" :icon="Download" circle />
            </el-tooltip>
            <el-tooltip content="刷新表格">
              <el-button type="primary" :icon="RefreshRight" circle @click="handleRefresh" />
            </el-tooltip>
          </template>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData">
          <slot name="TableColumn"></slot>
          <!-- 表格操作区 -->
          <el-table-column fixed="right" label="操作" align="center">
            <template #default="scope">
              <slot name="TableActionColumn"></slot>
              <template>
                <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">修改</el-button>
                <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager-wrapper">
        <el-pagination background :layout="paginationData.layout" :page-sizes="paginationData.pageSizes"
          :total="paginationData.total" :page-size="paginationData.pageSize" :currentPage="paginationData.currentPage"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </el-card>
    <!-- 新增/修改 -->
    <el-dialog v-model="dialogVisible" :title="currentUpdateId === undefined ? '新增用户' : '修改用户'" @close="resetForm"
      width="30%">
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" label-position="left">
        <slot name="ModalFormItems"></slot>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleCreate">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 20px;

  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
