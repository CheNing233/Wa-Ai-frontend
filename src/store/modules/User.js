

const User = {
    namespace: true,
    state: {
        user: null,
    },
    mutations: {
        userSetInfo(state, user) {
            state.user = user;
        },
    },
    getters: {
        userGetInfo(state) {
            return state.user;
        },
    }
}

export default User