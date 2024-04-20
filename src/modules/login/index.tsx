
import React, { useState } from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import Nav from '../../component/Nav';
import { Button, Row, message } from 'antd';
import { actions } from '../../store/reduxMini';
// 定义登录组件
const Login = () => {
const history = useNavigate();
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  
  
  const handleLogin = () => {
    if (phone && verificationCode) {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const useR = JSON.parse(userInfo);
            console.log('useR', useR);
            if (phone !== useR.phone.trim()) {
                message.error('无此账号');
            } else {
                actions.use.setState({
                    isLogin: true,
                })
                history(-1)
            } 
        } else {
            message.error('暂无账号，请注册');
        }
        
    }
}

    return (
      <div className="login-container">
        <Nav />
        <div className="login-container">
          <h2>欢迎来到鲜花网站</h2>
          <div className="input-group">
            <label htmlFor="phone">账号：</label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="请输入您的账号"
            />
          </div>
          <div className="input-group">
            <label htmlFor="verificationCode">密码：</label>
            <input
              id="verificationCode"
              type="password"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="请输入收到的验证码"
            />
          </div>
          <Button onClick={handleLogin} className="login-btn">
            登 录
          </Button>
          <Row align='middle'>
            还没有账号去
            <Button onClick={() => {
                history(`/CmsRegister/?from=qian`);
              
            }} type='text' style={{color: 'blue'}}>
                注册
            </Button>
          </Row>
        </div>
      </div>
    );
  
}
// 导出登录组件
export default Login;