<template>
  <div style="margin: 16px 16px;">
    <t-row :gutter="[16, 16]" style="width: 100%; padding-top: 16px; padding-bottom: 48px;">
      <t-col
          flex="1"
      >
        <t-breadcrumb :maxItemWidth="'150'">
          <t-breadcrumbItem :to="{ path: '/portal/' }">首页</t-breadcrumbItem>
          <t-breadcrumbItem :maxWidth="'160'">{{ modelDetail.title }}</t-breadcrumbItem>
        </t-breadcrumb>
        <h1 style="word-break: break-all; line-height: 1.2">{{ modelDetail.title }}</h1>
        <t-space :size="2" breakLine>
          <template #separator>
            <t-divider layout="vertical"/>
          </template>
          <t-tag>
            {{ modelDetail.type }}
          </t-tag>

          <div style="display: flex; justify-content: center;">
            <t-avatar size="small">

            </t-avatar>
            <span style="padding-left: 8px;">
              123
            </span>
          </div>

          <span>
            {{ modelDetail.updateTime }} 更新
          </span>
        </t-space>
      </t-col>
      <t-col
          flex="shrink"
          style="padding-top: 16px;"
      >
        <t-space breakLine>
          <t-button
              variant="outline"
          >
            <ThumbUp1Icon slot="icon" shape="square"/>
            {{ modelDetail.liked }} 点赞
          </t-button>
          <t-button
              variant="outline"
          >
            <StarIcon slot="icon" shape="square"/>
            0 收藏
          </t-button>
        </t-space>
      </t-col>
    </t-row>

    <t-row :gutter="[16, 16]">
      <t-col
          :span="12"
      >
        <t-image
            :src="images[image].src"
            class="image_container"
            fit="contain"
            shape="round"
        />

        <t-card style="margin-top: 24px;">
          <t-row class="image_list">
            <t-col
                v-for="(value, index) in images"
                :key="index"
                flex="shrink"
            >
              <t-image
                  :src="value.src"
                  class="image_item"
                  fit="cover"
                  shape="round"
              >
                <template #overlayContent>
                  <div class="image_overlay" @click="handleListImageOnClick(index)"></div>
                </template>
              </t-image>

            </t-col>
          </t-row>
        </t-card>

      </t-col>
    </t-row>
  </div>
</template>


<script>
import {StarIcon, ThumbUp1Icon} from 'tdesign-icons-vue';

import api from '@/service'

export default {
  name: 'PostDetail',
  components: {
    ThumbUp1Icon,
    StarIcon
  },
  data() {
    return {
      image: 0,
      images: [
        {src: 'https://tdesign.gtimg.com/demo/demo-image-1.png', title: '图片1标题', desc: '图片1描述'},
        {src: 'https://tdesign.gtimg.com/demo/demo-image-2.png', title: '图片2标题', desc: '图片2描述'},
        {src: 'https://tdesign.gtimg.com/demo/demo-image-3.png', title: '图片3标题', desc: '图片3描述'},
        {src: 'https://tdesign.gtimg.com/demo/demo-image-3.png', title: '图片3标题', desc: '图片3描述'},
        {src: 'https://tdesign.gtimg.com/demo/demo-image-3.png', title: '图片3标题', desc: '图片3描述'},
        {src: 'https://tdesign.gtimg.com/demo/demo-image-3.png', title: '图片3标题', desc: '图片3描述'},
        {src: 'https://tdesign.gtimg.com/demo/demo-image-3.png', title: '图片3标题', desc: '图片3描述'},
        {src: 'https://tdesign.gtimg.com/demo/demo-image-3.png', title: '图片3标题', desc: '图片3描述'},
        {src: 'https://tdesign.gtimg.com/demo/demo-image-3.png', title: '图片3标题', desc: '图片3描述'},
        {src: 'https://tdesign.gtimg.com/demo/demo-image-3.png', title: '图片3标题', desc: '图片3描述'},
        {src: 'https://tdesign.gtimg.com/demo/demo-image-3.png', title: '图片3标题', desc: '图片3描述'},
      ],

      tags: [
        'tag1',
        'tag2',
        'tag3',
        'tag4',
        'tag5',
        'tag6',
        'tag7',
        'tag8',
        'tag9',
        'tag10',
      ],

      modelId: null,
      modelDetail: {},
    }
  },
  computed: {
    imageDialogDisplay: {
      get: function () {
        return this.$store.getters.imageDialogGetDisplay
      },
      set: function (newValue) {
        this.$store.commit('imageDialogSetDisplay', newValue)
      }
    },
    displayMobile: function () {
      return this.$store.getters.getDisplayMobile
    },
  },
  methods: {
    freshPage() {
      const PARAMS = {
        id: this.modelId,
      };

      api.sdModelApi.getSdModelDetail(PARAMS)
          .then(resp => {
            this.modelDetail = resp.data;
          })
          .catch(err => {
            this.$message.error("获取数据失败: " + err)
          });

    },

    handleListImageOnClick(i) {
      console.log(i);
      this.image = i;
    }
  },
  created() {
    this.modelId = this.$router.currentRoute.query.id;
    this.freshPage();
  }
}
</script>


<style scoped>

.image_container {
  width: 100%;
  height: 100vh;
}

.image_overlay {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.image_list {
  flex-wrap: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  width: 100%;
  justify-content: flex-start;

  padding-top: 8px;
  padding-bottom: 8px;

}

.image_item {
  width: 100px;
  height: 100px;
  margin-right: 8px;
}

</style>