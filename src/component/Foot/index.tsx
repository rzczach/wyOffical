import './style.scss';
const Foot = () => {
    return (
        <div className="footer">
            <div className="footer-top">
                <div className="container">
                    <div className="logo-img fl align-center">
                        <img src="https://upyun.dinghuale.com/uploads/images/logo.png" alt="" />
                    </div>
                    <div className="nav-module fl">
                        <div className="footer-module fl align-center">
                            <p>热门导航</p>
                            <div className="footer-nav">
                                <a href="/" target="_blank" className="footer-nav-item">网站首页</a>
                                <a href="/xianhua/yongtu/aiqingxianhua/23/1/-1/" target="_blank" className="footer-nav-item">爱情鲜花</a>
                                <a href="/search_order.html" target="_blank" className="footer-nav-item">订单查询</a>
                                <a href="/xianhua/1/-1/" target="_blank" className="footer-nav-item">全部商品</a>
                            </div>
                        </div>
                        <div className="footer-module footer-module1 fl align-center">
                            <p>客户服务</p>
                            <div>
                                <div className="footer-nav fl">
                                    <a href="/helpCenter.html?title=6" target="_blank" className="footer-nav-item">关于我们</a>
                                    <a href="/helpCenter.html?title=13" target="_blank" className="footer-nav-item">服务声明</a>
                                    <a href="/helpCenter.html?title=7" target="_blank" className="footer-nav-item">订花流程</a>
                                    <a href="/helpCenter.html?title=10" target="_blank" className="footer-nav-item">支付方式</a>

                                </div>
                                <div className="footer-nav fr">
                                    <a href="/helpCenter.html?title=8" target="_blank" className="footer-nav-item">配送说明</a>
                                    <a href="/helpCenter.html?title=9" target="_blank" className="footer-nav-item">售后服务</a>
                                    <a href="/helpCenter.html?title=11" target="_blank" className="footer-nav-item">隐私条款</a>
                                    <a href="/helpCenter.html?title=14" target="_blank" className="footer-nav-item">联系我们</a>
                                </div>
                            </div>
                        </div>

                        <div className="footer-module fl align-center">
                            <p>联系我们</p>
                            <div className="footer-nav">
                                <a href="javascript:;" className="footer-nav-item">意见反馈</a>
                                <a href="javascript:;" className="footer-nav-item">工作时间：07:00-23:00</a>
                                <a href="javascript:;" className="footer-nav-item">7*24小时在线订购</a>

                                <a href="javascript:;" className="footer-nav-item">全国热线：400-060-1520</a>
                            </div>
                        </div>
                    </div>
                    <div className="erweima fr align-center">
                        <div className="erweima-img">
                            <img src="https://cs.dinghuale.com/uploads/20200706/202007061732083685.jpg" alt="" />
                        </div>
                        <p className="text-color-9">扫码关注微信</p>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p className="text-color-9">Copyright©2020 &nbsp;成都勿忘我科技有限公司 &nbsp;<a href="https://beian.miit.gov.cn">蜀ICP备20016463号-2</a>&nbsp;  </p>
            </div>
        </div>
    );
}

export default Foot