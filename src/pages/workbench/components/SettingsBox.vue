<template>
    <t-col
        :span="12"
    >
        <t-card title="基本设置" bordered style="width: 100%;">
        
            <template #actions>
            <t-space>
                <t-button
                    variant="outline"
                    size="small"
                >
                    默认值
                </t-button>
                <t-button
                    variant="outline"
                    size="small"
                    shape="square"
                    @click="() => isVisible = !isVisible"
                >
                    <BrowseIcon v-if="isVisible" slot="icon" shape="square" />
                    <BrowseOffIcon v-else slot="icon" shape="square" />
                </t-button>
            </t-space>
        </template>

        <div v-show="!isVisible" >
            已隐藏, 但配置继续生效
        </div>
        <t-space v-show="isVisible" direction="vertical" style="width: 100%;">
            
            
            <t-row :gutter="[8, 8]">
                <t-col flex="shrink">
                    <strong>图像大小：</strong>
                </t-col>
                <t-col flex="1">
                    <t-space style="float: right; flex-wrap: wrap; ">
                        <t-button variant="outline" size="small"
                            @click="() => {workbenchParams.height = 1024; workbenchParams.width = 768;}"
                        >
                            1024×768
                        </t-button>
                        <t-button variant="outline" size="small"
                            @click="() => {workbenchParams.height = 768; workbenchParams.width = 1024;}"
                        >
                            768×1024
                        </t-button>
                        <t-button variant="outline" size="small"
                            @click="() => {workbenchParams.height = 768; workbenchParams.width = 768;}"
                        >
                            768×768
                        </t-button>
                        <t-button variant="outline" size="small"
                            @click="() => {workbenchParams.height = 640; workbenchParams.width = 640;}"
                        >
                            640×640
                        </t-button>
                    </t-space>
                </t-col>
            </t-row>
            <t-row :gutter="[8, 8]">
                <t-col flex="shrink">
                    宽度：
                </t-col>
                <t-col flex="1">
                    <t-slider 
                        v-model="workbenchParams.height" 
                        :show-tooltip="true" 
                        :max="2048" 
                        :min="32" 
                        :step="32"
                        :inputNumberProps="{
                            theme: 'column', autoWidth: true, size: 'small'
                        }"
                    />
                </t-col>
            </t-row>
            <t-row :gutter="[8, 8]">
                <t-col flex="shrink">
                    高度：
                </t-col>
                <t-col flex="1">
                
                    <t-slider 
                        v-model="workbenchParams.width" 
                        :show-tooltip="true" 
                        :max="2048" 
                        :min="32" 
                        :step="32"
                        :inputNumberProps="{
                            theme: 'column', autoWidth: true, size: 'small'
                        }"
                    />
                </t-col>
            </t-row>
            
            <t-row :gutter="[8, 8]">
                <t-col :span="12">
                    <strong>采样：</strong>
                </t-col>
                <t-col flex="shrink">
                    采样方法(Sampler)：
                </t-col>
                <t-col flex="1">
                    <t-select 
                        v-model="workbenchParams.sampler_name"
                        size="small" 
                        :options="wordsCloud" 
                        placeholder="" />
                </t-col>
            </t-row>

            <t-row :gutter="[8, 8]">
                <t-col flex="shrink">
                    采样次数(Steps)：
                </t-col>
                <t-col flex="1">
                    <t-slider 
                        v-model="workbenchParams.steps" 
                        :show-tooltip="true" 
                        :max="200" 
                        :min="0" 
                        :step="1"
                        :inputNumberProps="{
                            theme: 'column', autoWidth: true, size: 'small'
                        }"
                    />
                </t-col>
            </t-row>


            <t-row :gutter="[8, 8]">
                <t-col :span="12">
                    <strong>生成：</strong>
                </t-col>
                <t-col flex="shrink">
                    相关性(CFG Scale)：
                </t-col>
                <t-col flex="1">
                    <t-slider 
                        v-model="workbenchParams.cfg_scale" 
                        :show-tooltip="true" 
                        :max="30" 
                        :min="0" 
                        :step="0.1"
                        :inputNumberProps="{
                            theme: 'column', autoWidth: true, size: 'small'
                        }"
                    />
                </t-col>
            </t-row>


            <t-row :gutter="[8, 8]">
                <t-col flex="shrink">
                    种子(Seed)：
                </t-col>
                <t-col flex="1">
                    <t-input
                        showClearIconOnEmpty 
                        size="small"
                        placeholder="留空随机"
                        v-model="workbenchParams.seed" 
                    >

                    </t-input>
                </t-col>
            </t-row>

            <t-row :gutter="[8, 8]">
                <t-col :span="12">
                    <strong>高级：</strong>
                </t-col>
                <t-col :span="6">
                    <t-select 
                        label="Clip Skip:" 
                        size="small" 
                        :options="clipOptions" 
                        :defaultInputValue="1" 
                        v-model="workbenchParams.override_settings.CLIP_stop_at_last_layers"
                        placeholder="" />
                </t-col>
                <t-col :span="6">
                    <t-select 
                        label="ENSD:" 
                        size="small" 
                        :options="ensdOptions" 
                        :defaultInputValue="1" 
                        v-model="workbenchParams.override_settings.eta_noise_seed_delta"
                        placeholder="" />
                </t-col>
            </t-row>

        </t-space>
        </t-card>
    </t-col>
</template>

<script>

import {
    BrowseIcon,
    BrowseOffIcon
} from 'tdesign-icons-vue';


export default {
    name: 'componentSettingsBox',
    components: {
        BrowseIcon,
        BrowseOffIcon
    },
    props: {
    },
    data() {
        return {
            isVisible: true,
            wordsCloud: [
                { label: 'Euler a', value: 'Euler a' },
            ],
            clipOptions:[
                {label:'0',value:'0'},
                {label:'1',value:'1'},
                {label:'2',value:'2'},
            ],
            ensdOptions:[
                {label:'0',value:'0'},
                {label:'31337',value:'31337'},
            ],
        }
        
    },
    computed: {
        displayWorkbenchSmall: function () {
            return this.$store.getters.getDisplayWorkbenchSmall
        },
        workbenchParams: {
            get() {
                return this.$store.getters.workbenchGetParams;
            },
            set(value) {
                this.$store.commit('workbenchUpdateParams', value);
            }
        }
    },
    methods: {
    }
}

</script>

<style scoped>

</style>