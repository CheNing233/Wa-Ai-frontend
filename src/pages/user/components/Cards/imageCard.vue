<template>
  <div ref="imageBody">
    <t-space
        size="8px"
        style="position: absolute; left: 16px; top: 8px; z-index: 6"
    >
      <t-tag
          theme="primary"
          variant="light"
      >
        {{ imageProfile.type }}
      </t-tag>
      <t-tag
          v-show="tagDisplay"
          :theme="tagIndicator"
          variant="light"
      >
        {{ tagName }}
      </t-tag>
    </t-space>
    <t-image
        :src="imageUrlAfterProcess"
        class="image_item"
        fit="cover"
        shape="round"
    >

      <template #overlayContent>
        <div
            :class="['overlay', isSelected ? 'overlay_on_trigger' : null]"
            class="overlay"
            @click="handleOverlayClick(imageProfile.id)"
        >
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

          <t-space
              v-else
              size="8px"
              style="position: absolute; right: 8px; top: 8px;"
          >
            <t-button
                size="small"
                theme="primary"
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
import {ControlPlatformIcon,} from 'tdesign-icons-vue';

import api from '@/service'
import {TASK_STATUS} from '@/config/ApiConfig'
import utils from '@/utils'

export default {
  name: 'componentImageCard',
  components: {
    ControlPlatformIcon,
    // Delete1Icon,
    // DownloadIcon,
    // ShareIcon,
  },
  data() {
    return {
      isSelected: false,
      imageId: null,
      imageContent: {
        imageUrl: null,
      },
      imageStatus: TASK_STATUS,
      imageUrlAfterProcess: ''
    }
  },
  props: [
    'imageProfile',
    'manageStatus',
    'reFreshPageIndicator'
  ],
  computed: {
    tagDisplay() {
      return this.imageStatus[this.imageProfile.status.toString()].display;
    },
    tagIndicator() {
      return this.imageStatus[this.imageProfile.status.toString()].indicator;
    },
    tagName() {
      return this.imageStatus[this.imageProfile.status.toString()].name;
    },
  },
  methods: {
    freshPage() {
      this.imageContent = {};

      // 图片无效
      if (this.imageProfile.staticImageId === null) {
        this.imageContent = {};
        return;
      }

      const PARAMS = {
        id: this.imageProfile.staticImageId,
      };

      api.sdImageApi.getSdImageDetail(PARAMS)
          .then(resp => {
            this.imageContent = resp.data;
            this.imageId = this.imageProfile.staticImageId;
            this.handleImageUrl();

          })
          .catch(err => {
            this.$message.error("获取数据失败: " + err)
          });
    },

    handleOverlayClick(id) {
      if (this.manageStatus) {
        // 选择模式
        this.isSelected = !this.isSelected;
        this.$emit('selectEvent', id);

      } else {
        // 查看模式

        if (!this.imageStatus[this.imageProfile.status.toString()].available) {
          this.$message.warning('现在打不开图片喵');
          return;
        }

        this.$store.commit(
            'imageDialogSetDisplay',
            {
              display: true,
              imageId: this.imageContent.id
            }
        );
      }
    },

    handleImageUrl() {
      if (this.$refs.imageBody) {
        this.imageUrlAfterProcess = utils.images.getThumbnailUrl(
            this.imageContent.imageUrl,
        )
        console.log(this.imageUrlAfterProcess)
      } else {
        this.imageUrlAfterProcess = ''
      }
    }
  },
  created() {
    this.freshPage();
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
  mounted() {
  }
}
</script>

<style>
.image_item {
  aspect-ratio: 0.75;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.3s;

  cursor: pointer;
}

.overlay:hover {
  opacity: 1;
}

.overlay_on_trigger {
  opacity: 1;
}
</style>