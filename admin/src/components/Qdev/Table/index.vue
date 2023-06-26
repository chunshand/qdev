<!-- 针对一般情况表格制作 常用组件 -->
<!-- 搜索区 表格区 弹窗区 插槽的方式 -->

<script lang="ts" setup>
import { Search, Refresh, CirclePlus, Delete, Download, RefreshRight } from "@element-plus/icons-vue"
// import QdevModal from "@/components/Qdev/Modal/index.vue"
// import QdevForm from "@/components/Qdev/Form/index.vue"
import { useTable } from "./hook"
import { DEFAULTTABLEOPTIONS, defaultTableOptions } from "./interface"
import { ref } from "vue"
import QdevFormModal from "@/components/Qdev/FormModal/index.vue"

/**
 * qdev form ref
 */
const QdevFormRef = ref();
/**
 * props
 */
const props = withDefaults(
  defineProps<{
    options: defaultTableOptions
  }>(),
  {
    options: () => DEFAULTTABLEOPTIONS
  }
)
/**
 * emits
 */
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
  handleBtnClick,
  handleSelectionChange,
  handleRefreshData,
  handleSetFixedData,
  handleSubmit
} = useTable(props, { QdevFormRef })

defineExpose({
  handleBtnClick,
  handleRefreshData,
  handleSetFixedData
});
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper" v-if="props.options.SeachConfig.show">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <slot name="SearchForm"></slot>
        <el-form-item>
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
              <el-button type="primary" v-on="transform(btn.on, btn)" v-bind="transform(btn.bind, btn)" v-if="btn.show">{{
                btn.content }}</el-button>
            </template>
          </template>
        </div>
        <div>
          <slot name="TableRight"></slot>
          <el-space v-if="true">
            <template v-for="btn in props.options.TableConfig.rightBtns" :key="btn.key">
              <template v-if="btn.show">
                <el-button type="primary" v-on="transform(btn.on, btn)" v-bind="transform(btn.bind, btn)"
                  v-if="btn.content">{{
                    btn.content }}</el-button>
                <el-button type="primary" v-on="transform(btn.on, btn)" v-bind="transform(btn.bind, btn)"
                  v-else></el-button>
              </template>
            </template>
          </el-space>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData" :row-key="props.options.TableConfig.rowKey"
          v-on="transform(props.options.TableConfig.on, props.options.TableConfig)"
          v-bind="transform(props.options.TableConfig.bind, props.options.TableConfig)"
          @selection-change="handleSelectionChange">
          <!-- 自定义列 -->
          <slot name="CustomTableColumn" v-if="$slots.CustomTableColumn"></slot>
          <template v-else>
            <!-- 展开行 -->
            <el-table-column type="expand" v-if="props.options.TableConfig.expand.show">
              <slot name="TableExpandColumn"></slot>
            </el-table-column>
            <!-- 选择行 -->
            <el-table-column type="selection" v-if="props.options.TableConfig.selection.show">
            </el-table-column>
            <!-- 序号 -->
            <el-table-column type="index" v-if="props.options.TableConfig.index.show"
              v-on="transform(props.options.TableConfig.index.on, props.options.TableConfig.index)"
              v-bind="transform(props.options.TableConfig.index.bind, props.options.TableConfig.index)">
            </el-table-column>
            <!-- 一般列 -->
            <el-table-column v-for="column, index in props.options.TableConfig.columns" :key="index"
              v-on="transform(column.on, column)" v-bind="transform(column.bind, column)">
              <component v-if="column.component" :is="column.component" v-on="transform(column.componenton, column)"
                v-bind="transform(column.componentbind, column)">
              </component>
            </el-table-column>
          </template>
          <!-- 表格操作区 -->
          <el-table-column v-if="props.options.TableConfig.operation.show"
            v-on="transform(props.options.TableConfig.operation.on, props.options.TableConfig.operation)"
            v-bind="transform(props.options.TableConfig.operation.bind, props.options.TableConfig.operation)">
            <template #default="scope">
              <slot name="TableActionColumn"></slot>
              <template v-if="true">
                <template v-for="btn in props.options.TableConfig.operation.btns" :key="btn.key">
                  <template v-if="btn.show">
                    <el-button type="primary" v-on="transform(btn.on, btn, scope.row)"
                      v-bind="transform(btn.bind, btn, scope.row)" v-if="btn.content">{{
                        btn.content }}</el-button>
                    <el-button type="primary" v-on="transform(btn.on, btn, scope.row)"
                      v-bind="transform(btn.bind, btn, scope.row)" v-else></el-button>
                  </template>
                </template>
              </template>
            </template>

          </el-table-column>
        </el-table>
      </div>
      <div class="pager-wrapper" v-if="props.options.PaginationConfig.IsPagination">
        <el-pagination background :layout="paginationData.layout" :page-sizes="paginationData.pageSizes"
          :total="paginationData.total" :page-size="paginationData.pageSize" :currentPage="paginationData.currentPage"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </el-card>
    <!-- 新增/修改 弹窗 -->
    <!-- <QdevModal :modalName="modalName" :BeforeSubmit="handleModalBeforeSubmit" @submit="() => { }">
      <QdevForm :Form="props.options.ModalConfig.form" ref="QdevFormRef" />
    </QdevModal> -->
    <QdevFormModal :modalName="modalName" :Form="props.options.ModalConfig.form" :BeforeSubmit="handleModalBeforeSubmit"
      :submit="handleSubmit" @open="props.options.ModalConfig.onOpen"/>

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
