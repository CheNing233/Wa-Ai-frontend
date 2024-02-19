<template>
    <t-dialog 
      :visible.sync="imageDialogDisplay"
      :footer="false"
      :header="images[image].title"
      mode="full-screen"
    >
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

            <t-card title="正向提示词">
              <t-textarea readonly />
            </t-card>

            <t-card title="负面提示词">
              <t-textarea readonly />
            </t-card>

          </t-space>
          

        </t-col>
      </t-row>
    </t-dialog>
</template>

<script>
export default {
  name: 'componentImageDialog',
  data() {
    return {
      image: 0,
      images: [
        {src: 'https://tdesign.gtimg.com/demo/demo-image-1.png', title: '图片1标题', desc: '图片1描述'},
        {src: 'https://tdesign.gtimg.com/demo/demo-image-2.png', title: '图片2标题', desc: '图片2描述'},
        {src: 'https://tdesign.gtimg.com/demo/demo-image-3.png', title: '图片3标题', desc: '图片3描述'},
      ]
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