<template>
  <div>
    <!-- <a-divider /> -->
    <!-- 点击新增按钮，弹出新增库存表单 -->
    <a-button shape="round" @click="addInvent"
      ><template #icon><PlusOutlined /></template>新增</a-button
    >

    <a-drawer
      v-model:visible="addDrawerVisible"
      title="新增库存"
      :width="720"
      :body-style="{ paddingBottom: '80px' }"
      @ok="addDrawerVisible = false"
    >
      <a-form
        ref="formRef"
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :rules="rules"
      >
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              :labelCol="{ span: 7 }"
              :wrapper-col="{ span: 15 }"
              label="设备名："
              ref="deviceName"
              name="deviceName"
            >
              <a-input v-model:value="form.deviceName" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="{ span: 7 }"
              :wrapper-col="{ span: 15 }"
              label="IP地址："
              ref="ipAddr"
              name="ipAddr"
            >
              <a-input v-model:value="form.ipAddr" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              :labelCol="{ span: 7 }"
              :wrapper-col="{ span: 15 }"
              label="序列号/MAC："
              ref="SN_MAC"
              name="SN_MAC"
            >
              <a-input v-model:value="form.SN_MAC" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="{ span: 7 }"
              :wrapper-col="{ span: 15 }"
              label="型号："
              name="model"
            >
              <a-select
                v-model:value="form.model"
                ref="select1"
                @change="handleChangeModel"
              >
                <a-select-option v-for="item in modelData" :key="item">{{
                  item
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              :labelCol="{ span: 7 }"
              :wrapper-col="{ span: 15 }"
              label="平台："
              name="platform"
            >
              <a-input v-model:value="form.platform" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="{ span: 7 }"
              :wrapper-col="{ span: 15 }"
              label="安装位置："
              name="location"
            >
              <a-input v-model:value="form.location" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              :labelCol="{ span: 7 }"
              :wrapper-col="{ span: 15 }"
              label="安装区域："
              name="area"
            >
              <a-input v-model:value="form.area" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="{ span: 7 }"
              :wrapper-col="{ span: 15 }"
              label="用途/分组："
              name="devUsage"
            >
              <a-input v-model:value="form.devUsage" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              :labelCol="{ span: 7 }"
              :wrapper-col="{ span: 15 }"
              label="登录账号："
              name="devAcct"
            >
              <a-input v-model:value="form.devAcct" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="{ span: 7 }"
              :wrapper-col="{ span: 15 }"
              label="登录密码："
              name="devPwd"
            >
              <a-input v-model:value="form.devPwd" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              :labelCol="{ span: 7 }"
              :wrapper-col="{ span: 15 }"
              label="状态："
              name="devStatus"
            >
              <a-select
                v-model:value="form.devStatus"
                ref="select"
                @change="handleChange"
              >
                <a-select-option value="在线">在线</a-select-option>
                <a-select-option value="离线">离线</a-select-option>
                <a-select-option value="库存">库存</a-select-option>
                <a-select-option value="项目">项目</a-select-option> >
                <a-select-option value="维修">维修</a-select-option>
                <a-select-option value="报废">报废</a-select-option>
                <a-select-option value="外借">外借</a-select-option>
                <a-select-option value="其它">其它</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="{ span: 7 }"
              :wrapper-col="{ span: 15 }"
              label="备注："
              name="devRemark"
            >
              <a-textarea v-model:value="form.devRemark" :rows="4" />
            </a-form-item>
          </a-col>
        </a-row>

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
          <a-button type="primary" @click="handleSubmit(form)">提交</a-button>
        </div>
      </a-form>
    </a-drawer>

    <!-- 库存管理页面导出EXCEL功能 -->
    <!-- <a-button shape="round" style="margin-left: 10px"
      ><template #icon><FileExcelOutlined /></template>导出</a-button
    > -->
    <!-- 库存管理页面搜索功能 -->
    <!-- <a-input-search
      v-model:value="searchValue"
      placeholder="请输入查询内容"
      style="width: 200px; margin-left: 200px"
      @search="onSearch"
    />
    <a-button shape="round" style="margin-left: 10px" @click="searchReset"
      ><template #icon><ReloadOutlined /></template>重置</a-button
    > -->
  </div>
  <a-divider />

  <!-- 库存管理父表格 -->
  <a-table
    :columns="Columns"
    :data-source="fatherData"
    :pagination="{ pageSize: 50 }"
    :rowKey="(record) => record.model"
    :expandedRowKeys="expandedRowKeys"
    @expand="onExpand"
    size="small"
    bordered
  >
    <!-- 库存管理子表格 -->
    <template #expandedRowRender>
      <a-table
        :columns="innerColumns"
        :data-source="stockData"
        :pagination="false"
        :rowKey="(record) => record.SN_MAC"
        size="small"
      >
        <template #operation="{ record }">
          <span class="table-operation">
            <a href="#" @click.prevent="handleEdit(record)">
              <a-tooltip title="编辑" :color="'blue'"><EditTwoTone /></a-tooltip
            ></a>
            <a-drawer
              v-model:visible="editDrawerVisible"
              title="编辑库存"
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
              <a-form
                :model="form"
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
              >
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
                      label="序列号/MAC："
                    >
                      <a-input v-model:value="editableData.SN_MAC" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      :labelCol="{ span: 7 }"
                      :wrapper-col="{ span: 15 }"
                      label="型号："
                    >
                      <a-input v-model:value="editableData.model" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row :gutter="16">
                  <a-col :span="12">
                    <a-form-item
                      :labelCol="{ span: 7 }"
                      :wrapper-col="{ span: 15 }"
                      label="类别："
                    >
                      <a-select
                        v-model:value="editableData.category"
                        ref="select1"
                        @change="handleChangeModel"
                      >
                        <a-select-option
                          v-for="item in modelData"
                          :key="item"
                          >{{ item }}</a-select-option
                        >
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      :labelCol="{ span: 7 }"
                      :wrapper-col="{ span: 15 }"
                      label="安装位置："
                    >
                      <a-input v-model:value="editableData.location" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row :gutter="16">
                  <a-col :span="12">
                    <a-form-item
                      :labelCol="{ span: 7 }"
                      :wrapper-col="{ span: 15 }"
                      label="安装区域："
                    >
                      <a-input v-model:value="editableData.area" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      :labelCol="{ span: 7 }"
                      :wrapper-col="{ span: 15 }"
                      label="用途/分组："
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
                        <a-select-option value="项目"> 项目</a-select-option> >
                        <a-select-option value="维修">维修</a-select-option>
                        <a-select-option value="报废">报废</a-select-option>
                        <a-select-option value="外借">外借</a-select-option>
                        <a-select-option value="其它">其它</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      :labelCol="{ span: 7 }"
                      :wrapper-col="{ span: 15 }"
                      label="备注："
                    >
                      <a-textarea
                        v-model:value="editableData.devRemark"
                        :rows="4"
                      />
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
                <a-button
                  style="margin-right: 8px"
                  @click="handleEditDrawerClose()"
                  >取消</a-button
                >
                <a-button
                  style="margin-right: 8px"
                  @click="handlePutInvt(editableData)"
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
              @confirm="handelDel(record.id, record.model, record.SN_MAC)"
            >
              <a
                ><a-tooltip title="删除" :color="'blue'"
                  ><DeleteTwoTone /></a-tooltip
              ></a>
            </a-popconfirm>
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
  reactive,
  toRaw,
  UnwrapRef,
  onMounted,
} from "vue";
import { message, Select } from "ant-design-vue";

import {
  PlusOutlined,
  FileExcelOutlined,
  ReloadOutlined,
  CheckOutlined,
  EditOutlined,
  CloseOutlined,
  UpCircleTwoTone,
  EditTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons-vue";
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";

// 引入与flask后端交互的http api方法
import {
  getInvtList,
  delInventory,
  postInvt,
  putInvt,
  getInvtModelList,
  postInvtJournal,
} from "../../network/inventoryApi";

// 新增库存弹出框表单内容接口
interface FormInventory {
  deviceName: string;
  SN_MAC: string;
  ipAddr: string;
  model: string;
  platform: string;
  location: string;
  area: string;
  devUsage: string;
  devAcct: string;
  devPwd: string;
  devStatus: string;
  devRemark: string;
}

// 定义库存管理父表头
const Columns = [
  {
    name: "model", //对应API返回的字段
    title: "型号",
    dataIndex: "model",
    key: "model",
    ellipsis: true,
  },

  {
    name: "kucun",
    title: "库存",
    dataIndex: "kucun",
    key: "kucun",
    width: 80,
    ellipsis: true,
  },
  {
    name: "xiangmu",
    title: "项目",
    dataIndex: "xiangmu",
    key: "xiangmu",
    width: 80,
    ellipsis: true,
  },
  {
    name: "weixiu",
    title: "维修",
    dataIndex: "weixiu",
    key: "weixiu",
    width: 80,
    ellipsis: true,
  },
  {
    name: "baofei",
    title: "报废",
    dataIndex: "baofei",
    key: "baofei",
    width: 80,
    ellipsis: true,
  },
  {
    name: "waijie",
    title: "外借",
    dataIndex: "waijie",
    key: "waijie",
    width: 80,
    ellipsis: true,
  },
  {
    name: "qita",
    title: "其它",
    dataIndex: "qita",
    key: "qita",
    width: 80,
    ellipsis: true,
  },
  {
    name: "zongshu",
    title: "总数",
    dataIndex: "zongshu",
    key: "zongshu",
    width: 80,
    ellipsis: true,
  },
];
const innerColumns = [
  {
    title: "型号", //对应API返回的InvetListData中的字段
    name: "model",
    dataIndex: "model",
    key: "model",
    width: 200,
    ellipsis: true,
  },
  {
    title: "序列号/MAC",
    name: "SN_MAC",
    dataIndex: "SN_MAC",
    key: "SN_MAC",
    width: 200,
    ellipsis: true,
  },
  {
    name: "deviceName",
    title: "设备名",
    dataIndex: "deviceName",
    key: "deviceName",
    width: 130,
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
    title: "状态",
    name: "devStatus",
    dataIndex: "devStatus",
    key: "devStatus",
    width: 60,
  },
  {
    title: "备注",
    name: "devRemark",
    dataIndex: "devRemark",
    key: "devRemark",
    ellipsis: true,
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    width: 100,
    slots: { customRender: "operation" },
  },
];

export default defineComponent({
  name: "stock",
  setup() {
    // ref包裹的数据需要通过.value来获值
    const ListData = ref([]);
    const modelData = reactive([]);

    //计算父表格数据函数
    const fatherData = reactive([]) as any; //定义as any，否则无法push对象进来
    const calFatherData = (modelData, rawListData) => {
      fatherData.length = 0; //先清空数组
      for (let i = 0; i < modelData.length; i++) {
        let model_var = modelData[i];
        let kucun_var = rawListData.filter(
          (item) => item.model == model_var && item.devStatus == "库存"
        ).length;
        let xiangmu_var = rawListData.filter(
          (item) => item.model == model_var && item.devStatus == "项目"
        ).length;
        let weixiu_var = rawListData.filter(
          (item) => item.model == model_var && item.devStatus == "维修"
        ).length;
        let baofei_var = rawListData.filter(
          (item) => item.model == model_var && item.devStatus == "报废"
        ).length;
        let waijie_var = rawListData.filter(
          (item) => item.model == model_var && item.devStatus == "外借"
        ).length;
        let qita_var = rawListData.filter(
          (item) => item.model == model_var && item.devStatus == "其它"
        ).length;
        let zongshu_var = rawListData.filter(
          (item) =>
            item.model == model_var &&
            item.devStatus != "在线" &&
            item.devStatus != "离线"
        ).length;
        let obj = {
          model: model_var,
          kucun: kucun_var,
          xiangmu: xiangmu_var,
          weixiu: weixiu_var,
          baofei: baofei_var,
          waijie: waijie_var,
          qita: qita_var,
          zongshu: zongshu_var,
        };
        fatherData.push(obj);
      }
    };

    // 页面挂载后读取库存型号和库存列表数据
    onMounted(() => {
      // 获取型号数据
      getInvtModelList()
        .then((res) => {
          //复制数据
          for (const k in res.data) {
            modelData[k] = res.data[k].model;
          }
        })
        .catch((err) => {
          console.log(err);
        });

      // 获取库存/型号列表数据
      const params = { search: "" };
      getInvtList(params)
        .then((res) => {
          ListData.value = res.data;
          const rawListData = res.data;
          // 设置父表格数组对象
          calFatherData(modelData, rawListData);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    //点击展开“+”符号
    const stockData = ref([]) as any;
    const expandedRowKeys = ref([Number]);
    const onExpand = (expended: boolean, record) => {
      if (expended) {
        expandedRowKeys.value = []; //重置展开节点
        stockData.value.length = 0; //先清空数据，否则会先显示上一次的数据再刷新为本次的数据
        expandedRowKeys.value.push(record.model);
        // console.log("展开ID列表" + expandedRowKeys.value);
        let modelName = record.model; //获取展开行的库存型号
        let rawData = toRaw(ListData.value);
        //库存中排除在线和离线的设备
        stockData.value = rawData.filter(
          (item) =>
            item["model"] == modelName &&
            item["devStatus"] != "在线" &&
            item["devStatus"] != "离线"
        );
      } else {
        expandedRowKeys.value = []; //折叠当前行
      }
    };

    const searchValue = ref<string>("");

    // 库存管理页面相关处理
    // 定义库存管理“新增”按钮弹出对话框初始状态
    const addDrawerVisible = ref<boolean>(false);

    const form: UnwrapRef<FormInventory> = reactive({
      deviceName: "",
      SN_MAC: "",
      ipAddr: "",
      model: "",
      platform: "",
      location: "",
      area: "",
      devUsage: "",
      devAcct: "",
      devPwd: "",
      devStatus: "",
      devRemark: "",
    });

    //ref需要加类型验证，不然在获取formRef.value时会有类型的错误提示
    const formRef = ref<any>(null);
    //新增库存表单校验规则
    const rules = {
      deviceName: [
        { required: false, message: "请输入有效的字符", trigger: "blur" },
        { min: 2, max: 20, message: "字符长度在2和20之间", trigger: "blur" },
      ],
      SN_MAC: [
        { required: true, message: "请输入有效的字符", trigger: "blur" },
        { min: 2, max: 30, message: "字符长度在2和30之间", trigger: "blur" },
      ],
      model: [
        { required: true, message: "请输入设备型号", trigger: "blur" },
        { min: 2, max: 30, message: "字符长度在2和30之间", trigger: "blur" },
      ],
      category: [
        { required: false, message: "请输入有效的字符", trigger: "blur" },
        { max: 30, message: "字符长度最大为30", trigger: "blur" },
      ],
      // devStatus: [
      //   { required: true, message: "请输入有效的字符", trigger: "blur" },
      //   { min: 2, max: 30, message: "字符长度在2和30之间", trigger: "blur" },
      // ],
    };

    const addInvent = () => {
      addDrawerVisible.value = true;
      getInvtModelList()
        .then((res) => {
          //复制数据
          for (const k in res.data) {
            modelData[k] = res.data[k].model;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const handleDrawerClose = () => {
      addDrawerVisible.value = false;
    };

    const resetForm = () => {
      formRef.value.resetFields();
    };

    const onSubmit = () => {
      console.log("submit!", toRaw(form));
    };

    const handleSubmit = (form) => {
      formRef.value
        .validate()
        .then(() => {
          postInvt(form).then((res) => {
            if (res.status == 200) {
              message.success("新增库存成功！");
              addDrawerVisible.value = false;
              const data = {
                msg:
                  sessionStorage.getItem("Login-user") +
                  "在库存管理中增加了库存:" +
                  form.model +
                  "，SN/MAC：" +
                  form.SN_MAC +
                  "，状态为:" +
                  form.devStatus,
              };
              postInvtJournal(data); //写入日志

              // 刷新当前页面
              const params = { search: "" };
              getInvtList(params)
                .then((res) => {
                  // console.log(res);
                  ListData.value = res.data;
                  const rawListData = res.data;
                  // 设置父表格数组对象
                  calFatherData(modelData, rawListData);
                  //刷新展开行数据
                  if (expandedRowKeys.value[0]) {
                    stockData.value.length = 0;

                    stockData.value = rawListData.filter(
                      (item) =>
                        item.model == expandedRowKeys.value[0] &&
                        item.devStatus != "离线" &&
                        item.devStatus != "在线"
                    );
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          });
        })
        .catch((error: ValidateErrorEntity<FormInventory>) => {
          console.log("error", error);
        });
    };

    const onSearch = (searchValue: string) => {
      const params = {
        search: searchValue,
      };
      getInvtList(params)
        .then((res) => {
          // console.log(res);
          ListData.value = res.data;
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
          // console.log(res);
          ListData.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // 修改库存
    const editDrawerVisible = ref<boolean>(false);
    const editableData: UnwrapRef<Record<string, FormInventory>> = reactive({});
    const handleEdit = (record: any) => {
      //获取型号
      getInvtModelList()
        .then((res) => {
          //复制数据
          for (const k in res.data) {
            modelData[k] = res.data[k].model;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      editDrawerVisible.value = true;
      //复制数据用于编辑
      for (const k in record) {
        editableData[k] = record[k];
      }
      // console.log(editableData);
    };

    const handlePutInvt = (Data: object) => {
      putInvt(Data).then((res) => {
        if (res.status == 200) {
          message.success("更新成功！");
          editDrawerVisible.value = false;
          const data = {
            msg:
              sessionStorage.getItem("Login-user") +
              "更新了库存:" +
              Data["model"] +
              "，SN/MAC：" +
              Data["SN_MAC"] +
              "，最新状态：" +
              Data["devStatus"],
          };
          postInvtJournal(data); //写入日志
          // 刷新当前页面
          const params = { search: "" };
          getInvtList(params)
            .then((res) => {
              // console.log(res);
              ListData.value = res.data;
              const rawListData = res.data;
              // 设置父表格数组对象
              calFatherData(modelData, rawListData);
              //刷新展开行数据
              if (expandedRowKeys.value[0]) {
                stockData.value.length = 0;
                stockData.value = rawListData.filter(
                  (item) =>
                    item.model == expandedRowKeys.value[0] &&
                    item.devStaus != "离线" &&
                    item.devStaus != "在线"
                );
              }
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

    //删除库存,以json格式进行传递
    const handelDel = (e: MouseEvent, model, SN_MAC) => {
      delInventory({ id: e }).then((res) => {
        if (res.status == 200) {
          message.success("删除成功！");
          const data = {
            msg:
              sessionStorage.getItem("Login-user") +
              "删除了库存，型号为：" +
              model +
              "，SN/MAC：" +
              SN_MAC,
          };
          postInvtJournal(data); //写入日志
          // 刷新当前页面
          const params = { search: "" };
          getInvtList(params)
            .then((res) => {
              ListData.value = res.data;
              const rawListData = res.data;
              // 设置父表格数组对象
              calFatherData(modelData, rawListData);
              //刷新展开行数据
              if (expandedRowKeys.value[0]) {
                stockData.value.length = 0;
                stockData.value = rawListData.filter(
                  (item) =>
                    item.model == expandedRowKeys.value[0] &&
                    item.devStaus != "离线" &&
                    item.devStaus != "在线"
                );
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    };

    const handleChange = (value: string) => {
      console.log(`selected ${value}`);
    };

    const handleChangeModel = (value: string) => {
      console.log(`selected ${value}`);
    };

    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },

      // export2Excel,

      Columns,
      innerColumns,
      formRef,
      addDrawerVisible,
      rules,
      form,
      handleDrawerClose,
      resetForm,
      handelDel,
      addInvent,
      modelData,
      handleSubmit,

      onExpand,
      expandedRowKeys,

      onSubmit,
      searchValue,
      onSearch,
      searchReset,

      ListData,
      fatherData,
      stockData,

      handleEdit,
      editDrawerVisible,
      editableData,
      handleEditDrawerClose,
      handlePutInvt,

      handleChange,
      handleChangeModel,
      devStatus: ref("库存"),
    };
  },
  components: {
    PlusOutlined,
    FileExcelOutlined,
    ReloadOutlined,
    CheckOutlined,
    EditOutlined,
    CloseOutlined,
    UpCircleTwoTone,
    EditTwoTone,
    DeleteTwoTone,
    [Select.name]: Select,
    ASelectOption: Select.Option,
  },
});
</script>
<style lang="less">
</style>
