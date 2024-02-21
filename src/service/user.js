import axios from 'axios';
import VueCookies from "vue-cookies";

const BaseUserURL = 'http://' + window.location.hostname + ':5050/user/';
const BaseApiURL = 'http://' + window.location.hostname + ':5050/api/';

export const UserLogAPI = {
    login(params) {
        return new Promise((resolve, reject) => {
            axios.post(BaseUserURL + 'login/', {
                params: params
            })
                .then(resp => {
                    if (resp.data.code != 0) {
                        throw new Error(resp.data.message);
                    }

                    VueCookies.set("userName", params.username, '30d');
                    VueCookies.set("USER_TOKEN", resp.data.token, '3d');

                    resolve(resp);
                })
                .catch(err => {

                    VueCookies.remove("USER_TOKEN");

                    reject(err);
                });
        });
    },
    logout() {
        return new Promise((resolve, reject) => {
            axios.get(BaseUserURL + 'logout/', {
                params: {
                    username: VueCookies.get('USER_NAME'),
                    usertoken: VueCookies.get('USER_TOKEN')
                }
            })
                .then(resp => {
                    if (resp.data.code != 0) {
                        throw new Error(resp.data.message);
                    }
                    resolve(resp);
                })
                .catch(err => {
                    reject(err);
                })
                .finally(() => {
                    VueCookies.remove("USER_TOKEN");
                });
        });
    },
}

export const UserProfileAPI = {

}

function getList(apiURL, params) {
    const PARAMS = {
        username: VueCookies.get('USER_NAME') || null,
        usertoken: VueCookies.get('USER_TOKEN') || null,
        ...params
    };

    return new Promise((resolve, reject) => {
        if(PARAMS.username == null || PARAMS.usertoken == null){
            reject("User not login");
        }
        
        axios
            .get(apiURL, {
                params: PARAMS,
            })
            .then((resp) => {
                resolve(resp.data.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

const UserDataAPI_URLs = {
    "getSdimagesList": BaseApiURL + "get_user_sdimages/",
}

export const UserDataAPI = {
    getSdimagesList(params) {
        return getList(UserDataAPI_URLs.getSdimagesList, params);
    },
}