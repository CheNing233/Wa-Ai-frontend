<template>
    <div>
        <t-space direction="vertical" style="display: flex">
            <t-row>
                <t-col :span="6" :offset="3" class="col_container">
                    <h1 class="title">登录到 WA<br />the AI Generation Platform</h1>
                </t-col>
            </t-row>
            <t-row>
                <t-col :span="6" :offset="3" class="col_container">
                    <t-card class="login_wrapper">
                        <component_content></component_content>
                    </t-card>
                </t-col>
            </t-row>
        </t-space>
    </div>
</template>

<script>
import component_content from './components/component-content.vue';


export default {
    name: 'login-index',
    components: {
        component_content
    },
    data() {
        return {
            
        }
    },
    methods: {
        
    }
}
</script>

<style scoped>
    .title {
        font-size: 36px;
        line-height: 44px;
        color: var(--td-text-color-primary);
        margin: 70px;
        text-align: center;
    }

    .col_container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .login_wrapper {
        width: 100%;
        min-width: 320px;
        max-width: 600px;
    }

    .footer_text {
        font-size: 12px;
        color: #999;
        text-align: center;
        margin-top: 70px;
    }

</style>