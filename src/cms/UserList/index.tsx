import { Space, Table } from "antd";

const mock = [
    {
        "id": "user-001",
        "username": "flowerlover001",
        "email": "flowerlover001@example.com",
        "phone": "13812345678",
        "role": "customer",
        "join_date": "2022-01-01",
        "last_login": "2022-05-15T10:30:00Z",
        "address": "上海市浦东新区花海大道1号",
        "积分": 200,
        "status": "active",
        "orders_count": 12,
        "favorites_count": 5
    },
    {
        "id": "user-002",
        "username": "rosesarered",
        "email": "rosesarered@example.com",
        "phone": "13998765432",
        "role": "vip",
        "join_date": "2021-11-11",
        "last_login": "2022-06-01T08:00:00Z",
        "address": "北京市朝阳区花香路99号",
        "积分": 500,
        "status": "active",
        "orders_count": 30,
        "favorites_count": 10
    },
    {
        "id": "user-003",
        "username": "lilywhite",
        "email": "lilywhite@example.com",
        "phone": "13655554444",
        "role": "customer",
        "join_date": "2022-02-14",
        "last_login": "2022-06-10T14:45:00Z",
        "address": "广州市白云区绿植街44号",
        "积分": 150,
        "status": "inactive",
        "orders_count": 2,
        "favorites_count": 3
    },
    // 更多用户数据...
]
const columns = [
    {
        title: '用户id',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: '用户昵称',
        dataIndex: 'username',
        key: 'username'
    },
    {
        title: '电子邮件',
        dataIndex: 'email',
        width: '50px',
        key: 'email'
    },
    {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone'
    },
    {
        title: '账号创建时间',
        dataIndex: 'join_date',
        key: 'join_date'
    },
    {
        title: '上次登陆',
        dataIndex: 'last_login',
        key: 'last_login'
    },
    {
        title: '默认地址',
        dataIndex: 'address',
        key: 'address'
    },
    {
        title: '订单数量',
        dataIndex: 'orders_count',
        key: 'orders_count'
    },
    {
        title: '收藏数量',
        dataIndex: 'favorites_count',
        key: 'favorites_count'
    },
    {
        title: '操作',
        key: 'action',
        render: (_) => (
            
          <Space size="middle">
            <a onClick={() => {console.log(_)}}>修改</a>
            <a onClick={() => {console.log(_)}}>删除</a>
          </Space>
        ),
      },
]
const UserList = () => {
    return (
        <div>
            <Table dataSource={mock} columns={columns} />
        </div>
    );
}

export default UserList;