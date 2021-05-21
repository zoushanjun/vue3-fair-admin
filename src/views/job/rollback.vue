<template>
  <div>
    <p style="color: #00f">请选择回滚对象进行操作(python3 6_rollback2960.py)</p>
  </div>
  <div>
    <iframe
      v-bind:src="nornirSvrUrl"
      frameborder="0"
      width="800"
      height="400"
      scrolling="auto"
    >
    </iframe>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onBeforeMount } from "vue";
// const nornirSvrUrl = ref < string > any;
export default defineComponent({
  name: "rollback",
  setup() {
    const nornirSvrUrl = ref<string>();
    onBeforeMount(() => {
      nornirSvrUrl.value =
        "http://192.168.64.91:8888?hostname=192.168.64.91&username=nornir&password=" +
        window.btoa("Nornir123") +
        "&command=" +
        "python3 6_rollback2960.py";
    });

    return {
      nornirSvrUrl,
    };
  },
  //   setup() {
  //     const nornirSvrUrl = ref < string > "";
  //     onMounted = () => {
  //       nornirSvrUrl.value =
  //         "http://192.168.64.91:8888?hostname=192.168.64.91&username=nornir&password=" +
  //         window.btoa("Nornir123");
  //     };
  //     return {
  //       nornirSvrUrl,
  //     };
  //   },
});
</script>