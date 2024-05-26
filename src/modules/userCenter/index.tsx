/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from "../../component/Header";

import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, Checkbox, Form, Input, Row, message, Button, Modal, Select } from 'antd';

import './style.scss';
import React, { useEffect, useState } from "react";
import { actions, useSelector } from "../../store/reduxMini";
import CreateAddressModal from "../../component/CreateAddressModal";
import { useNavigate } from "react-router";
import { OrderDetailData, OrderStatus, formatStatus } from "../../models/order";
import { ProductInfo } from "../../models/home";
import axios from "axios";
import Api from "../../utils/api";
import { formatDateTime } from "../../utils";


const { Content, Sider } = Layout;
const items = [
    {
        label: '我的信息',
        key: '0',
        icon: UserOutlined,
    },
    {
        label: '我的订单',
        key: '1',
        icon: UploadOutlined,
    },
    {
        label: '我的地址',
        key: '2',
        icon: VideoCameraOutlined,
    },
    {
        label: '修改密码',
        key: '3',
        icon: UserOutlined,
    },
].map(
    (d, i) => ({
        key: i,
        icon: React.createElement(d.icon),
        label: d.label,
    }),
);



const UserCenter = () => {

    const history = useNavigate();
    const { userInfo, userAddressList = [], orderList = [] } = useSelector((state: State) => {
        return {
            userInfo: state.use.userInfo,
            userAddressList: state.use.userAddressList,
            orderList: state.order.orderList,
        }
    })
    const [infoForm] = Form.useForm();
    const [passWordForm] = Form.useForm();
    const [reviewForm] = Form.useForm();
    const [keys, setKey] = useState('0');
    const menuClick = (item: any) => {
        setKey(item.key)
    }
    const getTitle = () => {

        return <div className="title">{items[Number(keys)].label}</div>;

    }
    const [showModal, setShowModal] = useState(false);
    const [openOrder, setOpenOrder] = useState(false);
    const [record, setRecord] = useState<OrderDetailData & ProductInfo>();
    const [initialValues, setInitialValues] = useState(undefined);
    useEffect(() => {
        async function getData() {
            actions.use.getAddress();
            actions.order.getOrder();
        }
        getData();
    }, [])
    const updateAddress = (d) => { console.log("d", d); setInitialValues(d), setShowModal(true) };
    const deleteAddress = (d) => {
        actions.use.deleteAddress(d);
    };
    const setDefault = async (d) => {
        await actions.use.setDefaultAddress(d);
    };
    const onFinish = async (fieldsValue: any) => {
        console.log(fieldsValue);
        await actions.use.upDateUserInfo(fieldsValue);
    }
    console.log('record', record);
    const getContent = () => {
        switch (keys) {
            case "0":
                if (!userInfo.userId) {
                    // await actions.use.init();
                    return null;
                }
                return (
                    <div className="userInfo">
                        <div className="avatar">
                            <img src={userInfo.profileImage || 'https://img02.hua.com/pc/assets/img/avatar_default_08.jpg'} />
                        </div>
                        <Form
                            form={infoForm}
                            name="control"
                            className="form"
                            style={{ maxWidth: '100%' }}
                            onFinish={onFinish}
                            initialValues={userInfo}
                        >
                            <Form.Item className="form-item" name="username" label={<div className="label">姓名</div>}>
                                <Input placeholder={userInfo.username} type="text" maxLength={11} autoComplete="off" />
                            </Form.Item>
                            <Form.Item className="form-item" name="phoneNumber" label={<div className="label">绑定手机</div>}>
                                <Input placeholder={userInfo.phoneNumber.toString()} type="tel" maxLength={11} autoComplete="off" />
                            </Form.Item>
                            <Form.Item className="form-item" name="email" label={<div className="label">绑定邮箱</div>}>
                                <Input placeholder={userInfo.email.toString()} type="tel" maxLength={11} autoComplete="off" />
                            </Form.Item>


                            <div className="des">
                                <div className="label">注册时间：</div>
                                {formatDateTime(userInfo.registrationTime)}
                            </div>
                            <div className="des"><div className="label">上次登陆时间：</div>{formatDateTime(userInfo.lastLoginTime)} </div>
                            <Button type='primary' className="save" htmlType="submit">保存</Button>
                        </Form>
                    </div>
                );
            case '1':
                console.log('order', orderList);
                return (
                    <div className="order-panel">
                        <Modal
                            className="order-modal-box"
                            title="评价"
                            
                            centered
                            open={openOrder}
                            onOk={async () => {
                               
                                const {rating = 5, comment} = reviewForm.getFieldsValue(['rating', 'comment'])
                               
                                const info = await axios.post(Api.createReviews, {
                                   productId: record?.productId,
                                   userId: userInfo.userId,
                                   rating,
                                   comment
                                });
                                if(info.data) {
                                    message.success(info.data.message);
                                    setOpenOrder(false);
                                    reviewForm.resetFields();
                                }
                            }}
                            onCancel={() => setOpenOrder(false)}
                            width={600}
                            getContainer={false}
                        >
                            {
                                record
                                    ?
                                    <>
                                        <div className="order-modal">
                                            <a href="/Member/Order/Detail?orderid=236745204" className="order-s">
                                                <img src={record!.mainImg} alt="" />
                                                <div className="order-name">{record!.name}</div>
                                            </a>
                                            <div className="order-money">
                                                <div className="order-money-num">¥{record!.unitPrice}</div>
                                                <div className="order-num">共{record!.quantity}件</div>
                                            </div>
                                        </div>
                                        <Form form={reviewForm} >
                                            <Form.Item name='rating' required label='请评分'>
                                                <Select defaultValue={5} options={
                                                    [
                                                        {
                                                            label: '5分',
                                                            value: 5
                                                        },
                                                        {
                                                            label: '4分',
                                                            value: 4
                                                        },
                                                        {
                                                            label: '3分',
                                                            value: 3
                                                        },
                                                        {
                                                            label: '2分',
                                                            value: 2
                                                        },
                                                        {
                                                            label: '1分',
                                                            value: 1
                                                        },
                                                    ]
                                                }></Select>

                                            </Form.Item>
                                            <Form.Item name='comment' required label='好评哦'>
                                                <Input.TextArea placeholder="请写下您的评价" />
                                            </Form.Item>
                                        </Form>
                                    </>
                                    : null
                            }
                        </Modal>
                        <div className="bd">
                            {
                                !orderList.length
                                    ? <div className="no-order">暂无订单</div>
                                    : orderList.map((order, i) => {
                                        const oinfo = formatStatus(order.orderStatus, 'order');
                                        return (<div className="order-info" key={`order-${i}`}>
                                            <div className="order-header">
                                                <div>
                                                    <span>订单号:{order.orderNo} </span>
                                                    <span>下单时间:{formatDateTime(order.orderDate.toString())} </span>
                                                    <span >订单状态:<i style={{ color: oinfo.color }}>{oinfo.text}</i> </span>


                                                    <span className="orderid">购买人: {order.buyUserName}</span>
                                                </div>


                                            </div>
                                            {
                                                order.orderList.map((d, i) => {
                                                    const info = formatStatus(order.deliveryStatus, 'delivery');
                                                    return (
                                                        <div className="order-main" key={`qua${i}`}>
                                                            <a href="/Member/Order/Detail?orderid=236745204" className="order-s">
                                                                <img src={d.mainImg} alt="" />
                                                                <div className="order-name">{d.name}</div>
                                                            </a>
                                                            <div className="order-status" style={{ color: info.color }}>{info.text}</div>
                                                            <div className="order-money">
                                                                <div className="order-money-num">¥{d.unitPrice}</div>
                                                                <div className="order-num">共{d.quantity}件</div>
                                                            </div>
                                                            <div className="order-button" onClick={() => { setRecord(d), setTimeout(() => { setOpenOrder(true) }) }}>
                                                                评论
                                                            </div>
                                                            <div className="order-button">
                                                                删除<img className="delete" src="//img02.hua.com/pc/personal_center_new/order-delete.png" alt="" />
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }
                                            <div className="order-bottom">
                                                <div>
                                                    总金额：{order.totalPrice}
                                                </div>
                                                <div className="btn">{order.orderStatus === OrderStatus.Completed ? '再次购买' : '联系客服'}</div>
                                            </div>
                                        </div>)
                                    })
                            }

                        </div>

                        <div className="digg">

                        </div>
                    </div>
                );
            case '2':

                return (
                    <div className="address-wrap">
                        <CreateAddressModal initiaData={initialValues} showModal={showModal} setShowModal={setShowModal} />
                        <div className="address-add">
                            <div className="add-address" onClick={() => { if (userAddressList.length >= 50) { message.warning('已创建50个地址') } else { setShowModal(true) } }}>新增收货地址</div>
                            <span className="address-sub">您已创建{userAddressList.length}个收货地址，最多可建50个</span>
                        </div>
                        {
                            userAddressList.length
                                ? <table>
                                    <thead>
                                        <tr>
                                            <th className="consignee">收货人</th>
                                            <th className="shipping">收货地址</th>
                                            <th className="phone">联系电话</th>
                                            <th>操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            userAddressList.map((d, i) => {
                                                return (
                                                    <tr className="address-info" key={i}>
                                                        <th className="consignee">{d.recipientName}</th>
                                                        <th className="shipping" >{d.province}{d.city}{d.district}{d.streetAddress}</th>
                                                        <th className="phone">{d.phoneNumber}</th>
                                                        <th className="control">
                                                            <div onClick={() => { updateAddress(d) }}>
                                                                <img className="address-icon" src="https://img02.hua.com/pc/Images/2021new/address-edit.png" alt="" />
                                                                修改
                                                            </div>
                                                            <div onClick={() => { deleteAddress(d) }}>
                                                                <img className="address-icon" src="https://img02.hua.com/pc/Images/2021new/address-del.png" alt="" />
                                                                删除
                                                            </div>
                                                            {
                                                                d.isDefault
                                                                    ? <div style={{ width: '100px' }}>默认地址</div>
                                                                    : <div style={{ width: '100px' }} onClick={() => { setDefault(d) }}>设为默认地址</div>
                                                            }

                                                        </th>
                                                    </tr>
                                                );
                                            })
                                        }


                                    </tbody>
                                </table>
                                : <div>暂无地址，快去创建吧~</div>
                        }

                    </div>
                );
            case '3':
                return (
                    <div style={{ maxWidth: 300, marginTop: 40 }}>
                        <Form
                            form={passWordForm}
                            name="password"
                            className="form"
                            style={{ maxWidth: '100%' }}
                            onFinish={async (value) => {
                                if (userInfo.password !== value.oldpassword) {
                                    message.error('旧密码错误')
                                    return;
                                }
                                if (value.newPassword !== value.secordPassword) {
                                    message.error('两次密码不一致')
                                }
                                await actions.use.upDateUserInfo({ password: value.newPassword });
                                actions.use.setState({
                                    userInfo: undefined,
                                    isLogin: false
                                })
                                history('/login')
                                passWordForm.resetFields();
                            }}
                            initialValues={{ userInfo }}
                        >
                            <Form.Item className="form-item" required name="oldpassword" label={<div className="label">旧密码</div>}>
                                <Input type='password' autoComplete="off" />
                            </Form.Item>
                            <Form.Item className="form-item" required name="newPassword" label={<div className="label">新密码</div>}>
                                <Input type='password' autoComplete="off" />
                            </Form.Item>
                            <Form.Item className="form-item" required name="secordPassword" label={<div className="label">再次输入新密码</div>}>
                                <Input type='password' autoComplete="off" />
                            </Form.Item>

                            <Button type='primary' className="save" htmlType="submit">确定修改</Button>
                        </Form>
                    </div>
                );
            default:
                return <div />;

        }

    }
    return (

        <div className="center-box" style={{ background: '#F3F5F7' }}>
            <Header />
            <div className="main">
                <Layout className="layout">
                    <Sider
                        className='left'
                        breakpoint="lg"
                        collapsedWidth="0"
                        onBreakpoint={(broken) => {
                            console.log(broken);
                        }}
                        onCollapse={(collapsed, type) => {
                            console.log(collapsed, type);
                        }}
                    >
                        <div className="demo-logo-vertical" />
                        <Menu theme="light" mode="inline" className="menu" onClick={(item) => { menuClick(item) }} defaultSelectedKeys={["0"]} items={items} />
                    </Sider>
                    <Layout>
                        <Content>
                            <div
                                style={{
                                    padding: 24,
                                    minHeight: 360,
                                    background: '#FFF',
                                    borderRadius: 20,
                                }}
                            >
                                {
                                    getTitle()
                                }
                                {
                                    getContent()
                                }

                            </div>

                        </Content>

                    </Layout>
                </Layout>
            </div>
        </div>
    );
}

export default UserCenter;