// import { actions, getState } from 'kredux-mini';

import { actions } from "../store/reduxMini";
import axios from 'axios';
import Api from "../utils/api";
import { message } from "antd";

export interface UserInfo {
    userId: number;
    username: string;
    email: string;
    password: string;
    phoneNumber: number;
    shippingAddressID: number;
    profileImage: number;
    registrationTime: Date;
    lastLoginTime: Date;
}
export default {
    state: {
        isLogin: false,
        userInfo: {} as UserInfo,
    },
    actions: {
        async init() {
            console.log('init');
            const data = JSON.parse(localStorage.getItem('userInfo') || '{}');
            if (data && data.userId) {

                const info = await axios.get(Api.getUserById, {
                    params: {
                        userId: data.userId,
                    }
                });
                if (info.data) {

                    const userInfo = info.data.result;
                    console.log('userInfo', userInfo);
                    actions.use.setState({
                        userInfo,
                        isLogin: true,
                    })

                }

            }
        },
        async login(data: { phoneNumber: number; password: number }) {
            const info = await axios.get(Api.login, {
                params: data
            });
            if (info.data) {
                if (!info.data.result.flag) {
                    message.error(info.data.message)
                } else {
                    message.success(info.data.message);
                    const userInfo = info.data.result;
                    console.log('userInfo', userInfo);
                    actions.use.setState({
                        userInfo,
                        isLogin: true,
                    })

                    localStorage.setItem('userInfo', JSON.stringify(userInfo))
                }
            }
            return true;

        },
        async register(data: Partial<UserInfo>) {
            const info = await axios.post(Api.createUser, data);
            if (info.data) {
               
                message.success(info.data.message)
                // if (!info.data.result.flag) {
                //     message.error(info.data.message)
                // } else {
                //     message.success(info.data.message);
                //     const userInfo = info.data.result;
                //     console.log('userInfo', userInfo);
                //     actions.use.setState({
                //         userInfo,
                //         isLogin: true,
                //     })

                //     localStorage.setItem('userInfo', JSON.stringify({ userInfo }))
                // }
                return true;
            }
           

        }
    },
};
