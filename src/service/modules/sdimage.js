import axios from 'axios';
import {API_BASE_URL, IMAGE_API_LIST, IMAGE_API_URL} from '@/config/ApiConfig';

const request = (url, method, params, data, headers = null, onUploadProgress = null) => {
    console.log("请求", url, method, params, data, headers, onUploadProgress);
    return new Promise((resolve, reject) => {
        axios({
            url: url,
            method: method,
            params: params,
            data: data,
            headers: headers ? headers : {},
            withCredentials: true,
            onUploadProgress: onUploadProgress,
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

const getSdImageDetail = (params) => request(
    `${IMAGE_API_URL}${IMAGE_API_LIST.getSdImageDetail}/${params.id}`, 'get',
    params, {}
);

const getMySdImageList = (params) => request(
    `${IMAGE_API_URL}${IMAGE_API_LIST.getMySdImagesList}`, 'get',
    params, {}
);

const likeSdImage = (params) => request(
    `${API_BASE_URL}${IMAGE_API_LIST.likeSdImage}/${params.id}`, 'post',
    params, {}
);

const upLoadSdImage = (data, onProgressFunc = null) => request(
    `${API_BASE_URL}${IMAGE_API_LIST.upLoadSdImage}`, 'post',
    {}, data, {'Content-Type': 'multipart/form-data'}, onProgressFunc
);

const deleteSdImage = (params) => request(
    `${API_BASE_URL}${IMAGE_API_LIST.deleteSdImage}/${params.id}`, 'delete',
    params, {}
)

export default {
    getMySdImageList,
    getSdImageDetail,
    likeSdImage,
    upLoadSdImage,
    deleteSdImage
};