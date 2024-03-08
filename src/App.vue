<template>
  <div>
    <div class="background"></div>
    <router-view></router-view>
  </div>
</template>

<script>

// 设置暗色模式
// document.documentElement.setAttribute('theme-mode', 'dark');


export default {
  name: 'App',
  components: {},
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
  /* background:
    -webkit-linear-gradient(top, transparent 19px,  rgb(63, 63, 63) 20px),
    -webkit-linear-gradient(left, transparent 19px, rgb(63, 63, 63) 20px);
  background-size: 20px 20px;
  background-color: #323232; */
  z-index: -1;
}

.t-card__body {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 16px;
  padding-right: 16px;
}
</style>