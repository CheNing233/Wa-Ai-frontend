<template>
    <t-image 
        :src="bannerImage" 
        fit="cover" 
        class="image" 
        shape="round"
        :style="{ opacity: opacity }"
    >
        <template #overlayContent>
            <div 
                class="image_overlay" @click="handleImageOnClick"
                @mouseover="() => { opacity = 0.8 }"
                @mouseleave="() => { opacity = 1 }"
            >

            </div>

            <t-tag 
                style="position: absolute; left: 8px; top: 8px;"
            >
                {{ props.type }}
            </t-tag>

            <t-button 
                v-if="isManage == false"
                theme="primary" 
                size="small"
                style="position: absolute; right: 8px; top: 8px;"
            >
                <ControlPlatformIcon slot="icon" shape="square" />
                运行
            </t-button>

            <t-checkbox
                v-if="isManage == true"
                v-model="isSelected"
                style="position: absolute; right: 8px; top: 8px;"
            >
                <t-tag 
                    :theme=" isSelected ? 'primary' : 'default'"
                >
                    {{ isSelected ? '已选择' : '未选择' }}
                </t-tag>
                
            </t-checkbox>

            <div style="position: absolute; bottom: 0; width: 100%;">
                <t-card 
                    :bordered="false" 
                    style="background-color: rgba(255, 255, 255, 0.6); backdrop-filter: blur(6px);"
                >
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
                                    <UserIcon slot="prefix-icon" shape="square" style="" />
                                    <span class="ellipsis_text" style="">{{ props.author }}</span>
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
                                    <StarIcon slot="icon" shape="square" />
                                    <span>{{ props.like }}</span>
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

import { FilesAPI } from '@/service/file.js';

export default {
    name: 'BaseCard',
    components: {
        UserIcon,
        StarIcon,
        ControlPlatformIcon
    },
    props:[
        'props',
        'isManage'
    ],
    data() {
        return {
            opacity: 1,
            star: false,
            isSelected: false,
            bannerImage: "data:image/png;base64,"
        }
    },
    methods: {
        handleImageOnClick() {
        },
        asyncGetImage() {
            FilesAPI.getImage(this.props.imageid)
                .then(res => {
                    this.bannerImage ="data:image/png;base64," + res;
                })
                .catch(err => {
                    this.$message.error("图片加载失败: " + err.message)
                });
        },
    },
    created() {
        this.asyncGetImage();
    },
}
</script>

<style scoped>
.image {
    width: 100%;
    aspect-ratio: 0.75;
    transition: opacity 0.3s ease;
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