import { actions } from "../store/reduxMini";

// import { actions, getState } from 'kredux-mini';
interface UserInfo{
    nickname: string;
}
export default {
    state: {
        userInfo: {} as UserInfo,
        isLogin: false,
       
    },
    actions: {
        init() {
            const  userInfo = localStorage.getItem('cmsUserInfo');
            if (userInfo) {
                actions.cms.setState({
                    isLogin: true,
                    userInfo: JSON.parse(userInfo)
                })
            }
        },
    },
};
