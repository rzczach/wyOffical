import React from "react";
import Nav from "../../component/Nav";
import './style.scss'
import { testImg } from "../../assets/image";


class Detail extends React.PureComponent {
    state = {
        activeIndex: 0,
    }

    render() {
        const arr = new Array(4).fill('');
        const tab = [
            {name: '商品详情', count: 0,},
            {name: '用户评价', count: 130},
            {name: '常见问题', count: 0},
            {name: '购物保障', count: 0}
        ]
        const {activeIndex} = this.state;
        return (
            <div className="detail-wrap">
                <Nav />
                <div className="detail-box">
                    <div className="left">
                        <div className="current-img">
                            <img src={testImg} />
                        </div>
                        <div className="img-wrap">
                            <div className="img-item">
                                {
                                    arr.map((d, i) => {
                                        return (
                                            <img key={i} src={testImg} />
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="title">心心相印心形永生花台灯/粉色</div>
                        <div className="price">
                            <div className="top-price">
                                售价：<span className="color">￥120</span> <span className="line-price">￥398</span>
                            </div>
                            <div className="sale">已售<span className="color">25</span>件</div>
                        </div>
                        <div className="detail-info">
                            <div className="info-item">
                                <div className="info-name">话语</div>
                                <div className="info-content">爱你不止三千遍</div>
                            </div>
                            <div className="info-item">
                                <div className="info-name">材料</div>
                                <div className="info-content">
                                    红玫瑰14枝<br />香槟玫瑰5枝<br />橙色多头泡泡3枝<br />喷泉草2枝<br />尤加利叶若干
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="info-name">包装</div>
                                <div className="info-content">
                                    英文守护爱情防水牛皮纸红色（浪漫唯爱2张，热恋1张，白色棉纸3张，红金色欧雅纸4张，圆心网酒红2张）红色烫金丝带，缎纱丝带酒红色蝴蝶结
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
                            <div className="info-item">
                                <div className="info-name">配送至</div>
                                <div className="info-content">
                                    河北省/保定市/博野县
                                </div>
                            </div>
                        </div>
                        <div className="btn-group">
                            <div className="btn-gourp-item addCart">加入股购物车</div>
                            <div className="btn-gourp-item buy">立即购买</div>
                        </div>
                    </div>
                </div>
                <div className="other">
                    <div className="tab">
                        {
                            tab.map((d, i) => {
                                return(
                                    <div className={`tab-item ${activeIndex===i ? 'active' :''}`} onClick={() => {
                                        this.setState({
                                            activeIndex: i
                                        })
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
}


export default Detail