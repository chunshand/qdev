import { Ref, computed, onMounted, reactive, ref, watch, } from "vue";
import { DEFAULTTABLEOPTIONS, type TableConfigBtnKey, defaultTableOptions } from "./interface";
import { usePagination } from "@/hooks/usePagination";
import { ElMessage, ElMessageBox, FormInstance, FormRules } from "element-plus";
import { useTransformOnBind } from "../help";
import _ from "lodash-es";
import { open } from "../Modal/help";
/**
 * 表格处理
 */
export const useTable = (props: {
  options: defaultTableOptions
}, { QdevFormRef }: { QdevFormRef: Ref }) => {
  /**
   * 弹窗Name
   */
  const modalName = computed(() => {
    return props ? props.options.ModalConfig.modalName : '';
  })
  /**
   * 列表加载装填
   */
  const loading = ref<boolean>(false)
  /**
   * 分页
   */
  const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

  /**
   * 修改对象的主键 临时变量
   */
  const currentUpdateId = ref<undefined | string | number>(undefined)

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
  const searchData = ref({})

  /**
   * 固定参数 应对外部设置进来的固定参数
   */
  const fixedData = ref({})

  const handleSetFixedData = (value: any) => {
    fixedData.value = value;
  }
  /**
   * 获取列表数据
   */
  const handleGetTableData = async () => {
    loading.value = true
    try {
      let data: any = {};
      // 存在分页则添加分页参数
      if (props.options.PaginationConfig.IsPagination) {
        data.currentPage = paginationData.currentPage;
        data.pageSize = paginationData.pageSize;
      }
      data = _.merge(data, searchData.value)
      data = _.merge(data, fixedData.value)
      const res = await props.options.TableConfig.api.list(data)
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
      handleGetTableData()
    }
    paginationData.currentPage = 1
  }
  /**
   * 重置搜索
   */
  const handleResetSearch = () => {
    searchFormRef.value?.resetFields()
    if (paginationData.currentPage === 1) {
      handleGetTableData()
    }
    paginationData.currentPage = 1
  }

  /**
   * 首次加载列表数据
   */
  const handleInitLoadData = () => {
    if (paginationData.currentPage === 1) {
      handleGetTableData()
    }
    paginationData.currentPage = 1
  }

  /**
   * 监听分页参数的变化
   *
   */
  watch([() => paginationData.currentPage, () => paginationData.pageSize], handleGetTableData, { immediate: true })

  const transform = useTransformOnBind()


  /**
   * 弹窗确定前判断
   */
  const handleModalBeforeSubmit = async () => {
    return await QdevFormRef.value?.handleValidate();
  }
  const SelectionItems = ref<any[]>([])
  /**
   * 多选选择
   */
  const handleSelectionChange = (arr: any[]) => {
    SelectionItems.value = arr;
  }
  /**
   * 刷新数据
   */
  const handleRefreshData = () => {
    handleInitLoadData();
  }
  /**
   * 事件
   */
  const handleBtnClick = ({
    key,
    item,
    value
  }: any) => {
    const click_fn: Function | undefined = (props.options.TableConfig as any)['on' + key] ?? undefined;
    switch (key) {
      case "create":
        open(props.options.ModalConfig.modalName)
        break;
      case "batchDelete":
        // 批量删除
        if (SelectionItems.value.length == 0) {
          ElMessage.error("请勾选需要删除的项！")
          return;
        }
        ElMessageBox.confirm("是否删除选择的项？", "删除提示", { type: 'error' }).then(() => {
          if (click_fn) {
            click_fn(key, SelectionItems.value)
          } else {
            // 执行批量删除接口并从新获取列表
          }
        })
        break;
      case "batchUpdate":
        // 批量更新
        // 打开一个空的formData 弹窗
        // 执行批量更新接口
        ElMessage.info("开发中")
        break;
      case "recycleBin":
        // 回收站
        // 搜索固定参数开启回收站参数
        // 重新获取列表
        ElMessage.info("开发中")
        break;
      case "exportData":
        // 导出数据
        // 获取当列表数据
        // 打开选择列的选项 勾选的
        // 执行导出 生成表格文件(TODO)
        ElMessage.info("开发中")
        break;
      case "refreshData":
        // 刷新数据
        handleRefreshData();
        break;
      // 操作行-------------------------------
      case "look":
        // 查看数据
        break;
      case "update":
        // 查看数据
        open(props.options.ModalConfig.modalName, item)
        break;
      default:
        ElMessage.info("开发中")
        break;
    }
  }

  onMounted(() => {
    handleInitLoadData();
  })

  return {
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
    handleSetFixedData
  }
}
