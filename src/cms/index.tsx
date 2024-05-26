import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import CmsLogin from './CmsLogin';
import { actions, useSelector } from '../store/reduxMini';
import UserList from './UserList';
import OrderLlist from './OrderList';

const { Header, Sider, Content } = Layout;

const Cms: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {isLogin, userInfo } = useSelector(state => state.cms);
    const [key, setKey] = useState('1-1')
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
   
    if (!isLogin) {
        return <CmsLogin />
    }
    const getContent = () => {
        switch (key) {
            case '1':
                return <div>商品管理系统</div>;
            case '2-1':
                return <UserList/>;
            case '2-2':
                return <div>用户地址管理</div>;
            case '3':
                return <OrderLlist />;
            case '4-1':
                return <div>管理员</div>;
            case '4-2':
                return <div>密码修改</div>;
            default:
                return <div>用户地址管理</div>;
        }
       
    }
    return (
        <Layout style={{height: '100vh'}}>
            <Header style={{ padding: '0 20px', color: '#FFF', background: 'rgba(23, 25, 42, 1)',alignItems: 'center', justifyContent: 'space-between', display: 'flex' }}>
                    <div className="demo-logo" style={{fontSize: '22px'}}> 欢迎使用鲜花管理系统</div>
                    {

                    }
                    <Button type='text' style={{color: '#FFF'}}>欢迎您：{userInfo.nickname}<Button style={{marginLeft: '20px'}} onClick={() => {actions.cms.setState({isLogin: false})}} type='dashed'>退出</Button></Button>
            </Header>
            <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed }>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onClick={(data) => {
                        setKey(data.key);
                    }}
                    items={[
                        {
                            key: '1',
                            icon: <VideoCameraOutlined />,
                            label: '商品管理系统',
                        },
                        {
                            key: '2',
                            icon: <UserOutlined />,
                            label: '用户管理系统',
                            children: [
                                {
                                    key: '2-1',
                                    icon: <VideoCameraOutlined />,
                                    label: '用户列表',
                                },
                                {
                                    key: '2-2',
                                    icon: <UploadOutlined />,
                                    label: '用户地址管理',
                                },
                            ],
                        },
                        {
                            key: '3',
                            icon: <VideoCameraOutlined />,
                            label: '订单管理系统',
                        },
                        {
                            key: '4',
                            icon: <UploadOutlined />,
                            label: '系统管理',
                            children: [
                                {
                                    key: '4-1',
                                    icon: <VideoCameraOutlined />,
                                    label: '管理员',
                                },
                                {
                                    key: '4-2',
                                    icon: <UploadOutlined />,
                                    label: '密码修改',
                                },
                            ],
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: '0 20px', background: colorBgContainer,alignItems: 'center', justifyContent: 'space-between', display: 'flex' }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        overflow: 'scroll'
                    }}
                >
                   {
                      
                       getContent() 
                   }
                </Content>
            </Layout>
            </Layout>
        </Layout>
    );
};

export default Cms;