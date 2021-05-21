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
    <template #operation="{ record }">
      <span class="table-operation">
        <a href="#" @click.prevent="handleEdit(record)"
          ><a-tooltip title="编辑" :color="'blue'"><EditTwoTone /></a-tooltip
        ></a>
        <a-drawer
          v-model:visible="editDrawerVisible"
          title="修改类别"
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
            <a-form-item label="类别：">
              <a-input v-model:value="editableData.category" />
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
            <a-button style="margin-right: 8px" @click="handlePut"
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
import { defineComponent, ref, reactive, UnwrapRef, onMounted } from "vue";

import {
  PlusOutlined,
  FileExcelOutlined,
  ReloadOutlined,
  CheckOutlined,
  EditTwoTone,
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
        })
        .catch((err) => {
          console.log(err);
        });
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
                .catch((err) => {
                  console.log(err);
                });
            } else {
              message.warning("类别已经存在");
              return;
            }
          });
        })
        .catch((error: ValidateErrorEntity<FormCategory>) => {
          console.log("error", error);
        });
    };

    // 修改类别
    const editDrawerVisible = ref<boolean>(false);
    const editable = ref<boolean>(false);
    const editableData: UnwrapRef<Record<string, FormCategory>> = reactive({});
    const handleEdit = (record: any) => {
      editDrawerVisible.value = true;
      for (const k in record) {
        editableData[k] = record[k];
      }
      // console.log(editableData);
    };

    const handleEditDrawerClose = () => {
      editDrawerVisible.value = false;
    };

    const handlePut = () => {
      const params = {
        id: editableData.id,
        categoryName: editableData.category,
      };
      // console.log(params);
      putInvtCategory(params)
        .then((res) => {
          if (res.status == 200) {
            message.success(res.data.message);
            editDrawerVisible.value = false; //关闭抽屉
            // 刷新当前页面
            getInvtCategoryList()
              .then((res) => {
                categoryListData.value = res.data;
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
            .catch((err) => {
              console.log(err);
            });
        }
      });
    };
    // 取消删除
    const cancelDelete = (e: MouseEvent) => {
      console.log(e);
    };

    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },

      addDrawerVisible,
      formRef,
      rules,
      form,

      handleAdd,
      handelDel,
      handleCloseDrawer,
      handleEdit,
      handlePut,
      cancel,
      editable,
      editableData,
      cancelDelete,
      editDrawerVisible,
      handleEditDrawerClose,

      value,

      Columns,
      categoryListData,
    };
  },
  components: {
    PlusOutlined,
    FileExcelOutlined,
    ReloadOutlined,
    CheckOutlined,
    EditTwoTone,
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
