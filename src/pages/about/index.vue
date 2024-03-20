<template>
  <t-row style="width: 100%; padding-left: 16px; padding-right: 16px; padding-top: 108px">
    <t-col
        :xs="{ offset: 0, span: 12 }"
        :sm="{ offset: 1, span: 10 }"
        :md="{ offset: 2, span: 8 }"
        :lg="{ offset: 3, span: 6 }"
        :xl="{ offset: 3, span: 6 }"
        :xxl="{ offset: 3, span: 6 }"
    >
      <t-card>
        <div style="height: 150px">
          <t-image
              style="position: absolute; left: 0; right: 0; top: 0; height: 150px"
              :src="require('@/assets/about/banner.png')"
              fit="cover"
              shape="round"
          >

          </t-image>
        </div>

        <t-card title="项目简介" :bordered="false">
          <t-link theme="primary" target="_blank" href="https://wa.xcning.top/portal/wawa">
            WA
          </t-link>
          是基于开源项目
          <t-link theme="primary" target="_blank" href="https://github.com/AUTOMATIC1111/stable-diffusion-webui">
            stable-diffusion-webui
          </t-link>
          开发的一个在线AI生成平台，
          由踏浪团队的某个菜鸡闲的没事干搞得，
          目前正处于删档内测阶段，欢迎体验。

          <t-list :split="false" style="padding-top: 24px">
            <t-list-item
                v-for="(item, index) in repository"
                :key="index"
            >
              <t-list-item-meta
                  :title="item.title"
                  :image="item.image"
                  :description="item.desc"
              />

              <template #action>
                <t-space size="small">
                  <t-button
                      :href="item.repoLink"
                      target="_blank"
                      variant="text" shape="square"
                  >
                    <LinkIcon/>
                  </t-button>
                </t-space>
              </template>
            </t-list-item>

          </t-list>
        </t-card>

        <t-card title="开发人员" :bordered="false">
          <t-list :split="false">

            <t-list-item
                v-for="(item, index) in developers"
                :key="index"
            >
              <t-list-item-meta
                  :image="item.avatar"
                  :title="item.name"
                  :description="item.desc"
              >
              </t-list-item-meta>
              <template #action>
                <t-space size="small">
                  <t-button :href="item.git" target="_blank" variant="text" shape="square">
                    <LogoGithubIcon/>
                  </t-button>
                </t-space>
              </template>
            </t-list-item>
          </t-list>


          <template #actions>
            <t-popup>
              <t-button variant="dashed">
                加入开发
              </t-button>
              <template #content>
                先进交流群水一水先
              </template>
            </t-popup>
          </template>
        </t-card>

        <t-card title="联系我们" :bordered="false">
          <t-list :split="false">

            <t-list-item
                v-for="(item, index) in contactGroups"
                :key="index"
            >
              <t-list-item-meta
                  :title="item.title"
                  :description="item.desc"
              />

              <template #action>
                <t-space size="small">
                  <t-popup v-if="item.qrLink !== null" :visible="item.qrVisible">
                    <t-button
                        variant="text"
                        shape="square"
                        @click="() => item.qrVisible = !item.qrVisible"
                    >
                      <QrcodeIcon/>
                    </t-button>
                    <template #content>
                      <t-image
                          :src="item.qrLink"
                          style="width: 256px; height: 256px"
                          fit="contain"
                          shape="round"
                      />
                    </template>
                  </t-popup>

                  <t-button
                      v-if="item.jumpLink !== ''"
                      :href="item.jumpLink"
                      target="_blank"
                      variant="text" shape="square"
                  >
                    <LinkIcon/>
                  </t-button>

                  <t-button
                      v-if="item.jumpMethod !== null"
                      @click="item.jumpMethod"
                      target="_blank"
                      variant="text" shape="square"
                  >
                    <LinkIcon/>
                  </t-button>
                </t-space>
              </template>
            </t-list-item>

          </t-list>

        </t-card>

      </t-card>
    </t-col>
  </t-row>

</template>


<script>
import {LinkIcon, LogoGithubIcon, QrcodeIcon,} from 'tdesign-icons-vue';
// import CryptoJS from 'crypto-js';

import aboutLists from '@/constants/about'

export default {
  name: 'about-index',
  components: {
    // LinkIcon
    LogoGithubIcon,
    QrcodeIcon,
    LinkIcon,
  },
  data() {
    return {
      repository: aboutLists.repository,
      developers: aboutLists.developers,
      contactGroups: aboutLists.contactGroups,
    }
  },
  methods: {

  },
  created() {
  }
}
</script>