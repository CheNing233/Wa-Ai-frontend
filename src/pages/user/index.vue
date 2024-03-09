<template>
  <t-row :gutter="[16, 16]" class="userinfo_container">
    <t-col :span="12" align="center">
      <t-image
          :style="{ width: '108px', height: '108px' }"
          fit="cover"
          shape="circle"
          src="https://tdesign.gtimg.com/demo/demo-image-1.png"
      />
    </t-col>
    <t-col :span="12" align="center">
      <span> {{ userInfo.username }} </span>
    </t-col>
    <t-col :span="12" align="center">

      <t-card>
        <t-tabs v-model="userTab" align="left" @change="tabChange">

          <t-tab-panel class="detail_container" label="个人中心" value="profile">
            <UserProfile/>
          </t-tab-panel>

          <t-tab-panel label="我的收藏" value="likes">
            12345
          </t-tab-panel>

          <t-tab-panel :value="filterType.Image" label="我的生成">
            <UserGenerate :props="{ name: filterType.Image }"/>
          </t-tab-panel>

          <t-tab-panel label="我的预设" value="presets">
            12345
          </t-tab-panel>

          <t-tab-panel label="我的帖子" value="imgposts">
            12345
          </t-tab-panel>

          <t-tab-panel label="我的模型" value="sdmodels">
            12345
          </t-tab-panel>

        </t-tabs>
      </t-card>

    </t-col>
  </t-row>
</template>

<script>
import UserProfile from './components/profile.vue'
import UserGenerate from './components/generate.vue';

import {UserModelsTypes} from '@/config/UserModelsTypes.js';

import api from '@/service';

export default {
  name: 'page-portal',
  components: {
    UserProfile,
    UserGenerate
  },
  data() {
    return {
      filterType: UserModelsTypes,
      userTab: 'profile',

      userInfo: {
        username: '正在请求...',
        nickname: '正在请求...',
        email: '正在请求...',
        gender: '正在请求...',
        describe: '正在请求...',
      },
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
    getUserInfo() {
      api.userApi.me().then(resp => {
        if (resp.data == null) {
          return;
        }
        this.userInfo = {
          username: resp.data.userName || '',
          nickname: resp.data.nickName || '',
          email: resp.data.email || '',
          gender: '武装直升机',
          describe: resp.data.description || ''
        };
      })
          .catch(err => {
            this.$message.error("获取数据失败: " + err)
          });
    },
  },
  created() {
    this.getUserInfo()
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