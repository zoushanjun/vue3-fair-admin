<template>
  <!-- 1/工单中心选项卡内容 -->

  <div>
    <a-input-search
      v-model:value="searchValue"
      placeholder="请输入展会关键词"
      style="width: 200px"
      @search="handleSearch()"
    />

    <a-button shape="round" style="margin-left: 10px" @click="reload"
      ><template #icon><ReloadOutlined /></template>重置</a-button
    >

    <!-- <a-button shape="round" style="margin-left: 10px"
      ><template #icon><FileExcelOutlined /></template>导出</a-button
    > -->
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
    <template #operation="{ record }">
      <a @click="handleAdd(record)">
        <a-tooltip title="增加工单" :color="'blue'">
          <PlusOutlined />
        </a-tooltip>
      </a>
      <a-divider
        type="vertical"
        style="height: 10px; background-color: #7cb305"
      />
      <a @click="handleExpToExcel(record)">
        <a-tooltip title="导出excel" :color="'blue'">
          <FileExcelOutlined />
        </a-tooltip>
      </a>

      <!-- 点击新增按钮，弹出新增工单抽屉 -->

      <a-drawer
        v-model:visible="drawerVisible"
        title="新增工单"
        :width="600"
        :body-style="{ paddingBottom: '80px' }"
        :maskStyle="{
          opacity: '0.1',
          background: '#778899',
          animation: 'none',
        }"
        @ok="drawerVisible = false"
      >
        <a-form
          ref="formRef"
          :model="form"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          :rules="rules"
        >
          <a-form-item label="展会名称：" class="bottom">
            {{ fairCopiedName }} 
          </a-form-item>
          <a-form-item v-if="false">
            <a-input v-model:value="fairCopiedId" />
          </a-form-item>

          <a-form-item label="安装地点：" ref="orderLocation" class="bottom">
            <a-input
              v-model:value="form.orderLocation"
              placeholder="安装地点"
            />
          </a-form-item>
          <a-form-item label="服务项目：" class="bottom">
            <!-- <a-input v-model:value="form.orderSvcItem" placeholder="服务项目" /> -->
            <a-select
              v-model:value="form.orderSvcItem"
              ref="select"
              @change="handleChangeService"
            >
              <a-select-option
                v-for="item in serviceData"
                :key="item['serviceName']"
              >
                {{ item["serviceName"] }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="单价：" class="bottom">
            <a-input
              addon-before="￥"
              v-model:value="form.orderUnitPrice"
              placeholder="单价"
              @change="onChangeNum"
          /></a-form-item>
          <a-form-item label="数量：" class="bottom">
            <a-input-number
              v-model:value="form.orderNum"
              :min="1"
              :max="100"
              @change="onChangeNum"
            />
          </a-form-item>
          <a-form-item label="费用：" class="bottom">
            <a-input
              addon-before="￥"
              v-model:value="form.orderCharge"
              placeholder="费用"
            />
          </a-form-item>
          <a-form-item label="客户名称：" class="bottom">
            <a-input v-model:value="form.orderCustom" placeholder="客户名称" />
          </a-form-item>
          <a-form-item label="联系人：" class="bottom">
            <a-input v-model:value="form.orderContacts" placeholder="联系人" />
          </a-form-item>
          <a-form-item label="联系电话：" class="bottom">
            <a-input v-model:value="form.orderTel" placeholder="联系电话" />
          </a-form-item>

          <a-form-item label="工单状态：" class="bottom">
            <!-- <a-input v-model:value="form.orderStaus" placeholder="工单状态" /> -->
            <a-radio-group
              name="radioGroup"
              v-model:value="form.orderStaus"
              size="small"
            >
              <a-radio value="待派单">待派单</a-radio>
              <a-radio value="待接单">待接单</a-radio>
              <a-radio value="待施工">待施工</a-radio>
              <a-radio value="待回收">待回收</a-radio>
              <a-radio value="已回收">已回收</a-radio>
            </a-radio-group>
          </a-form-item>

          <a-form-item label="工单来源：" class="bottom">
            <a-input v-model:value="form.orderOrigin" defaultValue="展务通" />
          </a-form-item>

          <a-form-item label="备注：" class="bottom">
            <a-input v-model:value="form.orderRemark" placeholder="备注" />
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
          <a-button style="margin-right: 8px" @click="resetForm">重置</a-button>
          <a-button style="margin-right: 8px" @click="handleDrawerClose"
            >取消</a-button
          >
          <a-button type="primary" @click="handleAddSubmit(form)"
            >提交</a-button
          >
        </div>
      </a-drawer>
    </template>
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
              title="编辑工单"
              :width="600"
              :body-style="{ paddingBottom: '80px' }"
              :maskStyle="{
                opacity: '0.1',
                background: '#778899',
                animation: 'none',
              }"
              @ok="editDrawerVisible = false"
            >
              <a-form
                ref="formRef"
                :model="form"
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
                :rules="rules"
              >
                <a-form-item label="展会名称：" class="bottom">
                  {{ fairCopiedName }}
                </a-form-item>

                <a-form-item label="安装地点：" class="bottom">
                  <a-input v-model:value="editableData.orderLocation" />
                </a-form-item>
                <a-form-item label="服务项目：" class="bottom">
                  <!-- <a-input v-model:value="editableData.orderSvcItem" /> -->
                  <a-select
                    v-model:value="editableData.orderSvcItem"
                    ref="select"
                    @change="handleEditChangeService"
                  >
                    <a-select-option
                      v-for="item in serviceData"
                      :key="item['serviceName']"
                    >
                      {{ item["serviceName"] }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="单价：" class="bottom">
                  <a-input
                    addon-before="￥"
                    v-model:value="editableData.orderUnitPrice"
                    @change="changeEditUnitPrice"
                  />
                </a-form-item>

                <a-form-item label="数量：" class="bottom">
                  <a-input-number
                    v-model:value="editableData.orderNum"
                    :min="1"
                    :max="100"
                    @change="onEditChangeNum"
                  />
                </a-form-item>
                <a-form-item label="费用：" class="bottom">
                  <a-input
                    addon-before="￥"
                    v-model:value="editableData.orderCharge"
                  />
                </a-form-item>
                <a-form-item label="客户名称：" class="bottom">
                  <a-input v-model:value="editableData.orderCustom" />
                </a-form-item>
                <a-form-item label="联系人：" class="bottom">
                  <a-input v-model:value="editableData.orderContacts" />
                </a-form-item>
                <a-form-item label="联系电话：" class="bottom">
                  <a-input v-model:value="editableData.orderTel" />
                </a-form-item>

                <a-form-item label="工单状态：" class="bottom">
                  <a-radio-group
                    name="radioGroup"
                    v-model:value="editableData.orderStaus"
                    size="small"
                  >
                    <a-radio value="待派单">待派单</a-radio>
                    <a-radio value="待接单">待接单</a-radio>
                    <a-radio value="待施工">待施工</a-radio>
                    <a-radio value="待回收">待回收</a-radio>
                    <a-radio value="已回收">已回收</a-radio>
                  </a-radio-group>
                </a-form-item>

                <a-form-item label="工单来源：" class="bottom">
                  <a-input v-model:value="editableData.orderOrigin" />
                </a-form-item>

                <a-form-item label="备注：" class="bottom">
                  <a-input v-model:value="editableData.orderRemark" />
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

            <a-divider
              type="vertical"
              style="height: 10px; background-color: #7cb305"
            />
            <a-popconfirm
              title="确定要删除吗?"
              ok-text="是"
              cancel-text="否"
              @confirm="handleDel(record.id)"
            >
              <a
                ><a-tooltip title="删除" :color="'blue'"
                  ><DeleteTwoTone /></a-tooltip
              ></a>
            </a-popconfirm>
            <a-divider
              type="vertical"
              style="height: 10px; background-color: #7cb305"
            />
            <a href="#" @click.prevent="handleAssign(record)"
              ><a-tooltip title="派单" :color="'blue'"
                ><RightSquareTwoTone /></a-tooltip
            ></a>
            <a-drawer
              v-model:visible="assignDrawerVisible"
              title="指派工单"
              :width="600"
              :body-style="{ paddingBottom: '80px' }"
              :maskStyle="{
                opacity: '0.1',
                background: '#778899',
                animation: 'none',
              }"
              @ok="assignDrawerVisible = false"
            >
              <div :style="{ borderBottom: '1px solid #E9E9E9' }">
                <a-checkbox
                  v-model:checked="checkAll"
                  :indeterminate="indeterminate"
                  @change="onCheckAllChange"
                >
                  选中所有
                </a-checkbox>
              </div>
              <br />
              <a-checkbox-group
                v-model:value="checkedList"
                :options="plainOptions"
              />
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
                  @click="handleAssignDrawerClose()"
                  >取消</a-button
                >
                <a-button style="margin-right: 8px" @click="handlePutAssign()"
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
  UnwrapRef,
  reactive,
  toRefs,
  toRaw,
  watch,
  onMounted,
} from "vue";
import moment from "moment";
import { getFairList, getServiceList } from "../../network/fairApi";

import {
  getOrderList,
  postOrder,
  deleteOrder,
  putOrder,
} from "../../network/orderApi";
import { message, Select } from "ant-design-vue";
import {
  PlusOutlined,
  FileExcelOutlined,
  ReloadOutlined,
  EditTwoTone,
  DeleteTwoTone,
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

  {
    title: "操作",
    key: "operation",
    width: 100,
    slots: { customRender: "operation" },
  },
];

// interface DataItem {
//   fairName: string;
//   sponsorInfo: string;
//   prepareTime: Moment;
//   startTime: Moment;
//   endTime: Moment;
//   location: string;
// }

// const data: DataItem[] = [];

const innerColumns = [
  {
    title: "安装地点",
    dataIndex: "orderLocation",
    key: "orderLocation",
    ellipsis: true,
    sorter: (a, b) => a.orderLocation.localeCompare(b.orderLocation),
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
    title: "客户名称",
    dataIndex: "orderCustom",
    key: "orderCustom",
    width: 100,
    ellipsis: true,
    sorter: (a, b) => a.orderCustom.localeCompare(b.orderCustom),
  },
  {
    title: "联系人",
    dataIndex: "orderContacts",
    key: "orderContacts",
    width: 80,
  },
  { title: "联系电话", dataIndex: "orderTel", key: "orderTel", width: 100 },
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
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    width: 120,
    slots: { customRender: "operation" },
  },
];

// 新增展工单弹出框表单内容接口
interface FormOrder {
  fairId: number;
  orderLocation: string;
  orderSvcItem: string;
  orderUnitPrice: number;
  orderNum: number;
  orderCharge: number;
  orderUnitCommision: number;
  orderSubCommision: number;
  orderCustom: string;
  orderContacts: string;
  orderTel: string;
  orderStaus: string;
  orderOrigin: string;
  orderRemark: string;
}

export default defineComponent({
  name: "order",
  setup() {
    const searchValue = ref<string>("");

    // 定义弹出框举办地点变量
    const value2 = ref<string>("");

    // 展会复选框逻辑处理
    // const rowSelection = {
    //   onChange: (
    //     selectedRowKeys: (string | number)[],
    //     selectedRows: DataItem[]
    //   ) => {
    //     console.log(
    //       `selectedRowKeys: ${selectedRowKeys}`,
    //       "selectedRows: ",
    //       selectedRows
    //     );
    //   },
    //   onSelect: (
    //     record: DataItem,
    //     selected: boolean,
    //     selectedRows: DataItem[]
    //   ) => {
    //     console.log(record, selected, selectedRows);
    //   },
    //   onSelectAll: (
    //     selected: boolean,
    //     selectedRows: DataItem[],
    //     changeRows: DataItem[]
    //   ) => {
    //     console.log(selected, selectedRows, changeRows);
    //   },
    // };

    //工单对应展会列表数据
    // 页面挂载后读取展会列表
    const fairData = ref([]);
    onMounted(() => {
      getFairList()
        .then((res) => {
          // console.log(res);
          fairData.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    });

    const handleSearch = () => {
      if (toRaw(searchValue.value) == "") {
        message.warning("请输入查询条件！");
        return;
      }

      const params = {
        fairname: toRaw(searchValue.value),
        starttime: "",
        endtime: "",
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
            orderData.value = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        expandedRowKeys.value = []; //折叠当前行
      }
    };

    const reload = () => {
      searchValue.value = "";
      getFairList()
        .then((res) => {
          // console.log(res);
          fairData.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // 增加工单
    const drawerVisible = ref<boolean>(false);
    const fairCopiedName = ref<string>("");
    const fairCopiedId = ref<number>();
    const serviceData = reactive([]); //定义服务列表数据
    const handleAdd = (record: any) => {
      getServiceList()
        .then((res) => {
          //复制数据
          for (const k in res.data) {
            serviceData[k] = res.data[k];
          }
          // console.log(serviceData);
        })
        .catch((err) => {
          console.log(err);
        });
      drawerVisible.value = true;
      //复制展会名称和ID
      fairCopiedName.value = record.fairName;
      fairCopiedId.value = record.id;
      form.fairId = record.id;
    };

    const handleChangeService = (value: string) => {
      // console.log(toRaw(serviceData));
      for (let i = 0; i < serviceData.length; i++) {
        if (serviceData[i]["serviceName"] == value) {
          form.orderUnitPrice = serviceData[i]["price"];
          form.orderCharge = form.orderUnitPrice * form.orderNum;
          form.orderUnitCommision = serviceData[i]["commision"];
          form.orderSubCommision = form.orderUnitCommision * form.orderNum;
          break;
        }
      }
      // console.log(`selected ${value}`);
      // console.log(form.orderCharge);
    };

    const onChangeNum = () => {
      form.orderCharge = form.orderUnitPrice * form.orderNum;
      form.orderSubCommision = form.orderUnitCommision * form.orderNum;
    };

    //定义表单对象初始值
    const form: UnwrapRef<FormOrder> = reactive({
      fairId: 0,
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

    const handleAddSubmit = (form) => {
      postOrder(form).then((res) => {
        if (res.status == 200) {
          message.success("新增工单成功！");
          drawerVisible.value = false;
          // 取出当前是哪一行展开
          // console.log(expandedRowKeys.value[0]);
          // 刷新展开行工单数据
          const params = {
            fairId: expandedRowKeys.value[0],
          };
          getOrderList(params)
            .then((res) => {
              orderData.value = res.data;
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    };

    // 新增/修改 - 表单验证规则;
    const rules = {
      orderLocation: [
        { required: true, message: "请输入安装位置", trigger: "blur" },
        { min: 3, max: 256, message: "长度在3和256之间", trigger: "blur" },
      ],
    };

    const formRef = ref<any>(null);
    const resetForm = () => {
      // formRef.value.resetFields();
      form.orderLocation = "";
      form.orderSvcItem = "";
      form.orderNum = 1;
      form.orderCharge = 0;
      form.orderUnitCommision = 0;
      form.orderSubCommision = 0;
      form.orderCustom = "";
      form.orderContacts = "";
      form.orderTel = "";
      form.orderStaus = "待派单";
      form.orderOrigin = "展务通";
      form.orderRemark = "";
    };

    const handleDrawerClose = () => {
      drawerVisible.value = false;
    };

    // 修改工单
    const editDrawerVisible = ref<boolean>(false);
    // const editableData: UnwrapRef<Record<string, FormOrder>> = reactive({});
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
      getServiceList()
        .then((res) => {
          //复制数据
          for (const k in res.data) {
            serviceData[k] = res.data[k];
          }
          // console.log(serviceData);
        })
        .catch((err) => {
          console.log(err);
        });
      //复制数据用于编辑
      for (const k in record) {
        editableData[k] = record[k];
        // console.log(editableData);
      }
      // console.log(fairCopiedName.value);
    };

    const handleEditChangeService = (value: string) => {
      for (let i = 0; i < serviceData.length; i++) {
        if (serviceData[i]["serviceName"] == value) {
          editableData.orderUnitPrice = serviceData[i]["price"];
          editableData.orderCharge =
            editableData.orderUnitPrice * editableData.orderNum;
          editableData.orderUnitCommision = serviceData[i]["commision"];
          editableData.orderSubCommision =
            editableData.orderUnitCommision * editableData.orderNum;
          break;
        }
      }
    };

    const changeEditUnitPrice = () => {
      editableData.orderCharge =
        editableData.orderUnitPrice * editableData.orderNum;
    };

    const onEditChangeNum = () => {
      editableData.orderCharge =
        editableData.orderUnitPrice * editableData.orderNum;
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
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    };

    // 删除工单
    const handleDel = (e: MouseEvent) => {
      deleteOrder({ id: e }).then((res) => {
        if (res.status == 200) {
          message.success("删除成功！");
          // 刷新展开行工单数据
          const params = {
            fairId: expandedRowKeys.value[0],
          };
          getOrderList(params)
            .then((res) => {
              orderData.value = res.data;
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    };

    //派单
    const assignDrawerVisible = ref<boolean>(false);
    const plainOptions = ["林细彬", "曾烈春", "王建业"];

    const handleAssign = (e: MouseEvent) => {
      assignDrawerVisible.value = true;
      console.log(e);
    };

    const handlePutAssign = () => {
      console.log("assign");
    };

    const state = reactive({
      indeterminate: true,
      checkAll: false,
      checkedList: ["Apple", "Orange"],
    });

    const onCheckAllChange = (e: any) => {
      Object.assign(state, {
        checkedList: e.target.checked ? plainOptions : [],
        indeterminate: false,
      });
    };
    watch(
      () => state.checkedList,
      (val) => {
        state.indeterminate = !!val.length && val.length < plainOptions.length;
        state.checkAll = val.length === plainOptions.length;
      }
    );

    const handleAssignDrawerClose = () => {
      assignDrawerVisible.value = false;
    };

    // 设置导出excel表头
    var title = [
      "安装位置",
      "客户名称",
      "联系方式",
      "电话",
      "服务内容",
      "数量",
      "单价",
      "小计",
    ];

    const handleExpToExcel = (record) => {
      //判断当前行是否展开
      if (record.id != expandedRowKeys.value[0]) {
        message.info("请先点击+展开列表！");
      } else {
        // 筛选导出的数据

        let excelData = <any>[];

        for (let i = 0; i < orderData.value.length; i++) {
          excelData.push({
            orderLocation: orderData.value[i]["orderLocation"],
            orderCustom: orderData.value[i]["orderCustom"],
            orderContacts: orderData.value[i]["orderContacts"],
            orderTel: orderData.value[i]["orderTel"],
            orderSvcItem: orderData.value[i]["orderSvcItem"],
            orderNum: orderData.value[i]["orderNum"],
            orderUnitPrice: orderData.value[i]["orderUnitPrice"],
            orderCharge: orderData.value[i]["orderCharge"],
          });
        }

        // console.log(excelData);

        JSONToExcelConvertor(excelData, "导出工单", title, "");
        excelData.length = 0;
      }
    };

    function JSONToExcelConvertor(JSONData, FileName, title, filter) {
      if (!JSONData) return;
      //转化json为object
      var arrData =
        typeof JSONData != "object" ? JSON.parse(JSONData) : JSONData;

      var excel = "<table>";

      //设置表头
      var row = "<tr>";

      if (title) {
        //使用标题项
        for (var i in title) {
          row += "<th align='center'>" + title[i] + "</th>";
        }
      } else {
        //不使用标题项
        for (var i in arrData[0]) {
          row += "<th align='center'>" + i + "</th>";
        }
      }

      excel += row + "</tr>";

      //设置数据
      for (let i = 0; i < arrData.length; i++) {
        var row = "<tr>";

        for (var index in arrData[i]) {
          //判断是否有过滤行
          if (filter) {
            if (filter.indexOf(index) == -1) {
              var value = arrData[i][index] == null ? "" : arrData[i][index];
              row += "<td>" + value + "</td>";
            }
          } else {
            var value = arrData[i][index] == null ? "" : arrData[i][index];
            row += "<td align='center'>" + value + "</td>";
          }
        }

        excel += row + "</tr>";
      }

      excel += "</table>";

      var excelFile =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
      excelFile +=
        '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
      excelFile +=
        '<meta http-equiv="content-type" content="application/vnd.ms-excel';
      excelFile += '; charset=UTF-8">';
      excelFile += "<head>";
      excelFile += "<!--[if gte mso 9]>";
      excelFile += "<xml>";
      excelFile += "<x:ExcelWorkbook>";
      excelFile += "<x:ExcelWorksheets>";
      excelFile += "<x:ExcelWorksheet>";
      excelFile += "<x:Name>";
      excelFile += "{worksheet}";
      excelFile += "</x:Name>";
      excelFile += "<x:WorksheetOptions>";
      excelFile += "<x:DisplayGridlines/>";
      excelFile += "</x:WorksheetOptions>";
      excelFile += "</x:ExcelWorksheet>";
      excelFile += "</x:ExcelWorksheets>";
      excelFile += "</x:ExcelWorkbook>";
      excelFile += "</xml>";
      excelFile += "<![endif]-->";
      excelFile += "</head>";
      excelFile += "<body>";
      excelFile += excel;
      excelFile += "</body>";
      excelFile += "</html>";

      var uri =
        "data:application/vnd.ms-excel;charset=utf-8," +
        encodeURIComponent(excelFile);

      var link = document.createElement("a");
      link.href = uri;

      // link.style = "visibility:hidden";
      link.download = FileName + ".xls";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    return {
      reload,
      // rowSelection,
      fairData,
      columns,
      innerColumns,
      orderData,
      onExpand,
      expandedRowKeys,

      drawerVisible,
      form,
      formRef,
      rules,
      fairCopiedName,
      resetForm,
      handleAddSubmit,
      handleDrawerClose,
      //新增工单form样式
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      serviceData,
      handleChangeService,
      onChangeNum,
      handleEditChangeService,
      changeEditUnitPrice,
      onEditChangeNum,

      editDrawerVisible,
      editableData,
      handleEditDrawerClose,
      handlePutOrder,
      fairCopiedId,
      handleExpToExcel,

      handleAssign,
      assignDrawerVisible,
      handleAssignDrawerClose,
      ...toRefs(state),
      plainOptions,
      onCheckAllChange,

      searchValue,
      handleSearch,

      value2,
      handlePutAssign,

      handleAdd,
      handleEdit,
      handleDel,
    };
  },
  components: {
    PlusOutlined,
    FileExcelOutlined,
    ReloadOutlined,
    EditTwoTone,
    DeleteTwoTone,
    RightSquareTwoTone,
    message,
    [Select.name]: Select,
    ASelectOption: Select.Option,
  },
});
</script>
<style scoped>
.bottom {
  margin-bottom: 5px;
}
</style>
