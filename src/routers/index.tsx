
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from 'Modules/home/index';
import Login from 'Modules/login/index';
import Detail from 'Modules/detail/index';
import Cms from 'Src/cms/index';
import CmsRegister from 'Src/cms/CmsRegister/index';
import { actions } from '../store/reduxMini';


const Ro = () => {
    actions.use.init();
    actions.cms.init();
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/detail" element={<Detail />} />
                <Route path="/cms" element={<Cms />} />
                <Route path="/cmsRegister" element={<CmsRegister />} />
                {/* 其他路由 */}
            </Routes>
        </Router>
    );
};

export default Ro;