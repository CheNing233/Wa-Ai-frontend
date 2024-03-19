<template>
  <t-row :gutter="[16, 16]" class="userinfo_container">
    <t-col :span="12" align="center">
      <t-image
          :style="{ width: '108px', height: '108px' }"
          fit="cover"
          shape="circle"
          :src="avatarUrl"
      />
    </t-col>
    <t-col :span="12" align="center">
      <span> {{ nickName }} </span>
    </t-col>
    <t-col :span="12" align="center">

      <t-card>
        <t-tabs v-model="userTab" align="left" @change="tabChange">

          <t-tab-panel class="detail_container" value="profile" label="个人中心">
            <UserProfile/>
          </t-tab-panel>

          <t-tab-panel disabled value="favourites" label="收藏">
            12345
          </t-tab-panel>

          <t-tab-panel value="images" label="图片">
            <UserImages/>
          </t-tab-panel>

          <t-tab-panel value="posts" label="帖子">
            <UserPosts/>
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

// import api from "@/service";


export default {
  name: 'page-portal',
  components: {
    UserProfile,
    UserImages,
    UserPosts,
  },
  data() {
    return {
      userTab: this.$route.query.filter_name,
    }
  },
  computed: {
    nickName() {
      if (this.$store.getters.userGetInfo === null) {
        return '正在请求...';
      }
      return this.$store.getters.userGetInfo.nickName;
    },
    avatarUrl() {
      if (this.$store.getters.userGetInfo === null) {
        return require('@/assets/placeHolder/card-no-preview.png');
      }
      return this.$store.getters.userGetAvatar;
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
    if (!this.$route.query.filter_name) {
      this.$router.push({path: '/user/center', query: {filter_name: 'profile'}});
    }
  },
  watch: {
    $route() {
      this.userTab = this.$route.query.filter_name;
    }
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