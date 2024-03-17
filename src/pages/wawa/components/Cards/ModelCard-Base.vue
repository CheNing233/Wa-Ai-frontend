<template>
  <div>
    <!--    常驻显示左上区-->
    <t-space
        size="small"
        style="position: absolute; left: 20px; top: 12px; z-index: 6"
    >
      <t-tag>
        {{ props.type }}
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
          <t-avatar shape="round" size="large">
            T
          </t-avatar>
          <t-space
              direction="vertical"
              size="1px"
          >
            <span class="image_text">
              123
            </span>
            <span class="image_text">
              {{ imageUpdateTime }} 更新
            </span>
          </t-space>
        </t-space>

        <t-space direction="horizontal" style="width: 100%">

          <t-link class="ellipsis_container" hover="color">
            <span class="ellipsis_text image_title">{{ props.title }}</span>
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
              <ControlPlatformIcon color="#E8E8E8"/>
            </template>
            <span style="color: #FFFFFF">
              0
            </span>
          </t-tag>

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
              0
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
              {{ isLiked ? props.liked + 1 : props.liked }}
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
              0
            </span>
          </t-tag>

        </t-space>

      </t-space>
    </div>


    <t-image
        class="image"
        fit="cover"
        shape="round"
        :src="require('@/assets/placeHolder/card-no-preview.png')"
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
              size="small"
              style="position: absolute; right: 12px; top: 12px; z-index: 6"
          >
            <t-button
                shape="square"
                size="small"
                theme="default"
                variant="base"
                @click.stop="handleBtnEnlargeClick"
            >
              <ZoomInIcon slot="icon" shape="square"/>
            </t-button>

            <t-button
                size="small"
                theme="primary"
                @click.stop="handleBtnRunClick"
            >
              <ControlPlatformIcon slot="icon" shape="square"/>
              运行
            </t-button>
          </t-space>


        </div>
      </template>
    </t-image>
  </div>

</template>

<script>
import {ChatBubble1Icon, ControlPlatformIcon, HeartFilledIcon, StarFilledIcon, ZoomInIcon} from 'tdesign-icons-vue';

import api from '@/service';

export default {
  name: 'BaseCard',
  components: {
    ChatBubble1Icon,
    HeartFilledIcon,
    StarFilledIcon,
    ControlPlatformIcon,
    ZoomInIcon
  },
  props: [
    'props',
  ],
  data() {
    return {
      isLiked: false,
      isFavoured: false,
      isSelected: false,
    }
  },
  computed: {
    imageUpdateTime() {
      const date = new Date(this.props.updateTime);

      // 获取本地时间的年、月、日、小时和秒
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // 月份是从0开始的，所以要加1
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();

      const detail = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`

      return `${year}年${month}月${day}日 ${detail}`;
    },
  },
  methods: {
    fresh() {


    },
    handleBtnEnlargeClick() {
      this.$store.commit('imageDialogSetDisplay', {
        display: true,
        imageId: null
      });
    },

    handleBtnRunClick() {
      var selected = this.$store.getters.workbenchGetSelected;

      if (this.props.type == "CHECKPOINT") {
        selected.CHECKPOINT = this.props;
        this.$message.success("CHECKPOINT 已更改为 " + this.props.title);
      } else if (this.props.type == "LORA") {
        if (!selected.LORA.find(obj => obj.id === this.props.id)) {
          selected.LORA.push(this.props);
          this.$message.success("LORA 已添加" + this.props.title);
        }
      } else if (this.props.type == "EMBEDDING") {
        if (!selected.EMBEDDING.find(obj => obj.id === this.props.id)) {
          selected.EMBEDDING.push(this.props);
          this.$message.success("EMBEDDING 已添加" + this.props.title);
        }
      } else if (this.props.type == "VAE") {
        selected.VAE = this.props;
        this.$message.success("VAE 已更改为 " + this.props.title);
      }
      this.$store.commit('workbenchUpdateSelected', selected);
    },

    handleBtnLike() {
      const PARAMS = {
        sdmodelId: this.props.id,
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
      this.$router.push({
        path: '/model',
        query: {
          id: this.props.id,
        }
      });
    }
  },
  created() {
    this.fresh();
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