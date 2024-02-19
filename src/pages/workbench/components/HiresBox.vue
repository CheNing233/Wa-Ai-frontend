<template>
    <t-col
        :span="12"
    >
        <t-card title="高清修复" bordered style="width: 100%;">
        
            <template #actions>
            <t-space>
                <t-switch :label="['On', 'Off']" v-model="workbenchParams.enable_hr" />

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
                    <strong>放大倍数：</strong>
                </t-col>
                <t-col flex="1">
                    <t-space style="float: right; flex-wrap: wrap; ">
                        <t-button variant="outline" size="small"
                            @click="() => {workbenchParams.hr_scale = 1;}"
                        >
                            1x
                        </t-button>
                        <t-button variant="outline" size="small"
                            @click="() => {workbenchParams.hr_scale = 1.5;}"
                        >
                            1.5x
                        </t-button>
                        <t-button variant="outline" size="small"
                            @click="() => {workbenchParams.hr_scale = 2;}"
                        >
                            2x
                        </t-button>
                        <t-button variant="outline" size="small"
                            @click="() => {workbenchParams.hr_scale = 3;}"
                        >
                            3x
                        </t-button>
                        <t-button variant="outline" size="small"
                            @click="() => {workbenchParams.hr_scale = 4;}"
                        >
                            4x
                        </t-button>
                    </t-space>
                </t-col>
            </t-row>
            <t-row :gutter="[8, 8]">
                <t-col flex="shrink">
                    倍数：
                </t-col>
                <t-col flex="1">
                    <t-slider 
                        v-model="workbenchParams.hr_scale" 
                        :show-tooltip="true" 
                        :max="4" 
                        :min="0" 
                        :step="0.1"
                        :inputNumberProps="{
                            theme: 'column', autoWidth: true, size: 'small'
                        }"
                    />
                </t-col>
            </t-row>
           
            
            <t-row :gutter="[8, 8]">
                <t-col :span="12">
                    <strong>修复方式：</strong>
                </t-col>
                <t-col flex="shrink">
                    放大器(Hires Upscaler)：
                </t-col>
                <t-col flex="1">
                    <t-select 
                        v-model="workbenchParams.hr_upscaler" 
                        size="small" 
                        :options="wordsCloud" 
                        placeholder="" />
                </t-col>
            </t-row>

            <t-row :gutter="[8, 8]">
                <t-col flex="shrink">
                    高清修复采样次数(Hires Steps)：
                </t-col>
                <t-col flex="1">
                    <t-slider 
                        v-model="workbenchParams.hr_second_pass_steps" 
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
                    <strong>重绘：</strong>
                </t-col>
                <t-col flex="shrink">
                    重绘幅度(Denoising Strength)：
                </t-col>
                <t-col flex="1">
                    <t-slider 
                        v-model="workbenchParams.denoising_strength" 
                        :show-tooltip="true" 
                        :max="1" 
                        :min="0" 
                        :step="0.01"
                        :inputNumberProps="{
                            theme: 'column', autoWidth: true, size: 'small'
                        }"
                    />
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
    name: 'componentHiresBox',
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
                { label: 'Latent', value: 'Latent' },
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