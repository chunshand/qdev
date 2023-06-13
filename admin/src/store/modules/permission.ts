import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { Router, type RouteRecordRaw } from "vue-router"
import { constantRoutes, getAsyncRoutes } from "@/router"
import asyncRouteSettings from "@/config/async-route"

const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  const routeRoles = route.meta?.roles
  return routeRoles ? roles.some((role) => routeRoles.includes(role)) : true
}
/**
 * 暂时不用的方法
 * @param routes
 * @param roles
 * @returns
 */
const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const res: RouteRecordRaw[] = []
  routes.forEach((route) => {
    const tempRoute = { ...route }
    if (hasPermission(roles, tempRoute)) {
      if (tempRoute.children) {
        tempRoute.children = filterAsyncRoutes(tempRoute.children, roles)
      }
      res.push(tempRoute)
    }
  })
  return res
}

export const usePermissionStore = defineStore("permission", () => {
  const routes = ref<RouteRecordRaw[]>([])
  const dynamicRoutes = ref<RouteRecordRaw[]>([])

  /**
   * 设置路由
   * @param menuValue 菜单路由
   * @param router 路由对象
   */
  const setRoutes = async (menuValue: RouteRecordRaw[]) => {
    // 获取菜单路由 为平级
    const asyncRoutes = getAsyncRoutes(menuValue);
    // 通过动态路由扁平数组 + 菜单列表数据 合成最后的结果
    const accessedRoutes = asyncRouteSettings.open ? asyncRoutes : asyncRoutes
    routes.value = constantRoutes.concat(accessedRoutes)
    dynamicRoutes.value = accessedRoutes
  }

  return { routes, dynamicRoutes, setRoutes }
})

/** 在 setup 外使用 */
export function usePermissionStoreHook() {
  return usePermissionStore(store)
}
