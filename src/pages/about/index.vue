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
              src="https://obj.glcn.top/wa-assets/page-about/about_banner.png"
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
                      :href="item.jumpLink"
                      :disabled="item.jumpLink === ''"
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
      developers: [
        {
          name: 'xChenNing',
          avatar: 'https://avatars.githubusercontent.com/u/32773451?v=4',
          desc: '前端、PM 、菜鸡',
          git: 'https://github.com/CheNing233',
        },
        {
          name: 'liahnu',
          avatar: 'https://avatars.githubusercontent.com/u/49276659?v=4',
          desc: '后端、运维、大佬',
          git: 'https://github.com/1328411791',
        },
        {
          name: 'Polister',
          avatar: 'https://avatars.githubusercontent.com/u/151947504?v=4',
          desc: '后端、全栈大佬',
          git: 'https://github.com/ZPolister',
        },
      ],
      contactGroups: [
        {
          title: 'WA-QQ-交流1群',
          desc: '810268559',
          qrLink: require('@/assets/about/group-qq-1.png'),
          qrVisible: false,
          jumpLink: 'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=zN4TJHzGXB8cqGEjB-gX50HuT4zLD6Rp&authKey=1o3B9H2ahbKI1PogR6SQwPGfuqjVILFnLK6%2FN%2FC7EV24bPPWHCqkHXkhjUcQPT4v&noverify=0&group_code=810268559'
        },
        {
          title: 'WA-微信-交流1群',
          desc: 'WeChat',
          qrLink: require('@/assets/about/group-wc-1.png'),
          qrVisible: false,
          jumpLink: ''
        },
        {
          title: '用户意见反馈服务平台',
          desc: '便捷推荐，无需加群',
          qrLink: null,
          qrVisible: false,
          jumpLink: 'https://support.qq.com/product/639813'
        }
      ]
    }
  },
  methods: {},
  created() {
  }
}
</script>