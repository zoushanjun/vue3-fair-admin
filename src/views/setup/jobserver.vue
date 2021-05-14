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
        <!--  -->
        <a-form ref="formRef" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-item label="服务器名称：">
            <div v-if="editable">
              <a-input v-model:value="editableData.srvName" />
            </div>
            <div v-else>{{ $store.state.jobSvrData.srvName || "" }}</div>
          </a-form-item>
          <a-form-item label="IP地址：">
            <div v-if="editable">
              <a-input v-model:value="editableData.srvIp" />
            </div>
            <div v-else>{{ $store.state.jobSvrData.srvIp || "" }}</div>
          </a-form-item>
          <a-form-item label="端口号：">
            <div v-if="editable">
              <a-input v-model:value="editableData.srvPort" />
            </div>
            <div v-else>{{ $store.state.jobSvrData.srvPort || "" }}</div>
          </a-form-item>
          <a-form-item label="登录账号：">
            <div v-if="editable">
              <a-input v-model:value="editableData.srvAcct" />
            </div>
            <div v-else>{{ $store.state.jobSvrData.srvAcct || "" }}</div>
          </a-form-item>
          <a-form-item label="登录密码：">
            <div v-if="editable">
              <a-input-password v-model:value="editableData.srvPwd" />
            </div>
            <div v-else>{{ $store.state.jobSvrData.srvPwd || "" }}</div>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col> </a-col>
    </a-row>
  </div>
  <div style="margin-left: 110px; margin-up: 30px">
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
import { defineComponent, ref, UnwrapRef, reactive } from "vue";
import { getJobSvr, putJobSvr } from "../../network/setup";
import { message } from "ant-design-vue";
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
} from "@ant-design/icons-vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "jobserver",

  setup() {
    const form: UnwrapRef<FormServer> = reactive({
      srvName: "",
      srvIp: "",
      srvPort: "",
      srvAcct: "",
      srvPwd: "",
    });
    // 作业服务器表单内容接口
    interface FormServer {
      srvName: string;
      srvIp: string;
      srvPort: string;
      srvAcct: string;
      srvPwd: string;
    }

    const editable = ref<boolean>(false);
    const editableData = reactive({});
    const edit = () => {
      const params = {
        svrId: 1,
      };
      getJobSvr(params).then((res) => {
        for (const k in res.data) {
          editableData[k] = res.data[k]; //editableData数据用于编辑而不会影响原始数据
        }
      });
      editable.value = true;
    };

    const store = useStore();
    const update = (data: any) => {
      putJobSvr(data)
        .then((res) => {
          console.log(res);
          message.success("更新成功！");
          store.dispatch("getSvrData"); //同步更新vuex
          editable.value = false;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const cancel = () => {
      editable.value = false;
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
</style>
