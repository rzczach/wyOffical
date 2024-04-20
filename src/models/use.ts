// import { actions, getState } from 'kredux-mini';

import { actions } from "../store/reduxMini";
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
            const  userInfo = localStorage.getItem('userInfo');
            if (userInfo) {
                actions.use.setState({
                    isLogin: true,
                    userInfo: JSON.parse(userInfo)
                })
            }
        },
    },
};
