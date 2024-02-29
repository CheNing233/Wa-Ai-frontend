<script src="../../../store/modules/ImageDialog.js"></script>
<template xmlns:t-col="http://www.w3.org/1999/html">
  <div>
    <t-row style="display: flex; justify-content: space-between;">

      <t-space style="margin-top: 10px">
        <t-radio-group variant="primary-filled" default-value="list" >
          <t-radio-button value="list" @click="changeView('list')"><ListIcon /></t-radio-button>
          <t-radio-button value="grid" @click="changeView('grid')"><GridViewIcon/></t-radio-button>
        </t-radio-group>
      </t-space>

      <t-space style="margin-top: 10px" size="small">
        <t-button @click="manageBST" v-if="this.manageButtonStr">完成</t-button>
        <t-button ghost @click="manageBS " v-else>管理</t-button>
        <t-button ghost>筛选</t-button>
      </t-space>

    </t-row>

    <t-row>
      <t-card
          style="position: relative;
        left: 8px; right: 0;
        max-height: 100%;
        margin-top: 13px;
        ">
        <t-row>
          <t-row :gutter="[6, 6]" style="position: relative; overflow-y: scroll; max-height: 770px"
                 align="center">
            <t-col v-for="(item, index) in list" :key="item.id"
                   :xs="{ span: 24 }"
                   :sm="{ span: 24 }"
                   :md="{ span: 6 }"
                   :lg="{ span: 6 }"
                   :xl="{ span: 4 }"
                   style="flex: auto;"
            >
              <div @click="toggleOverlay(index)"
                   style="position: relative; width: 100%; display: flex; align-items: center;">
                <div>

                  <t-image
                      :src="item.imageURL"
                      :overlayContent="() => renderMask(item)"
                      :overlayTrigger="overlayTriggerT"
                      style="width: 100%; height: 100%; object-fit: cover; aspect-ratio: 0.75"
                      fit="cover"
                      shape="round"
                      lazy="lazy"
                  />
                  <div v-show="showOverlay[index]===true" class="overlay">
                    <div class="overlay-content"></div>
                  </div>
                </div>

              </div>

            </t-col>
            <t-col style="display: flex; justify-content: center; width: 100%; height: 3vh;bottom: 60px">
            </t-col>
            <t-col style="display: flex; justify-content: center; width: 100%;">
              世界尽头了喵(＞﹏＜)
            </t-col>
            <t-col style="display: flex; justify-content: center; width: 100%; height: 18vh;bottom: 60px">
            </t-col>
          </t-row>

        </t-row>

      </t-card>
    </t-row>


  </div>

</template>

<script>
// import componentImageCard from './components/ImageCard.vue'

// import componentModelsManager from '@/components/filter/ModelsManager.vue'
import {
  ListIcon,GridViewIcon,
  Download1Icon,
} from 'tdesign-icons-vue';



export default {
  name: 'componentHistoryBox',
  components: {
    // componentImageCard
    // componentModelsManager

    ListIcon,
    GridViewIcon,
  },
  data() {
    return {
      renderMask :(item)=> {
        const handleDownload = (url) => {
          console.log('Download image:', url);
          window.open(url, '_blank');
        };

        return (
              <div v-show={this.overlayContentM}
                style={{
                  height:'100%',
                  textAlign: 'right',
                  background: 'rgba(0,0,0,.4)',
                  color: '#fff',
                }}>
                <div style="padding: 5px">
                  <t-button
                            size="small"
                            variant="outline"
                            onClick={() => handleDownload(item.imageURL)}>
                    <Download1Icon/>
                  </t-button>
                </div>
              </div>
        )

      },

      list: [
        {
          "id": "fdf358cd4-a87b-e4597-b0fc9-1b6419a2d491",
          "userId": 4,
          "nickName": "Test9",
          "type": "txt2image",
          "priority": 0,
          "status": 2,
          "imageURL": "https://obj.glcn.top/wa-image/1709121179613.png",
          "createTime": "2024-02-28T11:51:46.000+00:00",
          "updateTime": "2024-02-28T11:53:18.000+00:00"
        },
        {
          "id": "123c2d39-bd7df-458fe-89ec-44d9e05580ab",
          "userId": 4,
          "nickName": "Test9",
          "type": "txt2image",
          "priority": 0,
          "status": 2,
          "imageURL": "https://obj.glcn.top/wa-image/1709118449507.png",
          "createTime": "2024-02-28T11:07:05.000+00:00",
          "updateTime": "2024-02-28T11:07:42.000+00:00"
        },
        {
          "id": "2b35f8dd-19b8-48b4-b20f4-d6b0a6yb4d74e",
          "userId": 4,
          "nickName": "Test9",
          "type": "txt2image",
          "priority": 0,
          "status": 2,
          "imageURL": "https://obj.glcn.top/wa-image/1709118542735.png",
          "createTime": "2024-02-28T11:08:38.000+00:00",
          "updateTime": "2024-02-28T11:09:15.000+00:00"
        },
        {
          "id": "fdf358cd4-a87b-4597-b0fc9y-1b6419a2d491",
          "userId": 4,
          "nickName": "Test9",
          "type": "txt2image",
          "priority": 0,
          "status": 2,
          "imageURL": "https://obj.glcn.top/wa-image/1709121179613.png",
          "createTime": "2024-02-28T11:51:46.000+00:00",
          "updateTime": "2024-02-28T11:53:18.000+00:00"
        },
        {
          "id": "2b3d5f8dd-19b8-48b4-b2f04-dy6b0a6b4d74e",
          "userId": 4,
          "nickName": "Test9",
          "type": "txt2image",
          "priority": 0,
          "status": 2,
          "imageURL": "https://obj.glcn.top/wa-image/1709118542735.png",
          "createTime": "2024-02-28T11:08:38.000+00:00",
          "updateTime": "2024-02-28T11:09:15.000+00:00"
        },
        {
          "id": "fdf358c4d-a87b-4597-b0c9-1b64y19fa2d491",
          "userId": 4,
          "nickName": "Test9",
          "type": "txt2image",
          "priority": 0,
          "status": 2,
          "imageURL": "https://obj.glcn.top/wa-image/1709121179613.png",
          "createTime": "2024-02-28T11:51:46.000+00:00",
          "updateTime": "2024-02-28T11:53:18.000+00:00"
        },
        {
          "id": "2b35f8dd-19b8-48bfr4-b20f4-d6b0a6b4d74e",
          "userId": 4,
          "nickName": "Test9",
          "type": "txt2image",
          "priority": 0,
          "status": 2,
          "imageURL": "https://obj.glcn.top/wa-image/1709118542735.png",
          "createTime": "2024-02-28T11:08:38.000+00:00",
          "updateTime": "2024-02-28T11:09:15.000+00:00"
        },
      ],

      overlayContentM:true,
      overlayTriggerT:'hover',
      showOverlay: Array.from({ length: 7 }, () => false),
      manageButtonStr: false
    }

  },

  methods: {

    //点击管理
    manageBS(){
      this.overlayTriggerT= 'always'
      this.overlayContentM=false;
      this.manageButtonStr=true
    },

    toggleOverlay(index) {
      if (this.overlayTriggerT!=='hover'){
        this.showOverlay = this.showOverlay.map((item, idx) => (idx === index ? !item : item));
        console.log(this.showOverlay)
      }

    },
    //点击完成
    manageBST(){
      this.showOverlay=Array.from({ length: 7 }, () => false)
      this.manageButtonStr=false
      this.overlayTriggerT= 'hover'
      this.overlayContentM=true;
    },

  },
  computed: {
    displayWorkbenchSmall: function () {
      return this.$store.getters.getDisplayWorkbenchSmall
    },
  },
  props: {
  },

}
</script>

<style scoped>
.card_container {
  position: sticky;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255,0.6);
  z-index: 1; /* 确保遮罩层在图片上方显示 */
}

.overlay-content {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #000000;
}
</style>