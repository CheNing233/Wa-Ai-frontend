<template>
    <t-col
        :span="12"
    >
        <t-card title="提示词" bordered style="width: 100%; padding: 0;">
        
        <template #actions>
            <t-space>
                <t-button
                    variant="outline"
                    size="small"
                >
                    随机
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
                    <strong>正向提示词(Prompt)：</strong>
                </t-col>
                <t-col flex="1">
                    <t-select 
                        size="small" 
                        :options="wordsCloud" 
                        placeholder="按Tab快速修正" />
                </t-col>
                <t-col flex="shrink">
                    <t-button
                    theme="primary"
                    size="small"
                    >
                        修正
                    </t-button>
                </t-col>
            </t-row>
            <t-textarea 
                placeholder="请输入正向Prompt" 
                name="description"
                v-model="workbenchParams.prompt"
            />
            <t-row :gutter="[8, 8]">
                <t-col flex="shrink">
                    <strong>反向提示词(Negative Prompt)：</strong>
                </t-col>
                <t-col flex="1">
                    <t-switch id="defaultNegativeBt" :label="['默认', '自定义']" />
                </t-col>
                <t-col flex="shrink">
                    <t-button
                    theme="primary"
                    size="small"
                    >
                        修正
                    </t-button>
                </t-col>
            </t-row>
            <t-textarea 
                placeholder="请输入反向Prompt" 
                name="description" 
                v-model="workbenchParams.negative_prompt"
            />
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
    name: 'componentPromptBox',
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