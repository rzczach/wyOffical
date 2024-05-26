
import React, { useState } from 'react';
import './style.scss';
import { Link, useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Nav from '../../component/Nav';
import { Button, Checkbox, Col, Form, Input, Row, Select, message } from 'antd';
import { actions } from '../../store/reduxMini';
const PhoneLogin = (props: { onChange: () => void }) => {
    const history = useNavigate();
    const [loginNum, setLoginNum] = useState(0);
    const onFinish = async (data: {
        phoneNumber: number;
        password: number;
    }) => {
        if (data.phoneNumber && data.password) {
            const isLogin = await actions.use.login(data)
            if (isLogin) {
                history('/')
            }
        }
    }
    return (
        <div className='login-wrap'>
            <div className='login-type'>
                {
                    ['账号登录', '验证码登录'].map((d, i) => {
                        return (
                            <div key={i} onClick={() => { setLoginNum(i) }} className={loginNum === i ? 'active' : ''}>{d}</div>
                        );
                    })
                }

            </div>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="phoneNumber"
                    rules={[{ required: true, message: '请输入手机号' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} type='tel' maxLength={13} placeholder="手机号" />
                </Form.Item>
                {
                    loginNum === 0
                        ? <Form.Item
                            name="password"
                            rules={[{ required: true, message: '请输入密码' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        : <Form.Item>
                            <Row gutter={12}>
                                <Col span={14}>
                                    <Form.Item
                                        name="captcha"
                                        noStyle
                                        rules={[{ required: true, message: 'Please input the captcha you got!' }]}
                                    >
                                        <Input
                                            prefix={<LockOutlined className="site-form-item-icon" />}
                                            type="captcha"
                                            placeholder="验证码"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Button>获取验证码</Button>
                                </Col>
                            </Row>
                        </Form.Item>
                }
                {
                    !loginNum
                        ? <Form.Item>
                            <a className="login-form-forgot" href="">
                                忘记密码
                            </a>
                        </Form.Item>
                        : null
                }

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-btn">
                        登录
                    </Button>
                    {/* 还没有账号？ <Link to={'/cmsRegister?from=cms'} >去注册</Link> */}
                    <Row align='middle' style={{ marginTop: 20 }}>
                        还没有账号去
                        <Button onClick={() => {
                            props.onChange();
                            // history(`/register`);
                        }} type='text' style={{ color: 'blue' }}>
                            注册
                        </Button>
                    </Row>
                </Form.Item>
            </Form>
        </div>
    );
}
const { Option } = Select;
const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }}>
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
        </Select>
    </Form.Item>
);
// 定义登录组件
const Login = () => {
    const searchParams = new URLSearchParams(location.search);
    const from = searchParams.get('from');
    const [userPhone, setUse] = useState(!from);
    // const history = useNavigate();
    const [form] = Form.useForm();
    const onFinish = async (values: any) => {
        const { username, phoneNumber, email, password } = values;
        const isSuccess = await actions.use.register({
            username: username || phoneNumber,
            phoneNumber, email, password,
        });
        if (isSuccess) {
            setUse(true)
        }
    };
    return (
        <div className="login-container">
            <Nav />

            <div className="login-box">
                {
                    userPhone
                        ? <PhoneLogin onChange={() => { setUse(false) }} />
                        : <div >
                            <Form
                                className='register-wrap'
                                form={form}
                                name="register"
                                onFinish={onFinish}
                                initialValues={{ prefix: '86' }}
                                // style={{ minWidth: 600, paddingLeft: 40,paddingBottom: 40, alignItems: 'center'}}
                                scrollToFirstError
                            >
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            type: 'email',
                                            message: '请输入正确的邮箱地址',
                                        },
                                        {
                                            required: false,
                                            message: '请输入你的邮箱',
                                        },
                                    ]}
                                >
                                    <Input placeholder='邮箱' />
                                </Form.Item>
                                <Form.Item
                                    name="phoneNumber"

                                    rules={[{ required: true, message: '请输入手机号' }]}
                                >
                                    <Input placeholder='手机号' addonBefore={prefixSelector} style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item extra="确保您可以通过手机号进行登录">
                                    <Row gutter={8}>
                                        <Col span={12}>
                                            <Form.Item
                                                name="captcha"
                                                noStyle
                                                rules={[{ required: true, message: '请输入您获得的验证码' }]}
                                            >
                                                <Input placeholder='验证码' />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Button>获取验证码</Button>
                                        </Col>
                                    </Row>
                                </Form.Item>
                                <Form.Item
                                    name="password"

                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入密码',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input.Password placeholder='密码' />
                                </Form.Item>

                                <Form.Item
                                    name="confirm"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: '请确认密码',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('您输入的新密码不匹配！'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password placeholder='确认密码' />
                                </Form.Item>

                                <Form.Item
                                    name="username"
                                    rules={[{ required: false, message: 'Please input your nickname!', whitespace: true }]}
                                >
                                    <Input placeholder='昵称' />
                                </Form.Item>

                                <Form.Item
                                    name="agreement"
                                    valuePropName="checked"
                                    rules={[
                                        {
                                            validator: (_, value) =>
                                                value ? Promise.resolve() : Promise.reject(new Error('请勾选同意协议')),
                                        },
                                    ]}

                                >
                                    <Checkbox>
                                        我以阅读并同意 <a href="">用户服务协议</a>
                                    </Checkbox>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" style={{ width: '300px' }} htmlType="submit">
                                        注册
                                    </Button>
                                    <Button type="text" onClick={() => {
                                        setUse(true)
                                        // history(`/register`);
                                    }} style={{ color: 'blue' }}>
                                        账号登录
                                    </Button>
                                </Form.Item>

                            </Form>
                        </div>
                }

            </div>
        </div>
    );

}
// 导出登录组件
export default Login;