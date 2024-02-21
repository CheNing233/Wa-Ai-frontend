<template>
  <t-loading :loading="loading" showOverlay>

    <t-tabs v-model="value">

      <t-tab-panel value="1" label="登录">
        <t-form v-if="value === '1'" :data="formData" :rules="FORM_RULES" ref="form" @reset="onReset" @submit="onLogin"
          :colon="true" :labelWidth="0" class="container">

          <t-form-item name="username">
            <t-input clearable v-model="formData.username" placeholder="请输入用户名、邮箱、手机号码">
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
              <t-checkbox>记住我</t-checkbox>
            </t-col>
            <t-col :span="9">

              <span><t-link theme="primary" style="float: right;">游客进入</t-link></span>

              <div style="margin-left: 2px; margin-right: 2px; float: right;">
                <t-divider layout="vertical" />
              </div>

              <span><t-link theme="primary" style="float: right;">微信扫一扫</t-link></span>

            </t-col>
          </t-row>

          <t-row style="margin-top: 20px;">

            <t-col :span="6">
              <t-form-item>
                <t-popup placement="right" content="救不了喵，请联系管理员" showArrow>
                  <t-button variant="outline" @click="logout">忘记一些东西？</t-button>
                </t-popup>
              </t-form-item>

            </t-col>
            <t-col :span="6">
              <t-form-item style="float: right;">
                <t-button theme="primary" type="submit">登录</t-button>
              </t-form-item>

              <div style="margin: 4px; float: right;"></div>

              <t-form-item style="float: right;">
                <t-popup placement="left" content="不开放注册喵" showArrow>
                  <t-button variant="text">注册</t-button>
                </t-popup>
              </t-form-item>

            </t-col>
          </t-row>

        </t-form>

      </t-tab-panel>

      <t-tab-panel value="register" label="注册">
        <t-form v-if="value === 'register'" :data="formData" :rules="FORM_RULES" ref="form" @reset="onReset" @submit="onRegister"
          :colon="true" :labelWidth="0" class="container">

          <t-form-item name="username">
            <t-input clearable v-model="formData.username" placeholder="请输入用户名">
              <desktop-icon slot="prefix-icon"></desktop-icon>
            </t-input>
          </t-form-item>

          <t-form-item name="nickname">
            <t-input clearable v-model="formData.nickname" placeholder="请输入昵称">
              <desktop-icon slot="prefix-icon"></desktop-icon>
            </t-input>
          </t-form-item>

          <t-form-item name="email">
            <t-input clearable v-model="formData.email" placeholder="请输入邮箱">
              <desktop-icon slot="prefix-icon"></desktop-icon>
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

          <t-row>
            <t-col :span="3">
              <t-checkbox>30天免登录</t-checkbox>
            </t-col>
            <t-col :span="9">

              <span><t-link theme="primary" style="float: right;">游客进入</t-link></span>

              <div style="margin-left: 2px; margin-right: 2px; float: right;">
                <t-divider layout="vertical" />
              </div>

              <span><t-link theme="primary" style="float: right;">微信扫一扫</t-link></span>

            </t-col>
          </t-row>

          <t-row style="margin-top: 20px;">

            <t-col :span="6">
              <t-form-item>
                <t-popup placement="right" content="救不了喵，请联系管理员" showArrow>
                  <t-button variant="outline" @click="logout">忘记一些东西？</t-button>
                </t-popup>
              </t-form-item>

            </t-col>
            <t-col :span="6">
              <t-form-item style="float: right;">
                <t-button theme="primary" type="submit">登录</t-button>
              </t-form-item>

              <div style="margin: 4px; float: right;"></div>

              <t-form-item style="float: right;">
                <t-popup placement="left" content="不开放注册喵" showArrow>
                  <t-button variant="text">注册</t-button>
                </t-popup>
              </t-form-item>

            </t-col>
          </t-row>

        </t-form>

      </t-tab-panel>

      <t-tab-panel value="2" label="Token">

        <t-form v-if="value === '2'" :data="formData" :rules="FORM_RULES" ref="form" @reset="onReset" @submit="onSubmit"
          :colon="true" :labelWidth="0" class="container">

          <t-form-item name="token">
            <t-input type="token" clearable v-model="formData.token" placeholder="请输入Token">
              <VerifyIcon slot="prefix-icon"></VerifyIcon>
            </t-input>
          </t-form-item>



          <t-row style="margin-top: 20px;">

            <t-col :span="6">
              <t-form-item>
                <t-button variant="outline">这是什么？</t-button>
              </t-form-item>

            </t-col>
            <t-col :span="6">
              <t-form-item style="float: right;">
                <t-button theme="primary" type="submit">登录</t-button>
              </t-form-item>
            </t-col>
          </t-row>

        </t-form>

      </t-tab-panel>


      <t-tab-panel value="3" label="2FA">
        <p v-if="value === '3'">正在开发...</p>
      </t-tab-panel>

    </t-tabs>
  </t-loading>
</template>

<script>

import { DesktopIcon, LockOnIcon, VerifyIcon } from 'tdesign-icons-vue';

import api from '@/service';

const FORM_RULES = {
  username: [{ required: true, message: '用户名、邮箱和手机号码总得来一个喵', type: 'error' }],
  token: [{ required: true, message: '没有空的Token喵', type: 'error' }],
};

export default {
  name: 'component-login',
  components: {
    DesktopIcon,
    LockOnIcon,
    VerifyIcon,
  },
  data() {
    return {
      value: '1',
      loading: false,
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

    onLogin({ validateResult, firstError }) {
      if (validateResult === true) {
        this.loading = true;

        api.userApi.login(
          {
            userName: this.formData.username,
            email: "",
            password: this.formData.password,
          }
        ).then((data) => {
          
          this.$message.success(data.data);
          this.$router.push('/portal');
        }).catch(error => {

          this.$message.error('登录失败：'+ error);
        }).finally(() => {

          this.loading = false;
        });

      } else {

        this.$message.warning(firstError);
      }
    },

    onRegister({ validateResult, firstError }) {
      if (validateResult === true) {

        this.loading = true;

        api.userApi.register(
          {
            userName: this.formData.username,
            nickname: this.formData.nickname,
            email: this.formData.email,
            password: this.formData.password,
            repassword: this.formData.repassword,
          }
        ).then((data) => {
          
          this.$message.success(data.data);
          this.$router.push('/portal');
        }).catch(error => {

          this.$message.error('注册失败：'+ error);
        }).finally(() => {

          this.loading = false;
        });

      }
      else {
        this.$message.warning(firstError);
      }
    },

    logout() {
      const confirmDia = this.$dialog.confirm({
        header: '登出确认',
        body: '您已登录，是否要登出？',
        confirmBtn: '登出',
        cancelBtn: '取消',
        onConfirm: () => {
          api.userApi.logout()
            .then((data) => {

              this.$message.success(data.data);
            })
            .catch((error) => {

              this.$message.error('登出失败：' + error);
            });

            confirmDia.destroy();
          },
          onClose: () => {
            
            this.$router.back();
            confirmDia.destroy();
          },
        });
    }
  },
  created() {
    
    api.userApi.me()
      .then(() => {
        this.logout();
      })
      .catch(()=>{});

  },
}
</script>

<style scoped>
.container {
  margin-top: 20px;
  padding: 2px;
}
</style>