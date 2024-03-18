<template>
  <t-row :gutter="[16, 16]" class="userinfo_container">
    <t-col :span="12" align="center">
      <t-image
          :style="{ width: '108px', height: '108px' }"
          fit="cover"
          shape="circle"
          :src="require('@/assets/placeHolder/card-no-preview.png')"
      />
    </t-col>
    <t-col :span="12" align="center">
      <span> {{ nickName }} </span>
    </t-col>
    <t-col :span="12" align="center">

      <t-card>
        <t-tabs v-model="userTab" align="left" @change="tabChange">

          <t-tab-panel class="detail_container" label="个人中心" value="profile">
            <UserProfile/>
          </t-tab-panel>

          <t-tab-panel disabled label="我的收藏" value="likes">
            12345
          </t-tab-panel>

          <t-tab-panel :value="filterType.Image" label="我的图片">
            <UserImages :props="{ name: filterType.Image }"/>
          </t-tab-panel>

          <t-tab-panel :value="filterType.Post" label="我的帖子">
            <UserPosts />
          </t-tab-panel>

        </t-tabs>
      </t-card>

    </t-col>
  </t-row>
</template>

<script>
import UserProfile from './components/profile.vue'
import UserImages from './components/images.vue';
import UserPosts from './components/posts.vue'

import {UserModelsTypes} from '@/config/UserModelsTypes.js';


export default {
  name: 'page-portal',
  components: {
    UserProfile,
    UserImages,
    UserPosts,
  },
  data() {
    return {
      filterType: UserModelsTypes,
      userTab: 'profile',
    }
  },
  computed: {
    nickName() {
      if (this.$store.getters.userGetInfo === null) {
        return '正在请求...';
      }
      return this.$store.getters.userGetInfo.nickName;
    }
  },
  methods: {
    tabChange() {
      this.$router.push({
        path: '/user/center',
        query: {
          filter_name: this.userTab,
        }
      });
    },
  },
  created() {
  }
}
</script>

<style scoped>
.userinfo_container {
  padding-top: 32px;
  padding-bottom: 32px;
  width: 100%;
}

.userinfo_container span {
  font-size: 32px;
}

.detail_container {
  padding: 16px;
}
</style>