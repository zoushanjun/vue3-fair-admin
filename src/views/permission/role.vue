<template>
  <a-card size="small" title="admin" :bordered="true" style="width: 300px">
    <!-- <template #extra><a href="#">more</a></template> -->
    <p>管理角色</p>
  </a-card>
  <br />
  <a-card size="small" title="service" :bordered="true" style="width: 300px">
    <!-- <template #extra><a href="#">more</a></template> -->
    <p>服务角色</p>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "role",
  setup() {},
});
</script>
<style lang="scss">
</style>