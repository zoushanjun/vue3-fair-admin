<template>
  <router-view v-if="isRouterAlive"></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ref, nextTick, provide } from "vue";

export default defineComponent({
  name: "App",
  components: {},
  setup() {
    // 局部组件刷新,在layout页面中调用
    const isRouterAlive = ref(true);
    const reload = () => {
      isRouterAlive.value = false;
      nextTick(() => {
        isRouterAlive.value = true;
      });
    };
    provide("reload", reload);

    return {
      isRouterAlive,
    };
  },
});
</script>

<style>
</style>
