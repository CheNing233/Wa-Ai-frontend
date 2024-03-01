<template>

  <t-image
      :src="imageContent.imageURL"
      fit="cover"
      class="image_item"
      shape="round"
  >
    <template #overlayContent>
      <div
          class="overlay"
          :class="['overlay', isSelected ? 'overlay_on_trigger' : null]"
          @click="handleOverlayClick(imageContent.id)"
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

</template>

<script>
import {
  ControlPlatformIcon,
  // Delete1Icon,
  // DownloadIcon,
  // ShareIcon
} from 'tdesign-icons-vue';

import api from '@/service'

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
      imageContent: {},
    }
  },
  props: [
    'imageProfile',
    'manageStatus'
  ],
  methods: {
    freshPage() {
      const PARAMS = {
        id: this.imageProfile.imageId,
      };

      api.sdimageApi.getSdImageDetail(PARAMS)
          .then(resp => {
            this.imageContent = resp.data;
          })
          .catch(err => {
            this.$message.error("获取数据失败: " + err)
          });
    },

    handleOverlayClick(id) {
      if (this.manageStatus) {//global select status
        this.isSelected = !this.isSelected;
        this.$emit('selectEvent', id);
      } else {
        this.$store.commit('imageDialogSetImageId', this.imageContent.id);
        this.$store.commit('imageDialogSetDisplay', true);
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