import { useEffect, useRef, useState } from 'react'
import { OrderDataResponse } from '../interfaces/orderData'
import common from '../common'
import { v4 } from 'uuid'

const API_KEY = process.env.REACT_APP_CRYPTOCOMPARE_API_KEY

const useCryptoSocket = () => {
    const [orders, setOrders] = useState<OrderDataResponse[]>([])
    const [categorizedOrders, setCategorizedOrders] = useState<
        OrderDataResponse[]
    >([])
    const [lastMinuteOrders, setLastMinuteOrders] = useState<
        OrderDataResponse[]
    >([])
    const [loading, setLoading] = useState<boolean>(true)
    const [stream, setStream] = useState<boolean>(true)

    const wsRef = useRef<WebSocket | null>(null)

    const startStreaming = () => {
        setLoading(true)
        setStream(true)
    }

    const stopStreaming = () => {
        setStream(false)
    }

    useEffect(() => {
        const ws = new WebSocket(
            `wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`
        )

        wsRef.current = ws
        ws.onopen = () => {
            console.log('WebSocket connected')
            ws.send(
                JSON.stringify({
                    action: 'SubAdd',
                    subs: ['8~Binance~BTC~USDT'],
                })
            )
        }

        const handleMessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data)

            if (data && data.TYPE === '8') {
                const foundCat = common.checkOrderCategory(data)

                if (foundCat?.length > 0) {
                    setCategorizedOrders((prevOrders) => [
                        { ...data, category: foundCat },
                        ...prevOrders.slice(0, 499),
                    ])
                    setLastMinuteOrders((prevOrders) => [
                        { ...data, category: foundCat },
                        ...prevOrders.filter(
                            (order) =>
                                order.REPORTEDNS / 1000000 > Date.now() - 60000
                        ),
                    ])
                }

                setOrders((prevOrders) => [
                    { ...data, key: v4() },
                    ...prevOrders.slice(0, 499),
                ])
                setLoading(false)
            }
        }

        if (stream) {
            ws.onmessage = handleMessage
        }

        ws.onclose = (event) => {
          console.log(`WebSocket closed: Code = ${event.code}, Reason = ${event.reason}`);

            setTimeout(() => {
                wsRef.current = new WebSocket(
                    `wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`
                )
            }, 1000)
        }

        return () => {
            ws.close()
        }
    }, [stream])

    return {
        orders,
        loading,
        startStreaming,
        stopStreaming,
        isStreaming: stream,
        categorizedOrders,
        lastMinuteOrders,
    }
}

export default useCryptoSocket
