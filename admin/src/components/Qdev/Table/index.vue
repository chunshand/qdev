<!-- 针对一般情况表格制作 常用组件 -->
<!-- 搜索区 表格区 弹窗区 插槽的方式 -->

<script lang="ts" setup>
import { Search, Refresh, CirclePlus, Delete, Download, RefreshRight } from "@element-plus/icons-vue"
import QdevModal from "@/components/Qdev/Modal/index.vue"
import QdevForm from "@/components/Qdev/Form/index.vue"
import { open } from "@/components/Qdev/Modal/help"
import { useTable } from "./hook"
import { DEFAULTTABLEOPTIONS, defaultTableOptions } from "./interface"
import { ref } from "vue"
const QdevFormRef = ref();
const props = withDefaults(
  defineProps<{
    options: defaultTableOptions
  }>(),
  {
    options: () => DEFAULTTABLEOPTIONS
  }
)
const {
  loading,
  tableData,
  searchData,
  modalName,
  handleSearch,
  handleResetSearch,
  transform,
  paginationData,
  handleCurrentChange,
  handleSizeChange,
  handleModalBeforeSubmit,
} = useTable(props, QdevFormRef)

</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <slot name="SearchForm"></slot>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="open(modalName, 1111)">Test</el-button>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button :icon="Refresh" @click="handleResetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <slot name="TableLeft"></slot>
          <template v-if="true">
            <template v-for="btn in props.options.TableConfig.leftBtns" :key="btn.key">
              <el-button type="primary" v-on="transform(btn.on, btn)" v-bind="transform(btn.attr, btn)" v-if="btn.show">{{
                btn.content }}</el-button>
            </template>
          </template>
        </div>
        <div>
          <slot name="TableRight"></slot>
          <template v-if="true">
            <template v-for="btn in props.options.TableConfig.rightBtns" :key="btn.key">
              <el-button type="primary" v-on="transform(btn.on, btn)" v-bind="transform(btn.attr, btn)" v-if="btn.show">{{
                btn.content }}</el-button>
            </template>
          </template>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData">
          <slot name="TableColumn" v-if="$slots.TableColumn"></slot>
          <template v-else>
            <el-table-column type="selection">
            </el-table-column>
            <el-table-column v-for="column, index in props.options.TableConfig.columns" :key="index">
              <component :is="column.component"></component>
            </el-table-column>
          </template>
          <!-- 表格操作区 -->
          <el-table-column fixed="right" label="操作" align="center">
            <template #default="scope">
              <slot name="TableActionColumn"></slot>
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
    <!-- 新增/修改 弹窗 -->
    <QdevModal :modalName="modalName" :BeforeSubmit="handleModalBeforeSubmit" @submit="() => { }">
      <QdevForm :Form="props.options.ModalConifg.form" ref="QdevFormRef" />
    </QdevModal>
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
