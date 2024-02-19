<template>
    <t-card>
        <t-row :gutter="[20,8]" style="flex-wrap: nowrap;">

            <t-col flex="shrink">
                <t-image
                    src="https://tdesign.gtimg.com/demo/demo-image-1.png"
                    shape="round"
                    :style="{ width: '64px', height: '64px' }"
                    fit="cover"
                />
            </t-col>
            
            <t-col flex="1" style="overflow: hidden;">

                <t-row :gutter="[8,16]">
                    <t-col :span="12">
                        <t-tag>
                            CHECKPOINT
                        </t-tag>
                    </t-col>

                    <t-col :span="12">
                        <div class="title_container">
                            <span class="title">abc model 11111111111111111111111111111111111111111111111111</span>
                        </div>
                    </t-col>

                </t-row>

            </t-col>


        </t-row>
        
    </t-card>
</template>


<script>
export default {
    name: 'WideCard',
    components: {
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
    font-size: 20px; 
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>