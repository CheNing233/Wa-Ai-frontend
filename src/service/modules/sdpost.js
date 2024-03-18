import axios from 'axios';
import {API_BASE_URL, POST_API_LIST, POST_API_URL} from '@/config/ApiConfig';

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

const getSdPostsList = (data) => request(
    `${POST_API_URL}${POST_API_LIST.getPostListByUserId}`, 'post',
    {}, data
);

const getSdPostDetail = (params) => request(
    `${POST_API_URL}${POST_API_LIST.getPostDetailByPostId}`, 'get',
    params, {}
);

const likeSdPost = (params) => request(
    `${API_BASE_URL}${POST_API_LIST.likePost}`, 'post',
    params, {}
);

const createSdPost = (data) => request(
    `${POST_API_URL}${POST_API_LIST.createPost}`, 'post',
    {}, data
);

export default {
    getSdPostsList,
    getSdPostDetail,
    likeSdPost,
    createSdPost
};