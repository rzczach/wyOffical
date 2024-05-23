import axios from "axios";
import { actions, getState } from "../store/reduxMini";
import Api from "../utils/api";
import { message } from "antd";
import { ProductInfo } from "./home";
export enum OrderStatus {
    Unpaid = 'Unpaid',
    Paid = 'Paid',
    Completed = 'Completed',
    Cancelled = 'Cancelled',
}

// 定义配送状态枚举
export enum DeliveryStatus {
    Pending = 'Pending',
    Processing = 'Processing',
    Shipped = 'Shipped',
    Delivered = 'Delivered',
    Cancelled = 'Cancelled',
}
// 订单模型的 TypeScript 类型定义
export interface OrderData {
    orderId: number; // 主键，订单ID，自增
    productList: ProductInfo[]; 
    userId: number; // 用户ID，关联用户表
    orderNo: string; // 订单编号，通常由系统生成，唯一
    orderDate: number; // 下单时间，默认为当前时间
    totalPrice: number; // 订单总价，两位小数精度
    paymentMethod?: string; // 支付方式，可选
    deliveryAddress: string; // 配送地址，必填
    deliveryStatus: DeliveryStatus; // 配送状态，默认为Pending
    orderStatus: OrderStatus; // 订单状态，默认为Unpaid
    addressId?: number; // 默认配送地址ID，关联用户地址表，可选
    cardMessage?: string;// 贺卡留言
    userMessage?: string;// 买家留言
    buyUserName?: string;// 购买人联系人
    buyPhoneNumber?: number;//购买人手机号
}


export default {
    state: {
       orderList: [] as OrderData[]

    },
    actions: {
        async getOrder() {
            const { userInfo } = getState().use;
            if (!userInfo) {
                await actions.use.init();
            }
            const info = await axios.get(Api.cartList, {
                params: {
                    userId: userInfo.userId,
                }
            });
            if (info.data) {
               
                // message.success(info.data.message)
                const list = info.data.result.list;
                actions.cart.setState({
                    cartList: list,
                });
                return list
            }
            return [];

        },
        async createOrder(data: Partial<OrderData>) {
            const { userInfo } = getState().use;
            const info = await axios.post(Api.createOrder, {
                userId: userInfo.userId,
                ...data,
            });
            if (info.data) {
                console.log('info.data', info.data);
                message.success(info.data.message);
                
            }

        },
        async deleteCart(data: CartInfo[]) {
            console.log('data', data);
            const dlist = data.filter((d) => {return d.selected}).map((h) => h.cartId)
            const { userInfo } = getState().use;
            console.log('dlist', dlist);
            const info = await axios.post(Api.deleteCart, {
                userId: userInfo.userId,
                cartIds: dlist,
            });
            if (info.data) {
                message.success(info.data.message)
                return true;
            }
            return false;
        }

    }
};