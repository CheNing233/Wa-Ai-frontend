<template>
  <div style="width: 100%; height: 100%">
    <!--顶部按钮 -->
    <t-row :gutter="[8,8]" style="width: 100%; padding-top: 4px">
      <t-col flex="1">
        <t-date-range-picker v-model="timeFilterRange" :presets="timeFilterPresets"/>
      </t-col>
      <t-col flex="shrink">

        <t-space size="small" style="float: right; margin-right: -16px">
          <t-button theme="danger" shape="square" v-if="manageStatus">
            <Delete1Icon slot="icon" shape="square"/>
          </t-button>
          <t-button shape="square" v-if="manageStatus">
            <DownloadIcon slot="icon" shape="square"/>
          </t-button>
          <t-button v-if="manageStatus">
            <ShareIcon slot="icon" shape="square"/>
            发帖
          </t-button>
          <t-button variant="outline" @click="changeManageStatus">
            {{ manageStatus ? '取消' : '选择' }}
          </t-button>
        </t-space>

      </t-col>
    </t-row>

    <!--图片展示 -->
    <t-card class="card_container">
      <t-row :gutter="[8,8]">
        <t-col v-for="(item, index) in imageList" :key="index"
               :xs="{ span: 12 }"
               :sm="{ span: 12 }"
               :md="{ span: 6 }"
               :lg="{ span: 6 }"
               :xl="{ span: 4 }"
        >

          <componentImageCard
              :imageProfile="item"
              :manageStatus="manageStatus"
              @selectEvent="handleOverlayClick"
          />

        </t-col>
      </t-row>
    </t-card>

  </div>

</template>

<script>
import {
  // ControlPlatformIcon,
  Delete1Icon,
  DownloadIcon,
  ShareIcon
} from 'tdesign-icons-vue';

import componentImageCard from './Cards/imageCard.vue'

import api from '@/service'

export default {
  name: 'componentHistoryBox',
  components: {
    componentImageCard,

    // ControlPlatformIcon,
    Delete1Icon,
    DownloadIcon,
    ShareIcon,
  },
  data() {
    return {
      timeFilterRange: [new Date(), new Date()],

      timeFilterPresets: {
        最近7天: [new Date(+new Date() - 86400000 * 6), new Date()],
        最近3天: [new Date(+new Date() - 86400000 * 2), new Date()],
        今天: [new Date(), new Date()],
      },


      imageList: [],
      imageListSize: 30,


      manageSelected: [],
      manageStatus: false,
    }

  },
  methods: {
    freshPage() {
      const PARAMS = {
        page: 1,
        pageSize: this.imageListSize,
      };

      api.taskApi.getTaskByUser(PARAMS)
          .then(resp => {
            this.imageList = resp.data.list;
            this.itemsTotal = resp.data.selectTotal;
          })
          .catch(err => {
            this.$message.error("获取数据失败: " + err)
          });
    },

    changeManageStatus() {
      this.manageStatus = !this.manageStatus;
      this.manageSelected = [];
    },

    handleOverlayClick(id) {
      if (this.manageStatus) {//global select status

        if(this.checkIdExists(id)){
          this.deleteItem(id);
        }else{
          this.insertItem(id);
        }

      }
    },

    insertItem(id) {
      this.manageSelected.push(id); // 向数组中插入新元素
    },
    deleteItem(id) {
      const index = this.manageSelected.findIndex(item => item === id);
      if (index !== -1) {
        this.manageSelected.splice(index, 1); // 删除指定 ID 的元素
      }
    },
    checkIdExists(id) {
      return this.manageSelected.some(item => item === id);
    }
  },
  computed: {
    displayWorkbenchSmall: function () {
      return this.$store.getters.getDisplayWorkbenchSmall
    },
  },
  created() {
    this.freshPage();
  }
}
</script>

<style scoped>
.card_container {
  margin-top: 12px;
  margin-right: -8px;
  padding-top: 8px;
  height: calc(100% - 48px);
  overflow-y: scroll;
  overflow-x: hidden;
}

.image_item {
  aspect-ratio: 0.75;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.3s;
}

.overlay:hover {
  opacity: 1;
}

</style>