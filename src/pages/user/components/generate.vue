<template>
    <div 
        class="portal_container"
    >
        <t-row :gutter="[16, 16]" class="portal_baserow">

            <t-col :span="12">
                <t-row :gutter="[16, 16]" align="center"> 
                    <t-col flex="auto">
                        <h2 style="margin-top: -4px; margin-bottom: -4px;">我的生成</h2>
                    </t-col>
                    
                    <t-col flex="shrink" style="float: right;">
                        <t-input placeholder="搜索...">
                            <template #suffixIcon>
                                <SearchIcon :style="{ cursor: 'pointer' }" />
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
                        v-if="manageState == false"
                        flex="shrink" 
                        style="float: right;"
                    >
                        <t-button @click="() => manageState = true">
                            管理
                        </t-button>
                    </t-col>

                    <t-col 
                        v-if="manageState == true"
                        flex="shrink" 
                        style="float: right;"
                    >
                        <t-dropdown :min-column-width="108">
                            <t-button>
                                操作...
                            </t-button>
                            <template #dropdown>

                                <t-dropdown-menu>
                                    <t-dropdown-item :value="4"> 删除 </t-dropdown-item>
                                </t-dropdown-menu>
                                
                            </template>

                        </t-dropdown>
                        
                    </t-col>

                    <t-col 
                        v-if="manageState == true"
                        flex="shrink" 
                        style="float: right;"
                    >
                        <t-button variant="outline" @click="() => manageState = false">
                            返回
                        </t-button>
                    </t-col>


                </t-row>
            </t-col>
            
            <t-col 
                v-for="(item, index) in pageContent" 
                :key="index"
                :xs="{ span: 12 }"
                :sm="{ span: 6 }"
                :md="{ span: 4 }"
                :lg="{ span: 3 }"
                :xl="{ span: 3 }"
            >
                <componentImageCard :props="item" :isManage="manageState" />
            </t-col>

            <t-col
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
import componentImageCard from './Cards/ImageCard.vue'; 
import { SearchIcon } from 'tdesign-icons-vue';

import api from '@/service';

export default {
    name: 'ModelsCloud',
    components: {
        componentImageCard,
        SearchIcon,
    },
    props: [
        'props'
    ],    
    computed: {
    },
    data()
    {
        return {
            manageState: false,

            search:'',

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
                { label: '每页 1 条', value: 1 },
                { label: '每页 10 条', value: 10 },
                { label: '每页 30 条', value: 30 },
                { label: '每页 50 条', value: 50 },
                { label: '每页 100 条', value: 100 },
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
        freshPage(){

            const PARAMS = {
                page: this.pageCurrent,
                pageSize: this.pageSize,
            };
            
            api.taskApi.getTaskByUser(PARAMS)
                .then(resp => {
                    console.log("getTaskByUser", resp);
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