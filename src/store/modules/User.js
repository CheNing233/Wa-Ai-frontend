import axios from 'axios';

const API = 'http://' + window.location.hostname + ':8000/users/';

const User = {
    namespace: true,
    state: {
        user: localStorage.getItem('USER_NAME') || '',
        token: localStorage.getItem('USER_TOKEN') || '',
        logExpires: localStorage.getItem('USER_INFO_EXPIRES') || '3d',
    },
    actions: {
        userLogin({ commit }, userData) {
            return new Promise((resolve, reject) => {
                axios.get(API + 'login/', {
                    params: {
                        username: userData.username,
                        password: userData.password,
                    }
                })
                    .then(resp => {
                        if (resp.data.code != 0) {
                            throw new Error(resp.data.message);
                        }

                        commit('userSetToken', {
                            user: userData.username,
                            token: resp.data.token
                        });
                        resolve(resp);
                    })
                    .catch(err => {
                        commit('userRemoveToken');
                        reject(err);
                    });
            });
        },
        userLogout({ commit, getters }) {
            return new Promise((resolve, reject) => {
                axios.get(API + 'logout/', {
                    params: getters.userInfo
                })
                    .then(resp => {
                        if (resp.data.code != 0) {
                            throw new Error(resp.data.message);
                        }

                        commit('userRemoveToken');
                        resolve(resp);
                    })
                    .catch(err => {
                        commit('userRemoveToken');
                        reject(err);
                    });
            });
        },
    },
    getters: {
        userInfo(state) {
            return {
                username: state.user,
                usertoken: state.token,
            };
        },
    }
}

export default User