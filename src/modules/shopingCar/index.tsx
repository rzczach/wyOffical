import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DeleteFilled } from '@ant-design/icons';
import { ExclamationCircleFilled } from '@ant-design/icons';
import {

    Checkbox,
    Form,

    Layout,
    Modal,
    Table,
    message
} from 'antd';
import './style.scss'
import { actions, useSelector } from '../../store/reduxMini';
import Nav from '../../component/Nav';



const ShopingCar: React.FC = () => {
    const { userInfo } = useSelector((state: State) => state.use)
    const { cartList } = useSelector((state: State) => state.cart)
    useEffect(() => {
        async function init() {

            if (!userInfo) {
                await actions.use.init();
            }
            const a = await actions.cart.getCart();
            setCartData(a)
        }
        init()
    }, [userInfo])
  
    const history = useNavigate();
  
   

    const selectAll = () => {

    }
    const selectCurrent = (e) => {
     

    }
    const deleteGoods = () => {

    }
    const deleteSelected = async () => {
        await actions.cart.deleteCart(cartData);
        const a = await actions.cart.getCart();
        setCartData(a)
        setTotalPrice(0)
    }
    const submitCarts = () => {
        if (totalPrice <= 0) {
            message.warning('请勾选要购买的物品后去结算')
        }else {
            history('/order');
        }
    }
    // 使用useState管理勾选状态和总价
    const [cartData, setCartData] = useState(cartList);
    const [totalPrice, setTotalPrice] = useState(0);

    // 更新勾选状态并重新计算总价
    const handleCheckboxChange = (record) => {
        const updatedData = cartData.map(item =>
            item.cartId === record.cartId ? { ...item, selected: !item.selected } : item
        );
        const productList = updatedData.filter((d) => 
            d.selected
        )
        localStorage.setItem('productList', JSON.stringify(productList))
        const newTotalPrice = updatedData.reduce(
            (sum, item) => sum + (item.selected ? item.price : 0),
            0
        );
        setCartData(updatedData);
        setTotalPrice(newTotalPrice);
    };
    const columns = [
        {
            title: '选择',
            dataIndex: 'selected',
            render: (_, record) => (
                <Checkbox
                    checked={record.selected}
                    onChange={() => handleCheckboxChange(record)}
                />
            ),
        },
        {
            title: '商品名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '商品图片',
            dataIndex: 'mainImg',
            key: 'mainImg',
            render: (_, d) => {
                return (
                    <img src={d.mainImg} className="goods-image" />
                );
            }
        },
        {
            title: '市场价',
            dataIndex: 'originaPrice',
            key: 'originaPrice',
        },
        {
            title: '店铺价',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '数量',
            dataIndex: 'quantity',
            key: 'quantity',
            render:  (_, record) => {
                return (
                    <div className="goods-entry single-area">
                        <p>{record.quantity || 1}</p>
                    </div>
                );
            }
        },
        
    ];
    return (
        <Layout style={{ height: '100vh', overflow: 'scroll', }}>
            <Nav />
            <div className='cart-maincont'>
                {
                    !cartList || !cartList.length
                        ? <div className='no-content'>

                            <img className='no' src='https://www.dinghuale.com/public/images/cartback.png' />
                            <p>购物车暂无内容</p>
                        </div>
                        :
                        <div className='content'>
                            <Table
                                className="custom-table"
                                columns={columns}
                                dataSource={cartData || cartList}
                            />
                            <div className='goods-allcont'>
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
                                            <p id="total-num" className="large-size">{cartData.filter((d) => d.selected).length}</p>
                                            <p></p>
                                            <p>件商品</p>
                                        </div>
                                        <div className="goods-entry goods-payable single-area">
                                            <p>应付金额:</p>
                                            <p className="redfont large-size">￥<span id="total-price">{totalPrice}</span></p>
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