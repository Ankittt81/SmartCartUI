export const getAddresses = () => {
    return JSON.parse(localStorage.getItem("addresses")) || [];
};

export const saveAddresses = (addresses) => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
};

export const addAddress = (address) => {
    const addresses = getAddresses();

    const newAddress = {
        id: Date.now(),
        ...address
    };

    addresses.push(newAddress);
    saveAddresses(addresses);

    return newAddress;
};

export const deleteAddress = (id) => {
    const addresses = getAddresses().filter(a => a.id !== id);
    saveAddresses(addresses);
};