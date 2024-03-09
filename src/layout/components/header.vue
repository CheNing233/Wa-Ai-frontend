<template>
  <t-head-menu
      v-model="headMenuValue"
      class="menu-container"
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

        <t-button v-show="!displayMobile" shape="square" variant="text">
          <LogoGithubIcon slot="icon" shape="square"/>
        </t-button>

        <t-button shape="square" variant="text">
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
              variant="outline"
              @click="fresh"
          >
            <UserIcon slot="icon" shape="square"/>
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
  ControlPlatformIcon,
  ListIcon,
  LoadingIcon,
  LogoGithubIcon,
  NotificationIcon,
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
    }
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
</style>                
