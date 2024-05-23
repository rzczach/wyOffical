const prefix = 'http://localhost:5173/flower/v1/';


const Api = {
    // 用户相关
    getUserInfo: `${prefix}users/list`,
    login: `${prefix}users/login`,
    getUserById: `${prefix}users/info`,
    createUser: `${prefix}users/create`,
    // 商品
    productList: `${prefix}product/list`,
    productInfo: `${prefix}product/info`,
    // 购物车
    createCart: `${prefix}cart/create`,
    cartList: `${prefix}cart/list`,
    deleteCart: `${prefix}cart/delete`,
    // 地址
    addressList: `${prefix}address/infoByUserId`,
    createAddress: `${prefix}address/create`,
    // 订单
    createOrder: `${prefix}order/create`,
    
}
export default Api;