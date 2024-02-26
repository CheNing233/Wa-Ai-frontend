const workbench = {
    namespace: true,
    state: {
        loading: false,
        display: false,
        placement: "right",
        size: "80%",
        showOverlay: true,
        selectItem: "txt2img",
        txt2imgSelect: {
            "CHECKPOINT": {
                "id":277,
                "title":"tmndMix_tmndMixSPRAINBOW",
                "type":"CHECKPOINT",
                "body":null,
                "publishTime":"2024-02-18T11:44:52.000+00:00",
                "createTime":"2024-02-17T16:00:00.000+00:00",
                "updateTime":"2024-02-17T16:00:00.000+00:00",
                "authorId":1,
                "status":"Published",
                "filename":"tmndMix_tmndMixSPRAINBOW"},
            "LORA": [],
            "EMBEDDING": [],
            "VAE": {
                "id":250,
                "title":"ClearVAE_NansLess1.safetensors",
                "type":"VAE",
                "body":null,
                "publishTime":"2024-02-18T11:44:52.000+00:00",
                "createTime":"2024-02-17T16:00:00.000+00:00",
                "updateTime":"2024-02-17T16:00:00.000+00:00",
                "authorId":1,
                "status":"Published",
                "filename":"ClearVAE_NansLess1.safetensors"
            },
        },
        txt2imgParams: {
            "prompt": "",
            "steps": 28,
            "seed": -1,
            "sampler_name": "Euler a",
            "cfg_scale": 7.0,
            "width": 512,
            "height": 768,
            "negative_prompt": "",
            "enable_hr": true,
            "denoising_strength": 0.58,
            "n_iter": 1,
            "hr_scale": 2.0,
            "hr_upscaler": "Latent",
            "hr_second_pass_steps": 20,
            "override_settings": {
                "sd_model_checkpoint": "",
                "sd_vae": "ClearVAE_NansLess1.safetensors",
                "CLIP_stop_at_last_layers": 2,
                "eta_noise_seed_delta": 0,
            },
        }
    },
    mutations: {
        workbenchUpdateParams(state, payload) {
            if (state.selectItem == "txt2img") {
                for (let key in payload) {
                    state.txt2imgParams[key] = payload[key];
                }
            }
        },
        workbenchUpdateSelected(state, payload) {
            if (state.selectItem == "txt2img") {
                for (let key in payload) {
                    state.txt2imgSelect[key] = payload[key];
                }
            }
        },

        workbenchSetDisplay(state, payload) {
            state.display = payload
        },
        workbenchSetLoading(state, payload) {
            state.loading = payload
        },
        workbenchSetPlacement(state, payload) {
            state.placement = payload
        },
        workbenchSetSize(state, payload) {
            state.size = payload
        },
        workbenchSetShowOverlay(state, payload) {
            state.showOverlay = payload
        },
    },
    getters: {
        workbenchGetParams(state) {
            if (state.selectItem == "txt2img")
                return state.txt2imgParams
        },
        workbenchGetSelected(state) {
            if (state.selectItem == "txt2img")
                return state.txt2imgSelect
        },

        workbenchGetOpt(state) {
            return state.selectItem
        },
        workbenchGetDisplay(state) {
            return state.display
        },
        workbenchGetLoading(state) {
            return state.loading
        },
        workbenchGetPlacement(state) {
            return state.placement
        },
        workbenchGetSize(state) {
            return state.size
        },
        workbenchGetShowOverlay(state) {
            return state.showOverlay
        },
    }
}

export default workbench