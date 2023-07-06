import _ from "lodash-es"
import { type RouteRecordRaw, createRouter, createWebHashHistory, createWebHistory, Router } from "vue-router"

const Layout = () => import("@/layout/index.vue")

/** 常驻路由 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/iframe",
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        path: "/iframe",
        component: () => import("@/views/iframe/index.vue")
      }
    ]
  },
  {
    path: "/redirect",
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue")
      }
    ]
  },
  {
    path: "/403",
    component: () => import("@/views/error-page/403.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      hidden: true
    },
    alias: "/:pathMatch(.*)*"
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    name: "root",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: {
          title: "首页",
          svgIcon: "dashboard",
          affix: true
        }
      }
    ]
  },
]



/**
 * 获取动态路由
 * menus 用户所有有的菜单权限列表 扁平数组
 * @returns
 */
export const getAsyncRoutes = (menus: any[]): [any[], any[]] => {
  const modules = import.meta.glob("@/views/**/*.vue");
  /**
   * 菜单列表
   */
  let menu_list: any[] = [];
  /**
   * 组件
   */
  let routers: any[] = [];
  function dg(arr: any[] = []) {
    arr = arr.map((item: any) => {
      if (item.children) {
        item.children = dg(item.children);
      }
      if (modules["/src/views" + item.path + ".vue"]) {
        item.component = modules["/src/views" + item.path + ".vue"];
        item.path = item.path;
        item.name = item.id;
        item.meta = {
          title: item.title
        }
        routers.push(item);
      }
      return item;
    });
    return arr;
  }
  menu_list = dg(_.cloneDeep(menus));
  return [menu_list, routers];
}

const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER_HISTORY === "hash"
      ? createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH)
      : createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: constantRoutes
})

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}

export default router
