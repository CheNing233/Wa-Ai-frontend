import axios from 'axios';
import {TASK_API_URL, TASK_API_LIST} from '@/config/ApiConfig';

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
                console.log("Axios 错误", err);
                reject(err);
            });
    });
}

const getTaskByUser = (params) => request(
    `${TASK_API_URL}${TASK_API_LIST.getTaskByUser}`, 'get',
    params, {}
);

const deleteTask = (params) => request(
    `${TASK_API_URL}${TASK_API_LIST.deleteTask}`, 'delete',
    params, {}
);


export default {
    getTaskByUser,
    deleteTask
};