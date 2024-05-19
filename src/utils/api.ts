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
}
export default Api;