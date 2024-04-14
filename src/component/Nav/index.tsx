import React from "react";
import './style.scss';
import { Link } from "react-router-dom";

export default class Nav extends React.PureComponent {
    render() {
        return (
            <div className="top-nav">
                <div className="top-nav-wrapper">
                    <ul className="top-nav-l">
                        <li className="menu">
                            网上花店系统
                        </li>
                    </ul>
                    <ul className="top-nav-r">
                        <Link to="/login">
                            <li className="menu login" id="LoginInfo">你好，请登录|注册</li>
                        </Link>
                        <li className="menu">
                            订单查询
                        </li>
                        <li className="pipe">|</li>
                        <li className="menu">
                            购物车
                        </li>
                        <Link to={'/cms'}>
                            <li className="menu">
                                cms
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        )
    }
}