
import React from 'react';
import './style.scss';
import Nav from '../../component/Nav';
import { Button } from 'antd';
// 定义登录组件
class Login extends React.PureComponent {
  state = {
    phone: '',
    verificationCode: '',
  }
  setPhone = (phone: string) => {
    this.setState({ phone });
  }
  setVerificationCode = (verificationCode: string) => {
    this.setState({ verificationCode });
  }
  handleLogin = () => {
    const { phone, verificationCode } = this.state;
    console.log(phone);
    console.log(verificationCode);
  }
  render() {
    const { phone, verificationCode } = this.state;
    return (
      <div className="login-container">
        <Nav />
        <div className="login-container">
          <h2>欢迎来到鲜花网站</h2>
          <div className="input-group">
            <label htmlFor="phone">手机号：</label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => this.setPhone(e.target.value)}
              placeholder="请输入您的手机号码"
            />
          </div>
          <div className="input-group">
            <label htmlFor="verificationCode">密码：</label>
            <input
              id="verificationCode"
              type="text"
              value={verificationCode}
              onChange={(e) => this.setVerificationCode(e.target.value)}
              placeholder="请输入收到的验证码"
            />
          </div>
          <Button onClick={this.handleLogin} className="login-btn">
            登 录
          </Button>
        </div>
      </div>
    );
  }
}
// 导出登录组件
export default Login;