<template>
  <div
      v-if="(props.name == filterName) || (filterName == filterTypes.ComP)"
      class="portal_container"
  >
    <t-row :gutter="[16, 16]" class="portal_baserow">

      <t-col :span="12">
        <t-row align="center">
          <t-col flex="80px">
            <h2 style="margin-top: -4px; margin-bottom: -4px;">{{ props.name }}</h2>
          </t-col>

          <t-col flex="auto">
            <t-button style="float: right;" variant="outline">
              查看更多...
            </t-button>
          </t-col>
        </t-row>
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
        <componentModelCard :props="item"/>
      </t-col>

      <t-col
          v-if="props.name == filterName"
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
import componentModelCard from './Cards/ModelCard-Base.vue';

import {SdModelsTypes} from '@/config/SdModelsTypes.js';

import api from '@/service/index.js';

export default {
  name: 'ModelsCloud',
  components: {
    componentModelCard,
  },
  props: [
    'props'
  ],
  computed: {
    filterName() {
      return this.$route.query.filter_name || SdModelsTypes.ComP;
    },
  },
  data() {
    return {
      itemsTotal: 0,
      pageSize: 8,
      pageCurrent: 1,
      pageSizeOptions: [
        {label: '每页 1 条', value: 1},
        {label: '每页 8 条', value: 8},
        {label: '每页 30 条', value: 30},
        {label: '每页 50 条', value: 50},
        {label: '每页 100 条', value: 100},
      ],
      pageContent: [],

      searchTitle: null,

      filterTypes: SdModelsTypes,

    }
  },
  methods: {
    onPageSizeChange(pageSize) {
      const {query} = this.$router.currentRoute;
      this.$router.push({
        path: '/',
        query: {
          ...query,
          filter_size: pageSize,
        }
      });
    },
    onCurrentChange(pageCurrent) {
      const {query} = this.$router.currentRoute;
      this.$router.push({
        path: '/',
        query: {
          ...query,
          filter_page: pageCurrent,
        }
      });
    },
    freshPage() {
      if (
          this.props.name == this.filterName ||
          this.filterName == this.filterTypes.ComP
      ) {
        this.pageSize =
            parseInt(this.$router.currentRoute.query.filter_size) || 8;
        this.pageCurrent =
            parseInt(this.$router.currentRoute.query.filter_page) || 1;
        this.searchTitle =
            this.$router.currentRoute.query.search || null;

        const PARAMS = {
          type: this.props.name,
          searchQuery: this.searchTitle,
          page: this.pageCurrent,
          pageSize: this.pageSize,
        };

        api.sdModelApi.getSdModelsList(PARAMS)
            .then(resp => {
              this.pageContent = resp.data.models;
              this.itemsTotal = resp.data.selectCount;

            })
            .catch(err => {
              this.$message.error("获取数据失败: " + err)
            });

      }
    }
  },
  watch: {
    $route() {
      this.freshPage();
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