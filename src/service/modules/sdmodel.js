import axios from 'axios';
import { MODEL_API_URL, MODEL_API_LIST } from '@/config/ApiConfig';

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
          }
          else {
            console.log("返回错误", res.data);
            reject(res.data.errorMsg);
          }
        }
        else {
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

const getSdModelsList = (params) => request(
  `${MODEL_API_URL}${MODEL_API_LIST.getSdModelsList}`, 'get',
  params, {}
);

const getSdModelDetail = (params) => request(
  `${MODEL_API_URL}${MODEL_API_LIST.getSdModelDetail}`, 'get',
  params, {}
);

export default {
  getSdModelsList,
  getSdModelDetail,
};