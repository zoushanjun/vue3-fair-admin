<template>
  <div class="card-container">
    <a-tabs v-model:activeKey="activeKey" type="card">
      <!-- 1/资产类别操作模板部分 -->
      <a-tab-pane key="1" tab="资产类别">
        <category></category>
      </a-tab-pane>

      <a-tab-pane key="2" tab="资产管理">
        <inventory></inventory>
      </a-tab-pane>
      <a-tab-pane key="3" tab="操作日志"> 操作日志，功能开发中.....</a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import inventory from "./inventory.vue";
import category from "./category.vue";

export default defineComponent({
  name: "inventoryIndex",
  setup() {
    return {
      activeKey: ref("2"),
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
  },
  components: {
    inventory,
    category,
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
