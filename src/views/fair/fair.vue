<template>
  <div>
    <div>
      <a-input
        v-model:value="searchValue"
        placeholder="请输入展会名称"
        style="width: 200px"
      />
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
      <!-- 点击新增按钮，弹出新增展会抽屉 -->
      <a-drawer
        v-model:visible="drawerVisible"
        title="新增展会"
        :width="600"
        :body-style="{ paddingBottom: '80px' }"
        @ok="drawerVisible = false"
      >
        <a-form
          ref="formRef"
          :model="form"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          :rules="rules"
        >
          <a-form-item label="展会名称：" ref="fairName" name="fairName">
            <a-input v-model:value="form.fairName" placeholder="展会名称" />
          </a-form-item>
          <a-form-item label="主办信息：" ref="sponsorInfo" name="sponsorInfo">
            <a-textarea
              v-model:value="form.sponsorInfo"
              placeholder="主办名称/联系人/联系电话"
              :auto-size="{ minRows: 2, maxRows: 2 }"
            />
          </a-form-item>
          <a-form-item label="筹展时间：" ref="prepareTime" name="prepareTime">
            <a-date-picker
              v-model:value="form.prepareTime"
              placeholder="筹展时间"
            />
          </a-form-item>
          <a-form-item label="开展时间：" ref="startTime" name="startTime">
            <a-date-picker
              v-model:value="form.startTime"
              placeholder="开展时间"
            />
          </a-form-item>
          <a-form-item label="撤展时间：" ref="endTime" name="endTime">
            <a-date-picker
              v-model:value="form.endTime"
              placeholder="撤展时间"
            />
          </a-form-item>
          <a-form-item label="举办地点：" ref="location" name="location">
            <a-textarea
              v-model:value="form.location"
              placeholder="举办地点"
              :auto-size="{ minRows: 2, maxRows: 2 }"
            />
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
    </div>
    <a-divider />
    <!-- 展会列表 -->
    <a-table
      :columns="Columns"
      :data-source="listData"
      :pagination="{ pageSize: 50 }"
      :rowKey="(record) => record.id"
      size="small"
      bordered
    >
      <template #expandedRowRender="{ record }">
        <p style="margin: 0">主办信息：{{ record.sponsorInfo }}</p>
      </template>

      <template #operation="{ record }">
        <span>
          <!-- fairlist表单中的编辑 -->
          <a href="#" @click.prevent="handleEditFair(record)"
            ><a-tooltip title="编辑" :color="'blue'"><EditTwoTone /></a-tooltip
          ></a>
          <a-drawer
            v-model:visible="editDrawerVisible"
            title="修改展会"
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
              <a-form-item label="展会名称：">
                <a-input v-model:value="editableData.fairName" />
              </a-form-item>
              <a-form-item label="主办信息：">
                <a-textarea
                  v-model:value="editableData.sponsorInfo"
                  :auto-size="{ minRows: 2, maxRows: 2 }"
                />
              </a-form-item>
              <a-form-item label="筹展时间：">
                <a-date-picker v-model:value="editableData.prepareTime" />
              </a-form-item>
              <a-form-item label="开展时间：">
                <a-date-picker v-model:value="editableData.startTime" />
              </a-form-item>
              <a-form-item label="撤展时间：">
                <a-date-picker v-model:value="editableData.endTime" />
              </a-form-item>
              <a-form-item label="举办地点：">
                <a-textarea
                  v-model:value="editableData.location"
                  :auto-size="{ minRows: 2, maxRows: 2 }"
                />
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
                @click="handlePutFair(editableData)"
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
            <a
              ><a-tooltip title="删除" :color="'blue'"
                ><DeleteTwoTone /></a-tooltip
            ></a>
          </a-popconfirm>
        </span>
      </template>
    </a-table>
  </div>
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
//引入时间配合日期选择器使用
import moment, { Moment } from "moment";
import { message, DatePicker } from "ant-design-vue";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

// 引入与flask后端交互的http api方法
import {
  getFairList,
  deleteFair,
  postFair,
  putFair,
} from "../../network/fairApi";

// 定义展会各字段含义
const Columns = [
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
    dataIndex: "fairOprate",
    key: "fairOprate",
    width: 100,
    slots: { customRender: "operation" },
  },
];

// 新增展会弹出框表单内容接口
interface FormFair {
  fairName: string;
  sponsorInfo: string;
  prepareTime: Moment;
  startTime: Moment;
  endTime: Moment;
  location: string;
}
// 将rangepicker定位为DatePicker类型
const { RangePicker } = DatePicker;

export default defineComponent({
  name: "fair",
  setup() {
    // 定义InvetListData资产列表,InvetCategoryListData资产类别数据为响应式数组
    // ref包裹的数据需要通过.value来获值
    const listData = ref([]);

    // 页面挂载后读取展会列表、服务列表数据
    onMounted(() => {
      getFairList()
        .then((res) => {
          // console.log(res);
          listData.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    });
    const value = ref<string>("");
    const drawerVisible = ref<boolean>(false);

    //定义展会表单对象初始值
    // const form: UnwrapRef<FormFair> = reactive({
    const form = reactive({
      fairName: "",
      sponsorInfo: "",
      prepareTime: moment().format("L"),
      startTime: moment().format("L"),
      endTime: moment().format("L"),
      location: "",
    });

    // 展会查询-逻辑处理部分
    const searchValue = ref<string>("");
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

    // 展会-根据选择条件查询
    const handleSearch = () => {
      if (
        toRaw(searchValue.value) == "" &&
        searchTimeRangeString.value[0] == ""
      ) {
        message.warning("请输入查询条件！");
        return;
      }

      const params = {
        fairname: toRaw(searchValue.value),
        starttime: searchTimeRangeString.value[0],
        endtime: searchTimeRangeString.value[1],
      };

      // getFairList(params);
      getFairList(params)
        .then((res) => {
          listData.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
      // message.success('查询成功！');
    };

    const handleResetSearch = () => {
      searchValue.value = "";
      searchTimeRange.value = moment[""];
      searchTimeRangeString.value = ["", ""];
      const params = {};
      getFairList(params)
        .then((res) => {
          listData.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // 新增展会-弹出抽屉处理
    //ref需要加类型验证，不然在获取formInventoryRef.value时会有类型的错误提示
    const formRef = ref<any>(null);

    const resetForm = () => {
      formRef.value.resetFields();
    };
    const handleDrawerClose = () => {
      drawerVisible.value = false;
    };

    const handleAddSubmit = (form) => {
      formRef.value
        .validate()
        .then(() => {
          postFair(form).then((res) => {
            if (res.status == 200) {
              message.success("新增展会成功！");
              drawerVisible.value = false;
              // 刷新当前页面
              const params = {};
              getFairList(params)
                .then((res) => {
                  listData.value = res.data;
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          });
          // console.log('values', form, toRaw(form));
        })
        .catch((error: ValidateErrorEntity<FormFair>) => {
          console.log("error", error);
        });
    };

    // 新增/修改展会 - 表单验证规则;
    const rules = {
      fairName: [
        { required: true, message: "请输入展会名称", trigger: "blur" },
        { min: 3, max: 256, message: "长度在3和256之间", trigger: "blur" },
      ],
      prepareTime: [
        {
          required: true,
          message: "请选择筹展时间",
          trigger: "blur",
          type: "object",
        },
      ],
      startTime: [
        {
          required: true,
          message: "请选择开展时间",
          trigger: "change",
          type: "object",
        },
      ],
      endTime: [
        {
          required: true,
          message: "请选择撤展时间",
          trigger: "change",
          type: "object",
        },
      ],
      location: [
        { required: true, message: "请输入展会举办地点", trigger: "change" },
      ],
    };

    //删除展会,以json格式进行传递
    const handelDel = (e: MouseEvent) => {
      deleteFair({ id: e }).then((res) => {
        if (res.status == 200) {
          message.success("删除成功！");
          // 刷新当前页面
          const params = {};
          getFairList(params)
            .then((res) => {
              listData.value = res.data;
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    };

    // 修改展会-逻辑处理部分
    const editDrawerVisible = ref<boolean>(false);
    const editableData: UnwrapRef<Record<string, FormFair>> = reactive({});
    const handleEditFair = (record: any) => {
      editDrawerVisible.value = true;
      //复制数据用于编辑
      for (const k in record) {
        editableData[k] = record[k];
      }
    };

    const handlePutFair = (Data: object) => {
      putFair(Data).then((res) => {
        if (res.status == 200) {
          message.success("更新成功！");
          editDrawerVisible.value = false;
          // 刷新当前页面
          const params = {};
          getFairList(params)
            .then((res) => {
              listData.value = res.data;
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

    return {
      //针对时间段选择器
      value3: ref<Moment[]>([]),

      //针对选项卡
      activeKey: ref("1"),
      value,

      // 展会查询
      searchValue,
      searchTimeRange,
      searchTimeRangeString,
      dates,
      disabledDate,
      onOpenChange,
      onChange,
      onCalendarChange,
      handleSearch,
      handleResetSearch,

      // 展会列表数据
      listData,
      Columns,

      //新增展会表单内容
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form,
      handleAddSubmit,
      // value2,

      // 新增展会弹出抽屉返回内容
      drawerVisible,
      formRef,

      resetForm,
      handleDrawerClose,

      // 修改展会
      editableData,
      handleEditFair,
      editDrawerVisible,
      handleEditDrawerClose,
      handlePutFair,
      rules,

      // 删除展会
      handelDel,
    };
  },
  components: {
    SearchOutlined,
    PlusOutlined,
    ReloadOutlined,
    EditTwoTone,
    DeleteTwoTone,

    // [DatePicker.name]: DatePicker,
    [RangePicker.name]: RangePicker,
  },
});
</script>
<style lang="less" scoped></style>
