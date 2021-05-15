<template>
  <div>
    <!-- 点线动画背景 -->
    <Particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
      :options="{
        background: {
          color: {
            value: '#0d47a1',
          },
        },
        fpsLimit: 60,
        interactivity: {
          detectsOn: 'canvas',
          events: {
            onClick: {
              enable: true,
              mode: 'push',
            },
            onHover: {
              enable: true,
              mode: 'repulse',
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: '#ffffff',
          },
          links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: 'none',
            enable: true,
            outMode: 'bounce',
            random: false,
            speed: 3,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              value_area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: 'circle',
          },
          size: {
            random: true,
            value: 5,
          },
        },
        detectRetina: true,
      }"
    />

    <div class="login-body">
      <div class="login-container">
        <div class="head">
          <div class="name">
            <div class="title">会展自动化运营平台</div>
            <div class="tips">Vue3.0 后台管理系统</div>
          </div>
        </div>
        <a-form
          layout="vertical"
          :model="formState"
          @finish="handleFinish"
          @finishFailed="handleFinishFailed"
          class="login-form"
        >
          <a-form-item>
            <a-input v-model:value="formState.user" placeholder="请输入用户名">
              <template #prefix
                ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
              /></template>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input-password
              v-model:value="formState.password"
              type="password"
              placeholder="请输入密码"
            >
              <template #prefix
                ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
              /></template>
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <VerifySlider @sliderSucess="subSliderPass"></VerifySlider>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              :disabled="formState.user === '' || formState.password === ''"
              @click="submitForm(formState)"
            >
              登录
            </a-button>
            <a-checkbox
              v-model:checked="checked"
              style="margin-left: 45px; font-size: 12px"
              >记住密码</a-checkbox
            >
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import router from "../../router/index";
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import { defineComponent, ref, reactive, UnwrapRef, onMounted } from "vue";
import { message } from "ant-design-vue";

import VerifySlider from "./VerifySlider.vue";
import { login } from "../../network/login";
interface FormState {
  user: string;
  password: string;
}
export default defineComponent({
  setup() {
    const formState: UnwrapRef<FormState> = reactive({
      user: "",
      password: "",
    });
    const handleFinish = (values: FormState) => {
      console.log(values, formState);
    };
    const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
      console.log(errors);
    };

    const checked = ref<boolean>(true);
    const sliderPassStas = ref<boolean>(false);
    //通过VerifySlider.vue子组件传递的值判断滑动认证是否通过
    const subSliderPass = (stas: String) => {
      if (stas == "sliderPass") {
        sliderPassStas.value = true;
        // console.log(sliderPassStas.value);
      } else sliderPassStas.value = false;
    };

    //设置cookie
    const setCookie = (c_name, c_pwd, exdays) => {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "user" + "=" + c_name + ";path=/;expires=" + exdate.toUTCString();
      window.document.cookie =
        "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toUTCString();
    };

    //读取cookie
    const getCookie = () => {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "user") {
            formState.user = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "password") {
            formState.password = arr2[1];
          }
        }
      }
    };

    //清除cookie
    const clearCookie = () => {
      setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    };

    onMounted(() => {
      getCookie();
    });

    const submitForm = (userInfo) => {
      // console.log(sliderPassStas.value);
      if (checked) {
        //传入账号名，密码，和保存天数3个参数
        setCookie(userInfo.user, userInfo.password, 7);
        if (sliderPassStas.value == true) {
          // 提交后台验证账号密码
          login(userInfo).then((res) => {
            // console.log("res" + res);
            if (res.status == 200) {
              message.success("登录成功！");
              sessionStorage.setItem("Login-user", userInfo.user);
              router.push("/");
            } else {
              message.warning("账号密码错误");
            }
          });
        } else {
          message.warning("请进行滑块验证");
        }
      } else {
        // console.log("清空Cookie");
        //清空Cookie
        clearCookie();
      }
    };

    return {
      formState,
      handleFinish,
      handleFinishFailed,
      checked,
      subSliderPass,
      sliderPassStas,
      submitForm,
    };
  },
  components: {
    UserOutlined,
    LockOutlined,
    VerifySlider,
  },
});
</script>

<style scoped>
#tsparticles {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

.login-body {
  position: absolute;
  z-index: auto;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  /* background-color: #fff; */
  background: rgba(0, 0, 0, 0.3);
  /* background-image: linear-gradient(25deg, #077f7c, #3aa693, #5ecfaa, #7ffac2); */
}
.login-container {
  margin-top: 50px;
  align-items: center;
  width: 420px;
  height: 500px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
}
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0 20px 0;
}
.head img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}
.head .title {
  font-size: 28px;
  color: #1baeae;
  font-weight: bold;
}
.head .tips {
  /* margin-right: 20px; */
  font-size: 12px;
  color: #999;
}
.login-form {
  width: 60%;
  margin: 0 auto;
}

.a-form--label-top .a-form-item__label {
  padding: 0;
}

.login-form .a-form-item {
  margin-bottom: 12px;
}

.code {
  background-image: url(111.jpg);
  font-family: Arial, 宋体;
  font-style: italic;
  color: green;
  border: 0;
  padding: 2px 3px;
  letter-spacing: 3px;
  font-weight: bolder;
}

.unchanged {
  border: 0;
}
</style>
