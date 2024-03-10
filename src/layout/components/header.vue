<template>
  <t-head-menu
      v-model="headMenuValue"
      class="menu-container"
      :class="[darkMode ? 'menu-container-dark' : null]"
      theme="light"
      @change="handleMenu"
  >
    <h2 class="logo">{{ displayMobile ? 'WA' : 'WA酱' }}</h2>
    <t-submenu v-show="displayMobile" value="mobile_sub">
      <template #title>
        <ListIcon size="16" style="margin-top: 2px"/>
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

        <t-button disabled v-show="!displayMobile" shape="square" variant="text">
          <LogoGithubIcon slot="icon" shape="square"/>
        </t-button>

        <t-button disabled shape="square" variant="text">
          <NotificationIcon slot="icon" shape="square"/>
        </t-button>

        <t-button theme="primary" @click="handleBtnWorkbenchClick">
          <LoadingIcon v-if="workbenchLoading" slot="icon" shape="square"/>
          <ControlPlatformIcon v-else slot="icon" shape="square"/>
          {{ displayMobile ? (isLogin ? '运行' : '登录') : (isLogin ? '在线运行' : '登录后在线运行') }}
        </t-button>


        <t-dropdown :min-column-width="188">

          <t-button
              shape="square"
              variant="text"
              @click="fresh"
          >
            <t-avatar slot="icon" shape="round">
              WA
            </t-avatar>
          </t-button>

          <template #dropdown>
            <t-dropdown-menu>

              <t-dropdown-item
                  v-if="isLogin"
                  :value="1"
                  @click="$router.push('/user')"
              >
                <UserIcon slot="prefix-icon"/>
                个人中心
              </t-dropdown-item>

              <t-dropdown-item :value="5" @click="() => darkMode = !darkMode">
                <SunnyIcon v-if="!darkMode" slot="prefix-icon"/>
                <MoonIcon v-else slot="prefix-icon"/>
                深色模式
                <t-switch :value="darkMode" style="float: right;"></t-switch>
              </t-dropdown-item>

              <t-dropdown-item v-if="false" :value="6">
                <SettingIcon slot="prefix-icon"/>
                设置
              </t-dropdown-item>

              <t-dropdown-item :value="7" @click="$router.push('/login')">
                <LoginIcon v-if="!isLogin" slot="prefix-icon"/>
                <LogoutIcon v-else slot="prefix-icon"/>
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
  ControlPlatformIcon,
  ListIcon,
  LoadingIcon,
  LoginIcon,
  LogoGithubIcon,
  LogoutIcon,
  MoonIcon,
  NotificationIcon,
  SettingIcon,
  SunnyIcon,
  UserIcon,
} from 'tdesign-icons-vue';

import {mapState} from 'vuex';

import {NavItems} from '@/config/NavConfig.js';


export default {
  name: 'componentHeader',
  components: {
    LogoGithubIcon,
    ControlPlatformIcon,
    UserIcon,
    NotificationIcon,
    LoadingIcon,
    ListIcon,
    SunnyIcon,
    MoonIcon,
    SettingIcon,
    LoginIcon,
    LogoutIcon,
  },
  data() {
    return {
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
      get: function () {
        return this.$store.getters.workbenchGetDisplay
      },
      set: function (newValue) {
        this.$store.commit('workbenchSetDisplay', newValue)
      }
    },
    isLogin() {
      return this.$store.getters.userGetInfo !== null;
    },
    darkMode: {
      get: function () {
        return this.$store.getters.userGetDarkMode;
      },
      set: function (newValue) {
        this.$store.commit('userSetDarkMode', newValue)
      }
    },
  },
  methods: {
    fresh() {
      this.headMenuValue = this.$route.path;
    },
    handleMenu(value) {
      this.$router.push(value);
    },
    handleBtnWorkbenchClick() {
      if (this.isLogin) {
        this.workbenchDisplay = !this.workbenchDisplay;
      } else {
        this.$message.info('登录后可免费在线画图，快去登录喵~')
        this.$router.push('/login');
      }
    },
  },
  watch: {
    $route() {
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

.menu-container-dark {
  box-shadow: 0px 8px 8px rgba(16, 10, 0, 0.2);
}
</style>                
