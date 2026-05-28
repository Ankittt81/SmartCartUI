// src/services/cartService.js

import api from "../api/axiosConfig";



export const addItemToCart = async (variantId, quantity) => {

    const res = await api.post(

        "/cart/items",

        {
            variantId,
            quantity
        }
    );

    return res.data.data;
};



export const getCart = async () => {

    const res = await api.get(
        "/cart"
    );

    return res.data.data;
};



export const checkoutCart = async () => {

    const res = await api.get(
        "/cart/checkout"
    );

    return res.data.data;
};