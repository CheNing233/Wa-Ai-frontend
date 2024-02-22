<template>
    <t-form 
        :data="formData" 
        :rules="FORM_RULES" 
        ref="form" 
        @reset="onReset"
        @submit="onRegister" 
        :colon="true" 
        :labelWidth="0" 
        class="container"
    >

        <t-form-item name="username">
            <t-input clearable v-model="formData.username" placeholder="请输入用户名">
                <desktop-icon slot="prefix-icon"></desktop-icon>
            </t-input>
        </t-form-item>

        <t-form-item name="nickname">
            <t-input clearable v-model="formData.nickname" placeholder="请输入昵称">
                <UserIcon slot="prefix-icon"></UserIcon>
            </t-input>
        </t-form-item>

        <t-form-item name="email">
            <t-input clearable v-model="formData.email" placeholder="请输入邮箱">
                <MailIcon slot="prefix-icon"></MailIcon>
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
    MailIcon
} from 'tdesign-icons-vue';

import api from '@/service';

const FORM_RULES = {
  username: [
    { required: true, message: '用来登录的用户名，不能不写喵', type: 'error' }
  ],
  nickname: [
    { required: true, message: '昵称必填', type: 'error'  },
  ],
  email: [
    { required: true, message: '邮箱必填' , type: 'error' },
    { email: { ignore_max_length: true }, message: '请输入正确的邮箱地址', type: 'error'  },
  ],
  password: [
    { required: true, message: '密码必填', type: 'error'  },
    { min: 6, message: '密码长度不能小于6位', type: 'error'  },
  ],
  repassword: [
    { required: true, message: '重复密码必填', type: 'error'  },
    { min: 6, message: '密码长度不能小于6位', type: 'error'  },
  ],
};

export default {
  name: 'component_register',
  components: {
    DesktopIcon,
    LockOnIcon,
    UserIcon,
    MailIcon
  },
  data() {
    return {
      formData: {  
        username: this.$cookies.get('USER_NAME') || '',
        nickname: '',
        email: '',
      
        password: '',
        repassword: '',

        token: '',
      },
      FORM_RULES,
    }
  },
  methods: {
    onReset() {
      this.$message.success('重置成功');
    },

    onRegister({ validateResult, firstError }) {
      if (validateResult === true) {

        this.$emit('updateLoading', true);
        console.log(validateResult);
        console.log(this.formData);
        api.userApi.register(
          {
            userName: this.formData.username,
            nickName: this.formData.nickname,
            email: this.formData.email,
            password: this.formData.password,
            rePassword: this.formData.repassword,
          }
        ).then((data) => {
          
          this.$message.success(data.data);
          this.$emit('updateSelected', 'login');
        }).catch(error => {

          this.$message.error('注册失败：'+ error);
        }).finally(() => {

            this.$emit('updateLoading', false);
        });

      }
      else {
        this.$message.warning(firstError);
      }

    },

    twoPwdValidator() {
      if (this.formData.password !== this.formData.rePassword) {
        return false;
      } else{
        return true;
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