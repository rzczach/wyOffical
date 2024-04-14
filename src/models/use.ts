// import { actions, getState } from 'kredux-mini';

import { getState } from "../store/reduxMini";

export default {
    state: {
        isLogin: false,
        userInfo: {
            name: '张三',
            age: 18,
            sex: '男',

        },
    },
    actions: {
        getUserInfo() {
           return getState().use.userInfo;
        },
    },
};
