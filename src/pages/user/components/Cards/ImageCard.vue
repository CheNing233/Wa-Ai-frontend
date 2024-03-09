<template>
  <t-image
      :src="props.imageURL"
      :style="{ opacity: opacity }"
      class="image"
      fit="cover"
      shape="round"
  >
    <template #overlayContent>
      <div
          class="image_overlay" @click="handleImageOnClick"
          @mouseleave="() => { opacity = 1 }"
          @mouseover="() => { opacity = 0.8 }"
      >

      </div>

      <t-tag
          style="position: absolute; left: 8px; top: 8px;"
      >
        {{ props.type }}
      </t-tag>

      <t-button
          v-if="isManage == false"
          size="small"
          style="position: absolute; right: 8px; top: 8px;"
          theme="primary"
      >
        <ControlPlatformIcon slot="icon" shape="square"/>
        运行
      </t-button>

      <t-checkbox
          v-if="isManage == true"
          v-model="isSelected"
          style="position: absolute; right: 8px; top: 8px;"
      >
        <t-tag
            :theme=" isSelected ? 'primary' : 'default'"
        >
          {{ isSelected ? '已选择' : '未选择' }}
        </t-tag>

      </t-checkbox>

      <div style="position: absolute; bottom: 0; width: 100%;">
        <t-card
            :bordered="false"
            style="background-color: rgba(255, 255, 255, 0.6); backdrop-filter: blur(6px);"
        >
          <t-space :size="8" direction="vertical" style="width: 100%;">
            <t-row>
              <t-col :span="12">
                <t-link class="ellipsis_container" hover="color">
                  <span class="ellipsis_text image_title">{{ props.id }}</span>
                </t-link>
              </t-col>
            </t-row>

            <t-row :gutter="8" style="flex-wrap: nowrap;">
              <t-col :span="8">
                <t-link class="ellipsis_container" hover="color" variant="text">
                  <UserIcon slot="prefix-icon" shape="square" style=""/>
                  <span class="ellipsis_text" style="">{{ props.nickName }}</span>
                </t-link>
              </t-col>
              <t-col :span="4">
                <t-button
                    :variant="(star) ? 'outline' : null"
                    size="small"
                    style="float: right;"
                    theme="primary"
                    @click="() => { star = !star }"
                >
                  <StarIcon slot="icon" shape="square"/>
                  <span>{{ props.like }}</span>
                </t-button>
              </t-col>

            </t-row>
          </t-space>

        </t-card>

      </div>
    </template>
  </t-image>
</template>

<script>
import {ControlPlatformIcon, StarIcon, UserIcon} from 'tdesign-icons-vue';

// import api from '@/service';

// import { FilesAPI } from '@/service/file.js';

export default {
  name: 'BaseCard',
  components: {
    UserIcon,
    StarIcon,
    ControlPlatformIcon
  },
  props: [
    'props',
    'isManage'
  ],
  data() {
    return {
      opacity: 1,
      star: false,
      isSelected: false,
      userName: '',
      bannerImage: ""
    }
  },
  methods: {
    handleImageOnClick() {
    },
    asyncGetInfo() {

    },
  },
  created() {
    this.asyncGetInfo();
  },
}
</script>

<style scoped>
.image {
  width: 100%;
  aspect-ratio: 0.75;
  transition: opacity 0.3s ease;
}

.image_overlay {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}


.image_title {
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 4px;
}

.ellipsis_container {
  display: flex;
  width: 100%;
  overflow: hidden;
}

.ellipsis_text {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis
}
</style>