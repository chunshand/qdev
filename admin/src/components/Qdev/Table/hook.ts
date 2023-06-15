import { Ref, computed, onMounted, reactive, ref, watch, } from "vue";
import { DEFAULTTABLEOPTIONS, defaultTableOptions } from "./interface";
import { usePagination } from "@/hooks/usePagination";
import { ElMessage, ElMessageBox, FormInstance, FormRules } from "element-plus";
import { useTransformOnBind } from "../help";

/**
 * 表格处理
 */
export const useTable = (props: {
  options: defaultTableOptions
}, QdevFormRef: Ref) => {
  /**
   * 弹窗Name
   */
  const modalName = computed(() => {
    return props ? props.options.ModalConifg.modalName : '';
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
   * 修改对象的主键
   */
  const currentUpdateId = ref<undefined | string>(undefined)

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
  const handleGetTableData = async () => {
    loading.value = true
    try {
      let urlData: any = {};
      // 存在分页则添加分页参数
      if (props.options.PaginationConfig.IsPagination) {
        urlData.currentPage = paginationData.currentPage;
        urlData.pageSize = paginationData.pageSize;
      }
      const res = await props.options.TableConfig.api.list(urlData)
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
  //#endregion

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
    console.log(QdevFormRef);
    return await QdevFormRef.value?.handleValidate();
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
    handleModalBeforeSubmit
  }
}
