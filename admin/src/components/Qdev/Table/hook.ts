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
    open(modalName.value, row);
    // formData.username = row.username
    dialogVisible.value = true
  }

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
      const res = await props.options.TableConfig.api.list({
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
  const handleResetSearch = () => {
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
