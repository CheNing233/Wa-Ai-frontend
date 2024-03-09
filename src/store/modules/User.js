const User = {
    namespace: true,
    state: {
        user: null,
        userWebsocket: null,
        userIDB: null,
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
    }
}

export default User