<template>
    <t-col
        :span="12"
    >
        <t-card title="模型" bordered style="width: 100%;">
        
            <template #actions>
            <t-space>
                <t-button
                    variant="text"
                    size="small"
                >
                    推荐
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
                <t-col flex="1">
                    <strong>基础模型：</strong>
                </t-col>
                <t-col flex="shrink">
                    <t-button variant="text" size="small"
                    >
                        选择
                    </t-button>
                </t-col>
            </t-row>

            <t-row :gutter="[8, 8]">
                <t-col flex="1">
                    <CheckpointCard :props="workbenchSelected.CHECKPOINT" />
                </t-col>
            </t-row>
           
            <t-row :gutter="[8, 8]">
                <t-col flex="1">
                    <strong>LoRa 模型：</strong>
                </t-col>
                <t-col flex="shrink">
                    <t-button variant="text" size="small"
                    >
                        添加
                    </t-button>
                </t-col>
            </t-row>

            <t-row :gutter="[8, 8]">
                <t-col 
                    v-for="(item, index) in workbenchSelected.LORA" 
                    :key="index"
                    :span="12"
                >
                    <LoraCard :props="item"/>
                </t-col>
            </t-row>

            <t-row :gutter="[8, 8]">
                <t-col flex="1">
                    <strong>Embedding 模型：</strong>
                </t-col>
                <t-col flex="shrink">
                    <t-button variant="text" size="small"
                    >
                        添加
                    </t-button>
                </t-col>
            </t-row>

            <t-row :gutter="[8, 8]">
                <t-col 
                    v-for="(item, index) in workbenchSelected.EMBEDDING" 
                    :key="index"
                    :span="12"
                >
                    <LoraCard :props="item"/>
                </t-col>
            </t-row>

            <t-row :gutter="[8, 8]">
                <t-col flex="1">
                    <strong>VAE 模型：</strong>
                </t-col>
                <t-col flex="shrink">
                    <t-button variant="text" size="small"
                    >
                        选择
                    </t-button>
                </t-col>
            </t-row>

            <t-row :gutter="[8, 8]">
                <t-col flex="1">
                    <CheckpointCard :props="workbenchSelected.VAE" />
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

import CheckpointCard from './Cards/CheckpointCard.vue';
import LoraCard from './Cards/LoraCard.vue';
// import WideCard from './components/ModelCard.vue';
// import WideCard2 from './components/ExtModelCard.vue';

export default {
    name: 'componentModelsBox',
    components: {
        BrowseIcon,
        BrowseOffIcon,

        CheckpointCard,
        LoraCard,
    },
    props: {
    },
    data() {
        return {
            isVisible: true,
            wordsCloud: [
                { label: 'word1', value: 'word1' },
                { label: 'word2', value: 'word2' },
                { label: 'word3', value: 'word3' },
                { label: 'word4', value: 'word4' },
                { label: 'word5', value: 'word5' },
                { label: 'word6', value: 'word6' },
                { label: 'word7', value: 'word7' },
                { label: 'word8', value: 'word8' },
                { label: 'word9', value: 'word9' },
                { label: 'word10', value: 'word10' },
            ],
            scale: 2,
            ds: 0.58,
            steps: 20,
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
        },
        workbenchSelected:{
            get() {
                return this.$store.getters.workbenchGetSelected;
            },
            set(value) {
                this.$store.commit('workbenchUpdateSelected', value);
            }
        }
    },
    methods: {
    }
}

</script>

<style scoped>

</style>