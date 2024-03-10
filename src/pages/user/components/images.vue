<template>
  <div
      class="portal_container"
  >
    <t-row :gutter="[16, 16]" class="portal_baserow">

      <t-col :span="12">
        <t-row :gutter="[8, 8]" align="center">
          <t-col flex="auto">
            <h2 style="margin-top: -4px; margin-bottom: -4px;">我的图片</h2>
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
                  <t-dropdown-item :value="1">
                    <t-checkbox>
                      我生成的图片
                    </t-checkbox>
                  </t-dropdown-item>

                  <t-dropdown-item :value="2">
                    <t-checkbox>
                      我上传的图片
                    </t-checkbox>
                  </t-dropdown-item>
                </t-dropdown-menu>
              </template>
            </t-dropdown>

          </t-col>

          <t-col flex="shrink" style="float: right;">
            <t-input placeholder="搜索...">
              <template #suffixIcon>
                <SearchIcon :style="{ cursor: 'pointer' }"/>
              </template>
            </t-input>
          </t-col>

          <t-col flex="shrink" style="float: right;">
            <t-date-range-picker
                v-model="timeRange"
                :presets="timePresets"
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
              >
                <Delete1Icon slot="icon" shape="square"/>
              </t-button>
              <t-button v-if="manageStatus" shape="square">
                <DownloadIcon slot="icon" shape="square"/>
              </t-button>
              <t-button v-if="manageStatus">
                <ShareIcon slot="icon" shape="square"/>
                发帖
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
            <t-button>
              上传图片
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
            <t-button shape="square" variant="outline" @click="freshPage">
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
        <componentImageCard :imageProfile="item"/>
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
import componentImageCard from './Cards/imageCard.vue';
import {Delete1Icon, DownloadIcon, FilterIcon, RefreshIcon, SearchIcon, ShareIcon} from 'tdesign-icons-vue';

import api from '@/service';

export default {
  name: 'ModelsCloud',
  components: {
    componentImageCard,
    SearchIcon,
    FilterIcon,
    Delete1Icon,
    DownloadIcon,
    ShareIcon,
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
    onPageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.freshPage();

    },
    onCurrentChange(pageCurrent) {
      this.pageCurrent = pageCurrent;
      this.freshPage();
    },
    freshPage() {
      this.pageContent = []

      const PARAMS = {
        page: this.pageCurrent,
        pageSize: this.pageSize,
      };

      api.taskApi.getTaskByUser(PARAMS)
          .then(resp => {
            this.pageContent = resp.data.list;
            this.itemsTotal = resp.data.selectTotal;
          })
          .catch(err => {
            this.$message.error("获取数据失败: " + err)
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