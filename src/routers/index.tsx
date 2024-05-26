
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../modules/home/index';
import Login from '../modules/login/index';
import ShopingCar from '../modules/shopingCar/index';
import Detail from '../modules/detail/index';
import Order from '../modules/order/index';
import UserCenter from '../modules/userCenter/index';
import List from '../modules/list/index';
import { actions } from '../store/reduxMini';


const Ro = () => {
    actions.use.init();
    actions.cms.init();
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/shopingCar" element={<ShopingCar />} />
                <Route path="/detail" element={<Detail />} />
                <Route path="/order" element={<Order />} />
                <Route path="/userCenter" element={<UserCenter />} />
                <Route path="/list" element={<List />} />
                {/* 其他路由 */}
            </Routes>
        </Router>
    );
};

export default Ro;