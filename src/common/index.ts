import { OrderRules } from '../enums'
import { OrderDataResponse } from '../interfaces/orderData'

const checkOrderCategory = (order: OrderDataResponse) => {
    let category: OrderRules[] = []

    if (order.P < 50000 && order.REPORTEDNS) {
        category = [...category, OrderRules.CHEAP]
    }

    if (order.Q > 10 && order.REPORTEDNS) {
        category = [...category, OrderRules.SOLID]
    }

    if (order.P * order.Q > 1000000) {
        category = [...category, OrderRules.BIG_BIZNIS]
    }
    return category
}

export default { checkOrderCategory }
