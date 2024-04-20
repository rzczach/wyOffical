import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Layout, message } from 'antd';
import './style.scss'
import { actions } from '../../store/reduxMini';
import { Link } from 'react-router-dom';
const { Header, Content } = Layout;

const CmsLogin: React.FC = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        
        if (values.phone) {
            const userInfo = localStorage.getItem('cmsUserInfo');
            if (userInfo) {
                const useR = JSON.parse(userInfo);
               
                if (values.phone !== useR.phone.trim()) {
                    message.error('无此账号');
                } else {
                    actions.cms.setState({
                        isLogin: true,
                    })
                } 
            } else {
                message.error('暂无账号，请注册');
            }
            
        }
    };

    return (
        <Layout style={{height: '100vh'}}>
            <Header style={{background: `rgba(237, 250, 242, 1)`}}>
                欢迎使用鲜花管理系统
            </Header>
            <Content className='content'>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入手机号' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} type='tel' maxLength={13} placeholder="手机号" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>记住我</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            忘记密码
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                        还没有账号？ <Link to={'/cmsRegister?from=cms'} >去注册</Link>
                    </Form.Item>
                </Form>
            </Content>
        </Layout>
    );
};

export default CmsLogin;