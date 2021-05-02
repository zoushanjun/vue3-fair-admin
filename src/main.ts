import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// 引入particles，登录页粒子背景
import Particles from "particles.vue3";

// 引入css
import "ant-design-vue/dist/antd.css";
// // 引入Antd配置文件
import Antd from "./plugins/Ant";

createApp(App).use(router).use(Antd).use(Particles).mount("#app");
