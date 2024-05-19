// import { actions, getState } from 'kredux-mini';

import axios from 'axios';
import Api from "../utils/api";
import { actions } from '../store/reduxMini';
//  ---------------------------- 商品信息------------------------
export enum  CATEGORY {
    huashu = 1,
    lihe,
    dangao,
    hualan,
    lvzhi,
    shoutihualan,
    zhuohua
}
export enum  OCCASION {
    aiqing = 1,
    shengri,
    youqing,
    tanbing,
    daoqian,
    wenhou,
    ganxie,
    aisi,
    shangwu,
}
export enum FLOWERMATERIAL {
    meigui = 1,
    baihe,
    kangnaixin,
    xiangrikui,
    mantianxing,
    yujinxiang,
    juhua,
    other,
}
export interface ProductInfo {
    /**
     * 商品id
     */
    productId: number;
    /**
     * 类别
     */
    category: CATEGORY;
    /**
     *  场景
     */
    occasion: OCCASION;
    /**
     * 材质 花材
     */
    flowerMaterial: FLOWERMATERIAL;
    /**
     * 数量
     */
    stemCount: number;
    /**
     * 价格
     */
    price: number;
     /**
     * 划线价格
     */
    originaPrice: number;
     /**
     * 售卖数量
     */
    salesVolume: number;
     /**
     * 上新时间
     */
     createTime: number;
     /**
     * 更新时间
     */
     uploadTime: number;
     /**
      * 详情
      */
     detail: string;
     /**
      * 配送信息
      */
     deliveryInfo: string
     mainImg: string;
     imgList: string[];
     name: string;
}
export default {
    state: {
        installWx: false,
        count: 1,
        productList: [] as ProductInfo[]
    },
    actions: {
        async getProductList() {
            const info = await axios.get(Api.productList);
            console.log('info', info);
            if (info.data) {
                const list = info.data.result.list;
                console.log('info', info.data);
                actions.home.setState({
                    productList: list
                })
            }
            return true;
        },
        async getProductInfo(id: string) {
            const info = await axios.get(Api.productInfo, {
                params: {
                    productId: id,
                }
            });
            console.log('info', info);
            // if (info.data) {
            //     const list = info.data.result.list;
            //     console.log('info', info.data);
            //     actions.home.setState({
            //         productList: list
            //     })
            // }
            // return true;
        },
        add() {
            // actions.home.setState({ count: getState('home').count + 1 });
        },
    },
};
