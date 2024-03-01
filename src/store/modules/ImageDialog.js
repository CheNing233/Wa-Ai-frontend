const ImageDialog = {
    namespace: true,
    state: {
        display: false,
        imageId: null,
    },
    mutations: {
        imageDialogSetDisplay(state, payload) {
            state.display = payload
        },
        imageDialogSetImageId(state, payload) {
            state.imageId = payload
        },
    },
    getters: {
        imageDialogGetDisplay(state) {
            return state.display
        },
        imageDialogGetImageId(state) {
            return state.imageId
        },
    }
}

export default ImageDialog