<template>
  <div style="margin: 16px 16px;">
    <t-row :gutter="[16, 16]" style="width: 100%; padding-top: 16px; padding-bottom: 48px;">
      <t-col
          flex="1"
      >
        <t-breadcrumb :maxItemWidth="'150'">
          <t-breadcrumbItem @click="handleBtnBack">上一级</t-breadcrumbItem>
          <t-breadcrumbItem :maxWidth="'160'">{{ objDetail.title }}</t-breadcrumbItem>
        </t-breadcrumb>
        <h1 style="word-break: break-all; line-height: 1.2">{{ objDetail.title }}</h1>
        <t-space :size="2" breakLine>
          <template #separator>
            <t-divider layout="vertical"/>
          </template>
          <t-tag>
            共 {{ objDetail.sdimageIdList ? objDetail.sdimageIdList.length : 0 }} 张
          </t-tag>

          <div style="display: flex; justify-content: center;">
            <t-avatar
                size="small"
                :image="objUserAvatarUrl"
            />
            <span style="padding-left: 8px;">
              {{ objDetail.userNickName }}
            </span>
          </div>

          <span>
            {{ updateTime }} 更新
          </span>
        </t-space>
      </t-col>
      <t-col
          flex="shrink"
          style="padding-top: 16px;"
      >
        <t-space breakLine>
          <t-button
              variant="outline"
          >
            <ThumbUp1Icon slot="icon" shape="square"/>
            {{ objDetail.numLiked }} 点赞
          </t-button>
          <t-button
              variant="outline"
          >
            <StarIcon slot="icon" shape="square"/>
            {{ objDetail.numFavours }} 收藏
          </t-button>
        </t-space>
      </t-col>
    </t-row>

    <t-row :gutter="[16, 16]">
      <t-col
          :span="12"
      >
        <t-image
            :src="imagesUrlList[imageIndex].src"
            class="image_container"
            fit="contain"
            shape="round"
            @click="handleImageOnClick(imagesUrlList[imageIndex].id)"
        />

        <t-card style="margin-top: 24px;">
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
                  <div class="image_overlay" @click="handleListImageOnClick(index)"></div>
                </template>
              </t-image>

            </t-col>
          </t-row>
        </t-card>

      </t-col>
    </t-row>

    <t-row :gutter="[16, 16]" style="padding-top: 24px">
      <t-col
          :span="12"
      >
        <t-card>
          {{ objDetail.body }}
        </t-card>


      </t-col>
    </t-row>
  </div>
</template>


<script>
import {StarIcon, ThumbUp1Icon} from 'tdesign-icons-vue';

import api from '@/service'
import util from '@/utils'
import utils from '@/utils'

export default {
  name: 'PostDetail',
  components: {
    ThumbUp1Icon,
    StarIcon
  },
  data() {
    return {
      imageIndex: 0,
      imagesUrlList: [],
      objDetail: {},
      objUser: {},
      objUserAvatarUrl: require('@/assets/placeHolder/card-no-preview.png'),

      id: null,
    }
  },
  computed: {
    updateTime() {
      return util.time.convertUTCTime(this.objDetail.updateTime)
    },
    displayMobile: function () {
      return this.$store.getters.getDisplayMobile
    },
  },
  methods: {
    freshPage() {
      // 获取obj数据
      api.sdPostApi.getSdPostDetail({
        postId: this.id,
      })
          .then(resp => {
            this.objDetail = resp.data;

            // 获取图片URL列表
            if (this.objDetail.sdimageIdList.length !== 0) {
              let reqs = []

              for (let i in this.objDetail.sdimageIdList) {
                reqs.push(
                    api.sdImageApi.getStaticImageUrl(
                        {id: this.objDetail.sdimageIdList[i]}
                    ).then((resp) => {
                      util.array.insertItem(this.imagesUrlList, {
                        id: this.objDetail.sdimageIdList[i],
                        src: utils.images.getMediumImageUrl(resp.data.url)
                      })
                    })
                )
              }

              Promise.all(reqs)
                  .catch(err => {
                    this.$message.error("获取数据失败: " + err)
                  })
            }
            // 获取用户信息
            api.userApi.getUserInfoById({
              id: this.objDetail.userId,
            })
                .then((resp) => {
                  this.objUser = resp.data;

                  // 获取用户头像
                  api.sdImageApi.getStaticImageUrl({
                    id: this.objUser.avatar
                  })
                      .then((resp) => {
                        this.objUserAvatarUrl = resp.data.url;
                      })
                      .catch(err => {
                        this.$message.error("获取数据失败: " + err)
                      });
                })
                .catch(err => {
                  this.$message.error("获取数据失败: " + err)
                });
          })
          .catch(err => {
            this.$message.error("获取数据失败: " + err)
          });


    },

    handleBtnBack() {
      this.$router.back();
    },

    handleImageOnClick(id) {
      this.$store.commit(
          'imageDialogSetDisplay',
          {
            display: true,
            imageId: id,
          }
      );
    },

    handleListImageOnClick(i) {
      this.imageIndex = i;
    }
  },
  created() {
    this.id = this.$router.currentRoute.query.id;
    this.freshPage();
  }
}
</script>


<style scoped>

.image_container {
  width: 100%;
  height: 70vh;
}

.image_overlay {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

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

</style>