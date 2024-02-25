<template>
    <t-card>
        <t-tag size="small" style="position: absolute; top: -12px; left: 84px; z-index: 10;">
            {{  props ? props.type : 'None' }}
        </t-tag>
        <t-row :gutter="[20,8]" style="flex-wrap: nowrap;">

            <t-col flex="shrink">
                <div style="width: 48px; height: 48px; overflow: visible;">
                    <t-image
                        src="https://tdesign.gtimg.com/demo/demo-image-1.png"
                        shape="round"
                        style="left: -18px; top: -11px; width: 72px; height: 72px"
                        fit="cover"
                    />
                </div>
            </t-col>
            
            <t-col flex="1" style="overflow: hidden; padding-top: 8px;">

                <t-row :gutter="[8,0]">

                    <t-col :span="12">
                        <t-collapse expand-icon-placement="left">
                            <t-collapse-panel >
                                <template #header>
                                    <div style="position: absolute; left: 48px; top: 10px; right: 48px;">
                                        <div class="title_container">
                                            <span class="title">
                                                {{  props ? props.title : '请选择一个模型' }}
                                            </span>
                                        </div>
                                    </div>
                                </template>
                                <template #headerRightContent>
                                    <div style="position: absolute; top: 8px; right: 16px;">
                                        <t-button variant="outline" size="small" shape="square">
                                            <DeleteIcon slot="icon" shape="square" />
                                        </t-button>
                                    </div>
                                </template>
                                <t-row :gutter="[8, 8]">
                                    <t-col flex="shrink">
                                        权重：
                                    </t-col>
                                    <t-col flex="1">
                                    
                                        <t-slider 
                                            v-model="weight" 
                                            :show-tooltip="true" 
                                            title="weight"
                                            :max="3" 
                                            :min="-3" 
                                            :step="0.1"
                                            :inputNumberProps="{
                                                theme: 'column', autoWidth: true, size: 'small'
                                            }"
                                        />
                                    </t-col>
                                </t-row>
                                
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