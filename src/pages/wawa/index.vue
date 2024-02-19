<template>
    <t-row>
        <t-col :span="12">
            <t-space direction="vertical" style="width: 100%">
                <componentSearcher />
                <componentTagsContainer :props="{ name: filterType.Prompt }" />
                <componentModelsContainer :props="{ name: filterType.Model }" />
                <componentModelsContainer :props="{ name: filterType.LoraLycoris }" />
                <componentModelsContainer :props="{ name: filterType.Embedding }" />
                <componentModelsContainer :props="{ name: filterType.Vae }" />
                <div>

                    <t-row>
                        <t-col :span="12" style="width: 100%;">
                            <div style="text-align: center;">世界尽头了喵(＞﹏＜)</div>
                        </t-col>
                    </t-row>

                </div>
            </t-space>
        </t-col>
    </t-row>
</template>

<script>

import componentSearcher from './components/Searcher.vue';
import componentTagsContainer from './components/TagsContainer.vue';
import componentModelsContainer from './components/ModelsContainer.vue';

import { SdModelsTypes } from '@/config/SdModelsTypes.js';

export default {
    name: 'page-portal',
    components: {
        componentSearcher,
        componentTagsContainer,
        componentModelsContainer,
    },
    data() {
        return {
            filterType: SdModelsTypes,
        }
    },
    methods: {
        generateRandomText() {
            var maxLength = 400; // 填充文字的最大长度
            var length = Math.floor(Math.random() * maxLength) + 1; // 生成随机长度

            var text = "";
            var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // 可选的字符集

            for (var i = 0; i < length; i++) {
                var randomIndex = Math.floor(Math.random() * characters.length);
                text += characters.charAt(randomIndex);
            }

            return text;
        }
    }
}
</script>
