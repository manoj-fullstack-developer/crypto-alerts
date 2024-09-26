import React, { useContext } from 'react'
import { Alert } from 'antd'
import AppContainer from '../components/shared/container'
import Loader from '../components/shared/loader'
import { CryptoContext } from '../context/crypto.context'
import { OrderRules } from '../enums'
import AlertsTable from '../components/alerts/table'

const Alerts: React.FC = () => {
    const { categorizedOrders, lastMinuteOrders, loading } =
        useContext(CryptoContext)

    const lastMinuteCounts = lastMinuteOrders.reduce(
        (acc, data) => {
            if (data.category.includes(OrderRules.CHEAP)) {
                acc.cheap++
            }

            if (data.category.includes(OrderRules.SOLID)) {
                acc.solid++
            }

            if (data.category.includes(OrderRules.BIG_BIZNIS)) {
                acc.big++
            }

            return acc
        },
        { cheap: 0, solid: 0, big: 0 }
    )

    if (loading) {
        return <Loader />
    }

    return (
        <AppContainer>
            <div className="flex space-x-4">
                <Alert
                    className="w-full"
                    message="Cheap Sell"
                    description={`Count - ${lastMinuteCounts.cheap}`}
                    type="warning"
                    showIcon
                />
                <Alert
                    className="w-full"
                    message="Solid Order"
                    description={`Count - ${lastMinuteCounts.solid}`}
                    type="info"
                    showIcon
                />
                <Alert
                    className="w-full"
                    message="Big Biznis"
                    description={`Count - ${lastMinuteCounts.big}`}
                    type="success"
                    showIcon
                />
            </div>
            <br />
            <AlertsTable
                data={categorizedOrders.map((order, index) => ({
                    ...order,
                    alertMessage: order.category,
                    price: order.P,
                    quantity: order.Q,
                    total: order.P * order.Q,
                    key: index,
                }))}
            />
        </AppContainer>
    )
}

export default Alerts
