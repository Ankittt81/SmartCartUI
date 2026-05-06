import { useState } from "react";
import { getCart } from "../utils/cart";
import { createOrder } from "../utils/order";
import { useNavigate } from "react-router-dom";
import AddressSelector from "../components/AddressSelector";

function CheckoutPage() {
    const navigate = useNavigate();
    const [selectedAddress, setSelectedAddress] = useState(null);

    const handleCheckout = () => {
        const cart = getCart();

        if (cart.length === 0) {
            alert("Cart is empty ❌");
            return;
        }

        if (!selectedAddress) {
            alert("Select address ❌");
            return;
        }

        const order = createOrder(cart);

        localStorage.removeItem("cart");

        navigate(`/payment/${order.id}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

            <div className="bg-white p-6 rounded-xl shadow w-96">

                <h1 className="text-xl font-bold mb-4">Checkout 🧾</h1>

                {/* 🔥 Address Selector */}
                <AddressSelector onSelect={setSelectedAddress} />

                <button
                    onClick={handleCheckout}
                    className="w-full mt-4 bg-green-500 text-white p-2 rounded"
                >
                    Proceed to Payment 💳
                </button>

            </div>
        </div>
    );
}

export default CheckoutPage;