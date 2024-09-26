import { createContext } from 'react'
import { OrderDataResponse } from '../interfaces/orderData'
import useCryptoSocket from '../hooks/useCryptoSocket'

export const CryptoContext = createContext<{
    orders: OrderDataResponse[]
    categorizedOrders: OrderDataResponse[]
    loading: boolean
    startStreaming?: () => void
    stopStreaming?: () => void
    isStreaming?: boolean
    lastMinuteOrders: OrderDataResponse[]
}>({ loading: false, orders: [], lastMinuteOrders: [], categorizedOrders: [] })

export const CryptoProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const {
        orders,
        loading,
        startStreaming,
        stopStreaming,
        isStreaming,
        categorizedOrders,
        lastMinuteOrders,
    } = useCryptoSocket()

    return (
        <CryptoContext.Provider
            value={{
                orders,
                loading,
                startStreaming,
                stopStreaming,
                isStreaming,
                categorizedOrders,
                lastMinuteOrders,
            }}
        >
            {children}
        </CryptoContext.Provider>
    )
}
