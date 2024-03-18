<template>
  <t-card title="创建一个帖子">
    <t-form
        :data="formData"
        :rules="formRules"
    >

      <t-space direction="vertical" style="width: 100%">

        <t-form-item label="帖子标题" prop="title">
          <t-input v-model="formData.title"/>
        </t-form-item>

        <t-form-item label="帖子介绍" prop="content">
          <t-textarea
              :autosize="{ minRows: 3 }"
              placeholder="请输入介绍"
              v-model="formData.content"
          />
        </t-form-item>

        <t-form-item label="帖子图片" prop="images">
          <t-list :split="true" style="width: 100%; height: 300px; overflow-y: scroll; overflow-x: hidden">

            <t-list-item
                v-for="(item, index) in formData.images"
                :key="index"
            >
              {{ item }}
              <!--            <template #action>-->
              <!--              <t-link theme="primary" hover="color" style="margin-left: 16px"> 操作1 </t-link>-->
              <!--            </template>-->
            </t-list-item>
          </t-list>
        </t-form-item>

        <t-space size="small" style="float: right;">
          <t-button variant="text" @click="handleCancel">取消</t-button>
          <t-button theme="default" variant="base" type="reset">重置</t-button>
          <t-button theme="primary" type="submit">发布帖子</t-button>
        </t-space>

      </t-space>

    </t-form>
  </t-card>

</template>

<script>
// import postManager from './components/manager.vue'

export default {
  name: 'createPost',
  methods: {
    handleCancel() {
      this.$router.back();
    }
  },
  components: {
    // postManager,
  },
  computed: {},
  data() {
    return {
      formData: {
        title: '',
        content: '',
        images: []
      },
      formRules: {
        title: [
          {required: true, message: '请输入标题'},
        ],
        content: [
          {required: true, message: '请输入内容'},
        ],
      },

      managerVisible: false,
      managerData: [],
    }
  },
  created() {
    this.formData.images = this.$route.query.selectedImages;
    console.info("im", this.formData.images)
  }
}
</script>