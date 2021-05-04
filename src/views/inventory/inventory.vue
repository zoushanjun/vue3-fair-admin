<template>
  <div>
    <!-- 点击新增按钮，弹出新增资产表单 -->
    <a-button shape="round" @click="addDrawerVisible = true"
      ><template #icon><PlusOutlined /></template>新增</a-button
    >

    <a-drawer
      v-model:visible="addDrawerVisible"
      title="新增资产"
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
              <a-input v-model:value="form.model" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              :labelCol="{ span: 7 }"
              :wrapper-col="{ span: 15 }"
              label="类别："
              name="category"
            >
              <a-input v-model:value="form.category" />
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
              label="用途："
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
                v-model:value="value1"
                style="width: 120px"
                @focus="focus"
                ref="select"
                @change="handleChange"
              >
                <a-select-option value="jack">Jack</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
                <a-select-option value="disabled" disabled
                  >Disabled</a-select-option
                >
                <a-select-option value="Yiminghe">yiminghe</a-select-option>
              </a-select>

              <!-- <Select
                v-model:value="form.devStatus"
                placeholder="请选择设备状态"
              >
                <Select.Option value="库存">库存</Select.Option>
                <Select.Option value="在线">在线</Select.Option>
                <Select.Option value="离线">离线</Select.Option>
                <Select.Option value="维修">维修</Select.Option>
                <Select.Option value="报废">报废</Select.Option>
                <Select.Option value="外借">外接</Select.Option>
                <Select.Option value="其它">其它</Select.Option>
              </Select> -->
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
          <a-button type="primary" @click="handleDrawerClose">提交</a-button>
        </div>
      </a-form>
    </a-drawer>

    <!-- 资产管理页面导出EXCEL功能 -->
    <a-button shape="round" style="margin-left: 10px"
      ><template #icon><FileExcelOutlined /></template>导出</a-button
    >
    <!-- 资产管理页面搜索功能 -->
    <a-input-search
      v-model:value="value"
      placeholder="请输入查询内容"
      style="width: 200px; margin-left: 200px"
      @search="onSearch"
    />
    <a-button shape="round" style="margin-left: 10px"
      ><template #icon><ReloadOutlined /></template>重置</a-button
    >
  </div>
  <a-divider />

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
        <a-tooltip title="查看" :color="'blue'">
          <UpCircleTwoTone />
        </a-tooltip>
        <a-divider
          type="vertical"
          style="height: 10px; background-color: #7cb305"
        />

        <a>
          <a-tooltip title="编辑" :color="'blue'"><EditTwoTone /></a-tooltip
        ></a>
        <a-divider
          type="vertical"
          style="height: 10px; background-color: #7cb305"
        />

        <a-popconfirm
          title="确定要删除吗?"
          ok-text="是"
          cancel-text="否"
          @confirm="handelDel(record.id)"
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
<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  toRaw,
  UnwrapRef,
  onMounted,
} from "vue";
import { message } from "ant-design-vue";

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
import { getInvtList, delInventory } from "../../network/inventoryApi";

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
    title: "序列号/MAC",
    name: "SN_MAC",
    dataIndex: "SN_MAC",
    key: "SN_MAC",
    width: 150,
    ellipsis: true,
  },
  {
    title: "型号",
    name: "model",
    dataIndex: "model",
    key: "model",
    width: 100,
    ellipsis: true,
  },
  {
    title: "类别",
    name: "category",
    dataIndex: "category",
    key: "category",
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
    title: "安装区域",
    name: "area",
    dataIndex: "area",
    key: "area",
    width: 80,
  },
  {
    title: "用途",
    name: "devUsage",
    dataIndex: "devUseage",
    key: "devUseage",
    width: 50,
  },
  {
    title: "登录账号",
    name: "devAcct",
    dataIndex: "devAcct",
    key: "devAcct",
    width: 80,
  },
  {
    title: "登录密码",
    name: "devPwd",
    dataIndex: "devPwd",
    key: "devPwd",
    width: 80,
  },
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
    width: 150,
    slots: { customRender: "operation" },
  },
];

export default defineComponent({
  name: "inventory",
  setup() {
    // 定义InvetListData资产列表,InvetCategoryListData资产类别数据为响应式数组
    // ref包裹的数据需要通过.value来获值
    const ListData = ref([]);

    // 页面挂载后读取资产列表数据
    onMounted(() => {
      getInvtList()
        .then((res) => {
          // console.log(res);
          ListData.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    });

    const value = ref<string>("");

    // 资产管理页面相关处理
    // 定义资产管理“新增”按钮弹出对话框初始状态
    const addDrawerVisible = ref<boolean>(false);

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
    //新增资产表单校验规则
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
      devStatus: [
        { required: true, message: "请输入有效的字符", trigger: "blur" },
        { min: 2, max: 30, message: "字符长度在2和30之间", trigger: "blur" },
      ],
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

    const onSearch = (searchValue: string) => {
      console.log("use value", searchValue);
      console.log("or use this.value", value.value);
    };

    //删除资产,以json格式进行传递
    const handelDel = (e: MouseEvent) => {
      delInventory({ id: e }).then((res) => {
        if (res.status == 200) {
          message.success("删除成功！");
          // 刷新当前页面
          getInvtList()
            .then((res) => {
              ListData.value = res.data;
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    };

    const focus = () => {
      console.log("focus");
    };

    const handleChange = (value: string) => {
      console.log(`selected ${value}`);
    };

    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },

      Columns,
      formRef,
      addDrawerVisible,
      rules,
      form,
      handleDrawerClose,
      resetForm,
      handelDel,

      onSubmit,
      value,
      onSearch,

      ListData,

      focus,
      handleChange,
      value1: ref("lucy"),
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
  },
});
</script>
<style lang="less">
</style>
