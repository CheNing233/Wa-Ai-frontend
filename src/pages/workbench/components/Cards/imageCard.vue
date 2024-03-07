<template>
  <div>
    <t-tag
        v-show="imageStatusIndicatorLight !== 'success'"
        style="position: absolute; left: 12px; top: 8px; z-index: 6"
        variant="light" :theme="imageStatusIndicatorLight"
    >
      {{ imageStatusIndicatorText }}
    </t-tag>
    <t-image
        :src="imageContent.imageUrl"
        fit="cover"
        class="image_item"
        shape="round"
    >

      <template #overlayContent>
        <div
            class="overlay"
            :class="['overlay', isSelected ? 'overlay_on_trigger' : null]"
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
                theme="primary"
                size="small"
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
import {
  ControlPlatformIcon,
  // Delete1Icon,
  // DownloadIcon,
  // ShareIcon
} from 'tdesign-icons-vue';

import api from '@/service'
import {TASK_STATUS} from '@/config/ApiConfig'

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
    }
  },
  props: [
    'imageProfile',
    'manageStatus',
    'reFreshPageIndicator'
  ],
  computed: {
    imageStatusIndicatorText() {
      for (let i = 0; i < this.imageStatus.length; i++) {
        if (this.imageStatus[i].id === this.imageProfile.status) {
          return this.imageStatus[i].name;
        }
      }
      return '未知'
    },
    imageStatusIndicatorLight() {
      for (let i = 0; i < this.imageStatus.length; i++) {
        if (this.imageStatus[i].id === this.imageProfile.status) {
          return this.imageStatus[i].indicator;
        }
      }
      return 'danger'
    },
  },
  methods: {
    freshPage() {
      this.imageContent = {};

      // 图片无效
      if (this.imageProfile.imageId === null) {
        this.imageContent = {};
        return;
      }

      const PARAMS = {
        id: this.imageProfile.imageId,
      };

      api.sdimageApi.getSdImageDetail(PARAMS)
          .then(resp => {
            this.imageContent = resp.data;
            this.imageId = this.imageProfile.imageId;
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

        if (this.imageStatusIndicatorLight !== 'success') {
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