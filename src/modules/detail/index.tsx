import { useEffect, useState } from "react";
import './style.scss'
import { testImg } from "../../assets/image";
import Header from "../../component/Header";
import { useLocation, useNavigate } from "react-router";
import { actions, useSelector } from "../../store/reduxMini";


const Detail = () => {

    const [activeIndex, setActiveIndex] = useState(0)
    const { productInfo } = useSelector((state: State) => (state.home));
    const { userInfo , isLogin} = useSelector((state: State) => (state.use));
    const arr = new Array(4).fill('');
    const tab = [
        { name: '商品详情', count: 0, },
        { name: '用户评价', count: 130 },
        { name: '常见问题', count: 0 },
        { name: '购物保障', count: 0 }
    ]
    const location = useLocation();
    const history = useNavigate();

    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get('id');
    useEffect(() => {

        if (productId) {
            actions.home.getProductInfo(productId!);
        }
    }, [productId])
    console.log('productInfo', productInfo);
    return (
        <div className="detail-wrap">
            <Header />
            <div className="detail-box">
                <div className="left">
                    <div className="current-img">
                        <img src={productInfo.mainImg} />
                    </div>
                    <div className="img-wrap">
                        {/* <div className="img-item">
                            {
                                arr.map((d, i) => {
                                    return (
                                        <img key={i} src={testImg} />
                                    );
                                })
                            }
                        </div> */}
                    </div>
                </div>
                <div className="right">
                    <div className="title">{productInfo.name}</div>
                    <div className="price">
                        <div className="top-price">
                            售价：<span className="color">￥{productInfo.price}</span> <span className="line-price">￥{productInfo.originaPrice}</span>
                        </div>
                        <div className="sale">已售<span className="color">{productInfo.stemCount}</span>件</div>
                    </div>
                    <div className="detail-info">

                        <div className="info-item">
                            <div className="info-name">材料</div>
                            <div className="info-content">
                                {productInfo.materialText}
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-name">包装</div>
                            <div className="info-content">
                                {productInfo.packing}
                            </div>
                        </div>
                    </div>
                    <div className="send-info">
                        <div className="info-item">
                            <div className="info-name">配送说明</div>
                            <div className="info-content">
                                全国
                            </div>
                        </div>
                        {/* <div className="info-item">
                            <div className="info-name">配送至</div>
                            <div className="info-content">
                                河北省/保定市/博野县
                            </div>
                        </div> */}
                    </div>
                    <div className="btn-group">
                        <div className="btn-gourp-item addCart" onClick={async () => {
                            if (!isLogin) {
                                history('/login')
                            } else {
                                console.log('加入');
                                await actions.cart.createCart({productId: productInfo.productId})
                                
                            }
                        }}>加入股购物车</div>
                        <div className="btn-gourp-item buy" onClick={() => {
                            if (!isLogin) {
                                history('/login')
                            } else {
                                console.log('加入');
                            }
                        }}>立即购买</div>
                    </div>
                </div>
            </div>
            <div className="other">
                <div className="tab">
                    {
                        tab.map((d, i) => {
                            return (
                                <div className={`tab-item ${activeIndex === i ? 'active' : ''}`} key={`tab-${i}`} onClick={() => {
                                    setActiveIndex(i)
                                }}>
                                    {d.name}
                                    {
                                        d.count
                                            ? <span>{`(${d.count})`}</span>
                                            : null
                                    }

                                </div>
                            );
                        })
                    }

                </div>
                <div className="content">
                    这里是商品详情
                    这里是商品详情
                    这里是商品详情
                </div>
            </div>
        </div>
    )

}


export default Detail