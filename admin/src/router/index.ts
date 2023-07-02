import { type RouteRecordRaw, createRouter, createWebHashHistory, createWebHistory, Router } from "vue-router"

const Layout = () => import("@/layout/index.vue")

/** 常驻路由 */
export const constantRoutes: RouteRecordRaw[] = [
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
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export const asyncRoutes: RouteRecordRaw[] = [

  {
    path: "/auth",
    component: Layout,
    redirect: "/auth/administrator",
    name: "auth",
    meta: {
      title: "权限管理",
      svgIcon: "lock",
      roles: ["admin", "editor"], // 可以在根路由中设置角色
      alwaysShow: true // 将始终显示根菜单
    },
    children: [
      {
        path: "administrator",
        component: () => import("@/views/auth/administrator.vue"),
        name: "auth-administrator",
        meta: {
          title: "管理员"
        }
      },
      {
        path: "role",
        component: () => import("@/views/auth/role.vue"),
        name: "auth-role",
        meta: {
          title: "角色分配"
        }
      },
      {
        path: "auth",
        component: () => import("@/views/auth/auth.vue"),
        name: "auth-auth",
        meta: {
          title: "菜单权限"
        }
      }
    ],
  },
  // {
  //   path: "/system",
  //   component: Layout,
  //   redirect: "/system/role",
  //   name: "system",
  //   meta: {
  //     title: "系统管理",
  //     svgIcon: "lock",
  //     roles: ["admin", "editor"], // 可以在根路由中设置角色
  //     alwaysShow: true // 将始终显示根菜单
  //   },
  //   children: [
  //     {
  //       path: "res",
  //       component: () => import("@/views/system/res.vue"),
  //       name: "system-res",
  //       meta: {
  //         title: "资源管理"
  //       }
  //     }, {
  //       path: "file",
  //       component: () => import("@/views/system/file.vue"),
  //       name: "system-file",
  //       meta: {
  //         title: "附件管理"
  //       }
  //     }, {
  //       path: "config",
  //       component: () => import("@/views/system/conifg.vue"),
  //       name: "system-conifg",
  //       meta: {
  //         title: "配置管理"
  //       }
  //     }
  //   ],
  // },
  {
    path: "/:pathMatch(.*)*", // Must put the 'ErrorPage' route at the end, 必须将 'ErrorPage' 路由放在最后
    redirect: "/404",
    name: "ErrorPage",
    meta: {
      hidden: true
    }
  }
]

/**
 * 获取动态路由
 * menus 用户所有有的菜单权限列表 扁平数组
 * @returns
 */
export const getAsyncRoutes = (menus: any[]): RouteRecordRaw[] => {
  const modules = import.meta.glob("@/views/**/*.vue");
  menus.forEach((item: any) => {
    item.children && delete item.children;
    if (item.component && ['page', 'menu'].includes(item.type)) {
      item.component = modules["/src/views/" + item.component + ".vue"];
      item.name = item.id;
    }
  });
  return asyncRoutes;
  // return modules;
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
