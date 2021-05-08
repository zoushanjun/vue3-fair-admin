<template>
  <div class="card-container">
    <a-tabs v-model:activeKey="activeKey" type="card">
      <!-- 1/工单中心选项卡内容 -->
      <a-tab-pane key="1" tab="业务开通">
        <operation />
      </a-tab-pane>

      <!-- 2/收入统计选项卡内容 -->
      <a-tab-pane key="2" tab="数据回滚">
        <div></div>
        <!-- 分割线 -->
        <a-divider />
      </a-tab-pane>

      <!-- 3/绩效统计选项卡内容 -->
      <a-tab-pane key="3" tab="定时任务">
        <div></div>

        <a-divider />
      </a-tab-pane>
      <a-tab-pane key="4" tab="AP巡检">
        <div></div>

        <a-divider />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import operation from "./operation.vue";
export default defineComponent({
  name: "jobIndex",
  setup() {
    return {
      //针对选项卡
      activeKey: ref("1"),
    };
  },
  components: {
    operation,
  },
});
</script>
<style>
.card-container {
  /* height: 100%; */
  padding: 24px;
  overflow: hidden;
  /* background: #f5f5f5; */
}

.card-container > .ant-tabs-card > .ant-tabs-content {
  height: 300px;
  margin-top: -8px;
}

.card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
  padding: 16px;
  background: #fff;
}

.card-container > .ant-tabs-card > .ant-tabs-bar {
  border-color: #fff;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  background: transparent;
  border-color: transparent;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  background: #fff;
  border-color: #fff;
}
</style>
