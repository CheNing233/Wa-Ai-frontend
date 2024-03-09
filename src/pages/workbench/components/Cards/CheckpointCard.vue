<template>
  <t-card>
    <t-tag size="small" style="position: absolute; top: -12px; left: 84px; z-index: 10;">
      {{ props ? (props.type ? props.type : 'None') : 'None' }}
    </t-tag>
    <t-row :gutter="[20,8]" style="flex-wrap: nowrap;">


      <t-col flex="shrink">
        <div style="width: 48px; height: 48px; overflow: visible;">
          <t-image
              fit="cover"
              shape="round"
              src="https://tdesign.gtimg.com/demo/demo-image-1.png"
              style="left: -18px; top: -11px; width: 72px; height: 72px"
          />
        </div>
      </t-col>

      <t-col flex="1" style="overflow: hidden; padding-top: 8px;">

        <t-row :gutter="[8,0]">

          <t-col :span="12">
            <t-collapse expand-icon-placement="left">
              <t-collapse-panel>
                <template #header>
                  <div style="position: absolute; left: 48px; top: 10px; right: 16px;">
                    <div class="title_container">
                                            <span class="title">
                                                {{ props ? props.title : '请选择一个模型' }}
                                            </span>
                    </div>
                  </div>
                </template>
                <template #headerRightContent>

                </template>
                无
              </t-collapse-panel>
            </t-collapse>
          </t-col>

        </t-row>

      </t-col>


    </t-row>

  </t-card>
</template>


<script>
// import {
//     DeleteIcon
// } from 'tdesign-icons-vue';

export default {
  name: 'ModelCard',
  props: [
    'props'
  ],
  components: {
    // DeleteIcon
  },
}

</script>


<style scoped>
.title_container {
  display: flex;
  overflow: hidden;
  width: 100%;
}

.title {
  flex: 1;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>