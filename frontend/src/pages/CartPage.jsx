import { useEffect, useState } from "react";
import {
    getCart,
    removeFromCart,
    increaseQty,
    decreaseQty
} from "../utils/cart";
import { useNavigate } from "react-router-dom";

function CartPage() {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setCart(getCart());
    }, []);

    const refreshCart = () => {
        setCart(getCart());
    };

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <h1 className="text-2xl font-bold mb-6">Your Cart 🛒</h1>

            {cart.length === 0 ? (
                <p>No items in cart</p>
            ) : (
                <div className="bg-white p-6 rounded-xl shadow">

                    {cart.map((item) => (
                        <div
                            key={item.sku}
                            className="flex items-center gap-4 border-b py-4"
                        >
                            <img src={item.image} className="w-20 h-20 object-cover" />

                            <div className="flex-1">
                                <h2 className="font-semibold">{item.title}</h2>
                                <p>₹{item.price}</p>

                                {/* 🔥 Quantity Controls */}
                                <div className="flex items-center gap-2 mt-2">
                                    <button
                                        onClick={() => {
                                            decreaseQty(item.sku);
                                            refreshCart();
                                        }}
                                        className="px-2 bg-gray-300 rounded"
                                    >
                                        -
                                    </button>

                                    <span>{item.quantity}</span>

                                    <button
                                        onClick={() => {
                                            increaseQty(item.sku);
                                            refreshCart();
                                        }}
                                        className="px-2 bg-gray-300 rounded"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* 🔥 Remove */}
                            <button
                                onClick={() => {
                                    removeFromCart(item.sku);
                                    refreshCart();
                                }}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Remove ❌
                            </button>
                        </div>
                    ))}

                    {/* 🔥 Total + Checkout */}
                    <div className="mt-6 flex justify-between items-center">
                        <h2 className="text-xl font-bold">
                            Total: ₹{total}
                        </h2>

                        <button
                            disabled={cart.length === 0}
                            onClick={() => navigate("/checkout")}
                            className="bg-green-500 text-white px-6 py-2 rounded disabled:opacity-50"
                        >
                            Checkout →
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
}

export default CartPage;