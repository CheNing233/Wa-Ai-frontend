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
            <span> test </span>
        </t-col>
        <t-col :span="12" align="center">

            <t-card>
                <t-tabs v-model="userTab" @change="tabChange" align="left">

                    <t-tab-panel value="profile" label="个人中心" class="detail_container">
                        <t-descriptions
                            title="基本"
                            :column="$store.getters.getDisplayMobile ? 1 : 2"
                            style="padding-top: 32px;"
                        >
                            <t-descriptions-item label="昵称">TDesign</t-descriptions-item>
                            <t-descriptions-item label="性别">武装直升机</t-descriptions-item>
                            <t-descriptions-item label="描述">流萤天下第一可爱</t-descriptions-item>
                            <t-descriptions-item label="是否玩原神星铁（重要）">是</t-descriptions-item>
                            <t-descriptions-item label="邮箱">139****0609@abc.com</t-descriptions-item>
                            <t-descriptions-item label="管理员">是</t-descriptions-item>
                            <t-descriptions-item label="最近登录">2024-02-14 08:55:43.091011</t-descriptions-item>
                            <t-descriptions-item label="注册时间">2024-01-23 20:03:41.784903</t-descriptions-item>
                        </t-descriptions>

                        <t-descriptions 
                            title="数据"
                            :column="$store.getters.getDisplayMobile ? 1 : 3"
                            style="padding-top: 32px;"
                        >
                            <t-descriptions-item label="运行统计">666</t-descriptions-item>
                            <t-descriptions-item label="今日运行">6</t-descriptions-item>
                            <t-descriptions-item label="我的收藏">114</t-descriptions-item>
                            <t-descriptions-item label="我的图片">514</t-descriptions-item>
                            <t-descriptions-item label="我的预设">191</t-descriptions-item>
                            <t-descriptions-item label="我的帖子">810</t-descriptions-item>
                            <t-descriptions-item label="我的模型">233</t-descriptions-item>
                        </t-descriptions>
                    </t-tab-panel>

                    <t-tab-panel value="likes" label="我的收藏">
                        12345
                    </t-tab-panel>

                    <t-tab-panel :value="filterType.Image" label="我的图片">
                        <componentModelsManager :props="{ name: filterType.Image }" />
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
import componentImagesManager from './components/ImagesManager.vue';


import { UserModelsTypes } from '@/config/UserModelsTypes.js';

export default {
    name: 'page-portal',
    components: {
        componentModelsManager: componentImagesManager,
    },
    data() {
        return {
            filterType: UserModelsTypes,
            userTab: 'profile',
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