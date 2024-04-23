// import { actions, getState } from 'kredux-mini';

import { actions } from "../store/reduxMini";
import axios from 'axios';
import Api from "../utils/api";

interface UseInfo {
    nickname?: string;
}
export default {
    state: {
        isLogin: false,
        userInfo: {} as UseInfo,
    },
    actions: {
        init() {
            // const  userInfo = localStorage.getItem('userInfo');
            const info = axios.get(Api.getUserInfo);
            console.log('info', info);
           
            // if (userInfo) {
            //     actions.use.setState({
            //         isLogin: true,
            //         userInfo: JSON.parse(userInfo)
            //     })
            // }
        },
    },
};
