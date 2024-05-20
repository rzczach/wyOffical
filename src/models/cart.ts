import axios from "axios";
import { actions, getState } from "../store/reduxMini";
import Api from "../utils/api";
import { message } from "antd";
import { ProductInfo } from "./home";

export interface ShoppingCardData {
    cartId: number; // 主键，自动递增的购物车项ID
    userId: number; // 外键，关联到用户表的用户ID
    productId: number; // 外键，关联到商品表的商品ID
    quantity: number; // 商品数量，默认为1
    addedTime: Date; // 商品加入购物车的时间，默认为当前时间戳
}
type CartInfo =  ProductInfo & {cartId: number, selected: boolean}

export default {
    state: {
       cartList: [] as CartInfo[]

    },
    actions: {
        async getCart() {
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
        async createCart(data: { productId: number }) {
            const { userInfo } = getState().use;
            const info = await axios.post(Api.createCart, {
                userId: userInfo.userId,
                productId: data.productId,
                quantity: 1,
            });
            if (info.data) {
                message.success(info.data.message);
                await actions.cart.getCart();
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
