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
          <t-button @click="() => managerVisible = !managerVisible">
            选择图片...
          </t-button>

          <t-dialog
            :visible.sync="managerVisible"
            mode="full-screen"
            header="选择图片对话框"
          >
            <post-manager />
          </t-dialog>
        </t-form-item>

        <t-space size="small" style="float: right;">
          <t-button theme="default" variant="base" type="reset">重置</t-button>
          <t-button theme="primary" type="submit">发布帖子</t-button>
        </t-space>

      </t-space>

    </t-form>
  </t-card>

</template>

<script>
import postManager from './components/manager.vue'

export default {
  name: 'createPost',
  components: {
    postManager,
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
}
</script>