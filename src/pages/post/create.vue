<template>
  <t-card title="创建一个帖子">
    <t-form
        :data="formData"
        :rules="formRules"
        @submit="handleSubmit"
    >

      <t-space :size="24" direction="vertical" style="width: 100%">

        <t-form-item label="帖子标题" name="title">
          <t-input v-model="formData.title"/>
        </t-form-item>

        <t-form-item label="帖子介绍" name="content">
          <t-textarea
              :autosize="{ minRows: 3 }"
              placeholder="请输入介绍"
              v-model="formData.content"
          />
        </t-form-item>

        <t-form-item label="帖子图片" prop="images">

          <t-row class="image_list">
            <t-col
                v-for="(value, index) in imagesUrlList"
                :key="index"
                flex="shrink"
            >
              <t-image
                  :src="value.src"
                  class="image_item"
                  fit="cover"
                  shape="round"
              >
                <template #overlayContent>
                  <div class="image_overlay"></div>
                </template>
              </t-image>

            </t-col>
          </t-row>

        </t-form-item>

        <t-space size="small" style="float: right;">
          <t-button variant="text" @click="handleCancel">取消</t-button>
          <t-button theme="default" variant="base" type="reset">重置</t-button>
          <t-button
              theme="primary"
              type="submit"
              :loading="publishBtnLoading"
          >
            {{ publishBtnLoading ? '发布中...' : '发布帖子' }}
          </t-button>
        </t-space>

      </t-space>

    </t-form>
  </t-card>

</template>

<script>
// import postManager from './components/manager.vue'
import api from '@/service'
import utils from '@/utils'

export default {
  name: 'createPost',
  methods: {
    freshPage() {

      let reqs = []

      for (let i in this.formData.images) {
        console.info(this.formData.images[i])
        reqs.push(
            api.sdImageApi.getStaticImageUrl(
                {id: this.formData.images[i]}
            )
                .then((resp) => {
                  utils.array.insertItem(
                      this.imagesUrlList,
                      {
                        id: this.formData.images[i],
                        src: utils.images.getThumbnailUrl(resp.data.url)
                      }
                  )
                })
        )
      }

      Promise.all(reqs)
          .catch(err => {
            this.$message.error("获取数据失败: " + err)
          })
    },

    handleImageOnClick(id){
      this.$store.commit(
          'imageDialogSetDisplay',
          {
            display: true,
            imageId: id
          }
      );
    },

    handleCancel() {
      this.$router.back();
    },

    handleSubmit({validateResult, firstError}) {
      if (validateResult === true) {
        this.publishBtnLoading = true;

        const DATA = {
          title: this.formData.title,
          body: this.formData.content,
          sdImages: this.formData.images,
        }

        api.sdPostApi.createSdPost(DATA)
            .then(() => {
              this.$message.success('发布成功');
              this.$router.back()
            })
            .catch(error => {
              this.$message.error('发布失败：' + error);
            })
            .finally(() => {
              this.publishBtnLoading = false;
            })
      } else {
        this.$message.warning(firstError);
      }
    },
  },
  components: {
    // postManager,
  },
  computed: {
  },
  data() {
    return {
      formData: {
        title: '',
        content: '',
        images: []
      },
      formRules: {
        title: [
          {required: true, message: '请输入标题', type: 'error'},
        ],
        content: [
          {required: true, message: '请输入内容', type: 'error'},
        ],
      },
      imagesUrlList: [],

      managerVisible: false,
      managerData: [],

      publishBtnLoading: false,
    }
  },
  created() {
    this.formData.images = this.$route.query.selectedImages;
    this.freshPage();
  }
}
</script>

<style scoped>
.image_list {
  flex-wrap: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  width: 100%;
  justify-content: flex-start;

  padding-top: 8px;
  padding-bottom: 8px;

}

.image_item {
  width: 100px;
  height: 100px;
  margin-right: 8px;
}

.image_overlay {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>