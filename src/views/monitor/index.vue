<template>
  <div class="con">
    <iframe
      v-bind:src="grafanaUrl"
      frameborder="0"
      width="100%"
      height="100%"
      scrolling="auto"
    >
    </iframe>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    const grafanaUrl =
      "http://192.168.64.169:3000/d/30GgMoBGz/yan-jiao-hui-zhan-guan-wang-luo-jian-kong-1-2?orgId=1&refresh=5s&from=1620989137318&to=1620999937318&var-instance=10.69.20.135&var-C_Core1=192.168.0.7&theme=light";
    return {
      grafanaUrl,
    };
  },
});
</script>
<style scoped>
.con {
  width: 100%;
  height: 100%;
  /* border: 5px solid red; */
}
</style>