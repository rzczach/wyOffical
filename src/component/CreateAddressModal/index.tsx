

import { LockOutlined, UserOutlined } from '@ant-design/icons';
// import './style.scss'
import { actions } from '../../store/reduxMini';
import { Checkbox, Form, Input,} from 'antd';

import AddressSelector from './AddressSelector';
import {
    ModalForm,
    ProFormSelect,
} from '@ant-design/pro-components';
import { UserAddressData } from '../../models/use';
import { useState } from 'react';

const CreateAddressModal = (props: {
    showModal: boolean;
    initiaData?: UserAddressData;
    setShowModal: (showModal: boolean) => void
    setUserAddress?: (a: UserAddressData) => void
}) => {
    const {showModal, setShowModal, setUserAddress, initiaData} = props;
    console.log('initialValues', initiaData);
    let ModalFormProps = {};
    if (initiaData) {
        ModalFormProps = {
            initialValues: {
                addressTitle: initiaData.addressTitle,
                isDefault: initiaData.isDefault,
                phoneNumber: initiaData.phoneNumber,
                recipientName: initiaData.recipientName,
                streetAddress: initiaData.streetAddress,
              
                address: {
                    province: initiaData.province,
                    city: initiaData.city,
                    area: initiaData.district,
                }
            }
        }
    }
    const [show, setShow] = useState(false);
    return (
        <ModalForm
            title="新增收货地址"
            open={showModal}
            {
                ...ModalFormProps
            }
            onOpenChange={() => { setShowModal(!showModal) }}
            modalProps={{ destroyOnClose: true }}
            onFinish={async (values) => {
                console.log('onFinish', values);
                const data = {
                    addressTitle: values.addressTitle,
                    isDefault: values.isDefault,
                    phoneNumber: values.phoneNumber,
                    recipientName: values.recipientName,
                    streetAddress: values.streetAddress,
                    province: values.address.province,
                    city: values.address.city,
                    district: values.address.area,
                }
                let a = undefined;
                if (initiaData) {
                    const newDate = {
                        ...data,
                        addressId: initiaData.addressId,
                    }
                    a = await actions.use.upDateAddress(newDate);
                } else {

                    a = await actions.use.createAddress(data);
                }
                setUserAddress && setUserAddress(a)
                setShowModal(!showModal)
            }}
        >

            <ProFormSelect
                width="xs"

                options={[
                    {
                        value: 1,
                        label: '家庭地址',
                    },
                    {
                        value: 2,
                        label: '公司地址',
                    },

                ]}
                name="addressTitle"
                label="地址分类"
            />
            <Form.Item
                name="recipientName"
                rules={[{ required: true, message: '收货人姓名' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} type='tel' placeholder="收货人姓名" />
            </Form.Item>
            <Form.Item
                name="phoneNumber"
                rules={[{ required: true, message: '请输入手机号' }]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="tel"
                    maxLength={11}
                    placeholder="请输入手机号"
                />
            </Form.Item>
            <Form.Item
                name="address"
                rules={[{ required: true, message: '请选择地址' }]}
            >
                {
                    initiaData && !show
                    ? <div onClick={() => {setShow(true)}}> 当前地址: {initiaData.province}{initiaData.city}{initiaData.district}{'(点击修改)'}</div>
                    : <AddressSelector onChange={() => { }} />
                }
               
            </Form.Item>
            <Form.Item
                name="streetAddress"
                rules={[{ required: true, message: '请输入详细地址,具体到门牌号' }]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="text"
                    placeholder="详细地址："
                />
            </Form.Item>

            <Form.Item name="isDefault" valuePropName="checked" noStyle>
                <Checkbox>设为默认地址</Checkbox>
            </Form.Item>


        </ModalForm>)
}


export default CreateAddressModal