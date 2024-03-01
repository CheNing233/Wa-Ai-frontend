<template>
  <div style="margin: 16px 16px;">
    <t-row style="width: 100%; padding-top: 16px; padding-bottom: 48px;" :gutter="[16, 16]">
      <t-col
          flex="1"
      >
        <t-breadcrumb :maxItemWidth="'150'">
          <t-breadcrumbItem :to="{ path: '/portal/' }">首页</t-breadcrumbItem>
          <t-breadcrumbItem :maxWidth="'160'">{{modelDetail.title}}</t-breadcrumbItem>
        </t-breadcrumb>
        <h1 style="word-break: break-all; line-height: 1.2">{{modelDetail.title}}</h1>
        <t-space breakLine :size="2">
          <template #separator>
            <t-divider layout="vertical"/>
          </template>
          <t-tag>
            {{modelDetail.type}}
          </t-tag>

          <div style="display: flex; justify-content: center;">
            <t-avatar size="small">

            </t-avatar>
            <span style="padding-left: 8px;">
              123
            </span>
          </div>

          <span>
            {{modelDetail.updateTime}} 更新
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
            <ThumbUp1Icon slot="icon" shape="square" />
            {{modelDetail.liked}} 点赞
          </t-button>
          <t-button
              variant="outline"
          >
            <StarIcon slot="icon" shape="square" />
            0 收藏
          </t-button>
        </t-space>
      </t-col>
    </t-row>

    <t-row :gutter="[16, 16]">
      <t-col
          :xs="{ span: 12 }"
          :sm="{ span: 12 }"
          :md="{ span: 8 }"
          :lg="{ span: 8 }"
          :xl="{ span: 8 }"
      >
        <t-image
            :src="images[image].src"
            fit="contain"
            shape="round"
            :style="displayMobile ? { aspectRatio: 0.75 } : { aspectRatio: 1.5 }"
            class="image_container"
        />

        <t-card style="margin-top: 24px;">
          <t-row class="image_list">
            <t-col
                flex="shrink"
                v-for="(value, index) in images"
                :key="index"
            >
              <t-image
                  :src="value.src"
                  fit="cover"
                  shape="round"
                  class="image_item"
              >
                <template #overlayContent>
                  <div class="image_overlay" @click="handleListImageOnClick(index)"></div>
                </template>
              </t-image>

            </t-col>
          </t-row>
        </t-card>

      </t-col>
      <t-col
          :span="4"
          :xs="{ span: 12 }"
          :sm="{ span: 12 }"
          :md="{ span: 4 }"
          :lg="{ span: 4 }"
          :xl="{ span: 4 }"
      >

        <t-space direction="vertical" style="width: 100%;">

          <t-descriptions
              :column="1"
              :label-style="{ whiteSpace: 'nowrap', }"
              :content-style="{ wordBreak: 'break-all', whiteSpace: 'normal' }"
          >
            <t-descriptions-item label="运行">某后端又没写</t-descriptions-item>
            <t-descriptions-item label="下载">某后端又没写</t-descriptions-item>
            <t-descriptions-item label="上传时间">{{modelDetail.createTime}}</t-descriptions-item>
            <t-descriptions-item label="模型类型">{{modelDetail.type}}</t-descriptions-item>
            <t-descriptions-item label="具体类别">某后端又没写</t-descriptions-item>
            <t-descriptions-item label="引用名称">{{modelDetail.filename}}</t-descriptions-item>
          </t-descriptions>

          <t-row :gutter="[16, 16]" style="padding: 16px;">
            <t-col flex="1">
              <t-button style="width: 100%;" size="large">
                <ControlPlatformIcon slot="icon"/>
                在线运行
              </t-button>
            </t-col>

            <t-col flex="shrink">
              <t-button variant="outline" style="width: 100%;" size="large">
                分享
              </t-button>
            </t-col>

            <t-col flex="shrink">
              <t-button variant="outline" style="width: 100%;" size="large">
                ...
              </t-button>
            </t-col>
          </t-row>


          <t-space direction="vertical" style="padding: 16px 16px 16px 16px;">
            <t-row :gutter="[16, 16]">
              <t-col flex="1" style="display: flex; align-items: center;">
                <t-tag size="large" variant="outline">
                  <template #icon>
                    <DiscountIcon/>
                  </template>
                  正向提示词（触发词）
                </t-tag>
              </t-col>

              <t-col flex="shrink">
                <t-button variant="outline" style="width: 100%;">
                  复制
                </t-button>
              </t-col>

              <t-col :span="12">
                <t-space breakLine>
                  <t-tag v-for="(value, index) in tags" :key="index" size="large">
                    {{ value }}
                  </t-tag>
                </t-space>
              </t-col>
            </t-row>

            <t-row :gutter="[16, 16]">
              <t-col flex="1" style="display: flex; align-items: center;">
                <t-tag size="large" variant="outline">
                  <template #icon>
                    <DiscountIcon/>
                  </template>
                  反向提示词
                </t-tag>
              </t-col>

              <t-col flex="shrink">
                <t-button variant="outline" style="width: 100%;">
                  复制
                </t-button>
              </t-col>

              <t-col :span="12">
                <t-space breakLine>
                  <t-tag v-for="(value, index) in tags" :key="index" size="large">
                    {{ value }}
                  </t-tag>
                </t-space>
              </t-col>
            </t-row>
          </t-space>

        </t-space>


      </t-col>
    </t-row>
  </div>
</template>


<script>
import {
  ControlPlatformIcon,
  DiscountIcon,

  ThumbUp1Icon,
  StarIcon
} from 'tdesign-icons-vue';

import api from '@/service'

export default {
  name: 'ModelDetail',
  components: {
    ControlPlatformIcon,
    DiscountIcon,

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

      api.modelApi.getSdModelDetail(PARAMS)
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