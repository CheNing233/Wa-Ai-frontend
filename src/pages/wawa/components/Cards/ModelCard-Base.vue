<template>
    <t-image 
        src="https://tdesign.gtimg.com/demo/demo-image-1.png" 
        fit="cover" 
        class="image" 
        shape="round"
    >
        <template #overlayContent>
            <div class="image_overlay" @click="handleImageOnClick">

            </div>

            <t-tag 
                style="position: absolute; left: 8px; top: 8px;"
            >
                {{ props.type }}
            </t-tag>

            <t-button 
                theme="primary" 
                size="small"
                style="position: absolute; right: 8px; top: 8px;"
                @click="handleBtnRunClick"
            >
                <ControlPlatformIcon slot="icon" shape="square" />
                运行
            </t-button>


            <div style="position: absolute; bottom: 6px; width: 100%;">
                <t-card 
                    :bordered="false" 
                    style="background-color: rgba(0,0,0,0); backdrop-filter: blur(2px);">
                    <t-space :size="8" direction="vertical" style="width: 100%;">
                        <t-row>
                            <t-col :span="12">
                                <t-link hover="color" class="ellipsis_container">
                                    <span class="ellipsis_text image_title" >{{ props.title }}</span>
                                </t-link>
                            </t-col>
                        </t-row>

                        <t-row :gutter="8" style="flex-wrap: nowrap;">
                            <t-col :span="8">
                                <t-link hover="color" variant="text" class="ellipsis_container">
                                    <UserIcon slot="prefix-icon" shape="square" style="color: #8A8A8A;" />
                                    <span class="ellipsis_text" style="color: #8A8A8A;">{{ authorName }}</span>
                                </t-link>
                            </t-col>
                            <t-col :span="4">
                                <t-button 
                                    size="small" 
                                    theme="primary"
                                    :variant="(star) ? 'outline' : null" 
                                    @click="() => { star = !star }" 
                                    style="float: right;"
                                >
                                    <StarIcon slot="icon" shape="square" style="color: #8A8A8A;" />
                                    <span  style="color: #8A8A8A;">{{ props.like }}</span>
                                </t-button>
                            </t-col>

                        </t-row>
                    </t-space>

                </t-card>

            </div>
        </template>
    </t-image>
</template>

<script>
import {
    UserIcon,
    StarIcon,
    ControlPlatformIcon
} from 'tdesign-icons-vue';

import api from '@/service';

export default {
    name: 'BaseCard',
    components: {
        UserIcon,
        StarIcon,
        ControlPlatformIcon
    },
    props:[
        'props',
    ],
    data() {
        return {
            authorName: '',
            star: false,
            isSelected: false,
        }
    },
    methods: {
        fresh(){
            const PARAMS = {
                userId: this.props.authorId
            };

            
            api.userApi.getUsernameById(PARAMS)
            .then(resp => {
                this.authorName = resp.data;
            });
                
        },
        handleBtnRunClick(){
            var selected = this.$store.getters.workbenchGetSelected;

            if(this.props.type == "CHECKPOINT"){
                selected.CHECKPOINT = this.props;
                this.$message.success("CHECKPOINT 已更改为 " + this.props.title);
            }
            else if(this.props.type == "LORA"){
                if (!selected.LORA.find(obj => obj.id === this.props.id)) {
                    selected.LORA.push(this.props);
                    this.$message.success("LORA 已添加" + this.props.title);
                }
            }
            else if(this.props.type == "EMBEDDING"){
                if (!selected.EMBEDDING.find(obj => obj.id === this.props.id)) {
                    selected.EMBEDDING.push(this.props);
                    this.$message.success("EMBEDDING 已添加" + this.props.title);
                }
            }
            else if(this.props.type == "VAE"){
                selected.VAE = this.props;
                this.$message.success("VAE 已更改为 " + this.props.title);
            }
            this.$store.commit('workbenchUpdateSelected', selected);
        },
        handleImageOnClick() {
            console.log(this.$store.getters.workbenchGetSelected)
        }
    },
    created() {
        this.fresh();
    },
}
</script>

<style scoped>
.image {
    width: 100%;
    aspect-ratio: 0.75;
}

.image_overlay {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.image_title {
    font-size: 16px;
    font-weight: bold;
    padding-bottom: 4px;
}

.ellipsis_container {
    display: flex;
    width: 100%;
    overflow: hidden;
}

.ellipsis_text {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
}
</style>