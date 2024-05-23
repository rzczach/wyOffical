/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DeleteFilled } from '@ant-design/icons';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './style.scss'
import { actions, useSelector } from '../../store/reduxMini';
import Nav from '../../component/Nav';
import { Checkbox, Form, Input, Layout, Modal, Row, Select, message } from 'antd';
import addressJson from './AddressSelector/addressJson';
import { CascadePicker } from 'antd-mobile';
import AddressSelector from './AddressSelector';
import {
    ModalForm,
    ProFormSelect,
} from '@ant-design/pro-components';
import { UserAddressData } from '../../models/use';


const Order: React.FC = () => {
    const { isLogin } = useSelector((state: State) => state.use)
    const [userAddress, setUserAddress] = useState<UserAddressData>();
    const history = useNavigate();
    useEffect(() => {
        async function init() {
            console.log('userInfo', isLogin);
            if (!isLogin) {
                const isLogin = await actions.use.init();
                if (!isLogin) {
                    history('/login')
                    return;
                }
            }
            const info = await actions.use.getAddress();
            if (info) {
                const add = info.filter((d) => {
                    return d.isDefault
                })
                setUserAddress(add[0] || info[0]);
            }
        }
        init()
    }, [history, isLogin])




    const [showModal, setShowModal] = useState(false);
    const [form] = Form.useForm();
    const productListJson = localStorage.getItem('productList');
    const productList = JSON.parse(productListJson || '[]');
    const price = productList.reduce(
        (sum, item) => sum + (item.price || 0),
        0
    );
    const addOrderItem = async () => {
       
        const {buyUserName,buyPhoneNumber, userMessage ,cardMessage} = form.getFieldsValue(['buyUserName', 'buyPhoneNumber', 'userMessage', 'cardMessage']);
        if (!buyUserName || !buyPhoneNumber) {
            return message.error('请填写订购人信息')
        }
        if (!userAddress) {
            return message.error('请填写收货地址')
        }
        await actions.order.createOrder({
            productList: productList,
            userMessage,
            buyUserName,
            buyPhoneNumber,
            cardMessage,
            totalPrice: price,
            addressId: userAddress.addressId,
        })
        history('/home')
       
    }

   

    console.log('userAddress', userAddress);
 
    return (
        <Layout style={{ height: '100vh', overflow: 'scroll', }}>
            <Nav />
            <div className='contenta'>
                <div className="order-item">
                    <div className="orderItem-title">
                        <p>填写订单信息</p>
                    </div>
                    <div className="orderItem-cont clumes">
                        <Row justify={'space-between'} align={'middle'} style={{ width: '100%' }}>
                            <div className="fh"> 收货人信息</div>
                            <div onClick={() => { setShowModal(true) }} className="addressBtn pointercurser">
                                <i className="iconfont icon-xinzengdizhi"></i>
                                <span>新增收货地址</span>
                            </div>
                        </Row>

                        {
                            userAddress?.addressId
                                ?
                                <div className="order-address">
                                    <div className="order-name"> 收货人：{userAddress.recipientName}</div>
                                    <div className="order-name"> 手机号：{userAddress.phoneNumber}</div>
                                    <div className="order-name"> 详细地址：{userAddress.province}{userAddress.city}{userAddress.district}{userAddress.streetAddress}</div>
                                </div>
                                : null

                        }
                    </div>
                    <Form

                        form={form}
                        name="control"

                        style={{ maxWidth: '100%' }}
                    >
                        <div className="orderItem-contBottom">
                            <div className="fh">订购人信息</div>
                            <div className="order-info">
                                <div className="order-name">

                                    <Form.Item name="buyUserName" label="姓名:" rules={[{ required: true }]}>
                                        <Input placeholder="订购人名称" type="text" maxLength={11} autoComplete="off" />
                                    </Form.Item>
                                </div>
                                <div className="order-name">

                                    <Form.Item name="buyPhoneNumber" label="电话:" rules={[{ required: true }]}>
                                        <Input placeholder="联系方式" type="tel" maxLength={11} autoComplete="off" />
                                    </Form.Item>

                                </div>
                            </div>
                        </div>
                        <div className="orderItem-title">
                            <p>配送信息</p>
                        </div>
                        <div className="orderItem-cont">
                            <div className="ordliuyan">
                                <div className="greetting-mess">
                                    <p>贺卡留言</p>
                                </div>
                                <div className="greetting-content">
                                    <div className="greetting-levamess">
                                        <Form.Item name="cardMessage" rules={[{ required: true }]}>
                                            <textarea rows={6} cols={60} maxLength={200} placeholder="填写留言，最多可填写200字。" />
                                        </Form.Item>

                                    </div>
                                </div>
                            </div>
                            <div className="ordliuyan">
                                <div className="greetting-mess">
                                    <p>买家留言</p>
                                </div>
                                <div className="greetting-content">
                                    <div className="greetting-levamess">
                                        <Form.Item name="userMessage" rules={[{ required: true }]}>
                                            <textarea rows={6} cols={60} maxLength={200} placeholder="选填,请注明需求，120字以内。" />
                                        </Form.Item>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </Form>

                </div>
                <div className='order-item'>
                    <div className="orderItem-title">
                        <p>核对购物清单</p>
                    </div>
                    {
                        productList.map((d) => {
                            return (
                                <div className="orderItem-shopping">
                                    <div className="shopping-image">
                                        <img src={d.mainImg} />
                                    </div>
                                    <div className="shopping-message">
                                        <div className="shopping-priceone">
                                            <p>{d.name}</p>
                                        </div>
                                        <div className="shopping-pricetwe">
                                            <p>数量:&nbsp;X1</p>
                                        </div>
                                    </div>
                                    <div className="shopping-price clearfix">
                                        <div className="shopping-priceone">
                                            <p>店铺价:</p>
                                            <p className="red-font order-price">￥{d.price}</p>
                                            <p></p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }

                    <div className="contenta margintoppx">

                        <div className="order-item contentsubmit-goods">
                            <div className="submit-goods">
                                <p>共</p>
                                <p id="num" className="red-font fontsize-goods">{productList.length}</p>
                                <p>件商品</p>
                            </div>
                            <div className="submit-goods">
                                <p>总金额:</p>
                                <p>
                                    ￥<span id="total" className="text-danger">{price}</span>
                                </p>
                            </div>
                            <div className="submit-goods">
                                <p>配送费:</p>
                                <p>￥
                                </p><p id="peisongfeiIdclass">30.00</p>
                                <p></p>
                            </div>
                            <div className="submit-goods">
                                <p>实付款:</p>
                                <p className="red-font fontsize-goods" id="resultMoneyid" style={{ color: ' #ff2222', fontWeight: 'bold' }}>￥{price + 30}</p>
                            </div>
                            <div className="submit-goods">
                                <p>支付方式:</p>
                                <p className="red-font fontsize-goods" id="resultMoneyid" style={{ color: ' #ff2222', fontWeight: 'bold' }}>微信</p>
                            </div>
                            <div className="submit-goods" style={{ width: 264 }}>

                                <div className=" submit-goodsbutton">
                                    <div onClick={addOrderItem} className="a-colorfont">提交订单</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <ModalForm
                title="新增收货地址"
                open={showModal}
                onOpenChange={() => { setShowModal(!showModal) }}
                modalProps={{ destroyOnClose: true }}
                onFinish={async (values) => {
                    console.log('onFinish', values);
                    const a = await actions.use.createAddress({
                        addressTitle: values.addressTitle,
                        isDefault: values.isDefault,
                        phoneNumber: values.phoneNumber,
                        recipientName: values.recipientName,
                        streetAddress: values.streetAddress,
                        province: values.address.province,
                        city: values.address.city,
                        district: values.address.area,
                    });
                    setUserAddress(a)
                    setShowModal(!showModal)
                }}
            >

                <ProFormSelect
                    width="xs"

                    options={[
                        {
                            value: 1,
                            label: '家庭地址',
                        },
                        {
                            value: 2,
                            label: '公司地址',
                        },

                    ]}
                    name="addressTitle"
                    label="地址分类"
                />
                <Form.Item
                    name="recipientName"
                    rules={[{ required: true, message: '收货人姓名' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} type='tel' placeholder="收货人姓名" />
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
                    rules={[{ required: true, message: '请输入手机号' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="tel"
                        maxLength={11}
                        placeholder="请输入手机号"
                    />
                </Form.Item>
                <Form.Item
                    name="address"
                    rules={[{ required: true, message: '请选择地址' }]}
                >
                    <AddressSelector onChange={() => { }} />
                </Form.Item>
                <Form.Item
                    name="streetAddress"
                    rules={[{ required: true, message: '请输入详细地址,具体到门牌号' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="text"
                        placeholder="详细地址："
                    />
                </Form.Item>

                <Form.Item name="isDefault" valuePropName="checked" noStyle>
                    <Checkbox>设为默认地址</Checkbox>
                </Form.Item>


            </ModalForm>

            {/* <Foot /> */}
        </Layout >
    );
};

export default Order;