<template>
    <div 
        v-if="(props.name == filterName) || (filterName == filterTypes.ComP)"
        class="portal_container"
    >
        <t-row :gutter="[16, 16]" class="portal_baserow" align="center"> 

            <t-col flex="100px">
                <h2 style="margin-top: -4px; margin-bottom: -4px;">TAG云</h2>
            </t-col>
            
            <t-col flex="auto">
                <t-button variant="outline" shape="square" style="float: right;">
                    <CopyIcon slot="icon" shape="square" />
                </t-button>
            </t-col>
                    
            <t-col :span="12"> 

                <t-space size="8px" class="portal_baserow">

                    <t-tag
                        v-for="(value, index) in tagsCollector"
                        :key="index"
                        size="large"
                    >
                        <span style="padding-right: 6px;">
                            {{ value.weight != 1 ? '(' : null }}{{ value.value }}{{ value.weight != 1 ? ':'+ value.weight + ')' : null }}
                        </span>
                        <t-button  shape="square" variant="text" 
                            @click="IncTag(index)"
                        >
                            <AddIcon style="margin: 0px;" slot="icon" shape="square" />
                        </t-button>
                        <t-button  shape="square" variant="text" 
                            @click="DecTag(index)"
                        >
                            <RemoveIcon style="margin: 0px;" slot="icon" shape="square" />
                        </t-button>
                        <t-button  shape="square" variant="text" 
                            @click="delTag(index)"
                        >
                            <CloseIcon style="margin: 0px;" slot="icon" shape="square" />
                        </t-button>
                    </t-tag>

                </t-space>

            </t-col> 


            <t-col :span="12"> 

                <t-space size="8px" class="portal_baserow">

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
                    :total="itemsTotal"
                    :page-size.sync="pageSize"
                    v-model="pageCurrent"
                    :on-page-size-change="onPageSizeChange"
                    :onCurrentChange="onCurrentChange"
                    :show-sizer="false"
                    :page-size-options="pageSizeOptions"
                    style="flex-wrap: wrap; justify-content: space-evenly;"
                />
            </t-col>
        </t-row>
    </div>
</template>

<script>
import {
    CopyIcon, 
    AddIcon,
    RemoveIcon,
    CloseIcon,
} from 'tdesign-icons-vue';

import { SdModelsTypes } from '@/config/SdModelsTypes.js';

// import { getPromptTagsList } from '@/api/get_sdmodels_list.js';
// import { SdListAPI } from '@/service/sd.js';
import api from '@/service/index.js';

export default {
    name: 'componentPromptsCloud',
    components: {
        CopyIcon,
        AddIcon,
        RemoveIcon,
        CloseIcon,
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
                { label: '每页 1 条', value: 1 },
                { label: '每页 10 条', value: 10 },
                { label: '每页 30 条', value: 30 },
                { label: '每页 50 条', value: 50 },
                { label: '每页 100 条', value: 100 },
            ],
            pageContent: [],
            transformedPageContent:[],
            
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
        onPageSizeChange(pageSize) {
            const { query } = this.$router.currentRoute;
            this.$router.push({
                path: '/',
                query: {
                    ...query,
                    filter_size: pageSize,
                }
            });
        },
        onCurrentChange(pageCurrent) {
            const { query } = this.$router.currentRoute;
            this.$router.push({
                path: '/',
                query: {
                    ...query,
                    filter_page: pageCurrent,
                }
            });
        },
        freshPage(){
            console.log(this.props.name, this.filterName);
            if(
                this.props.name == this.filterName || 
                this.filterName == this.filterTypes.ComP
            ){
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
                // SdListAPI.getSdtagsList(PARAMS)
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