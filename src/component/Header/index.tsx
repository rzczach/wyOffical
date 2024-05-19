

import {  Flex } from 'antd';
import {  SearchOutlined } from '@ant-design/icons'
import './style.scss';
import 'swiper/swiper.scss';
import Nav from '../../component/Nav';
const Header = () => {
    const search = () => {
        console.log('搜索');
    }
    const nav = ['鲜花', '花束', '礼盒', '蛋糕', '花篮', '绿植', '周花', '520鲜花']
    return (
        <div className='header'>
            <Nav />
            <div className='searc-box'>
                <img className='logo' src='https://tcdn.kaishustory.com/kstory/activity_flow/image/340c3d31-4d63-40ce-956c-82b01b5e86ce_info_w=300_h=300_s=33813.png' />
                <Flex vertical>
                    <div className="input-group">
                        <input type="text" className="searchInput" placeholder="请输入要搜索的关键字" />
                        <SearchOutlined className='searchIcon' onClick={search}/>
                    </div>
                    <div className="search-keywords">
                        {
                            ['玫瑰', '蛋糕', '康乃馨', '百合'].map((item, i) => {
                                return (
                                    <div onClick={search} key={`search${i}`} className="words">{item}</div>
                                );
                            })
                        }
                    </div>
                </Flex>
            </div>
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
    );
}

export default Header;