<template>
  <t-drawer id="workbench" 
      :visible.sync="workbenchDisplay" 
      :placement="workbenchPlacement" 
      :size="workbenchSize"
      :showOverlay="workbenchShowOverlay"
      :preventScrollThrough="false"
      :header="false" 
      :footer="false"  
      :closeBtn="false"
      sizeDraggable
  >

  <div style="position: absolute; left: 16px; top: 16px; right: 16px; bottom: 16px; overflow: hidden;">

    <t-row :gutter="[0, 8]">
      <t-col flex="auto">
        
          <t-radio-group 
            v-show="displayWorkbenchSmall"
            v-model="workbenchCurrentTab"
            variant="default-filled"
          >
            <t-radio-button value="launch"><ControlPlatformIcon /></t-radio-button>
            <t-radio-button value="history"><HistoryIcon /></t-radio-button>
          </t-radio-group>
        
          <t-tag v-show="!displayWorkbenchSmall">
            WA酱工作台
          </t-tag>
        
      </t-col>
      <t-col :flex="112">
        <t-space :size="8" style="float: right;">

          <t-tooltip content="允许点击外面关闭" placement="bottom">
            <t-button variant="outline" shape="square" @click="switchShowOverlay">
              <HighlightIcon slot="icon" shape="square" />
            </t-button>
          </t-tooltip>

          <t-button 
            variant="outline" 
            shape="square" 
            v-if="displayMobile" 
            @click="switchPlacement"
          >
            <ArrowUpDown1Icon slot="icon" shape="square" />
          </t-button>

          <t-button 
            variant="outline" 
            shape="square" 
            v-if="!displayMobile" 
            @click="switchPlacement"
          >
            <ArrowLeftRight1Icon slot="icon" shape="square" />
          </t-button>

          <t-button 
            variant="outline" 
            shape="square" 
            v-if="displayMobile && (workbenchSize == '80%')" 
            @click="switchSize"
          >
            <FullscreenIcon slot="icon" shape="square" />
          </t-button>

          <t-button 
            variant="outline" 
            shape="square" 
            v-if="displayMobile && (workbenchSize == '100%')" 
            @click="switchSize"
          >
            <FullscreenExitIcon slot="icon" shape="square" />
          </t-button>

          <t-button theme="primary" shape="square" @click="workbenchDisplay = false">
            <CloseIcon slot="icon" shape="square" />
          </t-button>

        </t-space>
      </t-col>
    </t-row>

    <t-row :gutter="[8, 8]" style="margin-top: 8px; width: 100%;">
      <t-col 
        :span="displayWorkbenchSmall ? (workbenchCurrentTab == 'launch' ? 12 : 0) : 5" 
        class="left_container"
      >
        
          <t-tabs v-model="value">
          <t-tab-panel value="txt2img" label="文生图" style="padding-top: 16px;">
            <t-space direction="vertical" style="width: 100%;">
            <ModelsBox />
            <promptBox />
            <settingBox />
            <hiresbox />
            
            
          </t-space>
          </t-tab-panel>
          <t-tab-panel value="img2img" label="图生图">
            
          </t-tab-panel>
          <t-tab-panel value="extra" label="图像放大">
            
          </t-tab-panel>
          <t-tab-panel value="tag" label="反推">
            
          </t-tab-panel>
        </t-tabs>
        <t-button 
          block
          style="position: sticky; left: 0; bottom: 8px; margin-top: 24px; float: right; z-index: 100;"
          @click="handleBtnGeneratedClick"
        >
          在线生成
        </t-button>
      </t-col>


      <t-col 
        :span="displayWorkbenchSmall ? (workbenchCurrentTab == 'history' ? 12 : 0) : 7"
        class="right_container" 
      >
        <HistoryBox />
        
      </t-col>
    </t-row>
  </div>
</t-drawer>
</template>

<script>
import {
  CloseIcon,
  FullscreenIcon, 
  FullscreenExitIcon,
  ArrowUpDown1Icon,
  ArrowLeftRight1Icon,
  HighlightIcon,

  // VisualRecognitionIcon,
  // ImageAddIcon,
  // ImageSearchIcon,
  HistoryIcon,
  ControlPlatformIcon
  // ImageOffIcon,
} from 'tdesign-icons-vue';

import ModelsBox from './components/ModelsBox.vue';
import promptBox from './components/PromptBox.vue';
import settingBox from './components/SettingsBox.vue';
import hiresbox from './components/HiresBox.vue';
import HistoryBox from './components/HistoryBox.vue';

import api from '@/service';

export default {
  name: 'componentWorkdrawer',
  components: {
    CloseIcon,
    FullscreenIcon,
    FullscreenExitIcon,
    ArrowUpDown1Icon,
    ArrowLeftRight1Icon,
    HighlightIcon,
    // VisualRecognitionIcon,
    // ImageAddIcon,
    // ImageSearchIcon,
    HistoryIcon,
    ControlPlatformIcon
    // ImageOffIcon,
    ,
    // ImageOffIcon,
    ModelsBox,
    promptBox,
    settingBox,
    hiresbox,
    HistoryBox
},
  data() {
    return {
      workbenchObserver: null,
      workbenchCurrentTab: 'launch',
      value: 'txt2img',
      
    }
  },
  computed: {
    displayMobile: function () {return this.$store.getters.getDisplayMobile},
    displayWorkbenchSmall: function () {return this.$store.getters.getDisplayWorkbenchSmall},
    workbenchDisplay: {
      get: function () {return this.$store.getters.workbenchGetDisplay},
      set: function (newValue) {this.$store.commit('workbenchSetDisplay', newValue)}
    },
    workbenchSize: {
      get: function () {return this.$store.getters.workbenchGetSize},
      set: function (newValue) {this.$store.commit('workbenchSetSize', newValue)}
    },
    workbenchShowOverlay: {
      get: function () {return this.$store.getters.workbenchGetShowOverlay},
      set: function (newValue) {this.$store.commit('workbenchSetShowOverlay', newValue)}
    },
    workbenchPlacement: {
      get: function () {return this.$store.getters.workbenchGetPlacement},
      set: function (newValue) {this.$store.commit('workbenchSetPlacement', newValue)},
    },
  },
  methods: {
    handleBtnGeneratedClick() {
      api.drawApi.txt2img()
      // SdServiceAPI.getGenerated()
        .then((res) => {
          this.$message.success("任务ID " + res.data + " 已压入喵");
        }).catch((err) => {
          this.$message.error(err);
        });
    },

    handleWorkbenchResize(element) {
      if (element.offsetWidth < 600) 
        this.$store.commit('setDisplayWorkbenchSmall', true);
      else 
        this.$store.commit('setDisplayWorkbenchSmall', false);
    },
    switchShowOverlay() {
      this.workbenchShowOverlay = this.workbenchShowOverlay ? false : true;
    },
    switchSize() {
      this.workbenchSize = this.workbenchSize == '80%' ? '100%' : '80%';
    },
    switchPlacement() {
      if (this.displayMobile) {
        if (this.workbenchPlacement == 'bottom')
          this.workbenchPlacement = 'top'
        else
          this.workbenchPlacement = 'bottom'
      } else {
        if (this.workbenchPlacement == 'left')
          this.workbenchPlacement = 'right'
        else
          this.workbenchPlacement = 'left'
      }
    }
  },
  mounted() {
    this.workbenchObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        this.handleWorkbenchResize(entry.target);
      }
    });
    
    this.workbenchObserver.observe(document.querySelector(
      '.t-drawer__content-wrapper'
    ));

  },
  beforeDestroy() {
    try {
      this.workbenchObserver.unobserve(document.querySelector(
        '.t-drawer__content-wrapper'
      ))
    } catch (error) {
      console.log('workbenchObserver unobserve');
    }
    
  },
}
</script>

<style scoped>
.left_container {
  height: calc(100vh - 72px); 
  overflow-y: scroll; 
  overflow-x: hidden;
}
.right_container {
  width: 100%;
  height: calc(100vh - 72px);
}
</style>