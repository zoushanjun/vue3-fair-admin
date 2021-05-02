<template>
  <div class="card-container">
    <a-tabs v-model:activeKey="activeKey" type="card">
      <!-- 1/展会管理选项卡内容 -->
      <a-tab-pane key="1" tab="展会管理">
        <fair></fair>
      </a-tab-pane>

      <!-- 2/服务管理选项卡内容 -->
      <a-tab-pane key="2" tab="服务管理">
        <service></service>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
// import { Tabs } from 'ant-design-vue';
import fair from "./fair.vue";
import service from "./service.vue";

export default defineComponent({
  name: "fairIndex",
  setup() {
    return {
      activeKey: ref("1"),
    };
  },

  components: {
    fair,
    service,
  },
});
</script>
<style lang="less">
.card-container {
  background: #f5f5f5;
  overflow: hidden;
  margin: 0px;
  padding: 24px;
}
.card-container > .ant-tabs-card > .ant-tabs-content {
  min-height: 280px;
  // height: 120px;
  margin-top: -16px;
}

.card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
  background: #fff;
  padding: 16px;
}

.card-container > .ant-tabs-card > .ant-tabs-bar {
  border-color: #fff;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  border-color: transparent;
  background: transparent;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  border-color: #fff;
  background: #fff;
}
</style>
