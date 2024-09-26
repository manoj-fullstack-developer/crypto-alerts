import { Table } from 'antd'
import { OrderDataResponse } from '../../interfaces/orderData'
import { OrderRules } from '../../enums'

const AlertsTable = ({ data }: { data: OrderDataResponse[] }) => {
    const columns = [
        {
            title: 'Alert Message',
            dataIndex: 'alertMessage',
            render: (alertMessage: OrderRules[]) => {
                const filteredMessages = alertMessage.filter(
                    (x) => x && x.length > 0
                )
                return filteredMessages.length > 0
                    ? filteredMessages.join(', ')
                    : ''
            },
        },
        {
            title: 'Price',
            dataIndex: 'P',
            render: (price: number) => `$${price?.toFixed(2)}`,
        },
        {
            title: 'Quantity',
            dataIndex: 'Q',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            render: (total: number) => `$${total?.toFixed(2)}`,
        },
    ]

    const getRowClassName = (alertMessage: string) => {
        let className = ''

        if (alertMessage?.length === 1) {
            if (alertMessage === OrderRules.CHEAP) {
                className = 'cheap'
            } else if (alertMessage === OrderRules.SOLID) {
                className = 'solid'
            } else if (alertMessage === OrderRules.BIG_BIZNIS) {
                className = 'big_biznis'
            }
        }

        return className
    }

    return (
        <Table
            rowClassName={(record) =>
                getRowClassName(record?.alertMessage?.[0] ?? '')
            }
            pagination={false}
            dataSource={data}
            columns={columns}
        />
    )
}

export default AlertsTable
