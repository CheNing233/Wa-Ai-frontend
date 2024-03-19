import api from '@/service'
import utils from '@/utils'

const User = {
    namespace: true,
    state: {
        user: null,
        userAvatar: null,
        userWebsocket: null,
        userIDB: null,
        userDarkMode: false,
    },
    mutations: {
        userSetInfo(state, user) {
            state.user = user;
        },
        userSetAvatar(state, avatarId) {
            const PARAMS = {
                id: avatarId,
            }

            api.sdImageApi.getStaticImageUrl(PARAMS)
                .then((resp) => {
                    state.userAvatar = utils.images.getQiniuImageUrlWithParams(
                        resp.data.url, 128, 128, 100, "webp"
                    );
                })
                .catch((err) => {
                    state.userAvatar = null;
                    console.log(err);
                })
        },
        userSetWebsocket(state, websocket) {
            state.userWebsocket = websocket;
        },
        userSetIDB(state, userIDB) {
            state.userIDB = userIDB;
        },
        userSetDarkMode(state, darkMode) {
            if (darkMode)
                document.documentElement.setAttribute('theme-mode', 'dark');
            else
                document.documentElement.removeAttribute('theme-mode');
            state.userDarkMode = darkMode;
        },
    },
    getters: {
        userGetInfo(state) {
            return state.user;
        },
        userGetAvatar(state) {
            return state.userAvatar;
        },
        userGetWebsocket(state) {
            return state.userWebsocket;
        },
        userGetIDB(state) {
            return state.userIDB;
        },
        userGetDarkMode(state) {
            return state.userDarkMode;
        },
    }
}

export default User