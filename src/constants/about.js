import CryptoJS from "crypto-js";
import store from "@/store";
import router from "@/router";
import { MessagePlugin } from 'tdesign-vue';

const handleTuCaoRequest = () => {

    const userInfo = store.getters.userGetInfo;
    const userAvatar = store.getters.userGetAvatar;

    if (userInfo === null) {
        MessagePlugin('warning', { content: '请先登录到WA' })
        router.push('/login');
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
        "avatar": userAvatar || "https://tucao.qq.com/static/desktop/img/products/def-product-logo.png",
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
const repository = [
    {
        title: 'Github-前端',
        image: require("@/assets/about/github.png"),
        desc: 'Wa-Ai-frontend (AGPL-3.0)',
        repoLink: 'https://github.com/CheNing233/Wa-Ai-frontend',
    },
    {
        title: 'Github-后端',
        image: require("@/assets/about/github.png"),
        desc: 'Wa-Ai-backend (GPL-3.0)',
        repoLink: 'https://github.com/1328411791/Wa-Ai-backend'
    }
]
const developers = [
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
    {
        name: 'ECAMT35',
        avatar: 'https://avatars.githubusercontent.com/u/161866427?v=4',
        desc: '后端、大佬',
        git: 'https://github.com/ECAMT35',
    },
]
const contactGroups = [
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
        jumpMethod: handleTuCaoRequest
    }
]

export default {
    developers,
    contactGroups,
    repository
}