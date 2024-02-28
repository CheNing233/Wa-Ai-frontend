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
              :src="images[image].src"
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
                <span>nickName</span>
                <span style="font-size: 13px; color: rgba(0,0,0,0.54);">2024年1月9日 15:41 发布</span>
              </t-space>
            </t-space>

            <t-descriptions itemLayout="horizontal"
                            class="params_container"
                            :column="1"
            >
              <t-descriptions-item
                  v-for="(value, key) in imageParams"
                  :key="key"
                  :label="key"
              >
                {{value}}
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

export default {
  name: 'componentImageDialog',
  components: {
    CloseIcon
  },
  data() {
    return {
      image: 0,
      images: [
        {
          src: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
          title: '图片1111111111111111111111111111111111111111111111111111111111111111标题',
          desc: '图片1描述'
        },
        {src: 'https://tdesign.gtimg.com/demo/demo-image-2.png', title: '图片2标题', desc: '图片2描述'},
        {src: 'https://tdesign.gtimg.com/demo/demo-image-3.png', title: '图片3标题', desc: '图片3描述'},
      ],

      imageParams: {
        "prompt": "",
        "steps": 28,
        "seed": -1,
        "sampler_name": "Euler a",
        "cfg_scale": 7.0,
        "width": 512,
        "height": 768,
        "negative_prompt": "",
        "enable_hr": true,
        "denoising_strength": 0.58,
        "n_iter": 1,
        "hr_scale": 2.0,
        "hr_upscaler": "Latent",
        "hr_second_pass_steps": 20,
        "override_settings": {
          "sd_model_checkpoint": "",
          "sd_vae": "ClearVAE_NansLess1.safetensors",
          "CLIP_stop_at_last_layers": 2,
          "eta_noise_seed_delta": 0,
        },
      },

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

    fresh() {
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
  overflow: scroll;
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