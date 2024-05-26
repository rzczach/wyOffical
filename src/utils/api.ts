const prefix = 'http://localhost:5173/flower/v1/';


const Api = {
    // 用户相关
    getUserInfo: `${prefix}users/list`,
    login: `${prefix}users/login`,
    getUserById: `${prefix}users/info`,
    createUser: `${prefix}users/create`,
    updateUser: `${prefix}users/update`,
    // 商品
    productList: `${prefix}product/list`,
    productListFlowerMaterial: `${prefix}product/infoByFlowerMaterial`,
    productInfo: `${prefix}product/info`,
    // 购物车
    createCart: `${prefix}cart/create`,
    cartList: `${prefix}cart/list`,
    deleteCart: `${prefix}cart/delete`,
    // 地址
    addressList: `${prefix}address/infoByUserId`,
    createAddress: `${prefix}address/create`,
    updateAddress: `${prefix}address/update`,
    deleteAddress: `${prefix}address/delete`,
    setDefaultAddress: `${prefix}address/setDefault`,
    // 订单
    createOrder: `${prefix}order/create`,
    getOrderByUserId: `${prefix}order/infoByUserId`,
    // 评价
    createReviews: `${prefix}reviews/create`,
    getProductReviews: `${prefix}reviews/infoByProductId`,

    
}
export default Api;