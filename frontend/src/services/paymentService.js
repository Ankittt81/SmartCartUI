import api from "../api/axiosConfig";



// ========================================
// INITIATE PAYMENT
// ========================================

export const initiatePayment =
    async (orderId) => {

        const res =
            await api.post(

                `/payments/initiate?orderId=${orderId}`
            );



        return res.data;
    };