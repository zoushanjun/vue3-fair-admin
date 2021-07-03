<template>
  <!-- 1/账号管理选项卡内容 -->
  <div>
    <a-button
      shape="round"
      style="margin-left: 10px"
      @click="drawerVisible = true"
      ><template #icon><PlusOutlined /></template>新增</a-button
    >
    <!-- 点击新增按钮，弹出新增账号表单 -->
    <a-drawer
      v-model:visible="drawerVisible"
      title="新增账号"
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
        <a-form-item label="账号：" ref="name" name="name">
          <a-input v-model:value="form.name" placeholder="账号不可重复" />
        </a-form-item>
        <a-form-item label="邮箱：" name="email">
          <a-input v-model:value="form.email" placeholder="邮箱不可重复" />
        </a-form-item>
        <a-form-item label="密码：" name="pswd">
          <a-input v-model:value="form.pswd" />
        </a-form-item>
        <a-form-item label="角色：" name="role">
          <a-select
            v-model:value="form.role_id"
            ref="select"
            @change="handleChange"
          >
            <a-select-option value="1">1</a-select-option>
            <a-select-option value="2">2</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="说明：" name="remark">
          <a-text>1-管理角色；2-服务角色</a-text>
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
  <!-- 账号列表 -->
  <a-table
    :columns="Columns"
    :data-source="listData"
    :pagination="{ pageSize: 50 }"
    :scroll="{ y: 240 }"
    :rowKey="(record) => record.id"
    size="middle"
    bordered
  >
    <template #pswd>
      <span>******</span>
    </template>
    <template #role="{ record }">
      <span v-if="record.role_id == 1">管理角色</span>
      <span v-if="record.role_id == 2">服务角色</span>
    </template>
    <template #operation="{ record }">
      <span class="table-operation">
        <a href="#" @click.prevent="handleEdit(record)">
          <a-tooltip title="编辑" :color="'blue'">
            <EditTwoTone />
          </a-tooltip>
        </a>

        <a-drawer
          v-model:visible="editDrawerVisible"
          title="修改账号"
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
            <a-form-item label="账号：">
              <a-input v-model:value="editableData.name" />
            </a-form-item>
            <a-form-item label="邮箱：">
              <a-input v-model:value="editableData.email" />
            </a-form-item>
            <a-form-item label="密码：">
              <a-input v-model:value="editableData.pswd" />
            </a-form-item>
            <a-form-item label="角色：">
              <a-select
                v-model:value="editableData.role_id"
                ref="select"
                @change="handleChange"
              >
                <a-select-option value="1">1</a-select-option>
                <a-select-option value="2">2</a-select-option>
              </a-select>
              <!-- <a-input v-model:value="editableData.role_id" /> -->
            </a-form-item>
            <a-form-item label="说明：" name="remark">
              <a-text>1-管理角色；2-服务角色</a-text>
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
          @confirm="handelDel(record.id, record.name)"
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
import { defineComponent, ref, reactive, UnwrapRef, onMounted } from "vue";
import {
  SearchOutlined,
  PlusOutlined,
  ReloadOutlined,
  EditTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons-vue";

import { message, Select } from "ant-design-vue";

// 引入与flask后端交互的http api方法
import {
  getPermission,
  postPermission,
  deletePermission,
  putPermission,
} from "../../network/permissionApi";

//  定位账号各字段含义
const Columns = [
  {
    title: "账号",
    dataIndex: "name",
    key: "name",
    width: 200,
    ellipsis: true,
  },
  {
    title: "邮箱",
    dataIndex: "email",
    key: "email",
    width: 200,
  },
  {
    title: "密码",
    dataIndex: "pswd",
    key: "pswd",
    width: 300,
    ellipsis: true,
    slots: { customRender: "pswd" },
  },

  {
    title: "角色",
    dataIndex: "role_id",
    key: "role_id",
    width: 200,
    slots: { customRender: "role" },
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    slots: { customRender: "operation" },
  },
];

// 新增账号弹出框表单内容接口
interface FormService {
  name: string;
  email: string;
  pswd: string;
  role_id: number;
}

export default defineComponent({
  name: "person",
  setup() {
    // 定义InvetListData资产列表,InvetCategoryListData资产类别数据为响应式数组
    // ref包裹的数据需要通过.value来获值

    const listData = ref([]) as any;

    // 页面挂载后读取账号列表数据
    onMounted(() => {
      const params = {
        search: "",
      };
      getPermission(params)
        .then((res) => {
          listData.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    });
    // const value = ref<string>("");

    //定义账号表单对象初始值
    const form: UnwrapRef<FormService> = reactive({
      name: "",
      email: "",
      pswd: "",
      role_id: 1,
    });

    const handleChange = (value: string) => {
      console.log(`selected ${value}`);
    };

    // 账号选项卡-逻辑处理

    const formRef = ref<any>(null);
    //新增账号抽屉重置按钮逻辑处理
    const resetForm = () => {
      formRef.value.resetFields();
    };
    // 新增账号抽屉取消按钮逻辑处理
    const drawerVisible = ref<boolean>(false);
    const handleDrawerClose = () => {
      drawerVisible.value = false;
    };

    //  新增账号抽屉提交按钮逻辑处理
    const handleAddSubmit = (form) => {
      console.log(form);
      postPermission(form).then((res) => {
        if (res.status == 200 || res.status == 201) {
          message.success("新增账号成功！");
          drawerVisible.value = false;
          // 刷新当前页面
          const params = { search: "" };
          getPermission(params)
            .then((res) => {
              listData.value = res.data;
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
      // console.log('values', formFair, toRaw(formFair));
    };

    // 新增账号 - 表单验证规则;
    const rules = {
      serviceName: [
        { required: true, message: "请输入账号名称", trigger: "blur" },
        { min: 2, max: 32, message: "长度在2和32之间", trigger: "blur" },
      ],
      price: [
        { required: true, message: "请输入价格，可以为0", trigger: "blur" },
      ],
      commision: [
        { required: true, message: "请输入价格，可以为0", trigger: "blur" },
      ],
    };

    //删除账号,以json格式进行传递
    const handelDel = (e: MouseEvent, name: string) => {
      if (name == "admin" || name == "service") {
        message.warning("系统内置账号不可删除！");
      } else {
        deletePermission({ id: e }).then((res) => {
          if (res.status == 200) {
            message.success("删除成功！");
            // 刷新当前页面
            const params = { search: "" };
            getPermission(params)
              .then((res) => {
                listData.value = res.data;
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
      }
    };

    // 修改账号-逻辑处理部分
    const editDrawerVisible = ref<boolean>(false);
    const editableData: UnwrapRef<Record<string, FormService>> = reactive({});
    const handleEdit = (record: any) => {
      editDrawerVisible.value = true;
      //复制数据用于编辑
      for (const k in record) {
        editableData[k] = record[k];
      }
    };
    //修改账号取消按钮逻辑处理
    const handleEditDrawerClose = () => {
      editDrawerVisible.value = false;
    };
    // 修改账号抽屉提交按钮逻辑处理
    const handlePut = (Data: object) => {
      putPermission(Data).then((res) => {
        if (res.status == 200) {
          message.success("更新成功！");
          editDrawerVisible.value = false;
          // 刷新当前页面
          const params = { search: "" };
          getPermission(params)
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
      //账号表单列宽
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },

      handleChange,

      // 账号列表数据
      listData,
      Columns,

      // 账号查询
      // searchValue,
      // handleSearch,
      // handleResetSearch,

      //新增账号
      drawerVisible,
      form,
      formRef,
      resetForm,
      handleDrawerClose,
      handleAddSubmit,
      rules,

      // 修改账号
      editDrawerVisible,
      handleEdit,
      editableData,
      handleEditDrawerClose,
      handlePut,

      // 删除账号
      handelDel,
    };
  },
  components: {
    SearchOutlined,
    PlusOutlined,
    ReloadOutlined,
    EditTwoTone,
    DeleteTwoTone,
    [Select.name]: Select,
    ASelectOption: Select.Option,
  },
});
</script>
<style>
</style>
