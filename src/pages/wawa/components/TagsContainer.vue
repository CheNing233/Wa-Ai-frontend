<template>
  <div
      v-if="(props.name == filterName) || (filterName == filterTypes.ComP)"
      class="portal_container"
  >
    <t-row :gutter="[16, 16]" align="center" class="portal_baserow">

      <t-col flex="100px">
        <h2 style="margin-top: -4px; margin-bottom: -4px;">TAG云</h2>
      </t-col>

      <t-col flex="auto">
        <t-space size="small" style="float: right;">
          <t-button shape="square" variant="outline"
                    @click="ClearTags"
          >
            <Delete1Icon slot="icon" shape="square"/>
          </t-button>

          <t-button shape="square" variant="outline"
                    @click="mergeTags"
          >
            <GitMergeIcon slot="icon" shape="square"/>
          </t-button>

          <t-button shape="square" variant="outline"
                    @click="replaceTags"
          >
            <GitCommitIcon slot="icon" shape="square"/>
          </t-button>

          <t-button shape="square" variant="outline"
                    @click="copyTags"
          >
            <CopyIcon slot="icon" shape="square"/>
          </t-button>
        </t-space>

      </t-col>

      <t-col :span="12">

        <t-space class="portal_baserow" size="8px">

          <t-tag
              v-for="(value, index) in tagsCollector"
              :key="index"
              size="large"
          >
            <span style="padding-right: 6px;">
                {{ value.weight != 1 ? '(' : null }}{{
                value.value
              }}{{ value.weight != 1 ? ':' + value.weight + ')' : null }}
            </span>
            <t-button shape="square" variant="text"
                      @click="IncTag(index)"
            >
              <AddIcon slot="icon" shape="square" style="margin: 0px;"/>
            </t-button>
            <t-button shape="square" variant="text"
                      @click="DecTag(index)"
            >
              <RemoveIcon slot="icon" shape="square" style="margin: 0px;"/>
            </t-button>
            <t-button shape="square" variant="text"
                      @click="delTag(index)"
            >
              <CloseIcon slot="icon" shape="square" style="margin: 0px;"/>
            </t-button>
          </t-tag>

        </t-space>

      </t-col>


      <t-col :span="12">

        <t-space class="portal_baserow" size="8px">

          <t-button
              v-for="(value, index) in transformedPageContent"
              :key="index"
              variant="outline"
              @click="addTag(value.label, value.value)"
          >
            {{ value.value }} {{ value.label }}
          </t-button>

        </t-space>

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
import {AddIcon, CloseIcon, CopyIcon, Delete1Icon, GitCommitIcon, GitMergeIcon, RemoveIcon} from 'tdesign-icons-vue';

import {SdModelsTypes} from '@/config/SdModelsTypes.js';

import api from '@/service/index.js';
import utils from '@/utils'
import eventbus from "@/eventbus";

export default {
  name: 'componentPromptsCloud',
  components: {
    CopyIcon,
    AddIcon,
    RemoveIcon,
    CloseIcon,
    Delete1Icon,
    GitMergeIcon,
    GitCommitIcon
  },
  props: [
    'props'
  ],
  data() {
    return {
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
      transformedPageContent: [],

      search: null,

      filterTypes: SdModelsTypes,
    }
  },
  computed: {
    tagsCollector: function () {
      return this.$store.getters.getCollector
    },
    filterName() {
      return this.$route.query.filter_name || SdModelsTypes.ComP;
    },
  },
  methods: {
    mergeTags() {
      eventbus.$emit("mergePrompts", this.$store.getters.getTags);
    },

    replaceTags() {
      eventbus.$emit("replacePrompts", this.$store.getters.getTags);
    },

    copyTags() {
      const prompts = this.$store.getters.getTags

      utils.copy.copyToClipboard(prompts)
          .then(() => {
            this.$message.success('复制成功：' + prompts);
          })
          .catch(() => {
            this.$message.error('复制失败');
          });
    },

    addTag(label, value) {
      this.$store.commit('collectorAddTag',
          {label: label, value: value, weight: 1.0}
      );
    },
    delTag(index) {
      this.$store.commit('collectorDeleteTag', index);
    },
    IncTag(index) {
      this.$store.commit('collectorIncreseTagWeight', index);
    },
    DecTag(index) {
      this.$store.commit('collectorDecreaseTagWeight', index);
    },
    ClearTags() {
      this.$store.commit('collectorClearTags');
    },
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
      console.log(this.props.name, this.filterName);
      if (
          this.props.name == this.filterName ||
          this.filterName == this.filterTypes.ComP
      ) {
        this.pageSize =
            parseInt(this.$router.currentRoute.query.filter_size) || 30;
        this.pageCurrent =
            parseInt(this.$router.currentRoute.query.filter_page) || 1;
        this.search =
            this.$router.currentRoute.query.search || null;

        const PARAMS = {
          searchQuery: this.search,
          page: this.pageCurrent,
          pageSize: this.pageSize,
        };

        api.tagApi.getSdTagsList(PARAMS)
            .then(resp => {
              this.pageContent = resp.data.imageTags;
              this.itemsTotal = resp.data.selectCount;

              this.transformedPageContent = this.pageContent.map((item) => {
                return {
                  label: item.nameCn,
                  value: item.nameEn,
                }
              });
            })
            .catch(error => {
              this.$message.error("获取数据失败: " + error)
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

.tag_container div {
  margin: 8px;
}
</style>