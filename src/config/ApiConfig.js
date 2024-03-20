/*
* 修改你的API
* */

import {backendApiUrl} from './BackendConfig'

export const API_BASE_URL = backendApiUrl;

export const USER_API_URL = `${API_BASE_URL}`;
export const USER_API_LIST = {
    login: "/account/login",
    logout: "/account/logout",
    register: "/account/register",
    isLogin: "/account/isLogin",
    me: "/account/me",

    getUsernameById: "/account/getUsernameById",
    getUserInfoById: "/user",

    sendMailCode: "/account/sendRegisterMail",
    restorePasswordByMailCode: "/account/forgetPassword",

    uploadAvatar: "/user/uploadAvatar"
}

export const TAG_API_URL = `${API_BASE_URL}/tag`;
export const TAG_API_LIST = {
    getSdTagsList: "/getSdTagsList",
}

export const MODEL_API_URL = `${API_BASE_URL}/model`;
export const MODEL_API_LIST = {
    getSdModelsList: "/getSdModelsList",
    getSdModelDetail: "/getSdModelById",
    likeSdModel: "/sdModel/like/liked",
}

export const IMAGE_API_URL = `${API_BASE_URL}`;
export const IMAGE_API_LIST = {
    getStaticImageUrl: "/staticImage/url",

    getMySdImagesList: "/sdImage/getMyAllList",
    getSdImageDetail: "/sdImage",
    likeSdImage: "/sdImage/like/liked",
    upLoadSdImage: "/sdImage/upload",
    deleteSdImage: "/sdImage",
}

export const POST_API_URL = `${API_BASE_URL}/post`;
export const POST_API_LIST = {
    createPost: "/create",
    deletePost: "/delete",
    getPostDetailByPostId: "/getPost",
    getPostListByUserId: "/getPostLite/create",
    favourPost: "/Favorite",
    likePost: "/Likes",
}

export const DRAW_API_URL = `${API_BASE_URL}/drawImage`;
export const DRAW_API_LIST = {
    txt2img: "/txt2Image",
    img2img: "/img2Image",
    extraImg: "/extraImage",
}


export const TASK_API_URL = `${API_BASE_URL}/task`;
export const TASK_API_LIST = {
    getTaskByUser: "/getTaskByUser",
    deleteTask: "/deleteTask"
}


export const TASK_STATUS = {
    0: {
        indicator: "primary",
        name: "创建",
        display: true,
        available: false,
    },
    1: {
        indicator: "primary",
        name: "进行中",
        display: true,
        available: false,
    },
    2: {
        indicator: "success",
        name: "已完成",
        display: false,
        available: true,
    },
    3: {
        indicator: "danger",
        name: "失败",
        display: true,
        available: false,
    },
    9: {
        indicator: "danger",
        name: "未知",
        display: false,
        available: true,
    },
}

