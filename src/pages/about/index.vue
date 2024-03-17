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
import CryptoJS from 'crypto-js';

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
          jumpLink: 'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=zN4TJHzGXB8cqGEjB-gX50HuT4zLD6Rp&authKey=1o3B9H2ahbKI1PogR6SQwPGfuqjVILFnLK6%2FN%2FC7EV24bPPWHCqkHXkhjUcQPT4v&noverify=0&group_code=810268559',
          jumpMethod: null
        },
        {
          title: '用户意见反馈服务平台',
          desc: '无需加群、扫码、换号，使用WA账号一键反馈',
          qrLink: null,
          qrVisible: false,
          // jumpLink: 'https://support.qq.com/product/639813',
          jumpLink: '',
          jumpMethod: this.handleTuCaoRequest
        }
      ]
    }
  },
  methods: {
    handleTuCaoRequest() {

      const userInfo = this.$store.getters.userGetInfo;

      if (userInfo === null) {
        this.$message.error('请先登录到WA');
        return;
      }

      function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      }

      let data = {
        "nickname": userInfo.nickName,
        "avatar": userInfo.avatar || "https://tucao.qq.com/static/desktop/img/products/def-product-logo.png",
        "openid": userInfo.id,
        'nonce': generateRandomString(32),
        'expired_at': '0'
      };

      const productId = 639813;

      function encryptData(productId, productPrivateKey, data) {
        // Convert data to JSON string
        const dataStr = JSON.stringify(data);

        // Pad key and IV to 16 bytes
        const key = CryptoJS.enc.Utf8.parse(productPrivateKey.padEnd(16, '='));
        const iv = CryptoJS.enc.Utf8.parse((productId + productPrivateKey).padEnd(16, '='));

        // Encrypt using AES-128-CBC
        const encrypted = CryptoJS.AES.encrypt(dataStr, key, {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        });

        // Base64 encode the ciphertext
        const encryptedBase64 = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);

        // Replace characters for URL safety
        const encodedData = encryptedBase64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

        return encodedData;
      }

      window.open(
          'https://support.qq.com/product/' + productId + '?user_data=' + encryptData(productId, 'feTW0247', data)
      );
    }
  },
  created() {
  }
}
</script>