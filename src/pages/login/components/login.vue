<template>
  <t-form
      :data="formData"
      :rules="fromRules"
      ref="form"
      @reset="onReset"
      @submit="onLogin"
      :colon="true"
      :labelWidth="0"
      class="container"
  >
    <t-form-item name="user" :help="currentLoginHelp">
      <t-input
          clearable
          v-model="formData.user"
          placeholder="请输入用户名、邮箱、手机号码">
        <desktop-icon slot="prefix-icon"></desktop-icon>
      </t-input>
    </t-form-item>

    <t-form-item name="password">
      <t-input type="password" clearable v-model="formData.password" placeholder="请输入密码">
        <lock-on-icon slot="prefix-icon"></lock-on-icon>
      </t-input>
    </t-form-item>

    <t-row>
      <t-col :span="3">
        <t-checkbox v-model="formData.rememberMe">记住我</t-checkbox>
      </t-col>
      <t-col :span="9">

                <span>
                  <t-link
                      theme="primary" style="float: right;"
                      @click="$router.push('/portal/wawa')"
                  >
                    游客进入
                  </t-link>
                </span>

        <!-- <div style="margin-left: 2px; margin-right: 2px; float: right;">
            <t-divider layout="vertical" />
        </div>

        <span>
          <t-link theme="primary" style="float: right;">
            微信扫一扫
          </t-link>
        </span> -->

      </t-col>
    </t-row>

    <t-row style="margin-top: 20px;">

      <t-col :span="6">
        <t-button @click="() => forgetDialogVisible = true" variant="outline">忘记一些东西？</t-button>
        <t-dialog header="通过邮箱找回密码"
                  :footer="false"
                  :visible.sync="forgetDialogVisible"
        >
          <div slot="body" style="padding: 0 12px 0 3px">

            <t-space v-if="forgetDialogResultInput === null" direction="vertical" style="width: 100%">
              <t-input
                  clearable
                  v-model="formData.user"
                  placeholder="请输入邮箱">
                <MailIcon slot="prefix-icon"/>
              </t-input>

              <t-row :gutter="[16,24]" style="width: 100%;">
                <t-col :flex="1">
                  <t-input clearable v-model="forgetDialogEmailCodeInput" placeholder="请输入验证码">
                  </t-input>
                </t-col>

                <t-col flex="shrink">
                  <t-button
                      @click="getMailCode"
                      style="margin-right: -16px"
                      :loading="getMailCodeBtnState === 'loading'"
                      :disabled="getMailCodeBtnState === 'disabled'"
                  >
                    <SendIcon v-if="getMailCodeBtnState === 'available'" slot="icon"/>
                    <CheckIcon v-if="getMailCodeBtnState === 'disabled'" slot="icon"/>
                    {{ getMailCodeBtnState === 'disabled' ? '已发送 ' + getMailCodeBtnTimeout + 's' : null }}
                    {{ getMailCodeBtnState === 'loading' ? '发送中...' : null }}
                    {{ getMailCodeBtnState === 'available' ? '获取邮箱验证码' : null }}
                  </t-button>
                </t-col>

              </t-row>

              <t-input type="password" clearable v-model="forgetDialogPassword" placeholder="新的密码">
                <lock-on-icon slot="prefix-icon"></lock-on-icon>
              </t-input>

              <t-input type="password" clearable v-model="forgetDialogRePassword" placeholder="再次输入密码">
                <lock-on-icon slot="prefix-icon"></lock-on-icon>
              </t-input>

              <t-space style="float: right;">
                <t-button
                    theme="default"
                    variant="base"
                    @click="() => { forgetDialogVisible = false; }"
                >
                  取消
                </t-button>
                <t-button
                    @click="resetPassword"
                    :loading="getMailCodeVerifyBtnState === 'loading'"
                    :disabled="getMailCodeVerifyBtnState === 'disabled'"
                >
                  <VerifyIcon slot="icon"/>
                  {{ getMailCodeVerifyBtnState === 'disabled' ? '请等待 ' + getMailCodeVerifyBtnTimeout + 's' : null }}
                  {{ getMailCodeVerifyBtnState === 'loading' ? '验证中...' : null }}
                  {{ getMailCodeVerifyBtnState === 'available' ? '验证您的身份并重置您的密码' : null }}
                </t-button>
              </t-space>

            </t-space>

            <t-space v-if="forgetDialogResultInput !== null" direction="vertical" style="width: 100%">

              <span>
                妥善保管您的密码
              </span>

              <t-input type="password" readonly v-model="forgetDialogResultInput">
                <lock-on-icon slot="prefix-icon"></lock-on-icon>
              </t-input>

              <t-space style="float: right;">
                <t-button
                    @click="() => { formData.password = forgetDialogResultInput; forgetDialogVisible = false; }"
                >
                  继续登录
                </t-button>
              </t-space>

            </t-space>
          </div>
        </t-dialog>
      </t-col>
      <t-col :span="6">
        <t-form-item style="float: right;">
          <t-button theme="primary" type="submit">登录</t-button>
        </t-form-item>

        <div style="margin: 4px; float: right;"></div>

        <t-form-item style="float: right;">

          <t-button
              variant="text"
              @click="$emit('updateSelected', 'register')"
          >
            注册
          </t-button>

        </t-form-item>

      </t-col>
    </t-row>

  </t-form>
</template>


<script>
import {
  DesktopIcon,
  LockOnIcon,
  SendIcon,
  CheckIcon,
  MailIcon,
  VerifyIcon,
} from 'tdesign-icons-vue';

import api from '@/service';


export default {
  name: 'component_login',
  components: {
    DesktopIcon,
    LockOnIcon,
    SendIcon,
    CheckIcon,
    MailIcon,
    VerifyIcon,
  },
  data() {
    return {
      formData: {
        user: this.$cookies.get('USER_NAME') || '',
        password: '',
        rememberMe: false,
      },
      fromRules: {
        user: [
          {required: true, message: '用户名、邮箱和手机号码总得来一个喵', type: 'error'},
          {validator: this.changeLoginMethod}
        ],
        password: [
          {required: true, message: '密码不能为空', type: 'error'},
        ],
      },
      currentLoginMethod: 1,
      currentLoginHelp: '',

      forgetDialogVisible: false,
      forgetDialogEmailCodeInput: '',
      forgetDialogPassword: '',
      forgetDialogRePassword: '',
      forgetDialogResultInput: null,

      getMailCodeBtnState: 'available',
      getMailCodeBtnTimeout: 0,

      getMailCodeVerifyBtnState: 'available',
      getMailCodeVerifyBtnTimeout: 0,
    }
  },
  methods: {
    getMailCode() {
      if (this.formData.user === '') {
        this.$message.warning('请先输入邮箱地址');
        return;
      }

      const DATA = {
        email: this.formData.user,
        type: 'forgetPassword',
      }

      this.getMailCodeBtnState = 'loading';

      api.userApi.sendMailCode(DATA).then(() => {
        this.$message.success('发送成功');
      }).catch(error => {
        this.$message.error('发送失败：' + error);
      }).finally(() => {
        this.getMailCodeBtnState = 'disabled';
        this.getMailCodeBtnTimeout = 60;

        let timerMailCode = setInterval(() => {
          if (this.getMailCodeBtnTimeout > 0) {
            this.getMailCodeBtnTimeout--;
          } else {
            this.getMailCodeBtnState = 'available';
            clearInterval(timerMailCode);
          }
        }, 1000);
      });
    },

    resetPassword() {
      if (this.formData.user === '') {
        this.$message.warning('请填写验证码');
        return;
      }

      if (this.forgetDialogPassword !== this.forgetDialogRePassword){
        this.$message.warning('两次密码对不上喵');
        return;
      }

      const DATA = {
        email: this.formData.user,
        emailCode: this.forgetDialogEmailCodeInput,
        password: this.forgetDialogPassword,
        rePassword: this.forgetDialogRePassword,
      }

      this.getMailCodeVerifyBtnState = 'loading';

      api.userApi.resetPasswordByMailCode(DATA).then(() => {
        this.$message.success('修改成功');
        this.forgetDialogResultInput = this.forgetDialogRePassword;
      }).catch(error => {
        this.$message.error('修改失败：' + error);
      }).finally(() => {
        this.getMailCodeVerifyBtnState = 'disabled';
        this.getMailCodeVerifyBtnTimeout = 60;

        let timerVerify = setInterval(() => {
          if (this.getMailCodeVerifyBtnTimeout > 0) {
            this.getMailCodeVerifyBtnTimeout--;
          } else {
            this.getMailCodeVerifyBtnState = 'available';
            clearInterval(timerVerify);
          }
        }, 1000);
      });
    },

    changeLoginMethod(val) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (emailPattern.test(val)) {
        this.currentLoginMethod = 0;
        this.currentLoginHelp = '将尝试使用邮箱登录';
        return {result: true};
      } else {
        this.currentLoginMethod = 1;
        this.currentLoginHelp = '将尝试使用用户名登录';
        return {result: true};
      }
    },

    onReset() {
      this.$message.success('重置成功');
    },

    onLogin({validateResult, firstError}) {
      if (validateResult === true) {

        this.$emit('updateLoading', true);

        api.userApi.login(
            {
              userName: this.currentLoginMethod === 1 ? this.formData.user : "",
              email: this.currentLoginMethod === 0 ? this.formData.user : "",
              password: this.formData.password,
              rememberMe: this.formData.rememberMe,
            }
        ).then((data) => {
          this.$message.success(data.data);
          this.$router.push('/portal');
        }).catch(error => {

          this.$message.error('登录失败：' + error);
        }).finally(() => {

          this.$emit('updateLoading', false);

        });

      } else {

        this.$message.warning(firstError);
      }
    },

  },
}
</script>

<style scoped>
.container {
  margin-top: 20px;
  padding: 2px;
}
</style>