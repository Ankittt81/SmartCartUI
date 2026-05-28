import api from "../api/axiosConfig";

// =========================================
// 🔥 GET ALL ADDRESSES
// =========================================

export const getAddresses = async () => {

    const res = await api.get("/addresses");

    return res.data.data;
};
// =========================================
// 🔥 ADD ADDRESS
// =========================================

export const addAddress = async (addressData) => {

    const res = await api.post(
        "/addresses",
        addressData
    );

    return res.data.data;
};

// =========================================
// 🔥 UPDATE ADDRESS
// =========================================
export const updateAddress = async (
    addressId,
    addressData
) => {

    const res = await api.put(
        `/addresses/${addressId}`,
        addressData
    );

    return res.data.data;
};

// =========================================
// 🔥 DELETE ADDRESS
// =========================================
export const deleteAddress = async (addressId) => {

    const res = await api.delete(
        `/addresses/${addressId}`
    );

    return res.data.data;
};

export const setDefaultAddress = async (id) => {

    const res = await api.patch(
        `/addresses/${id}/default`
    );

    return res.data.data;
};


