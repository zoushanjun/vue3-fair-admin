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
        <template #orderTag="{ text }">
          <span>
            <a-tag color="pink" v-if="text" v-bind:title="text">SMS</a-tag>
          </span>
        </template>

        <template #operation="{ record }">
          <span class="table-operation">
            <a href="#" @click.prevent="handleEdit(record)"
              ><a-tooltip title="编辑" :color="'blue'"
                ><EditTwoTone /></a-tooltip
            ></a>
            <a-drawer
              v-model:visible="editDrawerVisible[record.id]"
              title="作业资料编辑"
              :width="600"
              :body-style="{ paddingBottom: '80px' }"
              :maskStyle="{
                opacity: '0.1',
                background: '#778899',
                animation: 'none',
              }"
              @ok="editDrawerVisible[record.id] = false"
            >
              <a-form
                ref="formRef"
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
              >
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
                <a-form-item label="客户名称：" class="bottom">
                  {{ editableData.orderCustom }}
                </a-form-item>
                <a-form-item label="联系电话：" class="bottom">
                  {{ editableData.orderTel }}
                </a-form-item>

                <a-form-item label="备注：" class="bottom">
                  {{ editableData.orderRemark }}
                </a-form-item>
                <!-- <a-form-item label="联系人：">
                  {{ editableData.orderContacts }}
                </a-form-item> -->

                <a-form-item label="宽带账号密码：" class="bottom">
                  <a-input v-model:value="editableData.orderAccout" />
                </a-form-item>
                <a-form-item label="专线配置信息：" class="bottom">
                  <a-textarea
                    v-model:value="editableData.orderConfig"
                    :rows="2"
                  />
                </a-form-item>
                <a-form-item label="格式(中间空格)：" class="bottom">
                  用户IP(/掩码) 用户IP网关 交换机IP 交换机端口 VLAN 上行速率
                  下行速率 备注
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
                  @click="handleEditDrawerClose(editableData.id)"
                  >取消</a-button
                >
                <a-button
                  style="margin-right: 8px"
                  @click="handlePutOrder(editableData, editableData.id)"
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
              v-model:visible="jobDrawerVisible[record.id]"
              title="作业终端"
              :width="600"
              :body-style="{ paddingBottom: '80px' }"
              :maskStyle="{
                opacity: '0.1',
                background: '#778899',
                animation: 'none',
              }"
              @ok="jobDrawerVisible[record.id] = false"
            >
              <div>专线配置信息：</div>
              <div>{{ editableData.orderConfig }}</div>
              <a-divider />
              <iframe
                v-bind:src="nornirSvrUrl"
                frameborder="0"
                width="530"
                height="350"
                scrolling="auto"
                ref="subframe"
              >
              </iframe>

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
                  @click="handleJobDrawerClose(record.id)"
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
              @confirm="handleSMS(record)"
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
import { defineComponent, ref, toRaw, onMounted, reactive } from "vue";
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
import { getSmsSendMessage } from "../../network/smsApi"; //用于发送短信
// import axios from "axios";
moment.locale("zh-cn");

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
    width: 100,
    ellipsis: true,
  },
  {
    title: "数量",
    dataIndex: "orderNum",
    key: "orderNum",
    width: 50,
    ellipsis: true,
  },
  {
    title: "客户名称",
    dataIndex: "orderCustom",
    key: "orderCustom",
    width: 100,
    ellipsis: true,
  },
  {
    title: "宽带账号密码",
    dataIndex: "orderAccout",
    key: "orderAccout",
    width: 100,
    ellipsis: true,
  },
  {
    title: "专线配置信息",
    dataIndex: "orderConfig",
    key: "orderConfig",

    ellipsis: true,
  },
  { title: "工单状态", dataIndex: "orderStaus", key: "orderStaus", width: 80 },
  {
    title: "作业标识",
    dataIndex: "orderTag",
    key: "orderTag",
    width: 80,
    slots: { customRender: "orderTag" },
  },
  {
    title: "备注",
    dataIndex: "orderRemark",
    key: "orderRemark",
    width: 120,
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
    const subframe = ref(null);
    onMounted(() => {
      // console.log("onMounted:" + subframe.value);
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

    const handleSMS = (record: any) => {
      if (record.orderTel.length != 11) {
        message.warning("手机号码不正确！");
      } else {
        if (record.orderAccout) {
          var accout = "宽带账号/密码(" + record.orderAccout + ")，";
        } else accout = "";
        if (record.orderConfig) {
          var str = record.orderConfig.trim().split(" ");
          var config =
            "专线配置(IP/掩码" +
            str[0] +
            ",网关" +
            str[1] +
            ",DNS 120.80.88.88/221.5.88.88" +
            ")，";
        } else config = "";
        const content =
          "尊敬的参展商，您申请的" +
          record.orderLocation +
          accout +
          config +
          "使用过程中有任何问题请联系现场林工15975118389或客服邹小姐13418001279";
        // console.log(content);
        const params = {
          tos: record.orderTel,
          msg: content,
        };
        getSmsSendMessage(params).then((res) => {
          if (res.status == 200) {
            message.success("发送成功！");
            //更新短信发送时间戳
            record.orderTag = moment().format("YYYY年MM月DD日 HH:mm:ss");
            putOrder(record).then((res) => {
              if (res.status == 200) {
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
          }
        });
      }
      // axios({
      //   method: "GET",
      //   url: "smsApi/Service.asmx/SendMessages", //在vite.config.ts中进行代理
      //   params: {
      //     uid: "zouq8610",
      //     pwd: "wingswind2015",
      //     tos: record.orderTel,
      //     msg: content,
      //     otime: "",
      //   },
      // }).then((res) => {
      //   // console.log(e);
      //   if (res.status == 200) {
      //     message.success("发送成功！");
      //     //更新短信发送时间戳
      //     record.orderTag = moment().format("YYYY年MM月DD日 HH:mm:ss");
      //     putOrder(record).then((res) => {
      //       if (res.status == 200) {
      //         // 刷新展开行工单数据
      //         const params = {
      //           fairId: expandedRowKeys.value[0],
      //         };
      //         getOrderList(params)
      //           .then((res) => {
      //             orderData.value = res.data;
      //           })
      //           .catch((err) => {
      //             console.log(err);
      //           });
      //       }
      //     });
      //   }
      // });
      // }
    };

    // 作业资料编辑
    const formRef = ref<any>(null);
    const editDrawerVisible = reactive({});

    const editableData = reactive({
      id: null,
      orderLocation: "",
      orderSvcItem: "",
      orderNum: "",
      orderCustom: "",
      orderTel: "",
      orderRemark: "",
      orderAccout: "",
      orderConfig: "",
    });
    const handleEdit = (record: any) => {
      editDrawerVisible[record.id] = true;
      //复制数据用于编辑
      for (const k in record) {
        editableData[k] = record[k];
      }
    };

    const handleEditDrawerClose = (id) => {
      editDrawerVisible[id] = false;
    };

    const handlePutOrder = (Data: object, id) => {
      // console.log(Data);
      putOrder(Data).then((res) => {
        if (res.status == 200) {
          message.success("更新成功！");
          editDrawerVisible[id] = false;

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

    const nornirSvrUrl = ref<string>();
    const jobDrawerVisible = reactive({});
    const orderLineConfig = ref<string>();
    const handleJob = (record: any) => {
      // cmdParams.value = record.orderConfig;

      // nornirSvrUrl.value =
      //   "http://192.168.64.91:8888?hostname=192.168.64.91&username=nornir&password=" +
      //   window.btoa("Nornir123") +
      //   "&command=" +
      //   "python3 vue_add_line.py" +
      //   " " +
      //   toRaw(record.orderConfig);
      nornirSvrUrl.value =
        "http://192.168.64.135:38888?hostname=192.168.64.135&port=33333&username=root&password=" +
        window.btoa("Admin123") +
        "&command=" +
        "python /var/opt/nornir/vue_add_line.py" +
        " " +
        toRaw(record.orderConfig);

      jobDrawerVisible[record.id] = true;
      orderLineConfig.value = record.orderConfig;
      //复制数据
      for (const k in record) {
        editableData[k] = record[k];
      }
    };

    const handleJobDrawerClose = (id) => {
      jobDrawerVisible[id] = false;
    };

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
      subframe,

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
<style scoped>
.bottom {
  margin-bottom: 5px;
}
</style>
