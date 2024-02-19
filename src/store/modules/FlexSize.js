const FlexSize = {
    namespace: true,
    state: {
        displayMobile: false,
        displayWorkbenchSmall: false,
    },
    mutations: {
        setDisplayMobile (state, payload) {
            state.displayMobile = payload;
        },
        setDisplayWorkbenchSmall (state, payload) {
            state.displayWorkbenchSmall = payload;
        },
    },
    actions: {
    },
    getters: {
        getDisplayMobile (state) {
            return state.displayMobile;
        },
        getDisplayWorkbenchSmall (state) {
            return state.displayWorkbenchSmall;
        },
    },
}

export default FlexSize