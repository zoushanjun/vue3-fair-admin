<template>
  <a-layout class="layout">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <img src="../../assets/logo.png" height="30" width="30" />展馆自动化系统
      </div>
      >
      <!-- 下面注释的行可以实现菜单高亮 -->
      <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
        <!-- <a-menu theme="dark" mode="inline" :selectedKeys="[$route.path]"> -->
        <a-menu-item key="1">
          <router-link to="/dashboard">
            <DashboardOutlined />
            <span>首页</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="/inventory">
            <DatabaseOutlined />
            <span>资产</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <router-link to="/fair">
            <EyeOutlined />
            <span>展会</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="4">
          <router-link to="/workorder">
            <CustomerServiceOutlined />
            <span>工单</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="5">
          <router-link to="/job">
            <PlayCircleOutlined />
            <span>作业</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="6">
          <router-link to="/setup">
            <SettingOutlined />
            <span>配置</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="7">
          <router-link to="/permission">
            <TeamOutlined />
            <span>权限</span>
          </router-link>
        </a-menu-item>
        <!-- <a-menu-item key="8">
          <router-link to="/monitor">
            <RadarChartOutlined />
            <span>监控</span>
          </router-link>
        </a-menu-item> -->
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <span style="float: left; width: 60px">
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined
            v-else
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
        </span>
        <span style="float: left; width: 150px; padding: 16px 0">
          <a-breadcrumb>
            <a-breadcrumb-item
              v-for="(item, index) of $route.matched"
              :key="index"
              style="padding: 2px"
            >
              <a style="font-size: 16px">{{ item.meta.title }}</a>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </span>

        <span style="float: right; width: 100px; margin-right: 0">
          <a-space>
            <UserOutlined style="margin-rigt: 5px" />
            <a-dropdown>
              <a class="ant-dropdown-link" @click.prevent>
                {{ currentUser }}
                <DownOutlined />
              </a>
              <template #overlay>
                <a-menu>
                  <!-- <a-menu-item key="0">
                  <a href="javascript:;"
                    ><EditOutlined style="margin-right: 5px" />改密</a
                  >
                </a-menu-item> -->
                  <a-menu-item key="1">
                    <a @click="logout"
                      ><PoweroffOutlined style="margin-right: 5px" />注销</a
                    >
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </a-space>
        </span>
        <!-- <span style="float: right; width: 50px; margin-right: 0">
          <a @click="refresh()"
            ><a-tooltip title="刷新" :color="'blue'"><RedoOutlined /></a-tooltip
          ></a>
        </span> -->
      </a-layout-header>
      <a-layout-content>
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  DashboardOutlined,
  DatabaseOutlined,
  EyeOutlined,
  CustomerServiceOutlined,
  PlayCircleOutlined,
  ToolOutlined,
  SettingOutlined,
  TeamOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
  EditOutlined,
  LogoutOutlined,
  PoweroffOutlined,
  UserOutlined,
  RadarChartOutlined,
  RedoOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, onMounted, ref, inject } from "vue";
import router from "../../router/index";
import { useStore } from "vuex";
export default defineComponent({
  // 监听路由配合实现面包屑功能
  watch: {
    $route: "init",
  },
  setup() {
    // let menuList = router.options.routes[0].children;
    // console.log(menuList);
    const currentUser = sessionStorage.getItem("Login-user");
    const logout = () => {
      sessionStorage.removeItem("Login-user");
      router.push("/login");
    };
    const refresh = inject("reload");
    // const handleClick = () => {
    //   refresh;
    // };

    const store = useStore();
    onMounted(() => {
      store.dispatch("getSvrData"); //页面加载后使用vuex管理作业服务器相关配置
      store.dispatch("getSmsData");
    });

    return {
      selectedKeys: ref<string[]>(["1"]),
      collapsed: ref<boolean>(true),
      currentUser,
      logout,
      refresh,
      // handleClick,
    };
  },
  components: {
    DashboardOutlined,
    DatabaseOutlined,
    EyeOutlined,
    CustomerServiceOutlined,
    PlayCircleOutlined,
    ToolOutlined,
    SettingOutlined,
    TeamOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DownOutlined,
    EditOutlined,
    LogoutOutlined,
    PoweroffOutlined,
    UserOutlined,
    RadarChartOutlined,
    RedoOutlined,
  },
});
</script>
<style>
.layout {
  height: 100vh;
}

.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 32px;
  /* background: rgba(255, 255, 255, 0.3); */
  margin: 20px;
}

.site-layout .site-layout-background {
  border: 5px solid red;
  background: #fff;
}

.header {
  background: #fff;
  padding: 0;
  vertical-align: middle;
}
</style>