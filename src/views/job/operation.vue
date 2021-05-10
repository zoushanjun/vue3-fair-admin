<template>
  <!-- 工单列表，嵌套表格 -->
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
        <template #orderTag>
          <span>
            <a-tag color="pink">Job</a-tag>
            <a-tag color="green">SMS</a-tag>
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
              title="作业资料编辑"
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
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
              >
                <a-form-item label="展会名称：">
                  {{ fairCopiedName }}
                </a-form-item>

                <a-form-item label="安装地点：">
                  {{ editableData.orderLocation }}
                </a-form-item>
                <a-form-item label="服务项目：">
                  {{ editableData.orderSvcItem }}
                </a-form-item>
                <a-form-item label="联系电话：">
                  {{ editableData.orderTel }}
                </a-form-item>

                <a-form-item label="备注：">
                  {{ editableData.orderRemark }}
                </a-form-item>
                <!-- <a-form-item label="联系人：">
                  {{ editableData.orderContacts }}
                </a-form-item> -->

                <a-form-item label="宽带账号密码：">
                  <a-input v-model:value="editableData.orderAccout" />
                </a-form-item>
                <a-form-item label="专线配置信息：">
                  <a-textarea
                    v-model:value="editableData.orderConfig"
                    :rows="4"
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
                  @click="handlePutOrder(editableData)"
                  >提交</a-button
                >
              </div>
            </a-drawer>

            <a-divider
              type="vertical"
              style="height: 10px; background-color: #7cb305"
            />

            <a @click="handleJob(record)"
              ><a-tooltip title="作业" :color="'blue'"
                ><PlaySquareTwoTone /></a-tooltip
            ></a>
            <a-drawer
              v-model:visible="jobDrawerVisible"
              title="作业终端"
              :width="600"
              :body-style="{ paddingBottom: '80px' }"
              :maskStyle="{
                opacity: '0.1',
                background: '#778899',
                animation: 'none',
              }"
              @ok="drawerVisible = false"
            >
              <div>专线配置信息：</div>
              <div>{{ editableData.orderConfig }}</div>
              <a-divider />
              <iframe
                v-bind:src="nornirSvrUrl"
                frameborder="0"
                width="550"
                height="350"
                scrolling="auto"
              ></iframe>
              <!-- <xterm /> -->
              <!-- <v-shell></v-shell> -->
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
                  @click="handleJobDrawerClose()"
                  >关闭</a-button
                >
              </div>
            </a-drawer>

            <a-divider
              type="vertical"
              style="height: 10px; background-color: #7cb305"
            />
            <a-popconfirm
              title="确定发送短信吗?"
              ok-text="是"
              cancel-text="否"
              @confirm="handleSMS(record.id)"
            >
              <a
                ><a-tooltip title="短信" :color="'blue'"
                  ><MailTwoTone /></a-tooltip
              ></a>
            </a-popconfirm>
          </span>
        </template>
      </a-table>
    </template>
  </a-table>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive, UnwrapRef } from "vue";
import {
  PlaySquareTwoTone,
  MailTwoTone,
  UpSquareTwoTone,
  EditTwoTone,
} from "@ant-design/icons-vue";

import moment from "moment";
import { message } from "ant-design-vue";
import { getFairList } from "../../network/fairApi";
import { getOrderList, putOrder } from "../../network/orderApi";
import workerConstructor from "*?worker";
// import xterm from "../../components/xterm.vue";

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
];

const innerColumns = [
  {
    title: "安装地点",
    dataIndex: "orderLocation",
    key: "orderLocation",
    width: 150,
    ellipsis: true,
  },
  {
    title: "服务项目",
    dataIndex: "orderSvcItem",
    key: "orderSvcItem",
    width: 200,
    ellipsis: true,
  },

  {
    title: "宽带账号密码",
    dataIndex: "orderAccout",
    key: "orderAccout",
    ellipsis: true,
  },
  {
    title: "专线配置信息",
    dataIndex: "orderConfig",
    key: "orderConfig",
    width: 250,
    ellipsis: true,
  },
  { title: "工单状态", dataIndex: "orderStaus", key: "orderStaus", width: 80 },
  {
    title: "作业标识",
    dataIndex: "orderTag",
    key: "orderTag",
    width: 120,
    slots: { customRender: "orderTag" },
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

export default defineComponent({
  name: "operation",
  setup() {
    //作业对应展会列表数据
    //页面挂载后读取展会列表
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

    //点击展开“+”符号
    const orderData = ref([]);
    const fairCopiedName = ref<string>("");
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

    const handleSMS = (e: MouseEvent) => {
      message.success("发送成功！");
      console.log(e);
    };

    // const value = ref<string>("");

    // 作业资料编辑
    const formRef = ref<any>(null);
    const editDrawerVisible = ref<boolean>(false);
    // const editableData: UnwrapRef<Record<string, FormOrder>> = reactive({});
    const editableData = reactive({});
    const handleEdit = (record: any) => {
      editDrawerVisible.value = true;
      //复制数据用于编辑
      for (const k in record) {
        editableData[k] = record[k];
      }
      // console.log(fairCopiedName.value);
      // console.log(editableData);
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

    const jobDrawerVisible = ref<boolean>(false);

    const handleJob = (record: any) => {
      jobDrawerVisible.value = true;
      //复制数据
      for (const k in record) {
        editableData[k] = record[k];
      }
    };
    const handleJobDrawerClose = () => {
      jobDrawerVisible.value = false;
    };
    // const nornirpwd = window.btoa("Nornir123");
    const nornirSvrUrl =
      "http://192.168.64.91:8888?hostname=192.168.64.91&username=nornir&password=" +
      window.btoa("Nornir123");

    return {
      fairData,
      onExpand,
      expandedRowKeys,
      orderData,
      columns,
      innerColumns,

      handleEdit,
      editDrawerVisible,
      formRef,
      editableData,
      fairCopiedName,
      handleEditDrawerClose,
      handlePutOrder,
      handleSMS,

      //返回新增展会表单内容
      labelCol: { span: 5 },
      wrapperCol: { span: 18 },

      handleJob,
      jobDrawerVisible,
      handleJobDrawerClose,
      nornirSvrUrl,
    };
  },
  components: {
    PlaySquareTwoTone,
    MailTwoTone,
    UpSquareTwoTone,
    EditTwoTone,
    message,
    // xterm,
  },
});
</script>
<style>
</style>
