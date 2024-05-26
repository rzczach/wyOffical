import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Button,
    Checkbox,
    Col,
    Form,
    Input,
    Row,
    Select,
    Layout
} from 'antd';
import './style.scss'
import { actions } from '../../store/reduxMini';
const { Header, Content } = Layout;

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};


const CmsLogin: React.FC = () => {
    // const { from } = useParams();
    const location = useLocation();
    const history = useNavigate();
  
    const searchParams = new URLSearchParams(location.search);
    
    const from = searchParams.get('from');
   
    const [form] = Form.useForm();
   
    const onFinish = async (values: any) => { 
        if (from === 'qian') {
            await actions.use.setState({
               
                userInfo: values
            })
            localStorage.setItem('userInfo', JSON.stringify(values))
            history(-1);

        } else {
            await actions.cms.setState({
                userInfo: values
            })
            localStorage.setItem('cmsUserInfo', JSON.stringify(values))
            history(-1);

        }
        // actions.cms.setState({
        //     isLogin: true,
        //     userInfo: {
        //         nickname: '老板',
        //     }
        // })
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );


    return (
        <Layout style={{ height: '100vh', overflow: 'scroll',}}>
            <Header style={{ background: `rgba(237, 250, 242, 1)` }}>
                欢迎使用鲜花管理系统
            </Header>
            <Content className='content'>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
                    style={{ maxWidth: 600, marginLeft: '300px',  paddingBottom: 40, justifyContent: 'flex-start' }}
                    scrollToFirstError
                >
                    <Form.Item
                        name="email"
                        label="邮箱"
                        rules={[
                            {
                                type: 'email',
                                message: '请输入正确的邮箱地址',
                            },
                            {
                                required: true,
                                message: '请输入你的邮箱',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="手机号"
                        rules={[{ required: true, message: '请输入手机号' }]}
                    >
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item label="验证码" extra="确保您可以通过手机号进行登录">
                        <Row gutter={8}>
                            <Col span={12}>
                                <Form.Item
                                    name="captcha"
                                    noStyle
                                    rules={[{ required: true, message: 'Please input the captcha you got!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Button>获取验证码</Button>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="确认密码"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="nickname"
                        label="昵称"
                        tooltip="What do you want others to call you?"
                        rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>

                    

                    <Form.Item
                        name="intro"
                        label="简介"
                        rules={[{ required: false, message: 'Please input Intro' }]}
                    >
                        <Input.TextArea showCount maxLength={100} />
                    </Form.Item> 

                  

                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                            },
                        ]}
                        {...tailFormItemLayout}
                    >
                        <Checkbox>
                            我以阅读并同意 <a href="">用户服务协议</a>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" style={{width: '300px'}} htmlType="submit">
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </Layout>
    );
};

export default CmsLogin;