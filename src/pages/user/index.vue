<template>
    <t-row :gutter="[16, 16]" class="userinfo_container">
        <t-col :span="12" align="center">
            <t-image
                src="https://tdesign.gtimg.com/demo/demo-image-1.png"
                :style="{ width: '108px', height: '108px' }"
                shape="circle"
                fit="cover"
            />
        </t-col>
        <t-col :span="12" align="center">
            <span> {{ userInfo.username }} </span>
        </t-col>
        <t-col :span="12" align="center">

            <t-card>
                <t-tabs v-model="userTab" @change="tabChange" align="left">

                    <t-tab-panel value="profile" label="个人中心" class="detail_container">
                        <UserProfile />
                    </t-tab-panel>

                    <t-tab-panel value="likes" label="我的收藏">
                        12345
                    </t-tab-panel>

                    <t-tab-panel :value="filterType.Image" label="我的生成">
                        <UserGenerate :props="{ name: filterType.Image }" />
                    </t-tab-panel>

                    <t-tab-panel value="presets" label="我的预设">
                        12345
                    </t-tab-panel>

                    <t-tab-panel value="imgposts" label="我的帖子">
                        12345
                    </t-tab-panel>

                    <t-tab-panel value="sdmodels" label="我的模型">
                        12345
                    </t-tab-panel>

                </t-tabs>
            </t-card>

        </t-col>
    </t-row>
</template>

<script>
import UserProfile from './components/profile.vue'
import UserGenerate from './components/generate.vue';

import { UserModelsTypes } from '@/config/UserModelsTypes.js';

import api from '@/service';

export default {
    name: 'page-portal',
    components: {
        UserProfile,
        UserGenerate
    },
    data() {
        return {
            filterType: UserModelsTypes,
            userTab: 'profile',

            userInfo: {
                username: '正在请求...',
                nickname: '正在请求...',
                email: '正在请求...',
                gender: '正在请求...',
                describe: '正在请求...',
            },
        }
    },
    methods: {
        tabChange() {
            this.$router.push({
                path: '/user/center',
                query: {
                    filter_name: this.userTab,
                }
            });
        },
        getUserInfo() {
            api.userApi.me().then(resp => {
                if (resp.data == null){
                    return;
                }
                this.userInfo = {
                    username: resp.data.userName || '',
                    nickname: resp.data.nickName || '',
                    email: resp.data.email || '',
                    gender: '武装直升机',
                    describe: resp.data.description || ''
                };
            })
            .catch(err => {
                this.$message.error("获取数据失败: " + err)
            });
        },
    },
    created() {
        this.getUserInfo()
    }
}
</script>

<style scoped>
.userinfo_container {
    padding-top: 32px;
    padding-bottom: 32px;
    width: 100%;
}

.userinfo_container span {
    font-size: 32px;
}

.detail_container {
    padding: 16px;
}
</style>