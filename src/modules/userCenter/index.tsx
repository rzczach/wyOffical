/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from "../../component/Header";

import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, Checkbox, Form, Input, Row, message, Button } from 'antd';

import './style.scss';
import React, { useEffect, useState } from "react";
import { actions, useSelector } from "../../store/reduxMini";
import CreateAddressModal from "../../component/CreateAddressModal";


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
    const formatDateTime = (dateTimeString: string) => {
        const dateTime = new Date(dateTimeString);
        const year = dateTime.getFullYear();
        const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
        const day = dateTime.getDate().toString().padStart(2, '0');
        const hours = dateTime.getHours().toString().padStart(2, '0');
        const minutes = dateTime.getMinutes().toString().padStart(2, '0');
        const seconds = dateTime.getSeconds().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    const { userInfo, userAddressList } = useSelector((state: State) => {
        return {
            userInfo: state.use.userInfo,
            userAddressList: state.use.userAddressList
        }
    })
    const [form] = Form.useForm();
    const [keys, setKey] = useState('0');
    const menuClick = (item: any) => {
        setKey(item.key)
    }
    const getTitle = () => {

        return <div className="title">{items[Number(keys)].label}</div>;

    }
    const [showModal, setShowModal] = useState(false);
    const [initialValues, setInitialValues] = useState(undefined);
    useEffect(() => {
        async function getData() {
            await actions.use.getAddress();
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
    const getContent = () => {
        console.log('ke', keys);
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
                            form={form}
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
                return (
                    <div>1</div>
                );
            case '2':
                return (
                    <div className="address-wrap">
                        <CreateAddressModal initiaData={initialValues} showModal={showModal} setShowModal={setShowModal} />
                        <div className="address-add">
                            <div className="add-address" onClick={() => { if (userAddressList.length >= 50) { message.warning('已创建50个地址') } else { setShowModal(true) } }}>新增收货地址</div>
                            <span className="address-sub">您已创建{userAddressList.length}个收货地址，最多可建50个</span>
                        </div>
                        <table>
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
                    </div>
                );
            case '3':
                return (
                    <div style={{ maxWidth: 300, marginTop: 40 }}>
                        <Form
                            form={form}
                            name="password"
                            className="form"
                            style={{ maxWidth: '100%' }}
                            onFinish={async (value) => {
                                console.log('value', value);
                                console.log('userInfo', userInfo);
                                console.log('userInfo11', userInfo.password === value.oldpassword);
                                console.log('userInfo--', value.newPassword === value.secordPassword);
                                if (userInfo.password !== value.oldpassword) {
                                    message.error('旧密码错误')
                                    return;
                                }
                                if (value.newPassword !== value.secordPassword) {
                                    message.error('两次密码不一致')
                                }
                                await actions.use.upDateUserInfo({ password: value.newPassword });
                            }}
                            initialValues={userInfo}
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