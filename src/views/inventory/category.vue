<template>
  <!-- 1/资产类别操作模板部分 -->

  <div>
    <!-- 1.1/点击新增按钮，抽屉方式弹出新增类别表单 -->
    <a-button shape="round" @click="addDrawerVisible = true"
      ><template #icon><PlusOutlined /></template>新增</a-button
    >
    <a-drawer
      title="新增类别"
      placement="right"
      :width="320"
      :closable="false"
      v-model:visible="addDrawerVisible"
    >
      <a-form ref="formRef" :model="form" :rules="rules" layout="vertical">
        <a-form-item label="类别：" ref="category" name="category">
          <a-input v-model:value="form.category" />
        </a-form-item>
      </a-form>
      <div>
        <a-button style="margin-right: 8px" @click="handleCloseDrawer"
          >取消</a-button
        >
        <a-button type="primary" @click="handleAdd">提交</a-button>
      </div>
    </a-drawer>
  </div>
  <a-divider />

  <!-- 资产类别表格，size="small"指定为紧凑型 -->

  <a-table
    :columns="Columns"
    :data-source="categoryListData"
    :pagination="{ pageSize: 50 }"
    :scroll="{ y: 240 }"
    :rowKey="(record) => record.id"
    size="small"
    bordered
  >
    <template #category="{ text, record }">
      <div class="editable-cell">
        <div v-if="editableData[record.id]" class="editable-cell-input-wrapper">
          <a-input
            v-model:value="editableData[record.id].category"
            @pressEnter="handleUpdate(record.id)"
          />
          <check-outlined
            class="editable-cell-icon-check"
            @click="handleUpdate(record.id)"
          />
          <close-outlined
            class="editable-cell-icon-cancel"
            @click="cancel(record.id)"
          />
        </div>
        <div v-else class="editable-cell-text-wrapper">
          {{ text || " " }}
          <edit-outlined class="editable-cell-icon" @click="edit(record.id)" />
        </div>
      </div>
    </template>
    <template #operation="{ record }">
      <span class="table-operation">
        <a-popconfirm
          title="确定要删除吗?"
          ok-text="是"
          cancel-text="否"
          @confirm="handelDel(record.id)"
          @cancel="cancelDelete"
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

import {
  PlusOutlined,
  FileExcelOutlined,
  ReloadOutlined,
  CheckOutlined,
  EditOutlined,
  CloseOutlined,
  DeleteTwoTone,
} from "@ant-design/icons-vue";
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import { message } from "ant-design-vue";

// 引入与flask后端交互的http api方法
import {
  getInvtCategoryList,
  postInvtCategory,
  deleteInvtCategory,
  putInvtCategory,
} from "../../network/inventoryApi";
import { cloneDeep } from "lodash-es"; //使用lodash.cloneDeep实现深拷贝

// 定义资产类别列表表头
const Columns = [
  {
    name: "category", //对应API返回的InvetCategoryListData中的字段
    title: "类别",
    dataIndex: "category",
    key: "category",
    width: 200,
    slots: { customRender: "category" },
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

// 新增资产类别弹出框表单内容接口
interface FormCategory {
  // key: number;
  category: string;
}

export default defineComponent({
  name: "category",
  setup() {
    // 定义InvetCategoryListData资产类别数据为响应式数组
    // ref包裹的数据需要通过.value来获值

    const categoryListData = ref([]);

    // 页面挂载后读取资产列表、资产类别数据
    onMounted(() => {
      getInvtCategoryList()
        .then((res) => {
          categoryListData.value = res.data;
          // console.log(res.data);
          // console.log(categoryListData.value);
        })
        .catch((err) => {});
    });

    const value = ref<string>("");

    // 资产类别页面相关处理
    //ref需要加类型验证，不然在获取formRef.value时会有类型的错误提示
    const formRef = ref<any>(null);
    // 定义资产类别“新增”按钮弹出对话框表单内容
    const form: UnwrapRef<FormCategory> = reactive({
      // key: 0,
      category: "",
    });
    const addDrawerVisible = ref<boolean>(false);

    const handleCloseDrawer = () => {
      addDrawerVisible.value = false;
    };
    const rules = {
      category: [
        { required: true, message: "请输入有效的字符", trigger: "blur" },
        { min: 2, max: 20, message: "字符长度在2和20之间", trigger: "blur" },
      ],
    };

    const handleAdd = () => {
      formRef.value
        .validate()
        .then(() => {
          // console.log('values', form, toRaw(form));
          const params = {
            categoryName: form.category,
          };
          postInvtCategory(params).then((res) => {
            if (res.status == 201) {
              message.success(res.data.message); // res.data.message是定义的弹出内容
              addDrawerVisible.value = false; //关闭抽屉
              // 刷新当前页面
              getInvtCategoryList()
                .then((res) => {
                  categoryListData.value = res.data;
                })
                .catch((err) => {});
            } else {
              message.warning("类别已经存在");
              return;
            }
            // console.log(res.statusText);
            // console.log(res.status);
          });
        })
        .catch((error: ValidateErrorEntity<FormCategory>) => {
          console.log("error", error);
        });
    };

    // 修改类别
    const editableData: UnwrapRef<Record<string, FormCategory>> = reactive({});
    const edit = (id: number) => {
      editableData[id] = cloneDeep(
        categoryListData.value.filter((item) => id === item.id)[0]
      );
    };
    const handleUpdate = (id: number) => {
      Object.assign(
        categoryListData.value.filter((item) => id === item.id)[0],
        editableData[id]
      );
      const params = {
        id: id,
        categoryName: editableData[id].category,
      };
      console.log(params);
      putInvtCategory(params)
        .then((res) => {
          if (res.status == 200) {
            message.success(res.data.message);
            delete editableData[id];
          }
        })
        .catch((err) => {});
    };

    const cancel = (id: number) => {
      delete editableData[id];
    };

    //删除类别,以json格式进行传递
    const handelDel = (e: MouseEvent) => {
      deleteInvtCategory({ id: e }).then((res) => {
        if (res.status == 200) {
          message.success("删除成功！");
          // 刷新当前页面
          getInvtCategoryList()
            .then((res) => {
              categoryListData.value = res.data;
            })
            .catch((err) => {});
        }
      });
    };
    // 取消删除
    const cancelDelete = (e: MouseEvent) => {
      // console.log(e);
      // message.error('Click on No');
    };

    const onSubmit = () => {
      console.log("submit!", toRaw(formInventory));
    };

    const onSearch = (searchValue: string) => {
      console.log("use value", searchValue);
      console.log("or use this.value", value.value);
    };

    return {
      activeKey: ref("2"),
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },

      addDrawerVisible,
      formRef,
      rules,
      form,

      handleAdd,
      handelDel,
      handleCloseDrawer,
      edit,
      handleUpdate,
      cancel,
      editableData,
      cancelDelete,

      onSubmit,
      value,
      onSearch,
      Columns,

      categoryListData,
    };
  },
  components: {
    PlusOutlined,
    FileExcelOutlined,
    ReloadOutlined,
    CheckOutlined,
    EditOutlined,
    CloseOutlined,
    DeleteTwoTone,
  },
});
</script>
<style lang="less">
.card-container {
  background: #f5f5f5;
  overflow: hidden;
  margin: 0px;
  padding: 24px;
}
.card-container > .ant-tabs-card > .ant-tabs-content {
  min-height: 280px;
  // height: 120px;
  margin-top: -16px;
}

.card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
  background: #fff;
  padding: 16px;
}

.card-container > .ant-tabs-card > .ant-tabs-bar {
  border-color: #fff;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  border-color: transparent;
  background: transparent;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  border-color: #fff;
  background: #fff;
}

.editable-cell {
  position: relative;
  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 48px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 25px;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon-cancel {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }
  .editable-cell-icon {
    margin-top: 4px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon-cancel {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-cell-icon-cancel:hover {
    color: #108ee9;
  }
  .editable-add-btn {
    margin-bottom: 8px;
  }
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
</style>
