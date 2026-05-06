export const getOrders = () => {
    return JSON.parse(localStorage.getItem("orders")) || [];
};

export const saveOrders = (orders) => {
    localStorage.setItem("orders", JSON.stringify(orders));
};

export const createOrder = (cart) => {
    const orders = getOrders();

    const newOrder = {
        id: "ORD-" + Date.now(),
        items: cart,
        totalAmount: cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        ),
        status: "PENDING", // 🔥 important
        createdAt: new Date().toISOString()
    };

    orders.push(newOrder);
    saveOrders(orders);

    return newOrder;
};

export const updateOrderStatus = (orderId, status) => {
    const orders = getOrders().map((order) =>
        order.id === orderId ? { ...order, status } : order
    );

    saveOrders(orders);
};