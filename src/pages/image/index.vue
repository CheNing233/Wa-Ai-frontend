<template>
  <t-dialog
      :visible.sync="imageDialogDisplay"
      :footer="false"
      :header="false"
      :closeBtn="false"
      mode="full-screen"
  >
    <div
        class="dialog_container"
        ref="scrollableDiv"
        :style="{ overflowY: displayMobile ? 'scroll' : 'hidden' }"
    >
      <t-loading
          style="position: absolute; top: 12px; right: 64px; z-index: 6666"
          :loading="imageLoading"
          size="32px"
      >
      </t-loading>

      <t-button
          variant="outline"
          shape="square"
          style="position: absolute; top: 12px; right: 16px; z-index: 6666"
          @click="() => $store.commit('imageDialogSetDisplay', false)"
      >
        <CloseIcon slot="icon" shape="square"/>
      </t-button>


      <t-row :gutter="[16, 16]">

        <t-col
            :span="displayMobile ? 12 : 8"
            ref="imageBody"
        >
          <t-image-viewer
              :images="[viewRawImageBtnVisible ? imageThumbnailUrl : imageUrl]"
              :closeOnEscKeydown="true"
              :closeOnOverlay="true"
              :imageScale="{ max: 2000 }"
              v-model="viewerVisible"
              class="image_container"
          >
            <template #trigger="{ open }">
              <t-image
                  :src="viewRawImageBtnVisible ? imageThumbnailUrl : imageUrl"
                  fit="contain"
                  class="image_container"
                  @click="open"
              />
            </template>
          </t-image-viewer>

          <t-space
              style="
                position: absolute;
                left: 50%;
                bottom: 16px;
                transform: translateX(-50%);
                z-index: 6;
              "
              size="small"
          >

            <t-tag
                v-show="viewRawImageBtnVisible"
                shape="round"
                style="background: rgba(0,0,0,0.1); cursor: pointer"
                @click="() => viewRawImageBtnVisible = false"
            >
              <template #icon>
                <Image1Icon color="#E8E8E8"/>
              </template>
              <span style="color: #FFFFFF">
                查看原图
              </span>
            </t-tag>

            <t-tag
                shape="round"
                style="background: rgba(0,0,0,0.1); "
            >
              <template #icon>
                <t-rate
                    :count="1"
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
            >
              <template #icon>
                <t-rate
                    :count="1"
                    color="var(--td-error-color-7)"
                >
                  <template #icon>
                    <HeartFilledIcon/>
                  </template>
                </t-rate>
              </template>
              <span style="color: #FFFFFF">
              0
            </span>
            </t-tag>

          </t-space>

        </t-col>

        <t-col
            :span="displayMobile ? 12 : 4"
        >
          <t-space direction="vertical" style="width: 100%">

            <t-space direction="horizontal"
                     align="center"
                     style="padding-top: 8px; padding-left: 12px"
            >
              <t-avatar size="large">
                T
              </t-avatar>
              <t-space size="1px" direction="vertical">
                <span>{{ userInfo.nickName }}</span>
                <span style="font-size: 13px; color: rgba(0,0,0,0.54);">{{ createTime }} 创建</span>
              </t-space>
            </t-space>

            <t-descriptions itemLayout="horizontal"
                            class="params_container"
                            :column="1"
                            :label-style="{ wordBreak: 'break-all', minWidth: '100px' }"
                            :content-style="{ wordBreak: 'break-all', whiteSpace: 'normal' }"
            >
              <t-descriptions-item
                  v-for="(value, key) in imageParams"
                  :key="key"
                  :label="key"
              >
                {{ value }}
              </t-descriptions-item>

            </t-descriptions>


          </t-space>
        </t-col>
      </t-row>
    </div>

  </t-dialog>
</template>

<script>
import {
  CloseIcon,
  Image1Icon,
  StarFilledIcon,
  HeartFilledIcon,
} from 'tdesign-icons-vue';

import api from '@/service'
import utils from '@/utils'

export default {
  name: 'componentImageDialog',
  components: {
    CloseIcon,
    Image1Icon,
    StarFilledIcon,
    HeartFilledIcon,
  },
  data() {
    return {
      viewerVisible: false,
      imageLoading: false,
      userInfo: {
        "id": 1,
        "nickName": "123",
        "avatar": null,
      },
      imageUrl: null,
      imageThumbnailUrl: null,
      viewRawImageBtnVisible: true,
      imageParams: {
        "prompt": "",
        "steps": "",
        "seed": "",
        "sampler_name": "",
        "cfg_scale": "",
        "width": "",
        "height": "",
        "negative_prompt": "",
        "enable_hr": "",
        "denoising_strength": "",
        "n_iter": "",
        "hr_scale": "",
        "hr_upscaler": "",
        "hr_second_pass_steps": "",
        "override_settings": {
          "sd_model_checkpoint": "",
          "sd_vae": "",
          "CLIP_stop_at_last_layers": "",
          "eta_noise_seed_delta": "",
        },
      },
      createTime: '',
    }
  },
  computed: {
    imageDialogDisplay: {
      get: function () {
        return this.$store.getters.imageDialogGetDisplay
      },
      set: function (newValue) {
        this.$store.commit(
            'imageDialogSetDisplay',
            {display: newValue, imageId: this.imageDialogImageId}
        )
      }
    },
    imageDialogImageId: function () {
      return this.$store.getters.imageDialogGetImageId
    },
    displayMobile: function () {
      return this.$store.getters.getDisplayMobile
    },
  },
  methods: {
    convertTime(stringTime) {
      const date = new Date(stringTime);

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

    flattenObject(obj) {
      const result = {};
      const flatten = (current, property) => {
        if (typeof current === "object") {
          for (const key in current) {
            flatten(current[key], property ? `${key}` : key);
          }
        } else {
          result[property] = current;
        }
      };
      flatten(obj, "");
      return result;
    },

    sortObjectKeys(obj, fixedKeys) {
      const keys = Object.keys(obj);
      const remainingKeys = keys.filter((key) => !fixedKeys.includes(key));

      // 将指定的几项移动到固定位置
      let sortedKeys = fixedKeys.concat(remainingKeys);

      // 根据排序后的键构建新对象
      const sortedObject = {};
      sortedKeys.forEach((key) => {
        sortedObject[key] = obj[key];
      });
      return sortedObject;
    },

    freshPage() {
      this.imageLoading = true;
      this.viewRawImageBtnVisible = true;

      const PARAMS = {
        id: this.imageDialogImageId,
      };

      api.sdimageApi.getSdImageDetail(PARAMS)
          .then(resp => {
            this.imageParams = JSON.parse(resp.data.params);
            this.userInfo = resp.data.user;
            this.createTime = this.convertTime(resp.data.createTime);
            this.imageUrl = resp.data.imageUrl;
            this.imageThumbnailUrl = utils.images.getQiniuImageUrlWithParams(
                this.imageUrl,
                Math.round(this.$refs.imageBody.offsetWidth * 1.5),
                Math.round(this.$refs.imageBody.offsetHeight * 1.5),
                100
            );

            // 将对象展开
            this.imageParams = this.flattenObject(this.imageParams);
            this.imageParams = this.sortObjectKeys(
                this.imageParams,
                [
                  "prompt",
                  "negative_prompt",
                  "steps",
                  "seed",
                  "sampler_name",
                  "cfg_scale",
                  "width",
                  "height",
                ]
            );

          }).catch(err => {
        this.$message.error("获取数据失败: " + err)
      }).finally(() => {
        this.imageLoading = false;
      });
    }
  },
  created() {
  },
  watch: {
    displayMobile(newVal) {
      if (!newVal) {
        this.$refs.scrollableDiv.scrollTop = 0;
      }
    },
    imageDialogDisplay(newVal) {
      if (newVal) {
        this.freshPage();
      }
    }
  }
}
</script>

<style scoped>
.dialog_container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: hidden;
  z-index: 6666;
  background-color: white;
}

.image_container {
  width: 100%;
  height: 100vh;

  cursor: pointer;
}

.params_container {
  height: calc(100vh - 72px);
  overflow-y: scroll;
  overflow-x: hidden;
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