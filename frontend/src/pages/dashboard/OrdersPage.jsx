import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../../services/orderService";

function OrdersPage() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchOrders();

    }, []);

    const fetchOrders = async () => {

        try {

            const data =
                await getMyOrders();

            setOrders(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);
        }
    };

    const getOrderStatusColor = (status) => {

        switch (status) {

            case "CONFIRMED":
                return "bg-green-100 text-green-700";

            case "CREATED":
                return "bg-yellow-100 text-yellow-700";

            case "CANCELLED":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const getPaymentStatusColor = (status) => {

        switch (status) {

            case "SUCCESS":
                return "bg-green-100 text-green-700";

            case "PENDING":
                return "bg-yellow-100 text-yellow-700";

            case "FAILED":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    if (loading) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                <div className="text-center">

                    <div className="w-14 h-14 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>

                    <p className="mt-4 text-gray-600">
                        Loading orders...
                    </p>

                </div>

            </div>
        );
    }

    return (

        <div className="min-h-screen bg-gray-100 py-10 px-4">

            <div className="max-w-6xl mx-auto">

                <div className="flex items-center justify-between mb-8">

                    <div>

                        <h1 className="text-4xl font-bold">
                            My Orders
                        </h1>

                        <p className="text-gray-600 mt-2">
                            Track and manage your orders
                        </p>

                    </div>

                </div>

                {
                    orders.length === 0 ? (

                        <div className="bg-white rounded-3xl shadow-md p-12 text-center">

                            <h2 className="text-2xl font-bold">
                                No Orders Yet
                            </h2>

                            <p className="text-gray-600 mt-3">
                                Start shopping to place your first order.
                            </p>

                            <Link
                                to="/products"
                                className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-xl"
                            >
                                Explore Products
                            </Link>

                        </div>

                    ) : (

                        <div className="space-y-6">

                            {
                                orders.map(order => (

                                    <div
                                        key={order.orderId}
                                        className="bg-white rounded-3xl shadow-md overflow-hidden"
                                    >

                                        {/* HEADER */}

                                        <div className="border-b px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                                            <div>

                                                <p className="text-gray-500 text-sm">
                                                    Order ID
                                                </p>

                                                <h2 className="text-xl font-bold">
                                                    #{order.orderId}
                                                </h2>

                                            </div>

                                            <div className="flex flex-wrap gap-3">

                                                <span
                                                    className={`px-4 py-2 rounded-full text-sm font-medium ${getOrderStatusColor(order.orderStatus)}`}
                                                >
                                                    {order.orderStatus}
                                                </span>

                                                <span
                                                    className={`px-4 py-2 rounded-full text-sm font-medium ${getPaymentStatusColor(order.paymentStatus)}`}
                                                >
                                                    {order.paymentStatus}
                                                </span>

                                            </div>

                                        </div>

                                        {/* ITEMS */}

                                        <div className="p-6 space-y-5">

                                            {
                                                order.items.map(item => (

                                                    <div
                                                        key={item.orderItemId}
                                                        className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 border rounded-2xl p-4 hover:shadow-md transition"
                                                    >

                                                        <div className="flex gap-5">

                                                            <img
                                                                src={item.productImageUrl}
                                                                alt={item.productTitle}
                                                                className="w-28 h-28 object-cover rounded-2xl border"
                                                            />

                                                            <div>

                                                                <h3 className="text-xl font-semibold">
                                                                    {item.productTitle}
                                                                </h3>

                                                                <p className="text-gray-500 mt-2">
                                                                    Quantity:
                                                                    {" "}
                                                                    {item.quantity}
                                                                </p>

                                                                <p className="text-gray-500 mt-1">
                                                                    Variant:
                                                                    {" "}
                                                                    {item.variantAttributes}
                                                                </p>

                                                                <p className="mt-3 text-lg font-bold">
                                                                    ₹ {item.totalPrice}
                                                                </p>

                                                            </div>

                                                        </div>

                                                    </div>
                                                ))
                                            }

                                        </div>

                                        {/* FOOTER */}

                                        <div className="bg-gray-50 px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                                            <div>

                                                <p className="text-gray-500">
                                                    Delivery Address
                                                </p>

                                                <p className="font-medium mt-1">

                                                    {
                                                        order.shippingAddress
                                                            ? (
                                                                <>
                                                                    {
                                                                        order.shippingAddress.fullName
                                                                    }

                                                                    ,
                                                                    {" "}

                                                                    {
                                                                        order.shippingAddress.city
                                                                    }

                                                                    ,
                                                                    {" "}

                                                                    {
                                                                        order.shippingAddress.state
                                                                    }
                                                                </>
                                                            )
                                                            : "Address not available"
                                                    }

                                                </p>

                                            </div>

                                            <div className="text-right">

                                                <p className="text-gray-500">
                                                    Total Amount
                                                </p>

                                                <h2 className="text-2xl font-bold">
                                                    ₹ {order.totalAmount}
                                                </h2>

                                            </div>

                                        </div>

                                    </div>
                                ))
                            }

                        </div>
                    )
                }

            </div>

        </div>
    );
}

export default OrdersPage;