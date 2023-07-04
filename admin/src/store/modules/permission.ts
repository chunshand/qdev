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
function flat(arr: any[] = [], _arr: any[] = []) {
  arr.map((item) => {
    _arr.push(item);
    if (item.children) {
      flat(item.children, _arr);
    }
  })
  return _arr;
}

export const usePermissionStore = defineStore("permission", () => {
  const routes = ref<RouteRecordRaw[]>([])
  const dynamicRoutes = ref<RouteRecordRaw[]>([])
  /**
   * 树结构菜单
   */
  const menus = ref<any[]>([])
  /**
   * 平级的菜单
   */
  const flatMenus = ref<any[]>([])

  /**
   * 设置路由
   * @param menuValue 菜单路由
   * @param router 路由对象
   */
  const setRoutes = async (menuValue: any[]) => {
    // 获取菜单路由 为平级
    const [_menus, asyncRoutes] = getAsyncRoutes(menuValue);
    menus.value = _menus;
    flatMenus.value = flat(_menus)
    // 通过动态路由扁平数组 + 菜单列表数据 合成最后的结果
    const accessedRoutes = asyncRouteSettings.open ? asyncRoutes : asyncRoutes
    routes.value = constantRoutes.concat(accessedRoutes)
    dynamicRoutes.value = accessedRoutes
  }

  return { routes, menus, flatMenus, dynamicRoutes, setRoutes }
})

/** 在 setup 外使用 */
export function usePermissionStoreHook() {
  return usePermissionStore(store)
}
