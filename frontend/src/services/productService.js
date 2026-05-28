import api from "../api/axiosConfig";

export const getAllProducts = async () => {

    const res =
        await api.get("/products");

    return res.data.data;
};

export const createProduct = async (payload, image) => {
    const formData = new FormData();

    formData.append(
        "product",
        new Blob(
            [
                JSON.stringify(payload)
            ],
            {
                type:
                    "application/json"
            }
        )
    );
    formData.append(
        "image",
        image
    );
    const res = await api.post(
        "/products", formData);
    return res.data.data;
};

export const getMyProducts = async () => {
        const res = await api.get(
            "/products/my-products"
        );
        return res.data.data;
    };

export const getSingleProduct = async (productId) => {

        const res = await api.get(

            `/products/${productId}`
        );

        return res.data.data;
    };

export const getProductsByCategory = async (categoryId) => {
        const res =
            await api.get(
                `/products/category/${categoryId}`
            );
        return res.data.data;
    };