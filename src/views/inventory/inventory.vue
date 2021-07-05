<template>
  <div>
    <a-row style="padding-bottom: 20px">
      <a-col :span="2">
        <a-statistic
          title="出口层"
          :value="DashBoardArry['out']"
          style="margin-right: 50px"
        />
      </a-col>
      <a-col :span="2">
        <a-statistic
          title="核心层"
          :value="DashBoardArry['core']"
          style="margin-right: 50px"
        />
      </a-col>
      <a-col :span="2">
        <a-statistic
          title="汇聚层"
          :value="DashBoardArry['disb']"
          style="margin-right: 50px"
        />
      </a-col>
      <a-col :span="2">
        <a-statistic
          title="接入层"
          :value="DashBoardArry['acc']"
          style="margin-right: 50px"
        />
      </a-col>
      <a-col :span="2">
        <a-statistic
          title="防火墙"
          :value="DashBoardArry['fw']"
          style="margin-right: 50px"
        />
      </a-col>
      <a-col :span="2">
        <a-statistic
          title="控制器"
          :value="DashBoardArry['wlc']"
          style="margin-right: 50px"
        />
      </a-col>
      <a-col :span="2">
        <a-statistic
          title="无线AP"
          :value="DashBoardArry['ap']"
          style="margin-right: 50px"
        />
      </a-col>
      <a-col :span="2">
        <a-statistic
          title="其它"
          :value="DashBoardArry['other']"
          style="margin-right: 50px"
        />
      </a-col>
      <a-col :span="2">
        <a-tooltip
          title="根据用途/组别关键词进行统计[出口层Out][核心层Core][汇聚层Dstb][接入层Acc][防火墙Fw][控制器WLC][无线AP]"
          :color="'blue'"
          ><InfoCircleTwoTone
        /></a-tooltip>
      </a-col>
      <a-col :span="6">
        <a-input-search
          v-model:value="searchValue"
          placeholder="请输入查询内容"
          style="width: 150px"
          @search="onSearch"
        />
        <a-button shape="round" style="margin-left: 10px" @click="searchReset"
          ><template #icon><ReloadOutlined /></template>重置</a-button
        >
      </a-col>
    </a-row>
  </div>
  <!-- <a-divider /> -->

  <!-- 资产表格，size="small"指定为紧凑型 -->
  <a-table
    :columns="Columns"
    :data-source="ListData"
    :pagination="{ pageSize: 50 }"
    :scroll="{ y: 240 }"
    :rowKey="(record) => record.id"
    size="small"
    bordered
  >
    <template #operation="{ record }">
      <span class="table-operation">
        <a href="#" @click.prevent="handleEdit(record)">
          <a-tooltip title="编辑" :color="'blue'"><EditTwoTone /></a-tooltip
        ></a>
        <a-drawer
          v-model:visible="editDrawerVisible"
          title="编辑资产"
          :width="600"
          :scroll="{ y: 240 }"
          :body-style="{ paddingBottom: '80px' }"
          :maskStyle="{
            opacity: '0.1',
            background: '#778899',
            animation: 'none',
          }"
          :destroyOnClose="true"
          @ok="editDrawerVisible = false"
        >
          <a-form :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-row :gutter="16">
              <a-col :span="12">
                <a-form-item
                  :labelCol="{ span: 7 }"
                  :wrapper-col="{ span: 15 }"
                  label="设备名："
                >
                  <a-input v-model:value="editableData.deviceName" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  :labelCol="{ span: 7 }"
                  :wrapper-col="{ span: 15 }"
                  label="IP地址："
                >
                  <a-input v-model:value="editableData.ipAddr" />
                </a-form-item>
              </a-col>
            </a-row>

            <a-row :gutter="16">
              <a-col :span="12">
                <a-form-item
                  :labelCol="{ span: 7 }"
                  :wrapper-col="{ span: 15 }"
                  label="SN/MAC："
                >
                  {{ editableData.SN_MAC }}
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  :labelCol="{ span: 7 }"
                  :wrapper-col="{ span: 15 }"
                  label="型号："
                >
                  {{ editableData.model }}
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="12">
                <a-form-item
                  :labelCol="{ span: 7 }"
                  :wrapper-col="{ span: 15 }"
                  label="平台："
                >
                  <a-input v-model:value="editableData.platform" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  :labelCol="{ span: 7 }"
                  :wrapper-col="{ span: 15 }"
                  label="安装区域："
                >
                  <a-input v-model:value="editableData.area" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="12">
                <a-form-item
                  :labelCol="{ span: 7 }"
                  :wrapper-col="{ span: 15 }"
                  label="安装位置："
                >
                  <a-input v-model:value="editableData.location" />
                </a-form-item>
              </a-col>

              <a-col :span="12">
                <a-form-item
                  :labelCol="{ span: 7 }"
                  :wrapper-col="{ span: 15 }"
                  label="用途/组别："
                >
                  <a-input v-model:value="editableData.devUsage" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="12">
                <a-form-item
                  :labelCol="{ span: 7 }"
                  :wrapper-col="{ span: 15 }"
                  label="登录账号："
                >
                  <a-input v-model:value="editableData.devAcct" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  :labelCol="{ span: 7 }"
                  :wrapper-col="{ span: 15 }"
                  label="登录密码："
                >
                  <a-input v-model:value="editableData.devPwd" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="12">
                <a-form-item
                  :labelCol="{ span: 7 }"
                  :wrapper-col="{ span: 15 }"
                  label="状态："
                >
                  <a-select
                    v-model:value="editableData.devStatus"
                    ref="select"
                    @change="handleChange"
                  >
                    <a-select-option value="在线">在线</a-select-option>
                    <a-select-option value="离线">离线</a-select-option>
                    <a-select-option value="库存"> 库存</a-select-option>
                    <!-- <a-select-option value="项目"> 项目</a-select-option> >
                    <a-select-option value="维修">维修</a-select-option>
                    <a-select-option value="报废">报废</a-select-option>
                    <a-select-option value="外借">外借</a-select-option>
                    <a-select-option value="其它">其它</a-select-option> -->
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
          <div
            :style="{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
              zIndex: 1,
            }"
          >
            <a-button style="margin-right: 8px" @click="handleEditDrawerClose()"
              >取消</a-button
            >
            <a-button
              style="margin-right: 8px"
              @click="handlePutInvt(editableData)"
              >提交</a-button
            >
          </div>
        </a-drawer>
      </span>
    </template>
  </a-table>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  // toRaw,
  UnwrapRef,
  onMounted,
} from "vue";
import { message, Select } from "ant-design-vue";

import {
  EditTwoTone,
  ReloadOutlined,
  InfoCircleTwoTone,
} from "@ant-design/icons-vue";

// 引入与flask后端交互的http api方法
import { getInvtList, putInvt } from "../../network/inventoryApi";

// 新增资产弹出框表单内容接口
interface FormInventory {
  deviceName: string;
  SN_MAC: string;
  ipAddr: string;
  model: string;
  category: string;
  location: string;
  area: string;
  devUsage: string;
  devAcct: string;
  devPwd: string;
  devStatus: string;
}

// 定义资产管理列表表头
const Columns = [
  {
    name: "deviceName", //对应API返回的InvetListData中的字段
    title: "设备名",
    dataIndex: "deviceName",
    key: "deviceName",
    // width: 100,
    ellipsis: true,
  },
  {
    title: "IP地址",
    name: "ipAddr",
    dataIndex: "ipAddr",
    key: "ipAddr",
    width: 130,
  },
  {
    title: "序列号/MAC",
    name: "SN_MAC",
    dataIndex: "SN_MAC",
    key: "SN_MAC",
    width: 140,
    ellipsis: true,
  },
  {
    title: "型号",
    name: "model",
    dataIndex: "model",
    key: "model",
    width: 180,
    ellipsis: true,
  },
  {
    title: "平台",
    name: "platform",
    dataIndex: "platform",
    key: "platform",
    width: 80,
    ellipsis: true,
  },
  {
    title: "安装区域",
    name: "area",
    dataIndex: "area",
    key: "area",
    width: 80,
  },
  {
    title: "安装位置",
    name: "location",
    dataIndex: "location",
    key: "location",
    width: 80,
    ellipsis: true,
  },

  {
    title: "用途/组别",
    name: "devUsage",
    dataIndex: "devUsage",
    key: "devUsage",
    width: 80,
  },
  {
    title: "登录账号",
    name: "devAcct",
    dataIndex: "devAcct",
    key: "devAcct",
    width: 80,
  },
  // {
  //   title: "登录密码",
  //   name: "devPwd",
  //   dataIndex: "devPwd",
  //   key: "devPwd",
  //   width: 80,
  // },
  {
    title: "状态",
    name: "devStatus",
    dataIndex: "devStatus",
    key: "devStatus",
    width: 60,
  },
  {
    title: "操作",
    // name: 'title',
    dataIndex: "operation",
    key: "operation",
    width: 100,
    slots: { customRender: "operation" },
  },
];

export default defineComponent({
  name: "inventory",
  setup() {
    // 定义InvetListData资产列表,InvetCategoryListData资产类别数据为响应式数组
    // ref包裹的数据需要通过.value来获值
    const ListData = ref([]);
    const DashBoardArry = ref({});

    const calDashBoardVal = (rawListData) => {
      //数组初始化赋值
      DashBoardArry.value = {
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
      ListData.value = rawListData.filter(
        (item) => item.devStatus == "在线" || item.devStatus == "离线"
      );
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

      DashBoardArry.value = {
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

    // 页面挂载后读取资产列表数据
    onMounted(() => {
      const params = { search: "" };
      getInvtList(params)
        .then((res) => {
          //刷新列表及统计面板
          const rawListData = res.data;
          calDashBoardVal(rawListData);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    const searchValue = ref<string>("");

    // 资产管理页面相关处理

    const form: UnwrapRef<FormInventory> = reactive({
      deviceName: "",
      SN_MAC: "",
      ipAddr: "",
      model: "",
      category: "",
      location: "",
      area: "",
      devUsage: "",
      devAcct: "",
      devPwd: "",
      devStatus: "",
    });

    //ref需要加类型验证，不然在获取formRef.value时会有类型的错误提示
    const formRef = ref<any>(null);

    const onSearch = (searchValue: string) => {
      const params = {
        search: searchValue,
      };
      getInvtList(params)
        .then((res) => {
          // 不需要对仪表盘数据进行重新计算，只过滤在线和离线的设备
          ListData.value = res.data.filter(
            (item) => item.devStatus == "在线" || item.devStatus == "离线"
          );
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const searchReset = () => {
      searchValue.value = "";
      const params = {
        search: "",
      };
      getInvtList(params)
        .then((res) => {
          const rawListData = res.data;
          calDashBoardVal(rawListData);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // 修改资产
    const editDrawerVisible = ref<boolean>(false);
    const editableData: UnwrapRef<Record<string, FormInventory>> = reactive({});
    const handleEdit = (record: any) => {
      //获取资产类别
      // getInvtCategoryList()
      //   .then((res) => {
      //     //复制数据
      //     for (const k in res.data) {
      //       CategoryData[k] = res.data[k].category;
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      editDrawerVisible.value = true;
      //复制数据用于编辑
      for (const k in record) {
        editableData[k] = record[k];
      }
      console.log(editableData);
    };

    const handlePutInvt = (Data: object) => {
      putInvt(Data).then((res) => {
        if (res.status == 200) {
          message.success("更新成功！");
          editDrawerVisible.value = false;
          // 刷新当前页面
          const params = { search: "" };
          getInvtList(params)
            .then((res) => {
              const rawListData = res.data;
              calDashBoardVal(rawListData);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    };

    const handleEditDrawerClose = () => {
      editDrawerVisible.value = false;
    };

    const handleChange = (value: string) => {
      console.log(`selected ${value}`);
    };

    // const handleChangeCategory = (value: string) => {
    //   console.log(`selected ${value}`);
    // };

    return {
      DashBoardArry,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      Columns,
      formRef,
      form,
      // resetForm,

      // CategoryData,

      // onSubmit,
      searchValue,
      onSearch,
      searchReset,

      ListData,

      handleEdit,
      editDrawerVisible,
      editableData,
      handleEditDrawerClose,
      handlePutInvt,

      handleChange,
      // handleChangeCategory,
      devStatus: ref("在线"),
    };
  },
  components: {
    EditTwoTone,
    ReloadOutlined,
    InfoCircleTwoTone,
    [Select.name]: Select,
    ASelectOption: Select.Option,
  },
});
</script>
<style lang="less">
</style>
