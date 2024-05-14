
import './style.scss';
import { actions, useSelector } from "../../store/reduxMini";
import { Line } from './Line';
import { useNavigate } from 'react-router';
import { Modal } from 'antd';
import { useState } from 'react';

const Nav = () => {
    const { userInfo, isLogin } = useSelector((state: State) => (state.use))
    const [open, setOpen] = useState(false);
    const history = useNavigate();
    console.log('isLogin', isLogin);
    return (
        <>
            <div className="top-nav">
                <div className="top-nav-wrapper">
                    <ul className="top-nav-l">
                        <li className="menu">
                            hi 欢迎来订花乐
                        </li>
                    </ul>
                    <ul className="top-nav-r">
                        {
                            !isLogin ?
                                <li>
                                    <span className="login-text" onClick={() => {
                                        history('/login');
                                    }}>你好，请登录</span>
                                    <span className="fl text-color-logo align-center" onClick={() => {
                                         history('/login?from=1');
                                    }}>免费注册</span>
                                </li>
                                : <li className="menu login" id="LoginInfo" onClick={() => {
                                    setOpen(true)
                                }}>欢迎您{userInfo.username || ''}</li>

                        }
                        <Line />
                        <li className="menu">
                            订单查询
                        </li>
                        <Line />
                        <li className="menu">
                            购物车
                        </li>
                    </ul>
                </div>
            </div>
            <Modal
                title=""
                open={open}
                cancelText="取消"
                okText="确定"
                onOk={
                    () => {
                        setOpen(false);
                        actions.use.setState({
                            isLogin: false,
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            userInfo: {} as any,
                        });
                        history('/login');
                        localStorage.clear();
                        
                    }
                }
                onCancel={() => { console.log('取消'); setOpen(false); }}
            >
                <p>您确定退出当前账号吗？</p>
            </Modal>
            <div className="top-nav-place" />


        </>
    )
}
export default Nav;