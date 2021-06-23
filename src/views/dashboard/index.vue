<template>
  <div class="box">
    <div class="item">
      <a-list
        style="margin-left: 5px"
        size="small"
        :split="false"
        :data-source="data"
      >
        <template #renderItem="{ item }">
          <a-list-item>{{ item }}</a-list-item>
        </template>
        <template #header>
          <div style="color: #00f">近期展会：</div>
        </template>
      </a-list>
    </div>
    <div class="item">
      <div style="color: #00f; margin-left: 10px; margin-top: 10px">
        总体运行概况：
      </div>
      <img
        style="margin-left: 10px; margin-top: 10px"
        src="../../assets/summary.png"
        height="144"
        width="534"
      />
      <!-- {{healthData.healthyNetworkDevicePercentage}} -->
    </div>
    <div class="item">
      <div style="color: #00f; margin-left: 10px; margin-top: 10px">
        网络设备：
      </div>
      <img src="../../assets/network.png" height="218" width="556" />
      <!-- {{healthData.networkHealthAverage}} -->
    </div>

    <div class="item">
      <div style="color: #00f; margin-left: 10px; margin-top: 10px">
        无线客户端：
      </div>
      <!-- {{healthData.networkHealthWireless}} -->
      <img
        style="margin-left: 10px; margin-top: 10px"
        src="../../assets/wireless.png"
        height="123"
        width="525"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { getFairList } from "../../network/fairApi";
// import { request } from "../../network/requestcisco";
// import { request } from "/@/network/request";
const data: string[] = [
  "[5.13-5.19]【FLOWEXPO】2021年第23届广州国际流体展",
  "[5.13-5.19]2021广州国际专业灯光、音响展览会",
  "[5.14-5.19]2021广州国际乐器展览会.",
  "[5.21-5.26]2021第二十四届中国烘焙展览会.",
];

export default defineComponent({
  setup() {
    // 页面挂载后读取展会列表数据
    const listData = ref([]);
    onMounted(() => {
      getFairList()
        .then((res) => {
          // console.log(res);
          listData.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(listData);
    });

    // const healthData = ref(any);
    // const healthdata = () => {
    //   request("/v1/site-health").then((res) => {
    //     healthData.value = res.data;
    //   });
    // };
    return {
      data,
      listData,
      // healthdata,
      // healthData,
    };
  },
});
</script>
<style scoped >
.box {
  width: 100%;
  height: 95%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-center;
  align-items: center;
  justify-content: space-around;
  /* border: 1px solid blue; */

  /* margin: 10px, 15px, 10px, 25px; */
}
.item {
  /* flex: 0 0 40%; */
  width: 45%;
  height: 45%;
  min-width: 30%;
  box-sizing: border-box;
  /* border: 1px solid red; */
  background: white;
  margin-left: 10px;
  margin-top: 10px;
}
</style>