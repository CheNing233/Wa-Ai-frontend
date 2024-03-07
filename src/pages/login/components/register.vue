<template>
  <t-form
      :data="formData"
      :rules="fromRules"
      ref="form"
      @reset="onReset"
      @submit="onRegister"
      :colon="true"
      :labelWidth="0"
      class="container"
  >

    <t-row :gutter="[16,24]" style="width: calc(100% + 16px); padding-bottom: 24px;">

      <t-col
          :xs="{ span: 12}"
          :md="{ span: 6 }"
      >
        <t-form-item name="username">
          <t-input clearable v-model="formData.username" placeholder="请输入用户名">
            <desktop-icon slot="prefix-icon"></desktop-icon>
          </t-input>
        </t-form-item>
      </t-col>

      <t-col
          :xs="{ span: 12}"
          :md="{ span: 6 }"
      >
        <t-form-item name="nickname">
          <t-input clearable v-model="formData.nickname" placeholder="请输入昵称">
            <UserIcon slot="prefix-icon"></UserIcon>
          </t-input>
        </t-form-item>
      </t-col>

    </t-row>


    <t-form-item name="email">
      <t-row :gutter="[16,24]" style="width: 100%">
        <t-col :flex="1">
          <t-input clearable v-model="formData.email" placeholder="请输入邮箱">
            <MailIcon slot="prefix-icon"></MailIcon>
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
    </t-form-item>

    <t-form-item name="emailCode">
      <t-input clearable v-model="formData.emailCode" placeholder="请输入邮箱验证码">
        <VerifyIcon slot="prefix-icon"/>
      </t-input>
    </t-form-item>


    <t-form-item name="password">
      <t-input type="password" clearable v-model="formData.password" placeholder="请输入密码">
        <lock-on-icon slot="prefix-icon"></lock-on-icon>
      </t-input>
    </t-form-item>

    <t-form-item name="repassword">
      <t-input type="password" clearable v-model="formData.repassword" placeholder="重复你的密码">
        <lock-on-icon slot="prefix-icon"></lock-on-icon>
      </t-input>
    </t-form-item>

    <t-row style="margin-top: 20px; margin-bottom: 20px;">

      <t-col :span="6">
        <t-form-item style="float: left;">
          <t-button
              variant="outline"
              @click="$emit('updateSelected', 'login')"
          >
            已经有账号？返回登录
          </t-button>
        </t-form-item>
      </t-col>

      <t-col :span="6">
        <t-form-item style="float: right;">
          <t-button theme="primary" type="submit">注册</t-button>
        </t-form-item>
      </t-col>

    </t-row>

  </t-form>
</template>


<script>

import {
  DesktopIcon,
  LockOnIcon,
  UserIcon,
  MailIcon,
  VerifyIcon,
  SendIcon,
  CheckIcon,
} from 'tdesign-icons-vue';

import api from '@/service';


export default {
  name: 'component_register',
  components: {
    DesktopIcon,
    LockOnIcon,
    UserIcon,
    MailIcon,
    VerifyIcon,
    SendIcon,
    CheckIcon,
  },
  data() {
    return {
      formData: {
        username: this.$cookies.get('USER_NAME') || '',
        nickname: '',
        email: '',
        emailCode: '',
        password: '',
        repassword: '',
      },
      fromRules: {
        username: [
          {required: true, message: '用来登录的用户名，不能不写喵', type: 'error'}
        ],
        nickname: [
          {required: true, message: '昵称必填', type: 'error'},
        ],
        email: [
          {required: true, message: '邮箱必填', type: 'error'},
          {email: {ignore_max_length: true}, message: '请输入正确的邮箱地址', type: 'error'},
        ],
        emailCode: [
          {required: true, message: '邮箱验证码必填', type: 'error'},
        ],
        password: [
          {required: true, message: '密码必填', type: 'error'},
          {min: 6, message: '密码长度不能小于6位', type: 'error'},
        ],
        repassword: [
          {required: true, message: '重复密码必填', type: 'error'},
          {min: 6, message: '密码长度不能小于6位', type: 'error'},
          {validator: this.twoPwdValidator}
        ],
      },
      getMailCodeBtnState: 'available',
      getMailCodeBtnTimeout: 0,
    }
  },
  methods: {
    getMailCode() {
      if (this.formData.email === '') {
        this.$message.warning('请先输入邮箱地址');
        return;
      }

      const DATA = {
        email: this.formData.email,
        type: 'register',
      }

      this.getMailCodeBtnState = 'loading';

      api.userApi.sendMailCode(DATA).then(() => {
        this.$message.success('发送成功');
      }).catch(error => {
        this.$message.error('发送失败：' + error);
      }).finally(() => {
        this.getMailCodeBtnState = 'disabled';
        this.getMailCodeBtnTimeout = 60;

        const timer = setInterval(() => {
          if (this.getMailCodeBtnTimeout > 0) {
            this.getMailCodeBtnTimeout--;
          } else {
            this.getMailCodeBtnState = 'available';
            clearInterval(timer);
          }
        }, 1000);
      });

    },

    onReset() {
      this.$message.success('重置成功');
    },

    onRegister({validateResult, firstError}) {
      if (validateResult === true) {

        this.$emit('updateLoading', true);

        api.userApi.register(
            {
              userName: this.formData.username,
              nickName: this.formData.nickname,
              email: this.formData.email,
              emailCode: this.formData.emailCode,
              password: this.formData.password,
              rePassword: this.formData.repassword,
            }
        ).then((data) => {

          this.$message.success(data.data);
          this.$emit('updateLoading', false);
          this.$emit('updateSelected', 'login');
        }).catch(error => {

          this.$message.error('注册失败：' + error);
        }).finally(() => {

          this.$emit('updateLoading', false);
        });

      } else {
        this.$message.warning(firstError);
      }

    },

    twoPwdValidator(val) {
      if (this.formData.password === val) {
        return {result: true, message: 'O了，一定要记住喵', type: 'success'};
      } else {
        return {result: false, message: '两次密码对不上喵', type: 'error'};
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