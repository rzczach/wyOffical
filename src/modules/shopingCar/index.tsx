import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DeleteFilled } from '@ant-design/icons';
import {

    Form,

    Layout
} from 'antd';
import './style.scss'
import { actions } from '../../store/reduxMini';
import Nav from '../../component/Nav';


const ShopingCar: React.FC = () => {
    // const { from } = useParams();
    const location = useLocation();
    const history = useNavigate();

    const searchParams = new URLSearchParams(location.search);
    console.log('location', location);
    const from = searchParams.get('from');

    const [form] = Form.useForm();
    console.log('from', searchParams);

    const list = [
        {
            mainImg: 'https://upyun.dinghuale.com/uploads/20200707/202007071003531298.jpg',
            name: '挚爱一生',
            price: 269,
            salePrice: 330,
            count: 1,
        }
    ]
    const selectAll = () => {

    }
    const selectCurrent = () => {

    }
    const deleteGoods = () => {

    }
    const deleteSelected = () => {

    }
    const submitCarts = () => {

    }
    return (
        <Layout style={{ height: '100vh', overflow: 'scroll', }}>
            <Nav />
            <div className='cart-maincont'>
                {
                    !list || !list.length
                        ? <div className='no-content'>

                            <img className='no' src='https://www.dinghuale.com/public/images/cartback.png' />
                            <p>购物车暂无内容</p>
                        </div>
                        :
                        <div className='content'>
                            <div className='goods-allcont'>
                                <div className="goods-title">
                                    <div className="goods-allcheck single-area">
                                        <input style={{ position: 'relative', top: '1px' }} name="total" type="checkbox" onChange={selectAll} />
                                        &nbsp;
                                        全选
                                    </div>
                                    <div className="goods-name single-area">
                                        <p>商品信息</p>
                                    </div>
                                    <div className="goods-entry single-area">
                                        <p>市场价</p>
                                    </div>
                                    <div className="goods-entry single-area">
                                        <p>店铺价</p>
                                    </div>

                                    <div className="goods-entry single-area">
                                        <p>数量</p>
                                    </div>
                                    <div className="goods-entry single-area">
                                        <p>操作</p>
                                    </div>
                                </div>
                                <div className='goos'>
                                    <div className="goods-items">
                                        <div className="goods-allcheck single-area">
                                            <label><input name="goods" value="1715868984566" data-price="189" data-num="1" data-id="1715868984566" type="checkbox" onChange={selectCurrent} /></label>
                                        </div>
                                        <div className="goods-name single-area">
                                            <Link to="/proDetail.html?pid=283" className='link'>
                                                <img src="https://upyun.dinghuale.com/uploads/20200707/202007071003531298.jpg" className="goods-image" />
                                                &nbsp;&nbsp;
                                                <p className="goods-des">挚爱一生</p>
                                            </Link>
                                        </div>
                                        <div className="goods-entry single-area">
                                            <p><del className="text-light">￥269</del></p>
                                        </div>
                                        <div className="goods-entry single-area">
                                            <p className="redfont">￥189</p>
                                        </div>
                                        <div className="goods-entry single-area">
                                            <p>1</p>
                                        </div>

                                        <DeleteFilled className="goods-entry single-area cursorponiter" onClick={deleteGoods} />

                                    </div>
                                    <div className="goods-items">
                                        <div className="goods-allcheck single-area">
                                            <label><input name="goods" value="1715868984566" data-price="189" data-num="1" data-id="1715868984566" type="checkbox" onChange={selectCurrent} /></label>
                                        </div>
                                        <div className="goods-name single-area">
                                            <Link to="/proDetail.html?pid=283" className='link'>
                                                <img src="https://upyun.dinghuale.com/uploads/20200707/202007071003531298.jpg" className="goods-image" />
                                                &nbsp;&nbsp;
                                                <p className="goods-des">挚爱一生</p>
                                            </Link>
                                        </div>
                                        <div className="goods-entry single-area">
                                            <p><del className="text-light">￥269</del></p>
                                        </div>
                                        <div className="goods-entry single-area">
                                            <p className="redfont">￥189</p>
                                        </div>
                                        <div className="goods-entry single-area">
                                            <p>1</p>
                                        </div>

                                        <DeleteFilled className="goods-entry single-area cursorponiter" onClick={deleteGoods} />

                                    </div>
                                </div>
                                <div className="goods-settlement">
                                    <div className="goods-settlementcont">
                                        <div className="goods-allcheck single-area">
                                        </div>
                                        <div className="goods-name single-area cursorponiter">
                                            <button onClick={deleteSelected} className="btn-danger">
                                                删除
                                            </button>
                                        </div>
                                        <div className="goods-entry goods-allnumber single-area">
                                            <p>共</p>
                                            <p id="total-num" className="large-size">0</p>
                                            <p></p>
                                            <p>件商品</p>
                                        </div>
                                        <div className="goods-entry goods-payable single-area">
                                            <p>应付金额:</p>
                                            <p className="redfont large-size">￥<span id="total-price">0</span></p>
                                            <p></p>
                                        </div>
                                        <div className="goods-entry goods-allsettlement single-area">
                                            <div onClick={submitCarts} className="a-colorfont cursorponiter">结算</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                }

            </div>
            {/* <Foot /> */}
        </Layout>
    );
};

export default ShopingCar;