const prefix = 'http://localhost:5173/flower/v1/';


const Api = {
    getUserInfo: `${prefix}users/list`,
    login: `${prefix}users/login`,
    getUserById: `${prefix}users/info`,
    createUser: `${prefix}users/create`,
}
export default Api;