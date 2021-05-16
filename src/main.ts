import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入particles，登录页粒子背景
import Particles from "particles.vue3";

// 引入css
import "ant-design-vue/dist/antd.css";
// // 引入Antd配置文件
import Antd from "./plugins/Ant";
// import Blob from "./excel/Blob.js";
// import Export2Excel from "./excel/Export2Excel.js";

createApp(App).use(router).use(store).use(Antd).use(Particles).mount("#app");
