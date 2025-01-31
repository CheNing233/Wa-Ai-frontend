<template>
  <div style="width: 100%; height: 100%">
    <!--顶部按钮 -->
    <t-row :gutter="[8,8]" style="width: 100%; padding-top: 4px">
      <t-col flex="1">
        <t-date-range-picker v-model="timeFilterRange" :presets="timeFilterPresets"/>
      </t-col>
      <t-col flex="shrink">

        <t-space size="small" style="float: right; margin-right: -16px">
          <t-button v-if="manageStatus" :loading="delTaskLoading" shape="square" theme="danger"
                    @click="handleDeleteSelected">
            <Delete1Icon slot="icon" shape="square"/>
          </t-button>
          <t-button v-if="manageStatus" shape="square">
            <DownloadIcon slot="icon" shape="square"/>
          </t-button>
          <t-button v-if="manageStatus">
            <ShareIcon slot="icon" shape="square"/>
            发帖
          </t-button>
          <t-button variant="outline" @click="handleChangeManageStatus">
            {{ manageStatus ? '取消' : '选择' }}
          </t-button>
          <t-button :loading="reFreshPageLoading" shape="square" variant="outline" @click="freshPage">
            <RefreshIcon slot="icon" shape="square"/>
          </t-button>
        </t-space>

      </t-col>
    </t-row>

    <!--图片展示 -->
    <t-card class="card_container">
      <t-row :gutter="[8,8]">
        <t-col v-for="(item, index) in imageList" :key="index"
               :lg="{ span: 6 }"
               :md="{ span: 6 }"
               :sm="{ span: 12 }"
               :xl="{ span: 4 }"
               :xs="{ span: 12 }"
        >

          <componentImageCard
              :imageProfile="item"
              :manageStatus="manageStatus"
              :reFreshPageIndicator="reFreshPageIndicator"
              @selectEvent="handleOverlayClick"
          />

        </t-col>
      </t-row>
    </t-card>

  </div>

</template>

<script>
import {Delete1Icon, DownloadIcon, RefreshIcon, ShareIcon,} from 'tdesign-icons-vue';

import componentImageCard from './Cards/imageCard.vue'

import api from '@/service'
import eventBus from "@/eventbus";
import utils from "@/utils";

export default {
  name: 'componentHistoryBox',
  components: {
    componentImageCard,

    // ControlPlatformIcon,
    Delete1Icon,
    DownloadIcon,
    ShareIcon,
    RefreshIcon,
  },
  props: [
    'generateSignal'
  ],
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

      reFreshPageLoading: false,
      delTaskLoading: false,
      reFreshPageIndicator: true,
    }

  },
  methods: {
    freshPage() {
      this.imageList = [];
      this.reFreshPageLoading = true;
      this.reFreshPageIndicator = !this.reFreshPageIndicator;

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
          }).finally(() => {
        this.reFreshPageLoading = false;
      });
    },

    handleChangeManageStatus() {
      this.manageStatus = !this.manageStatus;
      this.manageSelected = [];
    },

    handleDeleteSelected() {

      if (this.manageSelected.length === 0) {
        this.$message.warning('请先选择要删除的项');
        return;
      }

      this.delTaskLoading = true;

      let reqs = []

      for (let i in this.manageSelected) {
        reqs.push(
            api.taskApi.deleteTask(
                {taskId: this.manageSelected[i]}
            )
        )
      }

      Promise.all(reqs)
          .then(resp => {
            this.$message.success(`删除成功（共 ${resp.length} 个）`);
            this.freshPage();
          })
          .catch(err => {
            this.$message.error("删除失败: " + err)
          }).finally(() => {
        this.delTaskLoading = false;
        this.handleChangeManageStatus();
        this.freshPage();
      });
    },

    handleOverlayClick(id) {
      if (this.manageStatus) {//global select status

        if (utils.array.checkIdExists(this.manageSelected, id)) {
          utils.array.deleteItem(this.manageSelected, id);
        } else {
          utils.array.insertItem(this.manageSelected, id);
        }

      }
    },

  },
  computed: {
    displayWorkbenchSmall: function () {
      return this.$store.getters.getDisplayWorkbenchSmall
    },
  },
  created() {
    this.freshPage();
    eventBus.$on('taskUpdate', this.freshPage);
  },
  beforeDestroy() {
    eventBus.$off('taskUpdate', this.freshPage);
  },
  watch: {
    generateSignal() {
      this.freshPage();
    }
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