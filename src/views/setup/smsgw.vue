<template>
  <div class="box">
    <a-row>
      <a-col
        :span="14"
        style="
          border-style: dotted;
          border-width: 1px;
          border-top-left-radius: 1em;
          border-top-right-radius: 1em;
          border-bottom-right-radius: 1em;
          border-bottom-left-radius: 1em;
        "
      >
        <a-form
          ref="formRef"
          :model="form"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-item label="请求地址：" class="bottom">
            <div v-if="editable">
              <a-input v-model:value="editableData.smsHttp" />
            </div>
            <div v-else>{{ smsData.smsHttp || "" }}</div>
          </a-form-item>
          <a-form-item label="请求方式：" class="bottom">
            <div v-if="editable">
              <a-input v-model:value="editableData.smsMethod" />
            </div>
            <div v-else>{{ smsData.smsMethod || "" }}</div>
          </a-form-item>
          <a-form-item label="页面编码：" class="bottom">
            <div v-if="editable">
              <a-input v-model:value="editableData.smsEncode" />
            </div>
            <div v-else>{{ smsData.smsEncode || "" }}</div>
          </a-form-item>
          <a-form-item label="登录账号：" class="bottom">
            <div v-if="editable">
              <a-input v-model:value="editableData.smsAcct" />
            </div>
            <div v-else>{{ smsData.smsAcct || "" }}</div>
          </a-form-item>
          <a-form-item label="登录密码：" class="bottom">
            <div v-if="editable">
              <a-input-password v-model:value="editableData.smsPwd" />
            </div>
            <div v-else>{{ smsData.smsPwd || "" }}</div>
          </a-form-item>

          <a-form-item label="短信模板：" class="bottom">
            <div v-if="editable">
              <a-input v-model:value="editableData.smsTemplet" />
            </div>
            <div v-else>{{ smsData.smsTemplet || "" }}</div>
          </a-form-item>
          <a-form-item label="余额接口：" class="bottom">
            <div v-if="editable">
              <a-input v-model:value="editableData.smsBalance" />
            </div>
            <div v-else>{{ smsData.smsBalance || "" }}</div>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col>
        <div>
          <p style="margin-left: 25px">余额：{{ balance }}</p>
        </div>
        <div>
          <a-button
            shape="round"
            size="small"
            style="margin-left: 15px"
            @click="updateBalance"
            >余额更新</a-button
          >
        </div>
      </a-col>
    </a-row>
  </div>
  <div style="margin-left: 110px">
    <div v-if="editable">
      <a-button shape="round" @click="update(editableData)"
        ><template #icon><CheckOutlined /></template>更新</a-button
      >
      <a-button shape="round" style="margin-left: 15px" @click="cancel"
        ><template #icon><CloseOutlined /></template>取消</a-button
      >
    </div>
    <div v-else>
      <a-button shape="round" @click="edit"
        ><template #icon><EditOutlined /></template>编辑</a-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from "vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
} from "@ant-design/icons-vue";
import axios from "axios";

export default defineComponent({
  name: "smsgw",
  //定义表单对象初始值

  setup() {
    const form = reactive({
      smsHttp: "",
      smsMethod: "",
      smsEncode: "",
      smsAcct: "",
      smsPwd: "",
      smsTemplet: "",
      smsBalance: "",
    });

    const editable = ref<boolean>(false);
    const editableData = reactive({
      smsHttp: "http://service2.winic.org/Service.asmx/SendMessages?",
      smsMethod: "GET",
      smsEncode: "UTF-8",
      smsAcct: "zouq8610",
      smsPwd: "wingswind2015",
      smsTemplet: "",
      smsBalance:
        "http://service.winic.org:8009/webservice/public/remoney.asp?",
    });

    const edit = () => {
      // const params = {
      //   svrId: 1,
      // };
      // getSmsCfg(params).then((res) => {
      //   for (const k in res.data) {
      //     editableData[k] = res.data[k]; //editableData数据用于编辑而不会影响原始数据
      //   }
      // });
      editable.value = true;
    };

    const store = useStore();
    const update = (data: any) => {
      console.log(data);
    };

    const cancel = () => {
      editable.value = false;
    };

    const balance = ref<string>();
    const updateBalance = () => {
      axios({
        method: "GET",
        url: "remoney/webservice/public/remoney.asp",
        params: {
          uid: "zouq8610",
          pwd: "wingswind2015",
        },
      }).then((res) => {
        console.log("数据：", res.data);
        balance.value = res.data;
      });
    };

    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
      form,

      editable,
      editableData,
      edit,
      update,
      cancel,
      smsData: computed(() => store.state.smsGwData),
      updateBalance,
      balance,
    };
  },
  components: {
    message,
    CheckOutlined,
    CloseOutlined,
    EditOutlined,
  },
});
</script>
<style scoped>
.box {
  /* background: #f5f5f5; */
  overflow: hidden;
  margin: 0px;
  padding: 0px;
  margin-bottom: 10px;
}

.bottom {
  margin-bottom: 5px;
}
</style>
