<template>
  <!-- 2/绩效统计选项卡内容 -->

  <div>
    <!-- 时间段选择 -->
    <a-range-picker
      :placeholder="['开始(筹展)', '结束(筹展)']"
      :disabledDate="disabledDate"
      v-model:value="searchTimeRange"
      @change="onChange"
      @openChange="onOpenChange"
      @calendarChange="onCalendarChange"
      style="margin-left: 10px"
    />
    <a-button shape="round" style="margin-left: 10px" @click="handleSearch()"
      ><template #icon><SearchOutlined /></template>查询</a-button
    >
    <span style="padding-right: 100px; margin-left: 100px; color: green"
      >所选展会绩效统计(￥):{{ totalCommision }}</span
    >
  </div>
  <!-- 分割线 -->
  <a-divider />
  <!-- 工单列表，嵌套父表格 -->
  <a-table
    :columns="columns"
    :data-source="fairData"
    :rowKey="(record) => record.id"
    :expandedRowKeys="expandedRowKeys"
    @expand="onExpand"
    size="small"
    class="components-table-demo-nested"
  >
    <!-- 对嵌套子表格进行渲染-->
    <template #expandedRowRender>
      <a-table
        :columns="innerColumns"
        :data-source="orderData"
        :pagination="false"
        :rowKey="(record) => record.id"
        size="small"
      >
        <template #orderStaus>
          <span>
            <a-badge status="success" />
            Finished
          </span>
        </template>
        <template #operation="{ record }">
          <span class="table-operation">
            <a href="#" @click.prevent="handleEdit(record)"
              ><a-tooltip title="编辑" :color="'blue'"
                ><EditTwoTone /></a-tooltip
            ></a>
            <a-drawer
              v-model:visible="editDrawerVisible"
              title="编辑绩效"
              :width="600"
              :body-style="{ paddingBottom: '80px' }"
              :maskStyle="{
                opacity: '0.1',
                background: '#778899',
                animation: 'none',
              }"
              @ok="editDrawerVisible = false"
            >
              <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-item label="展会名称：" class="bottom">
                  {{ fairCopiedName }}
                </a-form-item>

                <a-form-item label="安装地点：" class="bottom">
                  {{ editableData.orderLocation }}
                </a-form-item>
                <a-form-item label="服务项目：" class="bottom">
                  {{ editableData.orderSvcItem }}
                </a-form-item>

                <a-form-item label="数量：" class="bottom">
                  {{ editableData.orderNum }}
                </a-form-item>

                <a-form-item label="绩效单价：" class="bottom">
                  <a-input
                    addon-before="￥"
                    v-model:value="editableData.orderUnitCommision"
                    @change="changeEditUnitCommision"
                  />
                </a-form-item>
                <a-form-item label="绩效小计：" class="bottom">
                  ￥{{ editableData.orderSubCommision }}
                </a-form-item>

                <a-form-item label="工单状态：" class="bottom">
                  {{ editableData.orderStaus }}
                </a-form-item>

                <a-form-item label="工单来源：" class="bottom">
                  {{ editableData.orderOrigin }}
                </a-form-item>

                <a-form-item label="备注：" class="bottom">
                  {{ editableData.orderRemark }}
                </a-form-item>
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
                <a-button
                  style="margin-right: 8px"
                  @click="handleEditDrawerClose()"
                  >取消</a-button
                >
                <a-button
                  style="margin-right: 8px"
                  @click="handlePutOrder(editableData)"
                  >提交</a-button
                >
              </div>
            </a-drawer>
          </span>
        </template>
      </a-table>
    </template>
  </a-table>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  // UnwrapRef,
  reactive,
  // toRefs,
  // toRaw,
  // watch,
  // onMounted,
} from "vue";
//引入时间配合日期选择器使用
import moment, { Moment } from "moment";
import { getFairList } from "../../network/fairApi";

import {
  getOrderList,
  // postOrder,
  // deleteOrder,
  putOrder,
} from "../../network/orderApi";
import { message, Select, DatePicker } from "ant-design-vue";
import {
  SearchOutlined,
  // PlusOutlined,
  // FileExcelOutlined,
  ReloadOutlined,
  EditTwoTone,
  // DeleteTwoTone,
  RightSquareTwoTone,
} from "@ant-design/icons-vue";

const columns = [
  {
    title: "展会名称",
    dataIndex: "fairName",
    key: "fairName",
    width: 500,
    ellipsis: true,
  },
  {
    title: "筹展时间",
    dataIndex: "prepareTime",
    key: "prepareTime",
    width: 100,
    customRender: ({ text }) => moment(text).format("Y-M-D"),
  },
  {
    title: "开展时间",
    dataIndex: "startTime",
    key: "startTime",
    width: 100,
    customRender: ({ text }) => moment(text).format("Y-M-D"),
  },
  {
    title: "撤展时间",
    dataIndex: "endTime",
    key: "endTime",
    width: 100,
    customRender: ({ text }) => moment(text).format("Y-M-D"),
  },
  {
    title: "地点",
    dataIndex: "location",
    key: "location",
    ellipsis: true,
  },
];

const innerColumns = [
  {
    title: "安装地点",
    dataIndex: "orderLocation",
    key: "orderLocation",
    ellipsis: true,
  },
  {
    title: "服务项目",
    dataIndex: "orderSvcItem",
    key: "orderSvcItem",
    width: 150,
    ellipsis: true,
  },
  { title: "数量", dataIndex: "orderNum", key: "orderNum", width: 50 },
  { title: "费用", dataIndex: "orderCharge", key: "orderCharge", width: 80 },

  {
    title: "工单状态",
    dataIndex: "orderStaus",
    key: "orderStaus",
    width: 100,
    sorter: (a, b) => a.orderStaus.localeCompare(b.orderStaus),
  },
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
    title: "绩效单价",
    dataIndex: "orderUnitCommision",
    key: "orderUnitCommision",
    width: 80,
  },
  {
    title: "绩效小计",
    dataIndex: "orderSubCommision",
    key: "orderSubCommision",
    width: 100,
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    width: 80,
    slots: { customRender: "operation" },
  },
];

const { RangePicker } = DatePicker;

export default defineComponent({
  name: "commision",
  setup() {
    const searchTimeRange = ref<Moment[]>();
    const searchTimeRangeString = ref<string[]>(["", ""]);
    const dates = ref<Moment[]>([]);

    const disabledDate = (current: Moment) => {
      if (!dates.value || dates.value.length === 0) {
        return false;
      }
      const diffDate = current.diff(dates.value[0], "days");
      return Math.abs(diffDate) < 1; //结束日期必须大于开始日期
    };

    const onOpenChange = (open: boolean) => {
      if (open) {
        dates.value = [];
      }
    };

    const onChange = (val: Moment[], dateStrings: []) => {
      searchTimeRange.value = val;
      searchTimeRangeString.value = dateStrings;
      // console.log(searchTimeRangeString.value);
    };

    const onCalendarChange = (val: Moment[]) => {
      dates.value = val;
    };

    const fairData = ref([]);
    // 展会-根据选择条件查询
    const handleSearch = () => {
      if (searchTimeRangeString.value[0] == "") {
        message.warning("请输入查询时间段！");
        return;
      }

      const params = {
        starttime: searchTimeRangeString.value[0],
        endtime: searchTimeRangeString.value[1],
      };

      // getFairList(params);
      getFairList(params)
        .then((res) => {
          fairData.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
      // message.success('查询成功！');
    };

    //点击展开“+”符号
    const totalCommision = ref();
    const orderData = ref([]);
    const expandedRowKeys = ref([Number]);
    const onExpand = (expended: boolean, record) => {
      if (expended) {
        expandedRowKeys.value = []; //重置展开节点
        orderData.value = []; //先清空数据，否则会先显示上一次的数据再刷新为本次的数据
        fairCopiedName.value = record.fairName; //存储展会名称用于工单编辑
        expandedRowKeys.value.push(record.id);
        // console.log("展开ID列表" + expandedRowKeys.value);
        const params = {
          fairId: record.id,
        };
        getOrderList(params)
          .then((res) => {
            //获取工单数据
            orderData.value = res.data;
            //计算绩效
            totalCommision.value = 0;
            for (const k in res.data) {
              // console.log(res.data[k]);
              totalCommision.value += res.data[k]["orderSubCommision"];
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        expandedRowKeys.value = []; //折叠当前行
      }
    };

    const fairCopiedName = ref<string>("");
    const fairCopiedId = ref<number>();
    // const serviceData = reactive([]); //定义服务列表数据

    // const formRef = ref<any>(null);

    // 修改绩效
    const editDrawerVisible = ref<boolean>(false);
    const editableData = reactive({
      orderLocation: "",
      orderSvcItem: "",
      orderUnitPrice: 0,
      orderNum: 1,
      orderCharge: 0,
      orderUnitCommision: 0,
      orderSubCommision: 0,
      orderCustom: "",
      orderContacts: "",
      orderTel: "",
      orderStaus: "待派单",
      orderOrigin: "展务通",
      orderRemark: "",
    });
    const handleEdit = (record: any) => {
      editDrawerVisible.value = true;

      //复制数据用于编辑
      for (const k in record) {
        editableData[k] = record[k];
        // console.log(editableData);
      }
      // console.log(fairCopiedName.value);
    };

    const changeEditUnitCommision = () => {
      editableData.orderSubCommision =
        editableData.orderUnitCommision * editableData.orderNum;
    };

    const handleEditDrawerClose = () => {
      editDrawerVisible.value = false;
    };

    const handlePutOrder = (Data: object) => {
      // console.log(Data);
      putOrder(Data).then((res) => {
        if (res.status == 200) {
          message.success("更新成功！");
          editDrawerVisible.value = false;

          // 刷新展开行工单数据
          const params = {
            fairId: expandedRowKeys.value[0],
          };
          getOrderList(params)
            .then((res) => {
              orderData.value = res.data;
              //计算绩效
              totalCommision.value = 0;
              for (const k in res.data) {
                // console.log(res.data[k]);
                totalCommision.value += res.data[k]["orderSubCommision"];
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    };

    return {
      // 展会查询
      onOpenChange,
      onChange,
      onCalendarChange,
      searchTimeRange,
      searchTimeRangeString,
      dates,
      disabledDate,
      handleSearch,

      fairData,
      columns,
      innerColumns,
      orderData,
      onExpand,
      expandedRowKeys,

      fairCopiedName,
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },

      changeEditUnitCommision,

      editDrawerVisible,
      editableData,
      handleEditDrawerClose,
      handlePutOrder,
      fairCopiedId,

      handleEdit,
      totalCommision,
    };
  },
  components: {
    SearchOutlined,

    ReloadOutlined,
    EditTwoTone,
    // DeleteTwoTone,
    RightSquareTwoTone,
    message,
    [Select.name]: Select,
    ASelectOption: Select.Option,
    [RangePicker.name]: RangePicker,
  },
});
</script>
<style scoped>
.bottom {
  margin-bottom: 5px;
}
</style>
