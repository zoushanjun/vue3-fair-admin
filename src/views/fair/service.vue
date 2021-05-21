<template>
  <!-- 2/服务管理选项卡内容 -->
  <div>
    <!-- 服务搜索 -->
    <a-input-search
      v-model:value="searchValue"
      placeholder="请输入服务名称"
      style="width: 200px"
      @search="handleSearch"
    />
    <a-button
      shape="round"
      style="margin-left: 10px"
      @click="handleResetSearch()"
      ><template #icon><ReloadOutlined /></template>重置</a-button
    >
    <a-button
      shape="round"
      style="margin-left: 10px"
      @click="drawerVisible = true"
      ><template #icon><PlusOutlined /></template>新增</a-button
    >
    <!-- 点击新增按钮，弹出新增服务表单 -->
    <a-drawer
      v-model:visible="drawerVisible"
      title="新增服务"
      :width="600"
      :body-style="{ paddingBottom: '80px' }"
      @ok="drawerVisible = false"
    >
      <!-- model:表单数据对象; label-col标签布局-->
      <a-form
        ref="formRef"
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :rules="rules"
      >
        <a-form-item label="服务名称：" ref="serviceName" name="serviceName">
          <a-input v-model:value="form.serviceName" />
        </a-form-item>
        <a-form-item label="服务价格：" name="price">
          <a-input v-model:value="form.price" />
        </a-form-item>
        <a-form-item label="服务描述：" name="description">
          <a-textarea
            v-model:value="form.description"
            placeholder=""
            :auto-size="{ minRows: 2, maxRows: 2 }"
          />
        </a-form-item>
        <a-form-item label="团队佣金：" name="commision">
          <a-input v-model:value="form.commision" />
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
        <a-button type="primary" @click="handleAddSubmit(form)">提交</a-button>
      </div>
    </a-drawer>
  </div>
  <!-- 分割线 -->
  <a-divider />
  <!-- 服务列表 -->
  <a-table
    :columns="Columns"
    :data-source="listData"
    :pagination="{ pageSize: 50 }"
    :scroll="{ y: 240 }"
    :rowKey="(record) => record.id"
    size="middle"
    bordered
  >
    <template #operation="{ record }">
      <span class="table-operation">
        <a href="#" @click.prevent="handleEdit(record)">
          <a-tooltip title="编辑" :color="'blue'">
            <EditTwoTone />
          </a-tooltip>
        </a>

        <a-drawer
          v-model:visible="editDrawerVisible"
          title="修改服务"
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
            <a-form-item label="服务名称：">
              <a-input v-model:value="editableData.serviceName" />
            </a-form-item>
            <a-form-item label="服务描述：">
              <a-input v-model:value="editableData.description" />
            </a-form-item>
            <a-form-item label="服务价格：">
              <a-input v-model:value="editableData.price" />
            </a-form-item>
            <a-form-item label="团队佣金：">
              <a-input v-model:value="editableData.commision" />
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
            <a-button style="margin-right: 8px" @click="handleEditDrawerClose()"
              >取消</a-button
            >
            <a-button style="margin-right: 8px" @click="handlePut(editableData)"
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
          @confirm="handelDel(record.id)"
        >
          <a>
            <a-tooltip title="删除" :color="'blue'"><DeleteTwoTone /></a-tooltip
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
import {
  SearchOutlined,
  PlusOutlined,
  ReloadOutlined,
  EditTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons-vue";
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
// //引入时间配合日期选择器使用
// import moment, { Moment } from "moment";
// 引入输入框、对话框、表格、表单等,Modal为弹出对话框
import { DatePicker, message } from "ant-design-vue";

// 引入与flask后端交互的http api方法
import {
  getServiceList,
  postService,
  deleteService,
  putService,
} from "../../network/fairApi";

//  定位服务各字段含义
const Columns = [
  {
    title: "服务名称",
    dataIndex: "serviceName",
    key: "serviceName",
    width: 200,
    ellipsis: true,
  },
  {
    title: "服务价格",
    dataIndex: "price",
    key: "price",
    width: 200,
  },
  {
    title: "服务描述",
    dataIndex: "description",
    key: "description",
    width: 300,
    ellipsis: true,
  },

  {
    title: "团队佣金",
    dataIndex: "commision",
    key: "commision",
    width: 200,
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    slots: { customRender: "operation" },
  },
];

// 新增服务弹出框表单内容接口
interface FormService {
  serviceName: string;
  price: string;
  description: string;
  commision: string;
}

// 将rangepicker定位为DatePicker类型
const { RangePicker } = DatePicker;

export default defineComponent({
  name: "service",
  setup() {
    // 定义InvetListData资产列表,InvetCategoryListData资产类别数据为响应式数组
    // ref包裹的数据需要通过.value来获值

    const listData = ref([]);

    // 页面挂载后读取服务列表数据
    onMounted(() => {
      getServiceList()
        .then((res) => {
          listData.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    });
    // const value = ref<string>("");

    //定义服务表单对象初始值
    const form: UnwrapRef<FormService> = reactive({
      serviceName: "",
      price: "",
      description: "",
      commision: "",
    });

    // 服务选项卡-逻辑处理

    const searchValue = ref<string>("");

    // 服务首页查询逻辑处理
    const handleSearch = () => {
      if (toRaw(searchValue.value) == "") {
        message.warning("请输入查询条件！");
        return;
      }
      const params = {
        servicename: toRaw(searchValue.value),
      };

      getServiceList(params)
        .then((res) => {
          listData.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
      // message.success('查询成功！');
    };

    //服务首页重置按钮逻辑处理
    const handleResetSearch = () => {
      searchValue.value = "";
      const params = {};
      getServiceList(params)
        .then((res) => {
          listData.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const formRef = ref<any>(null);
    //新增服务抽屉重置按钮逻辑处理
    const resetForm = () => {
      formRef.value.resetFields();
    };
    // 新增服务抽屉取消按钮逻辑处理
    const drawerVisible = ref<boolean>(false);
    const handleDrawerClose = () => {
      drawerVisible.value = false;
    };

    //  新增服务抽屉提交按钮逻辑处理
    const handleAddSubmit = (form) => {
      formRef.value
        .validate()
        .then(() => {
          postService(form).then((res) => {
            if (res.status == 200) {
              message.success("新增服务成功！");
              drawerVisible.value = false;
              // 刷新当前页面
              const params = {};
              getServiceList(params)
                .then((res) => {
                  listData.value = res.data;
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          });
          // console.log('values', formFair, toRaw(formFair));
        })
        .catch((error: ValidateErrorEntity<FormService>) => {
          console.log("error", error);
        });
    };

    // 新增服务 - 表单验证规则;
    const rules = {
      serviceName: [
        { required: true, message: "请输入服务名称", trigger: "blur" },
        { min: 2, max: 32, message: "长度在2和32之间", trigger: "blur" },
      ],
      price: [
        { required: true, message: "请输入价格，可以为0", trigger: "blur" },
      ],
      commision: [
        { required: true, message: "请输入价格，可以为0", trigger: "blur" },
      ],
    };

    //删除服务,以json格式进行传递
    const handelDel = (e: MouseEvent) => {
      deleteService({ id: e }).then((res) => {
        if (res.status == 200) {
          message.success("删除成功！");
          // 刷新当前页面
          const params = {};
          getServiceList(params)
            .then((res) => {
              listData.value = res.data;
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    };

    // 修改服务-逻辑处理部分
    const editDrawerVisible = ref<boolean>(false);
    const editableData: UnwrapRef<Record<string, FormService>> = reactive({});
    const handleEdit = (record: any) => {
      editDrawerVisible.value = true;
      //复制数据用于编辑
      for (const k in record) {
        editableData[k] = record[k];
      }
    };
    //修改服务取消按钮逻辑处理
    const handleEditDrawerClose = () => {
      editDrawerVisible.value = false;
    };
    // 修改服务抽屉提交按钮逻辑处理
    const handlePut = (Data: object) => {
      putService(Data).then((res) => {
        if (res.status == 200) {
          message.success("更新成功！");
          editDrawerVisible.value = false;
          // 刷新当前页面
          const params = {};
          getServiceList(params)
            .then((res) => {
              listData.value = res.data;
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    };

    return {
      //服务表单列宽
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },

      // 服务列表数据
      listData,
      Columns,

      // 服务查询
      searchValue,
      handleSearch,
      handleResetSearch,

      //新增服务
      drawerVisible,
      form,
      formRef,
      resetForm,
      handleDrawerClose,
      handleAddSubmit,
      rules,

      // 修改服务
      editDrawerVisible,
      handleEdit,
      editableData,
      handleEditDrawerClose,
      handlePut,

      // 删除服务
      handelDel,
    };
  },
  components: {
    SearchOutlined,
    PlusOutlined,
    ReloadOutlined,
    EditTwoTone,
    DeleteTwoTone,
    [DatePicker.name]: DatePicker,
    [RangePicker.name]: RangePicker,
  },
});
</script>
<style>
</style>
