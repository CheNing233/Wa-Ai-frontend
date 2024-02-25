<template>
    <div class="portal_container">
        <t-row>
            <t-col 
                :xs="{ span: 12, offset: 0 }"
                :sm="{ span: 12, offset: 0 }"
                :md="{ span: 10, offset: 1 }"
                :lg="{ span: 10, offset: 1 }"
                :xl="{ span: 10, offset: 1 }"
            >

            
            <t-form>
                <t-form-item label="账号" name="name" initialData="">
                    <t-input v-model="formData.username" :readonly="true" placeholder="请输入内容" />
                </t-form-item>
                <t-form-item label="昵称" name="name" initialData="">
                    <t-input v-model="formData.nickname" :readonly="true" placeholder="请输入内容" />
                </t-form-item>
                <t-form-item label="性别" name="name" initialData="">
                    <t-select v-model="formData.gender" :readonly="true" >
                        <t-option key="orange" value="orange">Orange</t-option>
                    </t-select>
                </t-form-item>
                <t-form-item label="邮箱" name="Email" initialData="">
                    <t-input v-model="formData.email" :readonly="true" placeholder="请输入内容" />
                </t-form-item>
                <t-form-item label="描述" name="describe" initialData="">
                    <t-textarea v-model="formData.describe" :readonly="true" placeholder="请输入内容" />
                </t-form-item>
            </t-form>
        </t-col>
        </t-row>

        
    </div>
</template>

<script>
import api from '@/service';


export default {
    name: 'UserProfile',
    components: {
    },
    props: [
        'props'
    ],    
    computed: {
    },
    data() {
        return {
            formData: {
                username: '正在请求...',
                nickname: '正在请求...',
                email: '正在请求...',
                gender: '正在请求...',
                describe: '正在请求...',
            },
        }
    },
    methods: {
        onPageSizeChange(pageSize) {
            this.pageSize = pageSize;
            this.freshPage();

        },
        onCurrentChange(pageCurrent) {
            this.pageCurrent = pageCurrent;
            this.freshPage();
        },
        freshPage(){
            api.userApi.me().then(resp => {
                if (resp.data == null){
                    return;
                }
                this.formData = {
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
        }
    },
    created() {
        this.freshPage();
    }
}

</script>

<style scoped>
.portal_container {
    display: block; 
    width: calc(100% - 32px); 
    margin: 16px 16px;
}

.portal_baserow {
    overflow: hidden; 
    display: flex; 
    flex-wrap: wrap; 
    justify-content: flex-start;
}
</style>