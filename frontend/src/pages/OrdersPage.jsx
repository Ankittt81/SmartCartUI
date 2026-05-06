import { useEffect, useState } from "react";
import { getOrders } from "../utils/order";

function OrdersPage() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        setOrders(getOrders());
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <h1 className="text-2xl font-bold mb-6">My Orders 📦</h1>

            {orders.length === 0 ? (
                <p>No orders yet</p>
            ) : (
                orders.map((order) => (
                    <div key={order.id} className="bg-white p-4 mb-4 rounded shadow">

                        <div className="flex justify-between">
                            <div>
                                <p className="font-semibold">Order ID: {order.id}</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <div>
                                <p className="font-bold">₹{order.totalAmount}</p>
                                <p>{order.status}</p>
                            </div>
                        </div>

                        {/* Items */}
                        {order.items.map((item) => (
                            <div key={item.sku} className="mt-3 text-sm">
                                {item.title} × {item.quantity}
                            </div>
                        ))}

                    </div>
                ))
            )}
        </div>
    );
}

export default OrdersPage;