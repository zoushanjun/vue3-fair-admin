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
        <rollback />
        <a-divider />
      </a-tab-pane>

      <!-- <a-tab-pane key="3" tab="定时任务">
        <div></div>

        <a-divider />
      </a-tab-pane>
      <a-tab-pane key="4" tab="AP巡检">
        <div></div>

        <a-divider />
      </a-tab-pane> -->
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import operation from "./operation.vue";
import rollback from "./rollback.vue";
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
    rollback,
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

