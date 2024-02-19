<template>
    <div class="container">
        <t-row>
            <t-col :offset="1" :span="10" class="title-container">
                <h2 class="title">WA - the AI Generation Platform</h2>
            </t-col>
            <t-col 
                :offset="3" 
                :span="6" 
                :xs="{ offset: 1, span: 10 }" 
                :sm="{ offset: 3, span: 6 }"
                :md="{ offset: 3, span: 6 }" 
                :lg="{ offset: 3, span: 6 }" 
                :xl="{ offset: 3, span: 6 }"
            >
                <t-form 
                    :data="formData" 
                    @submit="onSubmit" 
                    style="width: 100%;" ref="form">
                    <t-row :gutter="[8, 8]">

                        <t-col flex="50px">
                            <t-select 
                                autoWidth 
                                v-model="formData.searcherMode"
                            >
                                
                                <t-option 
                                    v-for="(value, key) in formTypes"
                                    :key="key" 
                                    :label="value" 
                                    :value="value" 
                                />

                            </t-select>
                        </t-col>



                        <t-col flex="auto">
                            <t-input 
                                clearable 
                                style="width: 100%;" 
                                placeholder="键入并回车以搜索..."
                                v-model="formData.searcherContent"
                            >
                                <SearchIcon slot="prefix-icon" style="z-index: -100;"></SearchIcon>
                            </t-input>
                        </t-col>


                        <t-col flex="50px">

                            <t-button style="width: 100%;" theme="primary" type="submit">
                                搜索
                            </t-button>

                        </t-col>


                    </t-row>
                </t-form>
            </t-col>
        </t-row>
        
    </div>
</template>


<script>
import {
    SearchIcon,
} from 'tdesign-icons-vue';

import { SdModelsTypes } from '@/config/SdModelsTypes.js';

const INITIAL_DATA = {
    searcherMode: SdModelsTypes.ComP,
    searcherContent: '',
}

export default {
    name: 'componentSearcher',
    components: {
        SearchIcon,
    },
    data() {
        return {
            formData: {
                ...INITIAL_DATA
            },
            formTypes: SdModelsTypes,
        };
    },
    methods: {
        onSubmit() {
            const { query } = this.$router.currentRoute;

            this.$router.push({
                path: '/',
                query: {
                    ...query,
                    search: this.formData.searcherContent,
                    filter_page: 1,
                    filter_name: this.formData.searcherMode,
                }
            });
        },
    },
    mounted() {
    }
}
</script>

<style scoped>
.container {
    margin-bottom: 20px;
}

.title-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px;

    .title {
        display: block;
        width: 100%;
    }
}
</style>