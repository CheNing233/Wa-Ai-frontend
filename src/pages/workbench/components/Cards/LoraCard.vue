<template>
    <t-card>
        <t-tag size="small" style="position: absolute; top: -2px; left: -2px; z-index: 10;">
            {{ props.type }}
        </t-tag>
        <t-row :gutter="[20,8]" style="flex-wrap: nowrap;">

            <t-col flex="shrink">
                <div style="width: 64px; height: 64px; overflow: visible;">
                    <t-image
                        src="https://tdesign.gtimg.com/demo/demo-image-1.png"
                        shape="round"
                        style="left: -17px; top: -10px; width: 88px; height: 88px"
                        fit="cover"
                    />
                </div>
            </t-col>
            
            <t-col flex="1" style="overflow: hidden; padding-top: 0px;">

                <t-row :gutter="[8,0]">
                    <t-col :span="12">
                        <div class="title_container">
                            <span class="title">
                                {{ props.title }}
                            </span>
                        </div>
                    </t-col>

                    <t-col :span="12">
                        <t-collapse borderless="borderless" expand-icon-placement="left">
                            <t-collapse-panel size="small" >
                                <template #header>
                                    模型设置
                                </template>
                                <template #headerRightContent>
                                    <t-button variant="outline" size="small" shape="square">
                                        <DeleteIcon slot="icon" shape="square" />
                                    </t-button>
                                </template>
                                <t-slider 
                                    v-model="weight" 
                                    :show-tooltip="true" 
                                    :max="3" 
                                    :min="-3" 
                                    :step="0.1"
                                    :inputNumberProps="{
                                        theme: 'column', autoWidth: true, size: 'small'
                                    }"
                                />
                            </t-collapse-panel>
                        </t-collapse>
                    </t-col>

                </t-row>

            </t-col>


        </t-row>
        
    </t-card>
</template>


<script>
import {
    DeleteIcon
} from 'tdesign-icons-vue';

export default {
    name: 'ExtModelCard',
    components: {
        DeleteIcon
    },
    props: [
        'props'
    ],
    data() {
        return {
            weight: 1,
        }
    },
}

</script>


<style scoped>
.title_container {
    display: flex; 
    overflow: hidden; 
    width: 100%;
}
.title {
    flex: 1;
    font-size: 16px; 
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

</style>