import api from "../api/axiosConfig";



// =====================================================
// GET PRODUCT VARIANTS
// =====================================================

export const getVariantsByProductId =
    async (productId) => {

        const res = await api.get(

            `/variants?productId=${productId}`
        );

        return res.data.data;
    };