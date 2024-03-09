<template>
  <t-row>
    <t-col :span="12">
      <div ref="wa_container" style="width: 100%">
        <t-space direction="vertical" style="width: 100%">
          <componentSearcher/>
          <componentTagsContainer :props="{ name: filterType.Prompt }"/>
          <componentModelsContainer :props="{ name: filterType.Model }"/>
          <componentModelsContainer :props="{ name: filterType.LoraLycoris }"/>
          <componentModelsContainer :props="{ name: filterType.Embedding }"/>
          <componentModelsContainer :props="{ name: filterType.Vae }"/>
          <div>

            <t-row>
              <t-col :span="12" style="width: 100%;">
                <div style="text-align: center;">世界尽头了喵(＞﹏＜)</div>
              </t-col>
            </t-row>

          </div>
        </t-space>
      </div>
    </t-col>
  </t-row>
</template>

<script>

import componentSearcher from './components/Searcher.vue';
import componentTagsContainer from './components/TagsContainer.vue';
import componentModelsContainer from './components/ModelsContainer.vue';

import eventBus from "@/eventbus";

import {SdModelsTypes} from '@/config/SdModelsTypes.js';

export default {
  name: 'page-portal',
  components: {
    componentSearcher,
    componentTagsContainer,
    componentModelsContainer,
  },
  data() {
    return {
      filterType: SdModelsTypes,
      scrollPosition: {x: 0, y: 0}
    }
  },
  methods: {},
  beforeCreate() {
    eventBus.$on('savedPositionEvent', (data) => {
      this.scrollPosition = data;
    });
  },
  mounted() {
    // 历史滚动高度处理
    new Promise(resolve => {
      // 间隔查询内容是否就绪
      const timer = setInterval(() => {
        if (this.scrollPosition.y === 0) {
          clearInterval(timer);
          resolve();
          return;
        }

        // 内容就绪到超过屏高一半就跳转
        if (this.$refs.wa_container.offsetHeight >
            this.scrollPosition.y + (window.innerHeight / 2)
        ) {
          window.scrollTo(0, this.scrollPosition.y);
          clearInterval(timer);
          resolve();
        }
      }, 100);

      // 超时取消
      setTimeout(() => {
        clearInterval(timer);
      }, 5000);
    })
  }
}
</script>
