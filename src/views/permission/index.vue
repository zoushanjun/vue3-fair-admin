<template>
  <div class="card-container">
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane key="1" tab="账号管理">
        <person></person>
      </a-tab-pane>

      <a-tab-pane key="2" tab="角色列表">
        <role></role>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import role from "./role.vue";
import person from "./person.vue";

export default defineComponent({
  name: "permissionIndex",
  setup() {
    return {
      activeKey: ref("1"),
    };
  },

  components: {
    role,
    person,
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
  // height: 100%;
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
