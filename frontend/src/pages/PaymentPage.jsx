import { useParams, useNavigate } from "react-router-dom";
import { updateOrderStatus } from "../utils/order";

function PaymentPage() {
    const { orderId } = useParams();
    const navigate = useNavigate();

    const handlePayment = () => {
        // 🔥 simulate success
        updateOrderStatus(orderId, "CONFIRMED");

        alert("Payment Successful ✅");

        navigate("/orders");
    };

    return (
        <div className="min-h-screen flex items-center justify-center">

            <div className="bg-white p-8 shadow rounded text-center">

                <h1 className="text-xl font-bold mb-4">
                    Payment Page 💳
                </h1>

                <p className="mb-4">Order ID: {orderId}</p>

                <button
                    onClick={handlePayment}
                    className="bg-green-500 text-white px-6 py-2 rounded"
                >
                    Pay Now
                </button>

            </div>
        </div>
    );
}

export default PaymentPage;