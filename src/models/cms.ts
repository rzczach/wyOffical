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
        add() {
            // actions.home.setState({ count: getState('home').count + 1 });
        },
    },
};
