const ImageDialog = {
    namespace: true,
    state: {
        display: false,
        imageId: null,
    },
    mutations: {
        imageDialogSetDisplay(state, payload) {
            state.imageId = payload.imageId
            state.display = payload.display
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