/* eslint-disable react-refresh/only-export-components */

import './style.scss';
// import {  useNavigate } from 'react-router-dom';
import { actions, connect } from '../../store/reduxMini';
import React from 'react';
import { Layout, Button } from 'antd';
import './style.scss';
import { Link } from 'react-router-dom';
import { testImg } from '../../assets/image';
import Nav from '../../component/Nav';




const mapState = (state: State) => ({
    count: state.home.count,
    userInfo: state.use.userInfo,
})

class App extends React.PureComponent<ReturnType<typeof mapState>> {
    // navigate = useNavigate();
    render() {
        const { userInfo } = this.props;
        console.log('userInfo', userInfo);
        const arr = new Array(20).fill('');
        return (
            <div className='home-box'>
                <Nav />
                <div className='nav'>
                    <div className="nav-wrap">
                        <p>鲜花</p>
                        <p>首页</p>
                        <p>永生花</p>
                        <p>礼品</p>
                        <p>话语大全</p>
                        <p>设计师臻选</p>
                    </div>
                </div>
                <section className='top-banner'>
                    <div className='banner'>
                        <img src='//img02.hua.com/pc/Images/2017/ysh-top-banner.jpg' />
                    </div>
                </section>
                <section className='product-list'>
                    {
                        arr.map((d, i) => {
                            return (
                                <Link to='/detail' key={i} >
                                <div className='item' key={i} >
                                    <img className='item-img' src={testImg} />
                                    <div className='product-info'>
                                        <p className='promotion'>创意 畅销单品</p>
                                        <h5 className='name'>永生花/一鹿(路)有你永生花小夜灯</h5>
                                        <p className='desc'>永生花礼盒</p>
                                        <div className='box'>
                                            <div className='price'>298</div>
                                            <p className='sale'>已售 3590 件</p>
                                        </div>
                                    </div>
                                </div>
                                </Link>
                            );
                        })
                    }


                </section>
            </div>
        )
    }
}

export default connect(mapState)(App);
