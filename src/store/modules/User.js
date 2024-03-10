const User = {
    namespace: true,
    state: {
        user: {
            nickName: ''
        },
        userWebsocket: null,
        userIDB: null,
        userDarkMode: false,
    },
    mutations: {
        userSetInfo(state, user) {
            state.user = user;
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