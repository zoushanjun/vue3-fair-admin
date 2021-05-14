import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "layout",
    component: () => import("../views/layout/index.vue"),
    redirect: "/dashboard",
    meta: {
      isShow: false,
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("../views/dashboard/index.vue"),
        meta: {
          isShow: true,
          title: "仪表盘",
          auth: true,
        },
      },
      {
        path: "inventory",
        name: "inventory",
        component: () => import("../views/inventory/index.vue"),
        meta: {
          isShow: true,
          title: "资产",
          auth: true,
        },
      },
      {
        path: "fair",
        name: "fair",
        component: () => import("../views/fair/index.vue"),
        meta: {
          isShow: true,
          title: "展会",
          auth: true,
        },
      },
      {
        path: "workorder",
        name: "workorder",
        component: () => import("../views/workorder/index.vue"),
        meta: {
          isShow: true,
          title: "工单",
          auth: true,
        },
      },
      {
        path: "job",
        name: "job",
        component: () => import("../views/job/index.vue"),
        meta: {
          isShow: true,
          title: "作业",
          auth: true,
        },
      },
      {
        path: "setup",
        name: "setup",
        component: () => import("../views/setup/index.vue"),
        meta: {
          isShow: true,
          title: "配置",
          auth: true,
        },
      },
      {
        path: "permission",
        name: "permission",
        component: () => import("../views/permission/index.vue"),
        meta: {
          isShow: true,
          title: "权限",
          auth: true,
        },
      },
      {
        path: "monitor",
        name: "monitor",
        component: () => import("../views/monitor/index.vue"),
        meta: {
          isShow: true,
          title: "监控",
          auth: true,
        },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/accout/login.vue"),
  },
];

//工厂函数创建router实例
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((m) => m.meta.auth)) {
    // 对路由进行验证
    if (sessionStorage.getItem("Login-user")) {
      // 已经登陆
      next(); // 正常跳转到你设置好的页面
    } else {
      // 未登录则跳转到登陆界面，query:{ Rurl: to.fullPath}表示把当前路由信息传递过去方便登录后跳转回来；
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
