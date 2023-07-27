import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { usePermissionStore } from "./permission"
import { useTagsViewStore } from "./tags-view"
import { removeToken, setToken } from "@/utils/cache/cookies"
import router, { resetRouter } from "@/router"
import { loginApi, getUserInfoApi, refreshTokenApi } from "@/api/login"
import { type LoginRequestData } from "@/api/login/types/login"
import { type RouteRecordRaw } from "vue-router"
import asyncRouteSettings from "@/config/async-route"
import { getMenuList, getAuthList } from "@/api/menu"
import { getAccessToken, getRefreshToken, removeAccessToken, removeRefreshToken, setAccessToken, setRefreshToken } from "@/utils/cache/local-storage"

export const useUserStore = defineStore("user", () => {
  /**
   * 用户token
   */
  const access_token = ref<string>(getAccessToken() || "")
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
   * 用户信息
   */
  const user = ref<any>({
    userInfo: {
      avatar: ''
    }
  })

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
    setAccessToken(data.access_token)
    setRefreshToken(data.refresh_token)
    access_token.value = data.access_token
  }
  /** 登录 */
  const refreshToken = async () => {
    let refresh_token = getRefreshToken()?.split(" ")[1]
    let _access_token = getAccessToken()?.split(" ")[1]
    let params = {
      refresh_token,
      access_token: _access_token
    }
    const res = await refreshTokenApi(params)
    console.log("刷新token");
    console.log(res);
    if (res.success) {
      let data = res.data;
      setAccessToken(data.access_token)
      setRefreshToken(data.refresh_token)
      access_token.value = data.access_token
      console.log(getRefreshToken());
    }
    return res
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
    // getUserInfo()
    username.value = data.username

    user.value = data;
    // 获取菜单列表
    // 验证返回的 roles 是否为一个非空数组，否则塞入一个没有任何作用的默认角色，防止路由守卫逻辑进入无限循环
    roles.value = data.roles?.length > 0 ? data.roles : asyncRouteSettings.defaultRoles
  }
  // 获取权限列表
  const getAuth = async () => {
    const { data } = await getAuthList()
    auths.value = data;
  }
  // 获取权限列表
  const getMenu = async () => {
    const { data } = await getMenuList()
    menus.value = data;
  }
  /** 切换角色  废弃*/
  const changeRoles = async (role: string) => {
    const newToken = "token-" + role
    access_token.value = newToken
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
    removeAccessToken()
    removeRefreshToken()
    access_token.value = ""
    roles.value = []
    resetRouter()
    _resetTagsView()
  }
  /** 重置 Token */
  const resetToken = () => {
    removeToken()
    access_token.value = ""
    roles.value = []
  }
  /** 重置 Visited Views 和 Cached Views */
  const _resetTagsView = () => {
    tagsViewStore.delAllVisitedViews()
    tagsViewStore.delAllCachedViews()
  }

  return { access_token, roles, menus, username, user, setRoles, login, refreshToken, getInfo, getUserInfo, changeRoles, logout, resetToken }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
