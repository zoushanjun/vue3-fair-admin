<template>
  <!-- 1/工单中心选项卡内容 -->

  <div>
    <a-input-search
      v-model:value="value"
      placeholder="请输入工单关键词"
      style="width: 200px"
      @search="onSearch"
    />

    <a-button shape="round" style="margin-left: 10px"
      ><template #icon><ReloadOutlined /></template>重置</a-button
    >
  </div>
  <!-- 分割线 -->
  <a-divider />
  <!-- 工单列表，嵌套表格 -->
  <a-table
    :columns="columns"
    :data-source="data"
    class="components-table-demo-nested"
  >
    <template #operation>
      <!-- <a-button type="dashed" shape="circle">
              <template #icon><PlusOutlined /></template>
            </a-button> -->
      <a-tooltip title="增加工单" :color="'blue'">
        <PlusOutlined />
      </a-tooltip>

      <a-divider
        type="vertical"
        style="height: 10px; background-color: #7cb305"
      />
      <!-- <a-button type="dashed" shape="circle">
              <template #icon><FileExcelOutlined /></template>
            </a-button> -->
      <a-tooltip title="导出Excel" :color="'blue'">
        <FileExcelOutlined />
      </a-tooltip>
    </template>
    -->

    <!-- 对嵌套子表格进行渲染-->
    <template #expandedRowRender>
      <a-table
        :columns="innerColumns"
        :data-source="innerData"
        :pagination="false"
        size="small"
      >
        <template #orderStaus>
          <span>
            <a-badge status="success" />
            Finished
          </span>
        </template>
        <template #operation>
          <span class="table-operation">
            <a>修改</a>
            <a-divider
              type="vertical"
              style="height: 10px; background-color: #7cb305"
            />
            <a>删除</a>
            <a-divider
              type="vertical"
              style="height: 10px; background-color: #7cb305"
            />
            <a>指派</a>
          </span>
        </template>
      </a-table>
    </template>
  </a-table>
</template>

<script lang="ts">
import { defineComponent, ref, toRaw } from "vue";
import {
  PlusOutlined,
  FileExcelOutlined,
  ReloadOutlined,
} from "@ant-design/icons-vue";
import {
  // 弹出对话框
  Modal,
  DatePicker,
} from "ant-design-vue";

import { Moment } from "moment";

// import 'ant-design-vue/dist/antd.css';
const { RangePicker } = DatePicker;
const columns = [
  { title: "展会名称", dataIndex: "fairName", key: "fairName" },
  { title: "举办时间", dataIndex: "fariTime", key: "fariTime" },
  { title: "举办地点", dataIndex: "fairLocation", key: "fairLocation" },
  { title: "操作", key: "operation", slots: { customRender: "operation" } },
];

interface DataItem {
  key: number;
  fairName: string;
  fariTime: string;
  fairLocation: string;
  // upgradeNum: number;
  // creator: string;
  // createdAt: string;
}

const data: DataItem[] = [];
for (let i = 0; i < 50; ++i) {
  data.push({
    key: i,
    fairName:
      "2021广州国际工业自动化技术及装备展览会及广州国际工业机器人展览会",
    fariTime: "2021.2.28-2021.3.5",
    fairLocation: "10.2-11.2、13.2",
    // upgradeNum: 500,
    // creator: 'Jack',
    // createdAt: '2014-12-24 23:12:00',
  });
}

const innerColumns = [
  {
    title: "安装地点",
    dataIndex: "orderLocation",
    key: "orderLocation",
    width: 200,
    ellipsis: true,
  },
  {
    title: "服务项目",
    dataIndex: "orderSvcItem",
    key: "orderSvcItem",
    width: 200,
    ellipsis: true,
  },
  { title: "费用", dataIndex: "orderCharge", key: "orderCharge", width: 100 },
  {
    title: "客户名称",
    dataIndex: "orderCustom",
    key: "orderCustom",
    ellipsis: true,
  },
  {
    title: "联系人",
    dataIndex: "orderContacts",
    key: "orderContacts",
    width: 80,
  },
  { title: "联系电话", dataIndex: "orderTel", key: "orderTel", width: 100 },
  { title: "工单状态", dataIndex: "orderStaus", key: "orderStaus", width: 80 },
  {
    title: "工单来源",
    dataIndex: "orderOrigin",
    key: "orderOrigin",
    width: 80,
  },
  {
    title: "备注",
    dataIndex: "orderRemark",
    key: "orderRemark",
    width: 80,
    ellipsis: true,
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    width: 150,
    slots: { customRender: "operation" },
  },
];

interface innerDataItem {
  key: number;
  orderLocation: string;
  orderSvcItem: string;
  orderCharge: string;
  orderCustom: string;
  orderContacts: string;
  orderTel: string;
  orderStaus: string;
  orderOrigin: string;
  orderRemark: string;
}

const innerData: innerDataItem[] = [];
for (let i = 0; i < 50; ++i) {
  innerData.push({
    key: i,
    orderLocation:
      "一楼9号门门禁及服务点一楼9号门门禁及服务点一楼9号门门禁及服务点",
    orderSvcItem: "15M宽带*1 15M宽带*1 15M宽带*1 15M宽带*1",
    orderCharge: "2500",
    orderCustom: "主场",
    orderContacts: "雷晓震",
    orderTel: "18516282045",
    orderStaus: "未指派",
    orderOrigin: "展务通",
    orderRemark: "4月3日上午安装到位，提供HUB一个",
  });
}

export default defineComponent({
  name: "order",
  setup() {
    const value = ref<string>("");

    // 定义弹出框举办地点变量
    const value2 = ref<string>("");

    const onSearch = (searchValue: string) => {
      console.log("use value", searchValue);
      console.log("or use this.value", value.value);
    };

    const onSubmit = () => {
      console.log("submit!", toRaw(formFair));
    };

    return {
      //针对时间段选择器
      value3: ref<Moment[]>([]),

      //针对选项卡
      activeKey: ref("1"),
      value,
      onSearch,

      //返回新增展会表单内容
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },

      onSubmit,
      value2,

      data,
      columns,
      innerColumns,
      innerData,
    };
  },
  components: {
    PlusOutlined,
    FileExcelOutlined,
    ReloadOutlined,

    [RangePicker.name]: RangePicker,

    [Modal.name]: Modal,
  },
});
</script>
<style>
</style>
