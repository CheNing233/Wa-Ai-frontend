import axios from 'axios';
import store from '@/store'
import ws from '@/websocket'
import {USER_API_URL, USER_API_LIST} from '@/config/ApiConfig';

const request = (url, method, params, data) => {
    console.log("请求", url, method, params, data);
    return new Promise((resolve, reject) => {
        axios({
            url: url,
            method: method,
            params: params,
            data: data,
            withCredentials: true,
        })
            .then((res) => {
                if (res.status === 200) {
                    if (res.data.success === true) {
                        resolve(res.data);
                    } else {
                        console.log("返回错误", res.data);
                        reject(res.data.errorMsg);
                    }
                } else {
                    console.log("请求错误", res);
                    reject(`status = ${res.status}; statusText = ${res.statusText}`);
                }
            })
            .catch((err) => {
                console.log("Axios POST 错误", err);
                reject(err);
            });
    });
}


const login = (data) => new Promise((resolve, reject) => {
    request(
        `${USER_API_URL}${USER_API_LIST.login}`, 'post',
        {}, data
    ).then((res) => {
        me();
        resolve(res);
    }).catch(err => {
        reject(err);
    });
});

const logout = () => new Promise((resolve, reject) => {
    request(
        `${USER_API_URL}${USER_API_LIST.logout}`, 'post',
        {}, {}
    ).then((res) => {
        me();
        resolve(res);
    }).catch(err => {
        reject(err);
    });
});


const register = (data) => request(
    `${USER_API_URL}${USER_API_LIST.register}`, 'post',
    {}, data
);

const isLogin = () => new Promise((resolve, reject) => {
    request(
        `${USER_API_URL}${USER_API_LIST.isLogin}`, 'get',
        {}, {}
    ).then((res) => {
        me();
        resolve(res);
    }).catch((err) => {
        reject(err);
    });
});

const me = () => new Promise((resolve, reject) => {
    request(
        `${USER_API_URL}${USER_API_LIST.me}`, 'get',
        {}, {}
    ).then((res) => {
        store.commit('userSetInfo', res.data);

        if (store.getters.userGetWebsocket === null) {
            store.commit('userSetWebsocket', ws.baseWs.initBaseWs());
        }

        resolve(res);
    }).catch((err) => {
        store.commit('userSetInfo', null);
        ws.baseWs.closeBaseWs(store.getters.userGetWebsocket);
        store.commit('userSetWebsocket', null);
        reject(err);
    });
});

const getUsernameById = (params) => request(
    `${USER_API_URL}${USER_API_LIST.getUsernameById}`, 'get',
    params, {}
);

export default {
    login,
    logout,
    register,
    isLogin,
    me,
    getUsernameById,
};