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
        },
      },
      {
        path: "inventory",
        name: "inventory",
        component: () => import("../views/inventory/index.vue"),
        meta: {
          isShow: true,
          title: "资产",
        },
      },
      {
        path: "fair",
        name: "fair",
        component: () => import("../views/fair/index.vue"),
        meta: {
          isShow: true,
          title: "展会",
        },
      },
      {
        path: "workorder",
        name: "workorder",
        component: () => import("../views/workorder/index.vue"),
        meta: {
          isShow: true,
          title: "工单",
        },
      },
      {
        path: "job",
        name: "job",
        component: () => import("../views/job/index.vue"),
        meta: {
          isShow: true,
          title: "作业",
        },
      },
      {
        path: "setup",
        name: "setup",
        component: () => import("../views/setup/index.vue"),
        meta: {
          isShow: true,
          title: "配置",
        },
      },
      {
        path: "permission",
        name: "permission",
        component: () => import("../views/permission/index.vue"),
        meta: {
          isShow: true,
          title: "配置",
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

export default router;
