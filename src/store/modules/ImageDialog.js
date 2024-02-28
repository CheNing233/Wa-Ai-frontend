const ImageDialog = {
    namespace: true,
    state: {
        display: false,
    },
    mutations: {
        imageDialogSetDisplay(state, payload) {
            state.display = payload
        },
    },
    getters: {
        imageDialogGetDisplay(state) {
            return state.display
        },
    }
}

export default ImageDialog