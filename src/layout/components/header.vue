<template>
  <t-head-menu 
    theme="light" 
    class="menu-container" 
    v-model="headMenuValue"
    @change="handleMenu"
  >
    <h2 class="logo">{{ displayMobile ? 'WA' : 'WA酱' }}</h2>
    <t-submenu v-show="displayMobile" value="mobile_sub">
      <template #title>
        <ListIcon size="16" style="margin-top: 2px" />
      </template>
      <t-menu-item v-for="item in menu_items" :key="item.value" :value="item.value">
        {{ item.label }}
      </t-menu-item>

    </t-submenu>

    <div v-show="!displayMobile" style="display: flex;">
      <t-menu-item v-for="item in menu_items" :key="item.value" :value="item.value">
        {{ item.label }}
      </t-menu-item>
    </div>


    <template #operations>
      <t-space :size="8">

        <t-button v-show="!displayMobile" variant="text" shape="square">
          <LogoGithubIcon slot="icon" shape="square" />
        </t-button>

        <t-button variant="text" shape="square" @click="test">
          <NotificationIcon slot="icon" shape="square" />
        </t-button>

        <t-button theme="primary" @click="handleBtnWorkbenchClick">
          <LoadingIcon v-if="workbenchLoading" slot="icon" shape="square" />
          <ControlPlatformIcon v-else slot="icon" shape="square" />
          {{ displayMobile ? '运行' : '在线运行' }}
        </t-button>


        
        <t-dropdown :min-column-width="188">

          <t-button 
            variant="outline" 
            shape="square"
           
          >
            <UserIcon slot="icon" shape="square" />
          </t-button>
          
          <template #dropdown>
            <t-dropdown-menu>

              <t-dropdown-item 
                v-if="isLogin"
                :value="1" 
                @click="$router.push('/user')"
              >
                个人中心
              </t-dropdown-item>

              <t-dropdown-item :value="5">
                深色模式
                <t-switch style="float: right;"></t-switch>
              </t-dropdown-item>

              <t-dropdown-item :value="6">设置</t-dropdown-item>

              <t-dropdown-item :value="7" @click="$router.push('/login')">
                {{ isLogin ? '退出登录' : '登录' }}
              </t-dropdown-item>
              
            </t-dropdown-menu>
          </template>

        </t-dropdown>

      </t-space>
    </template>
  </t-head-menu>
</template>

<script>
import {
  LogoGithubIcon,
  ControlPlatformIcon,
  UserIcon,
  NotificationIcon,
  LoadingIcon,
  ListIcon,
} from 'tdesign-icons-vue';

import {
  // mapGetters,
  mapState
} from 'vuex';

import { NavItems } from '@/config/NavConfig.js';
// import { getUserPromptPresets } from '@/api/get_sdmodels_list.js';

import api from '@/service';

export default {
  name: 'componentHeader',
  components: {
    LogoGithubIcon,
    ControlPlatformIcon,
    UserIcon,
    NotificationIcon,
    LoadingIcon,
    ListIcon,
  },
  data() {
    return {
      isLogin: false,
      headMenuValue: '',
      menu_items: NavItems,
    };
  },
  computed: {
    ...mapState({
      workbenchLoading: state => state.Workbench.loading,
      displayMobile: state => state.FlexSize.displayMobile
    }),
    workbenchDisplay: {
      get: function () {return this.$store.getters.workbenchGetDisplay},
      set: function (newValue) {this.$store.commit('workbenchSetDisplay', newValue)}
    }
  },
  methods: {
    fresh() {
      api.userApi.isLogin().then(resp => {
        if (resp) {
          this.isLogin = resp.data;
          console.log("islogin", resp.data);
        }
      })
    },
    handleMenu(value) {
      this.$router.push(value);
    },
    handleBtnWorkbenchClick() {
      if (this.workbenchDisplay) 
        this.workbenchDisplay = false;
      else 
        this.workbenchDisplay = true;
    },
    test(){
      // const userinfo = this.$store.getters.userInfo;

      // getUserPromptPresets(userinfo.username, userinfo.usertoken).then(resp => {
      //   console.log(resp);
      // }).catch(err => {
      //   console.log(err);
      // });

    },
    handleBtnUserClick(){
      this.$router.push('/login');
    }
  },
  watch:{
    $route(){
      this.fresh();
    }
  },
  mounted() {
    this.fresh();
  },
};
</script>

<style>
.logo {
  padding-right: 20px;
  white-space: nowrap;
}

.menu-container {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;
  box-shadow: 0px 8px 8px rgba(204, 204, 204, 0.2);
}
</style>                
