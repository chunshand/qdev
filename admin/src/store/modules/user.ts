import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { usePermissionStore } from "./permission"
import { useTagsViewStore } from "./tags-view"
import { getToken, removeToken, setToken } from "@/utils/cache/cookies"
import router, { resetRouter } from "@/router"
import { loginApi, getUserInfoApi } from "@/api/login"
import { type LoginRequestData } from "@/api/login/types/login"
import { type RouteRecordRaw } from "vue-router"
import asyncRouteSettings from "@/config/async-route"
import { getMyAuthListApi, getMyMenuListApi } from "@/api/menu"

export const useUserStore = defineStore("user", () => {
  /**
   * 用户token
   */
  const token = ref<string>(getToken() || "")
  /**
   * 用户权限
   */
  const roles = ref<string[]>([])
  /**
   * 用户权限
   */
  const auths = ref<string[]>([])
  /**
   * 用户账户
   */
  const username = ref<string>("")

  /**
   * 用户菜单
   */
  const menus = ref<string[]>([])

  const permissionStore = usePermissionStore()
  const tagsViewStore = useTagsViewStore()

  /** 设置角色数组 */
  const setRoles = (value: string[]) => {
    roles.value = value
  }
  /** 登录 */
  const login = async ({ username, password, code }: LoginRequestData) => {
    const { data } = await loginApi({ username, password, code })
    setToken(data.token)
    token.value = data.token
  }
  /**
   * 登录后的操作
   */
  const getUserInfo = async () => {
    await getInfo()
    await getAuth()
    await getMenu()
  }
  /** 获取用户详情 */
  const getInfo = async () => {
    const { data } = await getUserInfoApi()
    username.value = data.username
    // 获取菜单列表
    // 验证返回的 roles 是否为一个非空数组，否则塞入一个没有任何作用的默认角色，防止路由守卫逻辑进入无限循环
    roles.value = data.roles?.length > 0 ? data.roles : asyncRouteSettings.defaultRoles
  }
  // 获取权限列表
  const getAuth = async () => {
    const { data } = await getMyAuthListApi()
    auths.value = data;
  }
  // 获取权限列表
  const getMenu = async () => {
    const { data } = await getMyMenuListApi()
    menus.value = data;
  }
  /** 切换角色 */
  const changeRoles = async (role: string) => {
    const newToken = "token-" + role
    token.value = newToken
    setToken(newToken)
    await getUserInfo();
    // permissionStore.setRoutes(menus.value)
    resetRouter()
    permissionStore.dynamicRoutes.forEach((item: RouteRecordRaw) => {
      router.addRoute(item)
    })
    _resetTagsView()
  }
  /** 登出 */
  const logout = () => {
    removeToken()
    token.value = ""
    roles.value = []
    resetRouter()
    _resetTagsView()
  }
  /** 重置 Token */
  const resetToken = () => {
    removeToken()
    token.value = ""
    roles.value = []
  }
  /** 重置 Visited Views 和 Cached Views */
  const _resetTagsView = () => {
    tagsViewStore.delAllVisitedViews()
    tagsViewStore.delAllCachedViews()
  }

  return { token, roles, menus, username, setRoles, login, getInfo, changeRoles, logout, resetToken }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
