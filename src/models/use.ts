// import { actions, getState } from 'kredux-mini';

import { actions, getState } from "../store/reduxMini";
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
    profileImage: string;
    registrationTime: string;
    lastLoginTime: string;
}
export interface UserAddressData {
    addressId: number; // 主键，自动递增的地址ID
    userId: number; // 用户ID，关联到用户表的外键
    addressTitle: string; // 地址标题，例如“家庭住址”或“公司地址”
    recipientName: string; // 收件人的全名
    phoneNumber: string; // 联系电话号码
    province: string; // 省份名称
    city: string; // 城市名称
    district?: string; // 区县名称，可选
    streetAddress: string; // 详细的街道地址
    zipCode?: string; // 邮政编码，可选
    isDefault: boolean; // 是否设为默认地址，默认为false
    creationTime: Date; // 地址创建时间
    lastUpdateTime: Date; // 地址最后更新时间，自动更新
}

export default {
    state: {
        isLogin: false,
        userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}') as UserInfo,
        userAddressList: [] as UserAddressData[],
    },
    actions: {
        async init() {
            const data = JSON.parse(localStorage.getItem('userInfo') || '{}');

            if (data && data.userId) {
                const info = await axios.get(Api.getUserById, {
                    params: {
                        userId: data.userId,
                    }
                });
                if (info.data) {
                    const userInfo = info.data.result;
                    actions.use.setState({
                        userInfo,
                        isLogin: true,
                    })

                }
                return true;

            }
            return false
        },
        async login(data: { phoneNumber: number; password: number }) {
            const info = await axios.get(Api.login, {
                params: data
            });
            if (info.data) {
                if (!info.data.result.flag) {
                    message.error(info.data.message)
                    return false;
                } else {
                    message.success(info.data.message);
                    const userInfo = info.data.result;
                    
                    actions.use.setState({
                        userInfo,
                        isLogin: true,
                    })

                    localStorage.setItem('userInfo', JSON.stringify(userInfo))
                    return true;
                }
            }
           

        },
        async upDateUserInfo(data:Partial<UserInfo>) {
            const { userInfo } = getState().use
            const info = await axios.post(Api.updateUser, {...data,userId: userInfo.userId});
            if (info.data) {
                
                message.success(info.data.message)
                await actions.use.init();
               
            }
        },
        async register(data: Partial<UserInfo>) {
            const info = await axios.post(Api.createUser, data);
            if (info.data) {
                if (info.data.result.data) {
                    message.success(info.data.message)
                    return true;
                } else {
                    message.warning(info.data.message)
                    return false
                }
               
                
            }
        },
        async getAddress() {
            const { userInfo } = getState().use
            const info = await axios.get(Api.addressList, {
                params: {
                    userId: userInfo.userId,
                }
            });
            if (info.data) {
                const d = info.data.result.info
                actions.use.setState({
                    userAddressList: d,
                })
                return d;
            }
        },
        async createAddress(data:Partial<UserAddressData>) {
            const { userInfo } = getState().use
            const info = await axios.post(Api.createAddress, {...data,userId: userInfo.userId});
            if (info.data) {
                await actions.use.getAddress();
                const d = info.data.result.info
                return d;
            }
        },
        async upDateAddress(data:Partial<UserAddressData>) {
            const { userInfo } = getState().use
            const info = await axios.post(Api.updateAddress, {...data,userId: userInfo.userId});
            if (info.data) {
                await actions.use.getAddress();
                const d = info.data.result.info
                return d;
            }
        },
        async setDefaultAddress(data:Partial<UserAddressData>) {
            const { userInfo } = getState().use
            const info = await axios.post(Api.setDefaultAddress, {addressId: data.addressId ,userId: userInfo.userId});
            if (info.data) {
                message.success(info.data.message);
                await actions.use.getAddress();
                const d = info.data.result.info
                return d;
            }
        },
        async deleteAddress(data:Partial<UserAddressData>) {
           
            const info = await axios.post(Api.deleteAddress, {addressId: data.addressId});
            if (info.data) {
                message.success(info.data.message);
                await actions.use.getAddress();
                const d = info.data.result.info
                return d;
            }
        }
    },
};
