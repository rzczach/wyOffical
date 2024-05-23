/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Row, Select } from 'antd';
import addressJson from './addressJson';

const { Option } = Select;
interface Pro {
    province: string; city: string, area: string
}
const AddressSelector = ({ onChange }) => {
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [area, setArea] = useState('');
    const [provinceText, setProvinceText] = useState('');
    const [cityText, setCityText] = useState('');
    const [areaText, setAreaText] = useState('');

    // 根据省份筛选城市
    const filteredCities = province
        ? addressJson.find((p: { value: string; }) => p.value === province)?.children || []
        : [];

    // 根据城市筛选区域
    const filteredAreas = city
        ? filteredCities.find((c: { value: string; }) => c.value === city)?.children || []
        : [];

    // 当省份改变时更新城市和区域
    const handleAddressChange = (field, value, valueText) => {
        switch (field) {
            case 'province':
                setProvince(value);
                setProvinceText(valueText)
                break;
            case 'city':
                setCity(value);
                setCityText(valueText)
                break;
            case 'area':
                setArea(value);
                setAreaText(valueText)
                break;
            default:
                break;
        }
        // 当任何一部分地址变化时，通知父组件


    };
    useEffect(() => {
        setCity('');
        setArea('');
    }, [province]);

    // 当城市改变时更新区域
    useEffect(() => {
        setArea('');
    }, [city]);

    return (
        <Row>
            <Select
                value={province}
                onChange={(value, other) => {
                    handleAddressChange('province', value, other.children);
                }}
            >
                <Option value="">请选择省份</Option>
                {addressJson.map((p) => (
                    <Option key={p.value} value={p.value}>
                        {p.label}
                    </Option>
                ))}
            </Select>

            <Select
                value={city}
                onChange={(value, other) => { handleAddressChange('city', value, other.children); }}
                disabled={!province}
            >
                <Option value="">请选择城市</Option>
                {filteredCities.map((c) => (
                    <Option key={c.value} value={c.value}>
                        {c.label}
                    </Option>
                ))}
            </Select>

            <Select
                value={area}
                onChange={(value, other) => { handleAddressChange('area', value, other.children); onChange({ province: provinceText, city: cityText, area: other.children }); }}
                disabled={!city}
            >
                <Option value="">请选择区县</Option>
                {filteredAreas.map((a) => (
                    <Option key={a.value} value={a.value}>
                        {a.label}
                    </Option>
                ))}
            </Select>
        </Row>
    );
};

export default AddressSelector;