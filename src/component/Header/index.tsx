

import { Flex, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import './style.scss';
import 'swiper/swiper.scss';
import Nav from '../../component/Nav';
import { FLOWERMATERIAL, nav } from '../../models/home';
import { useLocation, useNavigate } from 'react-router';
import { actions } from '../../store/reduxMini';
import { useState } from 'react';
// 创建一个映射表，方便从字符串映射到枚举值
const materialMap: { [key: string]: number } = {
    '玫瑰': FLOWERMATERIAL.meigui,
    '百合': FLOWERMATERIAL.baihe,
    '康乃馨': FLOWERMATERIAL.kangnaixin,
    '向日葵': FLOWERMATERIAL.xiangrikui,
    '满天星': FLOWERMATERIAL.mantianxing,
    '郁金香': FLOWERMATERIAL.yujinxiang,
    '菊花': FLOWERMATERIAL.juhua,
};
function matchFlowerMaterial(input: string): number | undefined {
    

    // 处理输入，进行模糊匹配
    const normalizedInput = input.trim().toLowerCase();
    for (const key in materialMap) {
        if (key.includes(normalizedInput)) {
            return materialMap[key];
        }
    }

    // 如果没有找到匹配的项，可以返回 other 的值或者 undefined
    return FLOWERMATERIAL.other;
}
const Header = () => {
    const [value, setValue] = useState('');
    const search = () => {
       
        if (value) {
            if (location.pathname !== '/list') {
                // 如果不是首页，则先跳转到首页
                history('/list');
            }
            const matchedValue = matchFlowerMaterial(value);
            actions.home.getProductListByMaterial(matchedValue!);
        } else {
            message.warning('请输入搜索内容')
        }
    }
    const history = useNavigate();
    const location = useLocation();
    const req = (index: number) => {
        if (location.pathname !== '/list') {
            // 如果不是首页，则先跳转到首页
            history('/list');
        }
        actions.home.getProductList(index)
    }
   
    return (
        <div className='header'>
            <Nav />
            <div className='searc-box'>
                <img className='logo' src='https://tcdn.kaishustory.com/kstory/activity_flow/image/340c3d31-4d63-40ce-956c-82b01b5e86ce_info_w=300_h=300_s=33813.png' />
                <Flex vertical>
                    <div className="input-group">
                        <input type="text" className="searchInput" value={value} placeholder="请输入要搜索的关键字" onChange={(e) => { setValue(e.target.value) }} />
                        <SearchOutlined className='searchIcon' onClick={search} />
                    </div>
                    <div className="search-keywords">
                        {
                            Object.keys(materialMap).map((item, i) => {
                                return (
                                    <div onClick={() => {setValue(item)} } key={`search${i}`} className="words">{item}</div>
                                );
                            })
                        }
                    </div>
                </Flex>
            </div>
            <div className='containner'>

                <div className='nav-classify' onClick={() => {
                    req(0);
                }}>
                    全部商品
                    {/* <DownOutlined color='#FFF' style={{ fontSize: 20 }} /> */}
                </div>
                {
                    nav.map((d, i) => {
                        return (
                            <div key={i} onClick={() => {
                                req(d.value)

                            }} className='nav-title'>{d.label}</div>
                        );
                    })
                }

            </div>
        </div>
    );
}

export default Header;