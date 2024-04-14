
import { Table } from 'antd';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
const orderMock = [
    {
        "order_id": "OD001",
        "user_id": "user-001",
        "order_status": "待付款",
        "order_date": "2022-05-20T10:00:00Z",
        "delivery_address": "上海市浦东新区花海大道1号",
        "total_amount": 298.00,
        "payment_method": "支付宝",
        "items": [
            {
                "product_id": "PRD001",
                "product_name": "玫瑰花束礼盒",
                "quantity": 1,
                "unit_price": 198.00,
                "img_url": "https://example.com/images/product1.jpg"
            },
            {
                "product_id": "PRD003",
                "product_name": "满天星花束",
                "quantity": 2,
                "unit_price": 50.00,
                "img_url": "https://example.com/images/product3.jpg"
            }
        ],
        "coupon_used": null,
        "discount_amount": 0.00,
        "shipping_fee": 20.00,
        "actual_payment": 298.00,
        "expected_delivery_date": "2022-05-21",
        "delivery_status": "未发货",
        "remarks": ""
    },
    {
        "order_id": "OD002",
        "user_id": "user-002",
        "order_status": "已支付",
        "order_date": "2022-06-01T14:30:00Z",
        "delivery_address": "北京市朝阳区花香路99号",
        "total_amount": 350.00,
        "payment_method": "微信支付",
        "items": [
            {
                "product_id": "PRD002",
                "product_name": "向日葵花篮",
                "quantity": 1,
                "unit_price": 250.00,
                "img_url": "https://example.com/images/product2.jpg"
            },
            {
                "product_id": "PRD004",
                "product_name": "百合花束",
                "quantity": 1,
                "unit_price": 100.00,
                "img_url": "https://example.com/images/product4.jpg"
            }
        ],
        "coupon_used": "COUPON001",
        "discount_amount": 100.00,
        "shipping_fee": 0.00,
        "actual_payment": 250.00,
        "expected_delivery_date": "2022-06-02",
        "delivery_status": "已发货",
        "remarks": "要求上午送达"
    },
    // 更多订单数据...
]
const columns = [
    {
        title: '订单ID',
        dataIndex: 'order_id',
        key: 'order_id',
        sorter: (a, b) => a.order_id.localeCompare(b.order_id),
    },
    {
        title: '用户ID',
        dataIndex: 'user_id',
        key: 'user_id',
        render: (text) => <Link to={`/users/${text}`}>{text}</Link>, // 假设有个跳转到用户详情页的链接
    },
    {
        title: '订单状态',
        dataIndex: 'order_status',
        key: 'order_status',
    },
    {
        title: '下单时间',
        dataIndex: 'order_date',
        key: 'order_date',
        render: (text) => moment(text).format('YYYY-MM-DD HH:mm'), // 假设使用moment.js格式化日期
    },
    {
        title: '配送地址',
        dataIndex: 'delivery_address',
        key: 'delivery_address',
    },
    {
        title: '商品总金额',
        dataIndex: 'total_amount',
        key: 'total_amount',
        render: (text) => `￥${text.toFixed(2)}`,
    },
    {
        title: '支付方式',
        dataIndex: 'payment_method',
        key: 'payment_method',
    },
    {
        title: '商品详情',
        dataIndex: 'items',
        key: 'items',
        render: (items) => (
            <ul>
                {items.map((item, index) => (
                    <li key={`${item.product_id}-${index}`}>
                        {`${item.product_name} x ${item.quantity} （￥${(item.unit_price * item.quantity).toFixed(2)}）`}
                        <img src={item.img_url} alt={item.product_name} style={{ maxWidth: '50px', maxHeight: '50px' }} />
                    </li>
                ))}
            </ul>
        ),
    },
    {
        title: '优惠券抵扣',
        dataIndex: 'discount_amount',
        key: 'discount_amount',
        render: (text) => `￥-${text.toFixed(2)}`,
    },
    {
        title: '运费',
        dataIndex: 'shipping_fee',
        key: 'shipping_fee',
        render: (text) => `￥${text.toFixed(2)}`,
    },
    {
        title: '实付金额',
        dataIndex: 'actual_payment',
        key: 'actual_payment',
        render: (text) => `￥${text.toFixed(2)}`,
    },
    {
        title: '预计配送日期',
        dataIndex: 'expected_delivery_date',
        key: 'expected_delivery_date',
    },
    {
        title: '配送状态',
        dataIndex: 'delivery_status',
        key: 'delivery_status',
    },
    {
        title: '备注',
        dataIndex: 'remarks',
        key: 'remarks',
    },
];
const OrderLlist = () => {
    return (
        <div>
            <Table dataSource={orderMock} columns={columns} />
        </div>
    );
}

export default OrderLlist;