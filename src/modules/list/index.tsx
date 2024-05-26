/* eslint-disable react-refresh/only-export-components */

import { actions, connect, useSelector } from '../../store/reduxMini';
import React, { useEffect, useReducer } from 'react';
import './style.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import 'swiper/swiper.scss';
import Header from '../../component/Header';
import { useNavigate } from 'react-router';

SwiperCore.use([Autoplay, Pagination])


const List = () => {
    const { productList } = useSelector((state: State) => ({
        count: state.home.count,
        userInfo: state.use.userInfo,
        productList: state.home.productList,

    }));
    useEffect(() => {
        actions.home.getProductList(0);
    }, [])
    const history = useNavigate();

    return (
        <div className='home-box'>
            <Header />

           
           
            <div className='flower-title'>鲜花列表</div>
            {
                productList.length
                    ? <section className='product-list'>
                        {
                            productList.map((d, i) => {
                                return (
                                    <div className='item' key={i} onClick={() => { history(`/detail?id=${d.productId}`) }} >
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
                    : <div className='product-list'>暂无鲜花</div>
            }

        </div>
    )

}

export default List;
