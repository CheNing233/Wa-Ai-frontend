import axios from 'axios';
import { USER_API_URL, USER_API_LIST } from '@/config/ApiConfig';

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


const login = (params) => request(
  `${USER_API_URL}${USER_API_LIST.login}`, 'post',
  {}, params
);

const logout = () => request(
  `${USER_API_URL}${USER_API_LIST.logout}`, 'post',
  {}, {}
);

const register = (params) => request(
  `${USER_API_URL}${USER_API_LIST.register}`, 'post',
  {}, params
);

const me = () => request(
  `${USER_API_URL}${USER_API_LIST.me}`, 'get',
  {}, {}
);

export default {
  login,
  logout,
  register,
  me
};