<template>
  <div>
    <t-space direction="vertical" style="display: flex">
      <t-row>
        <t-col :offset="3" :span="6" class="col_container">
          <h1 class="title">登录到 WA<br/>the AI Generation Platform</h1>
        </t-col>
      </t-row>
      <t-row>
        <t-col :offset="3" :span="6" class="col_container">
          <t-card class="login_wrapper">

            <t-loading :loading="isLoading" showOverlay>

              <t-tabs v-model="selectedTab">

                <t-tab-panel label="登录" value="login">

                  <component_login
                      @updateLoading="(loading) => (this.isLoading = loading)"
                      @updateSelected="(selected) => (this.selectedTab = selected)"
                  />

                </t-tab-panel>
                <t-tab-panel label="注册" value="register">

                  <component_register
                      @updateLoading="(loading) => (this.isLoading = loading)"
                      @updateSelected="(selected) => (this.selectedTab = selected)"
                  />

                </t-tab-panel>
              </t-tabs>

            </t-loading>

          </t-card>
        </t-col>
      </t-row>
    </t-space>
  </div>
</template>

<script>
import api from '@/service';

import component_login from './components/login.vue';
import component_register from './components/register.vue';

export default {
  name: 'login-index',
  components: {
    component_login,
    component_register
  },
  data() {
    return {
      selectedTab: 'login',
      isLoading: false,
    }
  },
  methods: {
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
    if(this.$store.getters.userGetInfo !== null){
      this.logout();
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 36px;
  line-height: 44px;
  color: var(--td-text-color-primary);
  margin: 70px;
  text-align: center;
}

.col_container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login_wrapper {
  width: 100%;
  min-width: 320px;
  max-width: 600px;
}

.footer_text {
  font-size: 12px;
  color: #999;
  text-align: center;
  margin-top: 70px;
}

</style>