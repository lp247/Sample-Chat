import {Order, SampleOrders} from "./orders";

// This function should in theory be way more sophisticated to be regarded as real chat bot functionality.
// In this case, however, time does not allow for that. Therefore simple string matching is used.
const parseOrderNumber = (question: string): number | undefined => {
    const matches = question.match(/#(\d+)/);
    if (!matches) {
        return undefined;
    }
    return parseInt(matches[1], 10);
};


const retrieveOrder = (orderNumber: number, orders: Order[]): Order | undefined => {
    return orders.find(order => order.ID === orderNumber);
};

const renderAddress = (order: Order): string => {
    const address = order.shippingAddress;
    return `${address.street}, ${address.zip} ${address.city}, ${address.country}`;
};

const explainOrder = (order: Order): string => {
    return `The sales order #${order.ID} is currently in status "${order.state}". The order will be sent to customer ${order.customerName} in ${renderAddress(order)}.`;
};

export const olderThanHalfYear = (orderDate: Date, queryDate: Date): boolean => {
    const halfYearAgo = new Date(queryDate);
    const modifiedOrderDate = new Date(orderDate);
    // set to middle of day to avoid overflowing dates due to daylight saving time
    modifiedOrderDate.setHours(13, 0, 0, 0);
    halfYearAgo.setHours(13, 0, 0, 0);
    halfYearAgo.setMonth(halfYearAgo.getMonth() - 6);
    // set to middle of day to remove shifts due to daylight saving time
    halfYearAgo.setHours(0, 0, 0, 0);
    if (orderDate.getTime() < halfYearAgo.getTime()) {
        return true;
    }
    return false;
};

export const answerInternal = (question: string, queryDate: Date, orders: Order[]): string => {
    const orderNumber = parseOrderNumber(question);
    if (!orderNumber) {
        return "Excuse me, I do not understand your question.";
    }
    const order = retrieveOrder(orderNumber, orders);
    if (!order) {
        return `There is no order with order number ${orderNumber}.`;
    }
    if (olderThanHalfYear(order.date, queryDate)) {
        return `Information about order #${order.ID} is no longer available.`;
    }
    return explainOrder(order);
};

export const answer = (question: string): string => {
    const queryDate = new Date();
    const orders = SampleOrders;
    return answerInternal(question, queryDate, orders);
};

