<template>
  <div class="box">
    <div class="item">
      <div style="color: #00f; margin-left: 10px; margin-top: 10px">
        最近展会：
      </div>

      <div style="padding-top: 5px; padding-left: 15px; padding-right: 15px">
        <a-table
          :columns="Columns"
          :data-source="LatestFairArry"
          :pagination="{ pageSize: 4 }"
          :rowKey="(record) => record.fairName"
          :showHeader="false"
          size="small"
        >
        </a-table>
      </div>
    </div>
    <div class="item">
      <div style="color: #00f; margin-left: 10px; margin-top: 10px">
        资产统计：
      </div>
      <div>
        <a-row style="padding-top: 25px; padding-left: 25px">
          <a-col style="width: 25%">
            <a-statistic
              title="出口层"
              :value="InventArry['out']"
              style="margin-right: 50px"
            />
          </a-col>
          <a-col style="width: 25%">
            <a-statistic
              title="核心层"
              :value="InventArry['core']"
              style="margin-right: 50px"
            />
          </a-col>
          <a-col style="width: 25%">
            <a-statistic
              title="汇聚层"
              :value="InventArry['disb']"
              style="margin-right: 50px"
            />
          </a-col>

          <a-col style="width: 25%">
            <a-statistic
              title="接入层"
              :value="InventArry['acc']"
              style="margin-right: 50px"
            />
          </a-col>
        </a-row>
        <a-row style="padding-top: 25px; padding-left: 25px">
          <a-col style="width: 25%">
            <a-statistic
              title="防火墙"
              :value="InventArry['fw']"
              style="margin-right: 50px"
            />
          </a-col>
          <a-col style="width: 25%">
            <a-statistic
              title="控制器"
              :value="InventArry['wlc']"
              style="margin-right: 50px"
            />
          </a-col>
          <a-col style="width: 25%">
            <a-statistic
              title="无线AP"
              :value="InventArry['ap']"
              style="margin-right: 50px"
            />
          </a-col>
          <a-col style="width: 25%">
            <a-statistic
              title="其它"
              :value="InventArry['other']"
              style="margin-right: 50px"
            />
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="item">
      <div style="color: #00f; margin-left: 10px; margin-top: 10px">
        工单统计：
      </div>
      <div>
        <a-row
          style="padding-top: 25px; padding-left: 25px; padding-right: 25px"
        >
          <a-col style="width: 33%">
            <a-timeline mode="left">
              <a-timeline-item>一月:{{ OrderArry["Jan"] }}</a-timeline-item>
              <a-timeline-item color="green"
                >二月:{{ OrderArry["Feb"] }}</a-timeline-item
              >
              <a-timeline-item color="red"
                >三月:{{ OrderArry["Mar"] }}</a-timeline-item
              >
              <a-timeline-item>四月:{{ OrderArry["Apr"] }}</a-timeline-item>
            </a-timeline>
          </a-col>
          <a-col style="width: 33%">
            <a-timeline mode="alternate">
              <a-timeline-item>五月:{{ OrderArry["May"] }}</a-timeline-item>
              <a-timeline-item color="green"
                >{{ OrderArry["Jun"] }}:六月</a-timeline-item
              >
              <a-timeline-item color="red"
                >七月:{{ OrderArry["Jul"] }}</a-timeline-item
              >
              <a-timeline-item>{{ OrderArry["Aug"] }}:八月</a-timeline-item>
            </a-timeline>
          </a-col>
          <a-col style="width: 33%">
            <a-timeline mode="right">
              <a-timeline-item>{{ OrderArry["Sept"] }}:九月</a-timeline-item>
              <a-timeline-item color="green"
                >{{ OrderArry["Oct"] }}:十月</a-timeline-item
              >
              <a-timeline-item color="red"
                >{{ OrderArry["Nov"] }}:十一月</a-timeline-item
              >
              <a-timeline-item>{{ OrderArry["Dec"] }}:十二月</a-timeline-item>
            </a-timeline>
          </a-col>
        </a-row>
      </div>
    </div>

    <div class="item">
      <div style="color: #00f; margin-left: 10px; margin-top: 10px">
        展会统计：
      </div>
      <div>
        <a-row
          :gutter="[8, 8]"
          style="
            padding-top: 25px;
            padding-left: 25px;
            padding-right: 25px;
            height: 77px;
          "
        >
          <a-col :span="4">
            <div>1月</div>
            <div>{{ FairArry["Jan"] }}</div>
          </a-col>
          <a-col :span="4">
            <div>2月</div>
            <div>{{ FairArry["Feb"] }}</div>
          </a-col>
          <a-col :span="4">
            <div>3月</div>
            <div>{{ FairArry["Mar"] }}</div>
          </a-col>
          <a-col :span="4">
            <div>4月</div>
            <div>{{ FairArry["Apr"] }}</div>
          </a-col>
          <a-col :span="4">
            <div>5月</div>
            <div>{{ FairArry["May"] }}</div>
          </a-col>
          <a-col :span="4">
            <div>6月</div>
            <div>{{ FairArry["Jun"] }}</div>
          </a-col>
        </a-row>

        <a-row
          :gutter="[8, 8]"
          style="padding-top: 25px; padding-left: 25px; padding-right: 25px"
        >
          <a-col :span="4">
            <div>7月</div>
            <div>{{ FairArry["Jul"] }}</div>
          </a-col>
          <a-col :span="4">
            <div>8月</div>
            <div>{{ FairArry["Aug"] }}</div>
          </a-col>
          <a-col :span="4">
            <div>9月</div>
            <div>{{ FairArry["Sept"] }}</div>
          </a-col>
          <a-col :span="4">
            <div>10月</div>
            <div>{{ FairArry["Oct"] }}</div>
          </a-col>
          <a-col :span="4">
            <div>11月</div>
            <div>{{ FairArry["Nov"] }}</div>
          </a-col>
          <a-col :span="4">
            <div>12月</div>
            <div>{{ FairArry["Dec"] }}</div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { getFairList } from "../../network/fairApi";
import { getOrderList } from "../../network/orderApi";
import { getInvtList } from "../../network/inventoryApi";
import moment from "moment";

export default defineComponent({
  setup() {
    const LatestFairArry = ref([]) as any; //最近展会数组
    const InventArry = ref({}); //资产统计对象
    const OrderArry = ref({}); //工单统计对象
    const FairArry = ref({}); //展会统计对象，时间为今年

    // 定义最近展会列表表头
    const Columns = [
      {
        name: "timeRange", //对应API返回的InvetListData中的字段
        title: "时间段",
        dataIndex: "timeRange",
        key: "timeRange",
        width: 120,
      },
      {
        name: "fairName", //对应API返回的InvetListData中的字段
        title: "展会名称",
        dataIndex: "fairName",
        key: "fairName",

        ellipsis: true,
      },
    ];

    const calLatestFairArry = (rawListData) => {
      //重置数组
      LatestFairArry.value.length = 0;
      //撤展时间大于今天的所有展会
      const today = moment().startOf("day"); //今天开始时间
      //撤展时间大于今天
      const tmpArry = rawListData.filter(
        (item) => moment(item.endTime) >= today
      );
      // console.log(tmpArry);

      //按照撤展时间排序
      tmpArry.sort(function (a, b) {
        let t1 = moment(a.endTime);
        let t2 = moment(b.endTime);
        let diff = moment(t1).diff(moment(t2), "days");
        return diff;
      });
      // console.log(tmpArry);

      //选择所有展会
      for (let i = 0; i < tmpArry.length; i++) {
        let timeRange =
          "[" +
          moment(tmpArry[i]["prepareTime"]).format("MM/DD") +
          "-" +
          moment(tmpArry[i]["endTime"]).format("MM/DD" + "]");
        let fairName = tmpArry[i]["fairName"];
        LatestFairArry.value.push({ timeRange: timeRange, fairName: fairName });
      }
    };

    const calFairArry = (rawListData) => {
      FairArry.value = {
        Jan: 0,
        Feb: 0,
        Mar: 0,
        Apr: 0,
        May: 0,
        Jun: 0,
        Jul: 0,
        Aug: 0,
        Sept: 0,
        Oct: 0,
        Nov: 0,
        Dec: 0,
      };
      // console.log(rawListData);
      const thisYear = moment().year();
      // console.log(FairArry.value["Jan"]);
      for (const k in rawListData) {
        const prepareMonth = moment(rawListData[k].prepareTime).month(); //0~11, 0: January, 11: December
        const prepareYear = moment(rawListData[k].prepareTime).year();
        if (prepareMonth == 0 && prepareYear == thisYear) {
          FairArry.value["Jan"]++;
        }
        if (prepareMonth == 1 && prepareYear == thisYear) {
          FairArry.value["Feb"]++;
        }
        if (prepareMonth == 2 && prepareYear == thisYear) {
          FairArry.value["Mar"]++;
        }
        if (prepareMonth == 3 && prepareYear == thisYear) {
          FairArry.value["Apr"]++;
        }
        if (prepareMonth == 4 && prepareYear == thisYear) {
          FairArry.value["May"]++;
        }
        if (prepareMonth == 5 && prepareYear == thisYear) {
          FairArry.value["Jun"]++;
        }
        if (prepareMonth == 6 && prepareYear == thisYear) {
          FairArry.value["Jul"]++;
        }
        if (prepareMonth == 7 && prepareYear == thisYear) {
          FairArry.value["Aug"]++;
        }
        if (prepareMonth == 8 && prepareYear == thisYear) {
          FairArry.value["Sept"]++;
        }
        if (prepareMonth == 9 && prepareYear == thisYear) {
          FairArry.value["Oct"]++;
        }
        if (prepareMonth == 10 && prepareYear == thisYear) {
          FairArry.value["Nov"]++;
        }
        if (prepareMonth == 11 && prepareYear == thisYear) {
          FairArry.value["Dec"]++;
        }
      }

      // console.log(thisYear);
    };

    const calOrderArry = (rawListData) => {
      OrderArry.value = {
        Jan: 0,
        Feb: 0,
        Mar: 0,
        Apr: 0,
        May: 0,
        Jun: 0,
        Jul: 0,
        Aug: 0,
        Sept: 0,
        Oct: 0,
        Nov: 0,
        Dec: 0,
      };
      const thisYear = moment().year();
      //第1层循环工单数据
      for (let i = 0; i < rawListData.length; i++) {
        const fairid = rawListData[i].fairName_id;
        //第2层循环展会数据
        for (let j = 0; j < listFairData.value.length; j++) {
          //判断工单中的展会ID是否与展会中的展会ID一致
          if (fairid == listFairData.value[j]["id"]) {
            const prepareMonth = moment(
              listFairData.value[j]["prepareTime"]
            ).month(); //0~11, 0: January, 11: December
            const prepareYear = moment(
              listFairData.value[j]["prepareTime"]
            ).year();

            //根据筹展月份写入对应数据
            if (prepareMonth == 0 && prepareYear == thisYear) {
              OrderArry.value["Jan"]++;
            }
            if (prepareMonth == 1 && prepareYear == thisYear) {
              OrderArry.value["Feb"]++;
            }
            if (prepareMonth == 2 && prepareYear == thisYear) {
              OrderArry.value["Mar"]++;
            }
            if (prepareMonth == 3 && prepareYear == thisYear) {
              OrderArry.value["Apr"]++;
            }
            if (prepareMonth == 4 && prepareYear == thisYear) {
              OrderArry.value["May"]++;
            }
            if (prepareMonth == 5 && prepareYear == thisYear) {
              OrderArry.value["Jun"]++;
            }
            if (prepareMonth == 6 && prepareYear == thisYear) {
              OrderArry.value["Jul"]++;
            }
            if (prepareMonth == 7 && prepareYear == thisYear) {
              OrderArry.value["Aug"]++;
            }
            if (prepareMonth == 8 && prepareYear == thisYear) {
              OrderArry.value["Sept"]++;
            }
            if (prepareMonth == 9 && prepareYear == thisYear) {
              OrderArry.value["Oct"]++;
            }
            if (prepareMonth == 10 && prepareYear == thisYear) {
              OrderArry.value["Nov"]++;
            }
            if (prepareMonth == 11 && prepareYear == thisYear) {
              OrderArry.value["Dec"]++;
            }
            break; //匹配到展会后结束第2层循环
          }
        }
      }
    };

    const calInventArry = (rawListData) => {
      //数组初始化赋值
      InventArry.value = {
        out: 0,
        core: 0,
        disb: 0,
        acc: 0,
        fw: 0,
        wlc: 0,
        ap: 0,
        other: 0,
      };

      // 筛选出在线或者离线的设备
      // ListData.value = rawListData.filter(
      //   (item) => item.devStatus == "在线" || item.devStatus == "离线"
      // );
      //出口层设备统计数据：在线或者离线的设备，并且名称包括Out
      let out_var = rawListData.filter(
        (item) =>
          (item.devStatus == "在线" || item.devStatus == "离线") &&
          item.devUsage.indexOf("Out") > -1
      ).length;
      //核心层设备统计数据：在线或者离线的设备，并且名称包括Core
      let core_var = rawListData.filter(
        (item) =>
          (item.devStatus == "在线" || item.devStatus == "离线") &&
          item.devUsage.indexOf("Core") > -1
      ).length;
      //汇聚层设备统计数据：在线或者离线的设备，并且名称包括Disb
      let disb_var = rawListData.filter(
        (item) =>
          (item.devStatus == "在线" || item.devStatus == "离线") &&
          item.devUsage.indexOf("Dstb") > -1
      ).length;
      //接入层设备统计数据：在线或者离线的设备，并且名称包括Acc
      let acc_var = rawListData.filter(
        (item) =>
          (item.devStatus == "在线" || item.devStatus == "离线") &&
          item.devUsage.indexOf("Acc") > -1
      ).length;
      //防火墙设备统计数据：在线或者离线的设备，并且名称包括Fw
      let fw_var = rawListData.filter(
        (item) =>
          (item.devStatus == "在线" || item.devStatus == "离线") &&
          item.devUsage.indexOf("Fw") > -1
      ).length;
      //控制器设备统计数据：在线或者离线的设备，并且名称包括WLC
      let wlc_var = rawListData.filter(
        (item) =>
          (item.devStatus == "在线" || item.devStatus == "离线") &&
          item.devUsage.indexOf("WLC") > -1
      ).length;
      //无线AP设备统计数据：在线或者离线的设备，并且名称包括AP
      let ap_var = rawListData.filter(
        (item) =>
          (item.devStatus == "在线" || item.devStatus == "离线") &&
          item.devUsage.indexOf("AP") > -1
      ).length;
      //其它设备统计数据：在线或者离线的设备，命名不符合上述规则的
      let other_var =
        rawListData.filter(
          (item) => item.devStatus == "在线" || item.devStatus == "离线"
        ).length -
        out_var -
        core_var -
        disb_var -
        acc_var -
        fw_var -
        wlc_var -
        ap_var;

      InventArry.value = {
        out: out_var,
        core: core_var,
        disb: disb_var,
        acc: acc_var,
        fw: fw_var,
        wlc: wlc_var,
        ap: ap_var,
        other: other_var,
      };
    };

    // 页面挂载后读取页面数据
    const listFairData = ref([]); //展会列表数据，用于工单计算提取开展时间
    onMounted(() => {
      getFairList() //展会列表数据
        .then((res) => {
          // console.log(res);
          listFairData.value = res.data;
          const rawListData = res.data;
          calLatestFairArry(rawListData); //筛选最近展会数据
          calFairArry(rawListData); //计算展会统计数据
        })
        .catch((err) => {
          console.log(err);
        });

      const params = {
        fairId: "",
      };
      getOrderList(params) //工单列表数据
        .then((res) => {
          // console.log(res.data);
          const rawListData = res.data;
          calOrderArry(rawListData);
        })
        .catch((err) => {
          console.log(err);
        });

      const params1 = { search: "" };
      getInvtList(params1) //资产类别数据
        .then((res) => {
          const rawListData = res.data;
          calInventArry(rawListData); //统计资产
        })
        .catch((err) => {
          console.log(err);
        });
      // console.log(listData);
    });

    return {
      Columns,

      listFairData,
      LatestFairArry,
      InventArry,
      OrderArry,
      FairArry,
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