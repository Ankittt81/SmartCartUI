import { useEffect, useState } from "react";
import {
    useSearchParams,
    Link
} from "react-router-dom";

import {
    getOrderById
} from "../../services/orderService.js";

function PaymentSuccessPage() {

    const [searchParams] =
        useSearchParams();

    const [order, setOrder] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const orderId =
        searchParams.get("orderId");

    useEffect(() => {

        fetchOrder();

    }, []);

    const fetchOrder = async () => {

        try {

            const data =
                await getOrderById(orderId);

            setOrder(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);
        }
    };

    if (loading) {

        return (

            <div className="min-h-screen flex items-center justify-center bg-gray-100">

                <div className="text-center">

                    <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

                    <p className="mt-4 text-lg font-medium text-gray-700">
                        Verifying payment...
                    </p>

                </div>

            </div>
        );
    }

    if (!order) {

        return (

            <div className="min-h-screen flex items-center justify-center bg-gray-100">

                <div className="bg-white p-8 rounded-2xl shadow-md text-center">

                    <h1 className="text-2xl font-bold text-red-600">
                        Failed To Load Order
                    </h1>

                    <p className="mt-3 text-gray-600">
                        Please check your orders page.
                    </p>

                    <Link
                        to="/dashboard/orders"
                        className="inline-block mt-6 bg-black text-white px-5 py-2 rounded-lg"
                    >
                        View Orders
                    </Link>

                </div>

            </div>
        );
    }

    const isPaymentSuccess =
        order.paymentStatus === "SUCCESS";

    return (

        <div className="min-h-screen bg-gray-100 py-10 px-4">

            <div className="max-w-4xl mx-auto">

                {/* STATUS CARD */}

                <div className="bg-white rounded-3xl shadow-lg p-8">

                    <div className="text-center">

                        {
                            isPaymentSuccess ? (

                                <>
                                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-4xl">

                                        ✓

                                    </div>

                                    <h1 className="mt-5 text-4xl font-bold text-green-600">

                                        Payment Successful

                                    </h1>

                                    <p className="mt-3 text-gray-600">

                                        Your order has been confirmed successfully.

                                    </p>
                                </>

                            ) : (

                                <>
                                    <div className="w-20 h-20 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto text-4xl">

                                        ⏳

                                    </div>

                                    <h1 className="mt-5 text-4xl font-bold text-yellow-600">

                                        Payment Verification Pending

                                    </h1>

                                    <p className="mt-3 text-gray-600">

                                        We are waiting for payment confirmation from Stripe webhook.

                                    </p>
                                </>
                            )
                        }

                        <div className="mt-6 bg-gray-50 rounded-2xl p-5">

                            <p className="text-gray-500">
                                Order ID
                            </p>

                            <h2 className="text-2xl font-bold mt-1">
                                #{order.orderId}
                            </h2>

                            <p className="mt-4 text-gray-500">
                                Total Amount
                            </p>

                            <h2 className="text-3xl font-bold text-black mt-1">
                                ₹ {order.totalAmount}
                            </h2>
                        </div>
                    </div>
                </div>

                {/* ORDER ITEMS */}

                <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

                    <h2 className="text-2xl font-bold mb-6">
                        Ordered Items
                    </h2>

                    <div className="space-y-5">

                        {
                            order.items.map(item => (

                                <div
                                    key={item.orderItemId}
                                    className="flex items-center justify-between border rounded-2xl p-5 hover:shadow-md transition"
                                >

                                    <div className="flex gap-4 items-center">

                                        {/* PLACEHOLDER IMAGE */}

                                        <img
                                            src={item.productImageUrl}
                                            alt={item.productTitle}
                                            className="w-24 h-24 object-cover rounded-2xl border shadow-sm"
                                            onError={(e) => {
                                                e.target.src =
                                                    "https://placehold.co/200x200?text=Product";
                                            }}
                                        />

                                        <div>

                                            <h3 className="text-lg font-semibold">
                                                {item.productName}
                                            </h3>

                                            <p className="text-gray-500 mt-1">
                                                Quantity:
                                                {" "}
                                                {item.quantity}
                                            </p>

                                            <p className="text-gray-500 mt-1">
                                                Variant:
                                                {" "}
                                                {item.variantAttributes}
                                            </p>

                                        </div>

                                    </div>

                                    <div className="text-right">

                                        <p className="text-lg font-bold">
                                            ₹ {item.totalPrice}
                                        </p>

                                    </div>

                                </div>
                            ))
                        }

                    </div>
                </div>

                {/* SHIPPING */}

                <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

                    <h2 className="text-2xl font-bold mb-5">
                        Delivery Address
                    </h2>

                    <div className="text-gray-700 leading-8">

                        <p className="font-semibold text-lg">
                            {order.shippingAddress.fullName}
                        </p>

                        <p>
                            {order.shippingAddress.houseNo},
                            {" "}
                            {order.shippingAddress.area}
                        </p>

                        <p>
                            {order.shippingAddress.landmark}
                        </p>

                        <p>
                            {order.shippingAddress.city},
                            {" "}
                            {order.shippingAddress.state}
                        </p>

                        <p>
                            {order.shippingAddress.pincode}
                        </p>

                        <p>
                            Mobile:
                            {" "}
                            {order.shippingAddress.mobile}
                        </p>

                    </div>
                </div>

                {/* ACTION BUTTONS */}

                <div className="flex flex-wrap gap-4 mt-8">

                    <Link
                        to="/products"
                        className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
                    >
                        Continue Shopping
                    </Link>

                    <Link
                        to="/dashboard/orders"
                        className="border border-black px-6 py-3 rounded-xl font-medium hover:bg-black hover:text-white transition"
                    >
                        View Orders
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default PaymentSuccessPage;