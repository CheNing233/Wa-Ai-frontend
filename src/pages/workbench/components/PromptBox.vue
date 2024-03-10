<template>
  <t-col
      :span="12"
  >
    <t-card bordered style="width: 100%; padding: 0;" title="提示词">

      <template #actions>
        <t-space>
          <!--          <t-button-->
          <!--              size="small"-->
          <!--              variant="outline"-->
          <!--          >-->
          <!--            随机-->
          <!--          </t-button>-->
          <t-button
              shape="square"
              size="small"
              variant="outline"
              @click="() => isVisible = !isVisible"
          >
            <BrowseIcon v-if="isVisible" slot="icon" shape="square"/>
            <BrowseOffIcon v-else slot="icon" shape="square"/>
          </t-button>
        </t-space>
      </template>

      <div v-show="!isVisible">
        已隐藏, 但配置继续生效
      </div>
      <t-space v-show="isVisible" direction="vertical" style="width: 100%;">

        <t-row :gutter="[8, 8]">
          <t-col flex="shrink">
            <strong>正向提示词(Prompt)：</strong>
          </t-col>
          <t-col flex="1">
            <t-select
                :options="wordsCloud"
                placeholder="自动补全即将上线"
                size="small"
                disabled
            />
          </t-col>
          <t-col flex="shrink">
            <t-space
                size="small"
            >

              <t-button
                  size="small"
                  theme="danger"
                  shape="square"
                  @click="() => workbenchParams.prompt = ''"
              >
                <Delete1Icon slot="icon"/>
              </t-button>

            </t-space>

          </t-col>
        </t-row>
        <t-textarea
            v-model="workbenchParams.prompt"
            name="description"
            placeholder="请输入正向Prompt"
        />
        <t-row :gutter="[8, 8]">
          <t-col flex="shrink">
            <strong>反向提示词(Negative Prompt)：</strong>
          </t-col>
          <t-col flex="1">
            <!--            <t-switch id="defaultNegativeBt" :label="['默认', '自定义']"/>-->
          </t-col>
          <t-col flex="shrink">
            <t-button
                size="small"
                variant="outline"
                shape="square"
                @click="() => workbenchParams.negative_prompt = '(worst quality:2), (low quality:2), (normal quality:2),'"
            >
              <RollbackIcon slot="icon"/>
            </t-button>
          </t-col>
        </t-row>
        <t-textarea
            v-model="workbenchParams.negative_prompt"
            name="description"
            placeholder="请输入反向Prompt"
        />
      </t-space>

    </t-card>
  </t-col>
</template>

<script>
import {BrowseIcon, BrowseOffIcon, Delete1Icon, RollbackIcon} from 'tdesign-icons-vue';
import eventbus from "@/eventbus";

export default {
  name: 'componentPromptBox',
  components: {
    BrowseIcon,
    BrowseOffIcon,
    Delete1Icon,
    RollbackIcon
  },
  props: {},
  data() {
    return {
      isVisible: true,
      wordsCloud: [
        {label: 'word1', value: 'word1'},
        {label: 'word2', value: 'word2'},
        {label: 'word3', value: 'word3'},
        {label: 'word4', value: 'word4'},
        {label: 'word5', value: 'word5'},
        {label: 'word6', value: 'word6'},
        {label: 'word7', value: 'word7'},
        {label: 'word8', value: 'word8'},
        {label: 'word9', value: 'word9'},
        {label: 'word10', value: 'word10'},
      ],
    }
  },
  computed: {
    displayWorkbenchSmall: function () {
      return this.$store.getters.getDisplayWorkbenchSmall
    },
    workbenchParams: {
      get() {
        return this.$store.getters.workbenchGetParams;
      },
      set(value) {
        this.$store.commit('workbenchUpdateParams', value);
      }
    }
  },
  methods: {
    mergeTags(prompts) {
      this.workbenchParams.prompt += prompts;
      this.$message.success("工作台 Prompt 成功合并：" + prompts);
    },
    replaceTags(prompts) {
      this.workbenchParams.prompt = prompts;
      this.$message.success("工作台 Prompt 成功替换为：" + prompts);
    },
  },
  created() {
    eventbus.$on('mergePrompts', this.mergeTags);
    eventbus.$on('replacePrompts', this.replaceTags);
  },
}

</script>

<style scoped>
</style>