<template>
  <div>
    <!--    常驻显示左上区-->
    <t-space
        size="small"
        style="position: absolute; left: 20px; top: 12px; z-index: 6"
    >
      <t-tag>
        共 {{ listItem.sdimageIdList.length }} 张
      </t-tag>
    </t-space>

    <!--    常驻显示右上区-->


    <div
        class="image_explain_content"
        style="position: absolute; left: 20px; right: 20px; bottom: 16px; z-index: 6"
        @mouseout="() => { isSelected = false }"
        @mouseover="() => { isSelected = true }"
    >
      <t-space direction="vertical"
               size="small"
               style="width: 100%"
      >
        <t-space align="center" direction="horizontal">
          <t-space
              direction="vertical"
              size="1px"
          >
            <span class="image_text">
              {{ listItem.userNickName }}
            </span>
            <span class="image_text">
              {{ imageUpdateTime }} 更新
            </span>
          </t-space>
        </t-space>

        <t-space direction="horizontal" style="width: 100%">

          <t-link class="ellipsis_container" hover="color">
            <span class="ellipsis_text image_title">{{ listItem.title }}</span>
          </t-link>

        </t-space>

        <t-space
            size="small"
        >
          <t-tag
              shape="round"
              style="background: rgba(0,0,0,0.1); "
          >
            <template #icon>
              <t-rate
                  :count="1"
                  :value="isFavoured ? 1 : 0"
              >
                <template #icon>
                  <StarFilledIcon/>
                </template>
              </t-rate>
            </template>
            <span style="color: #FFFFFF">
              {{ isFavoured ? listItem.numFavours + 1 : listItem.numFavours }}
            </span>
          </t-tag>

          <t-tag
              shape="round"
              style="background: rgba(0,0,0,0.1); "
              @click="handleBtnLike"
          >
            <template #icon>
              <t-rate
                  :count="1"
                  :value="isLiked ? 1 : 0"
                  color="var(--td-error-color-7)"
                  disabled
              >
                <template #icon>
                  <HeartFilledIcon/>
                </template>
              </t-rate>
            </template>
            <span style="color: #FFFFFF">
              {{ isLiked ? listItem.numLiked + 1 : listItem.numLiked }}
            </span>
          </t-tag>

          <t-tag
              shape="round"
              style="background: rgba(0,0,0,0.1); "
          >
            <template #icon>
              <ChatBubble1Icon color="#E8E8E8"/>
            </template>
            <span style="color: #FFFFFF">
              {{ listItem.numComment }}
            </span>
          </t-tag>

        </t-space>

      </t-space>
    </div>


    <t-image
        class="image"
        fit="cover"
        shape="round"
        :src="bannerImage"
    >
      <!--      图片显示区-->


      <template #overlayContent>
        <div
            :class="['overlay', isSelected ? 'overlay_on_trigger' : null]"
            class="overlay"
            @click="handleImageOnClick"
        >
          <!--          蒙版显示区-->

          <t-space
              v-if="manageStatus"
              size="8px"
              style="position: absolute; right: 4px; top: 8px;"
          >
            <t-checkbox
                v-model="isSelected"
            >

            </t-checkbox>
          </t-space>
        </div>
      </template>
    </t-image>
  </div>

</template>

<script>
import {ChatBubble1Icon, HeartFilledIcon, StarFilledIcon} from 'tdesign-icons-vue';

import api from '@/service';
import util from '@/utils';

export default {
  name: 'BaseCard',
  components: {
    ChatBubble1Icon,
    HeartFilledIcon,
    StarFilledIcon,
    // ZoomInIcon
  },
  props: [
    'listItem',
    'manageStatus',
    'reFreshPageIndicator',
  ],
  data() {
    return {
      isLiked: false,
      isFavoured: false,
      isSelected: false,

      bannerImage: require('@/assets/placeHolder/card-no-preview.png'),
    }
  },
  computed: {
    imageUpdateTime() {
      return util.time.convertUTCTime(this.listItem.updateTime)
    },
  },
  methods: {
    fresh() {
      if (this.listItem.sdimageIdList.length > 0)
        if (this.listItem.sdimageIdList[0] !== null) {

          const PARAMS = {
            id: this.listItem.sdimageIdList[0],
          };

          api.sdImageApi.getStaticImageUrl(PARAMS)
              .then(resp => {
                this.bannerImage = util.images.getThumbnailUrl(resp.data.url);
              })
              .catch(err => {
                this.$message.error("获取数据失败: " + err)
              });
        }
    },
    handleBtnEnlargeClick() {
      this.$store.commit('imageDialogSetDisplay', {
        display: true,
        imageId: null
      });
    },

    handleBtnRunClick() {

    },

    handleBtnLike() {
      const PARAMS = {
        sdmodelId: this.listItem.id,
      };
      api.sdModelApi.likeSdModel(PARAMS)
          .then(resp => {
            this.isLiked = resp.data.isLike;
          })
          .catch(err => {
            this.$message.error("操作失败: " + err)
          });
    },

    handleImageOnClick() {
      if (this.manageStatus) {
        // 选择模式
        this.isSelected = !this.isSelected;
        this.$emit('selectEvent', this.listItem.id);
      } else {
        // 查看模式
        this.$router.push({
          path: '/post',
          query: {
            id: this.listItem.id,
          }
        });
      }


    }
  },
  created() {
    this.fresh();
  },
  watch: {
    manageStatus() {
      if (!this.manageStatus) {
        this.isSelected = false;
      }
    },
    reFreshPageIndicator() {
      this.freshPage();
    }
  },
}
</script>

<style scoped>
.image {
  aspect-ratio: 0.75;
}


.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  opacity: 0;
  transition: 0.3s;
  cursor: pointer;
}

.overlay:hover {
  background: rgba(0, 0, 0, 0.15);
  opacity: 1;
}

.overlay_on_trigger {
  background: rgba(0, 0, 0, 0.15);
  opacity: 1;
}

.image_title {
  font-size: 20px;
  font-weight: 1000;
  color: #FFFFFF;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  padding-bottom: 4px;
}

.image_text {
  font-weight: 1000;
  font-size: 13px;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  color: rgba(255, 255, 255, 1);
}

.image_explain_content {
  margin: -12px;
  padding: 12px;
  border-radius: 0 0 4px 4px;
  background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.15),
      transparent
  );
}

.ellipsis_container {
  display: flex;
  width: 100%;
  overflow: hidden;
}

.ellipsis_text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis
}
</style>