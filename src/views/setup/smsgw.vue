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
        <!-- {{ $store.state.jobSvrData.srvName }} -->
        <a-form
          ref="formRef"
          :model="form"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-item label="请求地址：">
            <a-input />
          </a-form-item>
          <a-form-item label="请求方式：">
            <a-input />
          </a-form-item>
          <a-form-item label="页面编码：">
            <a-input />
          </a-form-item>
          <a-form-item label="登录账号：">
            <a-input />
          </a-form-item>
          <a-form-item label="登录密码：">
            <a-input-password />
          </a-form-item>

          <a-form-item label="短信模板：">
            <a-input />
          </a-form-item>
        </a-form>
      </a-col>
      <a-col>
        <div>
          <p style="margin-left: 25px">余额：</p>
        </div>
        <div>
          <a-button shape="round" size="small" style="margin-left: 15px"
            >余额更新</a-button
          >
        </div>
      </a-col>
    </a-row>
  </div>
  <div style="margin-left: 110px">
    <a-button shape="round">提交</a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "smsgw",
  //定义表单对象初始值

  setup() {
    // const form: UnwrapRef<FormServer> = reactive({
    const form = reactive({
      smsHttp: "",
      smsMethod: "",
      smsEncode: "",
      smsAcct: "",
      smsPwd: "",
      smsTemplet: "",
    });
    // 作业服务器表单内容接口
    // interface FormServer {
    //   smsHttp: string;
    //   smsMethod: string;
    //   smsEncode: string;
    //   srvAcct: string;
    //   srvPwd: string;
    //   smsTemplet: string;
    // }

    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
      form,
    };
  },
  components: {},
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
