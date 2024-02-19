import axios from 'axios';
import store from '@/store'
import VueCookies from "vue-cookies";

const BaseApiURL = 'http://' + window.location.hostname + ':8000/api/';

const SdListAPI_URLs = {
    // models
    "getSdmodelsList": BaseApiURL + "get_sdmodels/",

    // tags
    "getSdTags": BaseApiURL + "get_sdtags/",
}

const SdServiceAPI_URLs = {
    "getGenerated": BaseApiURL + "get_generated/",
}

function getList(apiURL, params) {
    return new Promise((resolve, reject) => {
        axios
            .get(apiURL, {
                params: params,
            })
            .then((resp) => {
                resolve(resp.data.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export const SdListAPI = {
    getSdmodelsList(params) {
        return getList(SdListAPI_URLs.getSdmodelsList, params);
    },

    getSdtagsList(params) {
        return getList(SdListAPI_URLs.getSdTags, params);
    },
}

function getService(apiURL, params) {
    return new Promise((resolve, reject) => {

        const PARAMS = {
            username: VueCookies.get('USER_NAME') || null,
            usertoken: VueCookies.get('USER_TOKEN') || null,
            ...params,
        };

        axios
            .get(
                apiURL,
                { params: PARAMS, }
            )
            .then((resp) => {
                resolve(resp.data.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}


export const SdServiceAPI = {
    getGenerated() {
        var generateParams = store.getters.workbenchGetParams;
        var selectedParams = store.getters.workbenchGetSelected;

        generateParams.override_settings.sd_model_checkpoint =
            selectedParams.CHECKPOINT.filename;
        generateParams.override_settings.sd_vae =
            selectedParams.VAE.filename;

        console.log("selectedParams.CHECKPOINT.filename", selectedParams.CHECKPOINT.filename)

        const PARAMS = {
            sdOpt: store.getters.workbenchGetOpt,
            sdParams: JSON.stringify(store.getters.workbenchGetParams),
        }

        return getService(SdServiceAPI_URLs.getGenerated, PARAMS);
    }
}