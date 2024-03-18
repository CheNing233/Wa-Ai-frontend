<template>
  <div
      class="portal_container"
  >
    <t-row :gutter="[16, 16]" class="portal_baserow">

      <t-col :span="12">
        <t-row :gutter="[8, 8]" align="center">
          <t-col flex="auto">
            <h2 style="margin-top: -4px; margin-bottom: -4px;">我的帖子</h2>
          </t-col>

          <t-col
              flex="shrink"
              style="float: right;"
          >
            <t-dropdown :min-column-width="150">
              <t-button shape="square" variant="outline">
                <FilterIcon slot="icon" shape="square"/>
              </t-button>

              <template #dropdown>
                <t-dropdown-menu>
                  <t-dropdown-item
                      :value="1"
                      @click="()=>{searchWithQuery=!searchWithQuery;if(!searchWithQuery) freshPage()}"
                  >
                    按标题搜索
                    <t-switch :value="searchWithQuery" style="float: right;"></t-switch>
                  </t-dropdown-item>

                  <t-dropdown-item
                      :value="2"
                      @click="()=>{searchWithTime=!searchWithTime;if (!searchWithTime) freshPage()}"
                  >
                    按时间段筛选
                    <t-switch :value="searchWithTime" style="float: right;"></t-switch>
                  </t-dropdown-item>
                </t-dropdown-menu>
              </template>
            </t-dropdown>

          </t-col>

          <t-col v-show="searchWithQuery" flex="shrink" style="float: right;">
            <t-input
                placeholder="键入标题"
                v-show="searchWithQuery"
                v-model="search"
            />
          </t-col>

          <t-col v-show="searchWithTime" flex="shrink" style="float: right;">
            <t-date-range-picker
                v-show="searchWithTime"
                v-model="timeRange"
                :presets="timePresets"
                @change="freshPage"
            />
          </t-col>

          <t-col

              v-if="manageStatus == true"
              flex="shrink"
              style="float: right;"
          >
            <t-space breakLine size="small">
              <t-button v-if="manageStatus"
                        :loading="delTaskLoading"
                        shape="square"
                        theme="danger"
                        @click="handleDeleteSelected"
              >
                <Delete1Icon slot="icon" shape="square"/>
              </t-button>
              <t-button variant="outline" @click="() => manageStatus = false">
                取消
              </t-button>
            </t-space>

          </t-col>

          <t-col
              v-if="manageStatus == false"
              flex="shrink"
              style="float: right;"
          >
            <t-button @click="handleBtnCreatePost">
              创建新帖
            </t-button>
          </t-col>

          <t-col
              v-if="manageStatus == false"
              flex="shrink"
              style="float: right;"
          >
            <t-button variant="outline" @click="() => manageStatus = true">
              选择
            </t-button>
          </t-col>

          <t-col
              flex="shrink"
              style="float: right;"
          >
            <t-button
                shape="square"
                variant="outline"
                :loading="reFreshPageLoading"
                @click="freshPage">
              <refresh-icon slot="icon" shape="square"/>
            </t-button>
          </t-col>

        </t-row>
      </t-col>

      <t-col
          :span="12"
          style="overflow: hidden;"
      >
        <t-pagination
            v-model="pageCurrent"
            :on-page-size-change="onPageSizeChange"
            :onCurrentChange="onCurrentChange"
            :page-size-options="pageSizeOptions"
            :page-size.sync="pageSize"
            :show-sizer="false"
            :total="itemsTotal"
            style="flex-wrap: wrap; justify-content: space-evenly;"
        />
      </t-col>

      <t-col
          v-for="(item, index) in pageContent"
          :key="index"
          :lg="{ span: 3 }"
          :md="{ span: 4 }"
          :sm="{ span: 6 }"
          :xl="{ span: 3 }"
          :xs="{ span: 12 }"
      >
        <componentPostCard
            :listItem="item"
            :manageStatus="manageStatus"
            :reFreshPageIndicator="reFreshPageIndicator"
            @selectEvent="handleOverlayClick"
        />
      </t-col>

      <t-col
          :span="12"
          style="overflow: hidden;"
      >
        <t-pagination
            v-model="pageCurrent"
            :on-page-size-change="onPageSizeChange"
            :onCurrentChange="onCurrentChange"
            :page-size-options="pageSizeOptions"
            :page-size.sync="pageSize"
            :show-sizer="false"
            :total="itemsTotal"
            style="flex-wrap: wrap; justify-content: space-evenly;"
        />
      </t-col>
    </t-row>

  </div>
</template>

<script>
import componentPostCard from './Cards/postCard.vue';
import {Delete1Icon, FilterIcon, RefreshIcon,} from 'tdesign-icons-vue';

import api from '@/service';
import utils from "@/utils";

export default {
  name: 'ModelsCloud',
  components: {
    componentPostCard,
    FilterIcon,
    Delete1Icon,
    // DownloadIcon,
    // ShareIcon,
    RefreshIcon,
  },
  props: [
    'props'
  ],
  computed: {},
  data() {
    return {

      manageSelected: [],
      manageStatus: false,

      reFreshPageLoading: false,
      delTaskLoading: false,
      reFreshPageIndicator: true,

      searchWithTime: false,
      searchWithQuery: false,
      search: '',

      timeRange: [new Date(), new Date()],
      timePresets: {
        "最近7天": [new Date(+new Date() - 86400000 * 6), new Date()],
        "最近3天": [new Date(+new Date() - 86400000 * 2), new Date()],
        "今天": [new Date(), new Date()],
      },


      itemsTotal: 0,
      pageSize: 30,
      pageCurrent: 1,
      pageSizeOptions: [
        {label: '每页 1 条', value: 1},
        {label: '每页 10 条', value: 10},
        {label: '每页 30 条', value: 30},
        {label: '每页 50 条', value: 50},
        {label: '每页 100 条', value: 100},
      ],

      pageContent: [],
    }
  },
  methods: {
    handleOverlayClick(id) {
      if (this.manageStatus) {//global select status

        if (utils.array.checkIdExists(this.manageSelected, id)) {
          utils.array.deleteItem(this.manageSelected, id);
        } else {
          utils.array.insertItem(this.manageSelected, id);
        }

      }
    },

    handleDeleteSelected() {

      if (this.manageSelected.length === 0) {
        this.$message.warning('请先选择要删除的项');
        return;
      }

      this.delTaskLoading = true;

      let reqs = []

      for (let i in this.manageSelected) {
        console.info(this.manageSelected[i])
        reqs.push(
            api.sdImageApi.deleteSdImage(
                {id: this.manageSelected[i]}
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

    handleBtnCreatePost() {
      // this.$router.push({path: '/create/post', query: {selectedImages: this.manageSelected}});
    },


    onPageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.freshPage();

    },

    onCurrentChange(pageCurrent) {
      this.pageCurrent = pageCurrent;
      this.freshPage();
    },

    handleChangeManageStatus() {
      this.manageStatus = !this.manageStatus;
      this.manageSelected = [];
    },

    freshPage() {
      if (this.$store.getters.userGetInfo === null) {
        return;
      }
      this.reFreshPageLoading = true;
      this.reFreshPageIndicator = !this.reFreshPageIndicator;

      this.pageContent = []

      if (typeof this.timeRange[0] === 'string') {
        this.timeRange[0] = new Date(this.timeRange[0]);
      }
      if (typeof this.timeRange[1] === 'string') {
        this.timeRange[1] = new Date(this.timeRange[1]);
      }

      let PARAMS = {
        startTimestamp: this.searchWithTime ? Math.round(
            (this.timeRange[0].getTime() - 12 * 60 * 60 * 1000)
        ) : "",
        endTimestamp: this.searchWithTime ? Math.round(
            (this.timeRange[1].getTime() + 12 * 60 * 60 * 1000)
        ) : "",
        searchQuery: this.searchWithQuery ? this.search : "",
        page: this.pageCurrent,
        pageSize: this.pageSize,
      };


      api.sdPostApi.getSdPostsList(PARAMS)
          .then(resp => {
            this.pageContent = resp.data.list;
            this.itemsTotal = resp.data.selectTotal;
          })
          .catch(err => {
            this.$message.error("获取数据失败: " + err)
          })
          .finally(() => {
            this.reFreshPageLoading = false;
          });

    }
  },
  created() {
    this.freshPage();
  }
}

</script>

<style scoped>
.portal_container {
  display: block;
  width: calc(100% - 32px);
  margin: 16px 16px;
}

.portal_baserow {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>