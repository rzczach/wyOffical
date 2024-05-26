// import { actions, getState } from 'kredux-mini';

import axios from 'axios';
import Api from "../utils/api";
import { actions } from '../store/reduxMini';
import { UserInfo } from './use';
//  ---------------------------- 商品信息------------------------

export enum CATEGORY {
    huashu = 1,
    lihe,
    dangao,
    hualan,
    lvzhi,
    shoutihualan,
    zhuohua
}
// const nav = ['鲜花', '花束', '礼盒', '蛋糕', '花篮', '绿植', '周花', '520鲜花']
export const nav = [
    {
        label: '花束',
        value: CATEGORY.huashu
    },
    {
        label: '礼盒',
        value: CATEGORY.lihe
    },
    {
        label: '蛋糕',
        value: CATEGORY.dangao
    },
    {
        label: '花篮',
        value: CATEGORY.hualan
    },
    {
        label: '绿植',
        value: CATEGORY.lvzhi
    },
    {
        label: '手提花篮',
        value: CATEGORY.shoutihualan
    },
    {
        label: '周花',
        value: CATEGORY.zhuohua
    },
]
export enum OCCASION {
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
    /**
     * 材料文案详情页使用
     */
    materialText: string;
    /**
     * 包装
     */
    packing: string;
    /**
     * 包装
     */
    imgList: string;
    /**
     * 包装
     */
    mainImg: string;
    name: string;
}

interface UserReviewsData {
    reviewId: number;
    productId: number;
    userId: number;
    rating: number;
    comment: string;
    reviewTime: number;

}

export default {
    state: {
        installWx: false,
        count: 1,
        productList: [] as ProductInfo[],
        productInfo: {} as ProductInfo,
        reviewInfoList: [] as (UserInfo & UserReviewsData) []
    },
    actions: {
        async getProductList(index: CATEGORY | number) {
            const info = await axios.get(Api.productList, {
                params: {
                    category: index
                }
            });
            
            if (info.data) {
                const list = info.data.result.list;
               
                actions.home.setState({
                    productList: list
                })
            }
            return true;
        },
        async getProductListByMaterial(index: FLOWERMATERIAL | number) {
            const info = await axios.get(Api.productListFlowerMaterial, {
                params: {
                    flowerMaterial: index
                }
            });
            if (info.data) {
                const list = info.data.result.list;
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
            
            if (info.data) {
                const d = info.data.result;

                actions.home.setState({
                    productInfo: d
                })
            }
            
        },
        async getProductReviewInfo(id: string) {
            const info = await axios.get(Api.getProductReviews, {
                params: {
                    productId: id,
                }
            });
            if (info.data) {
                const d = info.data.result;
                actions.home.setState({
                    reviewInfoList: d.info
                })
            }
            // return true;
        },
        add() {
            // actions.home.setState({ count: getState('home').count + 1 });
        },
    },
};
