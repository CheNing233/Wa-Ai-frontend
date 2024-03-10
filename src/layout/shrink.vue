<template>
  <div>
    <componentHeader></componentHeader>

    <t-row style="width: 100%; padding-left: 16px; padding-right: 16px; padding-top: 32px">
      <t-col
          :xs="{ offset: 0, span: 12 }"
          :sm="{ offset: 1, span: 10 }"
          :md="{ offset: 2, span: 8 }"
          :lg="{ offset: 3, span: 6 }"
          :xl="{ offset: 3, span: 6 }"
          :xxl="{ offset: 3, span: 6 }"
      >
        <router-view :class="displayMobile ? null : 'container'"/>
      </t-col>
    </t-row>

    <componentFooter></componentFooter>

    <router-view v-if="isLogin" name="componentWorkbench"/>

    <router-view name="componentImageDialog"/>

    <t-back-top
        :offset="[0, 0]"
        :visible-height="0"
        size="small"
        style="position: sticky; left: calc(100% - 56px); bottom: 8px;"
    >

    </t-back-top>
  </div>
</template>

<script>
import componentHeader from './components/header.vue';
import componentFooter from './components/footer.vue';

export default {
  name: 'layout-shrink',
  computed: {
    displayMobile: function () {
      return this.$store.getters.getDisplayMobile
    },
    isLogin() {
      return this.$store.getters.userGetInfo !== null;
    }
  },
  components: {
    componentHeader,
    componentFooter,
  },
  methods: {
    handleMenu(value) {
      this.$router.push(value);
    },
  },
}
</script>

<style scoped>
.container {
  padding-left: 48px;
  padding-right: 48px;
}
</style>