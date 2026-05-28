import api from "../api/axiosConfig";



// ========================================
// GET MY ORDERS
// ========================================

export const getMyOrders =
    async () => {

        const res =
            await api.get(
                "/orders/my-orders"
            );



        return res.data;
    };



// ========================================
// GET ORDER BY ID
// ========================================

export const getOrderById =
    async (orderId) => {

        const response =
            await api.get(
                `/orders?orderId=${orderId}`
            );

        return response.data;
    };



// ========================================
// GET ORDER BY CHECKOUT ID
// ========================================

export const getOrderByCheckoutId =
    async (checkoutId) => {

        const res =
            await api.get(

                `/orders/checkout/${checkoutId}`
            );



        return res.data;
    };