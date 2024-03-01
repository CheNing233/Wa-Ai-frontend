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
        >
          <t-image
              :src="imageParams.imageUrl"
              fit="contain"
              class="image_container"
          />

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
                <span style="font-size: 13px; color: rgba(0,0,0,0.54);">{{createTime}} 发布</span>
              </t-space>
            </t-space>

            <t-descriptions itemLayout="horizontal"
                            class="params_container"
                            :column="1"
                            :label-style="{ whiteSpace: 'nowrap', }"
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
  CloseIcon
} from 'tdesign-icons-vue';

import api from '@/service'

export default {
  name: 'componentImageDialog',
  components: {
    CloseIcon
  },
  data() {
    return {
      userInfo: {
        "id": 1,
        "nickName": "123",
        "avatar": null,
      },
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
        this.$store.commit('imageDialogSetDisplay', newValue)
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
    handleListImageOnClick(i) {
      console.log(i);
      this.image = i;
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
      console.log("sortedObject", sortedObject);
      return sortedObject;
    },

    freshPage() {
      const PARAMS = {
        id: this.imageDialogImageId,
      };

      api.sdimageApi.getSdImageDetail(PARAMS)
          .then(resp => {
            this.imageParams = resp.data.params;
            this.userInfo = resp.data.user;
            this.createTime = resp.data.createTime;

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
                  "enable_hr",
                  "denoising_strength",
                  "hr_scale",
                  "hr_upscaler",
                  "hr_second_pass_steps",
                ]
            );

            console.log("this.imageParams", this.imageParams);
          }).catch(err => {
        this.$message.error("获取数据失败: " + err)
      });
    }
  },
  created() {
    this.fresh();
  },
  watch: {
    displayMobile(newVal) {
      if (!newVal) {
        this.$refs.scrollableDiv.scrollTop = 0;
      }
    },
    imageDialogImageId() {
      this.freshPage();
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