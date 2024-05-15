/* eslint-disable react-refresh/only-export-components */

import './style.scss';
// import {  useNavigate } from 'react-router-dom';
import { actions, connect } from '../../store/reduxMini';
import React from 'react';
import { Layout, Button, Icon } from 'antd';
import { DownOutlined } from '@ant-design/icons'
import './style.scss';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import 'swiper/swiper.scss';
// import { testImg } from '../../assets/image';
import Nav from '../../component/Nav';

SwiperCore.use([Autoplay, Pagination])
const testImg = 'https://upyun.dinghuale.com/uploads/20200826/202008261130205022.jpg'


const mapState = (state: State) => ({
    count: state.home.count,
    userInfo: state.use.userInfo,
    productList: state.home.productList,

})
type Props = ReturnType<typeof mapState>

class App extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props)
        actions.home.getProductList();
    }
    // navigate = useNavigate();
    render() {
        const { userInfo } = this.props;
        console.log('userInfo', userInfo);
        const nav = ['鲜花', '花束', '礼盒', '蛋糕', '花篮', '绿植', '周花', '520鲜花']
        return (
            <div className='home-box'>
                <div className='header'>
                    <Nav />
                    <div className='containner'>

                        <div className='nav-classify'>
                            全部商品
                            {/* <DownOutlined color='#FFF' style={{ fontSize: 20 }} /> */}
                        </div>
                        {
                            nav.map((d, i) => {
                                return (
                                    <div key={i} className='nav-title'>{d}</div>
                                );
                            })
                        }

                    </div>
                </div>

                <section className='top-banner'>
                    <Swiper
                        className='swiper'
                        direction='horizontal'
                        loop
                        slidesPerView={1}
                        autoplay
                        pagination
                    >
                        <SwiperSlide className='slide'>
                            <img src="https://upyun.dinghuale.com/uploads/20210426/202104261423579213.jpg" alt="" />
                        </SwiperSlide>
                        <SwiperSlide className='slide'>
                            <img src="https://upyun.dinghuale.com/uploads/20240512/202405122037457545.jpg" alt="" />
                        </SwiperSlide>
                        <SwiperSlide className='slide'>
                            <img src="https://upyun.dinghuale.com/uploads/20201229/202012291153442076.jpg" alt="" />
                        </SwiperSlide>
                        <SwiperSlide className='slide'>
                            <img src="https://upyun.dinghuale.com/uploads/20201229/202012291153442076.jpg" alt="" />
                        </SwiperSlide>
                        <SwiperSlide className='slide'>
                            <img src="https://upyun.dinghuale.com/uploads/20240512/202405122037457545.jpg" alt="" />
                        </SwiperSlide>
                    </Swiper>
                </section>
                <div className='containner-adver'>
                    {[
                        {
                            url: 'https://upyun.dinghuale.com/uploads/images/nav1.png',
                            title: '知名鲜花电商',
                            subTitle: '权威认证企业，深受用户喜爱',
                        },
                        {
                            url: 'https://upyun.dinghuale.com/uploads/images/nav2.png',
                            title: '品牌保证 口碑真实',
                            subTitle: '累计好评50w+条',
                        },
                        {
                            url: 'https://upyun.dinghuale.com/uploads/images/nav3.png',
                            title: '鲜花实拍秀展示',
                            subTitle: '敢展示派送前实拍的鲜花网',
                        },
                        {
                            url: 'https://upyun.dinghuale.com/uploads/images/nav4.png',
                            title: '快至1小时送达',
                            subTitle: '全国连锁，实时制作',
                        },
                        {
                            url: 'https://upyun.dinghuale.com/uploads/images/nav5.png',
                            title: '退赔承诺',
                            subTitle: '值得信赖的售后服务保障',
                        },
                    ].map((d, i) => {
                        return (
                            <div className="adver-item" key={`adver${i}`}>
                                <div className="adver-item-img">
                                    <img src={d.url} alt="" />
                                </div>
                                <p className="adver-item-title">{d.title}</p>
                                <p className="adver-subtitle">{d.subTitle}</p>
                            </div>
                        );
                    })}
                </div>
                <div className='flower-title'>鲜花列表</div>
                <section className='product-list'>
                    {
                        this.props.productList.map((d, i) => {
                            return (
                                <div className='item' key={i} >
                                    <img className='item-img' src={d.mainImg} />
                                    <div className='name'>{d.name}</div>
                                    <div className='box'>
                                        <div className='price'>{d.price}</div>
                                        <p className='sale'>已售 {d.stemCount || 200} 件</p>
                                    </div>

                                </div>

                            );
                        })
                    }


                </section>
            </div>
        )
    }
}

export default connect(mapState)(App);
