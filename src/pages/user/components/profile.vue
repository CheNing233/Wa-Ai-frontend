<template>
  <div class="portal_container">
    <t-row>
      <t-col
          :lg="{ span: 10, offset: 1 }"
          :md="{ span: 10, offset: 1 }"
          :sm="{ span: 12, offset: 0 }"
          :xl="{ span: 10, offset: 1 }"
          :xs="{ span: 12, offset: 0 }"
      >

        <t-form>
          <t-form-item initialData="" label="账号" name="name">
            <t-input v-model="formData.userName" :readonly="true" placeholder="请输入内容"/>
          </t-form-item>
          <t-form-item initialData="" label="昵称" name="name">
            <t-input v-model="formData.nickName" :readonly="true" placeholder="请输入内容"/>
          </t-form-item>
          <t-form-item initialData="" label="性别" name="name">
            <t-select v-model="formData.gender" :readonly="true">
              <t-option key="orange" value="orange">Orange</t-option>
            </t-select>
          </t-form-item>
          <t-form-item initialData="" label="邮箱" name="Email">
            <t-input v-model="formData.email" :readonly="true" placeholder="请输入内容"/>
          </t-form-item>
          <t-form-item initialData="" label="描述" name="describe">
            <t-textarea v-model="formData.description" :readonly="true" placeholder="请输入内容"/>
          </t-form-item>
        </t-form>
      </t-col>
    </t-row>


  </div>
</template>

<script>
// import api from '@/service';


export default {
  name: 'UserProfile',
  components: {},
  props: [
    'props'
  ],
  computed: {
    formData() {
      let data = this.$store.getters.userGetInfo;

      if (data === null) {
        data = {
          userName: '正在请求...',
          nickName: '正在请求...',
          email: '正在请求...',
          gender: '正在请求...',
          description: '正在请求...',
        }
      }

      return data;
    }
  },
  data() {
    return {}
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
    freshPage() {
      this.formData = this.$store.getters.userGetInfo;
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