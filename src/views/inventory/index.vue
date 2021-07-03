<template>
  <div class="card-container">
    <a-tabs v-model:activeKey="activeKey" type="card">
      <!-- 1/资产类别操作模板部分 -->

      <a-tab-pane key="1" tab="在线资产">
        <inventory></inventory>
      </a-tab-pane>
      <a-tab-pane key="2" tab="资产型号">
        <model></model>
      </a-tab-pane>

      <a-tab-pane key="3" tab="库存管理">
        <stock></stock>
      </a-tab-pane>
      <a-tab-pane key="4" tab="库存日志">
        <journal></journal>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import inventory from "./inventory.vue";
import model from "./model.vue";
import stock from "./stock.vue";
import journal from "./journal.vue";

export default defineComponent({
  name: "inventoryIndex",
  setup() {
    return {
      activeKey: ref("1"),
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
  },
  components: {
    inventory,
    model,
    stock,
    journal,
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
