<template>
  <div>
    <div :class="[isDarkMode ? 'background_dark' : 'background']"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import api from '@/service'

export default {
  name: 'App',
  components: {},
  computed: {
    isDarkMode() {
      return this.$store.getters.userGetDarkMode;
    }
  },
  methods: {
    handleResize() {
      var oldDisplayMobile = this.$store.getters.getDisplayMobile;
      if (window.innerWidth <= 768)
        this.$store.commit('setDisplayMobile', true);
      else
        this.$store.commit('setDisplayMobile', false);

      if (oldDisplayMobile != this.$store.getters.getDisplayMobile)
        if (this.$store.getters.getDisplayMobile)
          this.$store.commit('workbenchSetPlacement', 'top');
        else
          this.$store.commit('workbenchSetPlacement', 'right');

    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize(); // 初始加载时触发一次

    api.userApi.isLogin().then(resp => {
      console.log('应用创建登录检查', resp)
    }).catch(err => {
      console.error('应用创建登录检查', err)
    });

  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
}
</script>

<style>
body {
  margin: 0px 0px 0px 0px;
  overflow-x: hidden;
  overflow-y: scroll;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: rgb(44, 44, 44);
  background: -webkit-linear-gradient(top, transparent 19px, #e7e7e7 20px),
  -webkit-linear-gradient(left, transparent 19px, #e7e7e7 20px);
  background-size: 20px 20px;

  z-index: -1;
}

.background_dark {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: -webkit-linear-gradient(top, transparent 19px, rgb(63, 63, 63) 20px),
  -webkit-linear-gradient(left, transparent 19px, rgb(63, 63, 63) 20px);
  background-size: 20px 20px;
  background-color: #323232;

  z-index: -1;
}


::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0);
  border-radius: 0;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 5px;
//background: rgba(69, 130, 230, 0.7); background: rgba(100, 100, 100, 0.7); transition: color 0.2s ease;
}
</style>