import AppContainer from '../components/shared/container'
import { Card, Table, TableProps, Tag } from 'antd'
import { OrderDataResponse } from '../interfaces/orderData'
import { useContext } from 'react'
import { CryptoContext } from '../context/crypto.context'

const Monitor = () => {
    const { orders, loading } = useContext(CryptoContext)

    const columns: TableProps<OrderDataResponse>['columns'] = [
        {
            title: 'Side',
            dataIndex: 'order',
            key: 'order',
            render: (_, { SIDE }) => (
                <Tag color={SIDE === 1 ? 'green' : 'red'}>
                    {SIDE === 1 ? 'BUY' : 'SELL'}
                </Tag>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'P',
            key: 'price',
            render: (_, { P }) => (P ? `$${P}` : 0),
        },
        { title: 'Quantity', dataIndex: 'Q', key: 'quantity' },
        {
            title: 'Time & Date',
            dataIndex: 'REPORTEDNS',
            key: 'timestamp',
            render: (_, { REPORTEDNS }) => (
                <p>{new Date(REPORTEDNS / 1000000).toLocaleString()}</p>
            ),
        },
    ]

    return (
        <AppContainer>
            <Card className="border border-primaryColor">
                <h1 className="text-primaryColor text-lg font-medium">
                    Monitor
                </h1>
                <br />
                <Table
                    columns={columns}
                    loading={loading}
                    pagination={false}
                    dataSource={orders}
                />
            </Card>
        </AppContainer>
    )
}

export default Monitor
