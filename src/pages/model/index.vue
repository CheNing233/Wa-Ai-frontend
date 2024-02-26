<template>
    <div style="margin: 16px 16px;">
        <t-row style="width: 100%; padding-top: 16px; padding-bottom: 48px;" :gutter="[16, 16]">
            <t-col 
                flex="1"
            >
                <h1>test</h1>
                <t-space breakLine :size="2">
                    <template #separator>
                        <t-divider layout="vertical" />
                    </template>
                    <t-tag>
                        CHECKPOINT
                    </t-tag>
                    
                    <div style="display: flex; justify-content: center;">
                        <t-avatar size="small">

                        </t-avatar>
                        <span style="padding-left: 8px;">
                            123
                        </span>
                    </div>
                    
                    <span>
                        2024年2月24日 07:58 更新
                    </span>
                </t-space>
            </t-col>
            <t-col
                flex="shrink"
                style="padding-top: 16px;"
            >
                <t-button
                  variant="outline"
                >
                    收藏
                </t-button>
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

            <t-descriptions :column="1">
                <t-descriptions-item label="运行">666</t-descriptions-item>
                <t-descriptions-item label="下载">404</t-descriptions-item>
                <t-descriptions-item label="上传时间">2024年2月24日 07:55</t-descriptions-item>
                <t-descriptions-item label="模型类型">CHECKPOINT</t-descriptions-item>
                <t-descriptions-item label="具体类别">SD 1.5</t-descriptions-item>
                <t-descriptions-item label="引用名称">test</t-descriptions-item>
            </t-descriptions>

            <t-row :gutter="[16, 16]" style="padding: 16px;">
                <t-col flex="1">
                    <t-button style="width: 100%;" size="large">
                        <ControlPlatformIcon slot="icon" />
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
              

            <div style="padding: 16px 16px 16px 16px;">
              <t-row :gutter="[16, 16]">
                <t-col flex="1" style="display: flex; align-items: center;">
                  <t-tag size="large" variant="outline">
                    <template #icon>
                      <DiscountIcon />
                    </template>
                    触发词
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
            </div>

          </t-space>
          

        </t-col>
      </t-row>
    </div>
</template>


<script>
import {
  ControlPlatformIcon,
  DiscountIcon
} from 'tdesign-icons-vue';

export default {
  name: 'ModelDetail',
  components: {
    ControlPlatformIcon,
    DiscountIcon
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
    }
  },
  computed: {
    imageDialogDisplay: {
      get: function () {return this.$store.getters.imageDialogGetDisplay},
      set: function (newValue) {this.$store.commit('imageDialogSetDisplay', newValue)}
    },
    displayMobile: function () {return this.$store.getters.getDisplayMobile},
  },
  methods: {
    handleListImageOnClick(i){
      console.log(i);
      this.image=i;
    }
  },
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