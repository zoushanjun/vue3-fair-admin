<template>
  <div class="card-container">
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane key="1" tab="工单中心">
        <order></order>
      </a-tab-pane>

      <a-tab-pane key="2" tab="绩效统计">
        <commision></commision>
      </a-tab-pane>

      <!-- <a-tab-pane key="3" tab="收入统计"> </a-tab-pane> -->
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import order from "./order.vue";
import commision from "./commision.vue";

export default defineComponent({
  name: "orderIndex",
  setup() {
    return {
      activeKey: ref("1"),
    };
  },

  components: {
    order,
    commision,
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
