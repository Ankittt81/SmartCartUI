import {
    useEffect,
    useState
} from "react";

import { getCart } from "../../services/cartService";

import { getAddresses } from "../../services/addressService";

import { initiatePayment } from "../../services/paymentService";

import { getOrderByCheckoutId } from "../../services/orderService";

import api from "../../api/axiosConfig";



function CheckoutPage() {

    // =========================================
    // STATES
    // =========================================

    const [cart, setCart] =
        useState(null);

    const [addresses, setAddresses] =
        useState([]);

    const [selectedAddress,
        setSelectedAddress] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [processing, setProcessing] =
        useState(false);



    // =========================================
    // FETCH DATA
    // =========================================

    useEffect(() => {

        fetchData();

    }, []);




    // =========================================
    // FETCH CART + ADDRESS
    // =========================================

    const fetchData =
        async () => {

            try {

                // =========================
                // CART
                // =========================

                let cartData = null;

                try {

                    cartData =
                        await getCart();

                } catch(err) {

                    // 404 means no active cart

                    if(
                        err.response?.status === 404
                    ) {

                        cartData = {
                            cartItems: [],
                            totalAmount: 0
                        };

                    } else {

                        throw err;
                    }
                }



                // =========================
                // ADDRESSES
                // =========================

                const addressData =
                    await getAddresses();



                setCart(cartData);

                setAddresses(addressData);



                // =========================
                // DEFAULT ADDRESS
                // =========================

                if(addressData.length > 0) {

                    const defaultAddress =
                        addressData.find(
                            a => a.isDefault
                        );



                    if(defaultAddress) {

                        setSelectedAddress(
                            defaultAddress.id
                        );

                    } else {

                        setSelectedAddress(
                            addressData[0].id
                        );
                    }
                }

            } catch(err) {

                console.error(err);

            } finally {

                setLoading(false);
            }
        };



    // =========================================
    // POLL ORDER
    // =========================================

    const pollOrder =
        async (checkoutId) => {

            for(let i = 0; i < 10; i++) {

                try {

                    const order =
                        await getOrderByCheckoutId(
                            checkoutId
                        );



                    return order;

                } catch(err) {

                    await new Promise(
                        resolve =>
                            setTimeout(resolve, 1000)
                    );
                }
            }



            throw new Error(
                "Order creation timeout"
            );
        };



    // =========================================
    // HANDLE PAYMENT FLOW
    // =========================================

    const handleProceedToPayment =
        async () => {

            try {

                setProcessing(true);



                // =========================
                // VALIDATIONS
                // =========================

                if(!selectedAddress) {

                    alert(
                        "Please select address"
                    );

                    return;
                }



                if(
                    !cart ||
                    cart.cartItems.length === 0
                ) {

                    alert(
                        "Cart is empty"
                    );

                    return;
                }



                // =========================
                // CHECKOUT API
                // =========================

                const checkoutResponse =

                    await api.post(

                        "/cart/checkout",

                        {
                            addressId:
                            selectedAddress
                        }
                    );



                const checkoutId =
                    checkoutResponse
                        .data
                        .data;



                // =========================
                // WAIT FOR ORDER CREATION
                // =========================

                const order =
                    await pollOrder(
                        checkoutId
                    );



                // =========================
                // GENERATE PAYMENT LINK
                // =========================

                const paymentUrl =
                    await initiatePayment(
                        order.orderId
                    );



                // =========================
                // REDIRECT TO STRIPE
                // =========================

                window.location.href =
                    paymentUrl;

            } catch(err) {

                console.error(err);

                alert(
                    "Payment initiation failed"
                );

            } finally {

                setProcessing(false);
            }
        };



    // =========================================
    // LOADING
    // =========================================

    if(loading) {

        return (

            <div className="p-10 text-center">

                Loading...

            </div>
        );
    }



    // =========================================
    // EMPTY CART
    // =========================================

    if(
        !cart ||
        cart?.cartItems?.length === 0
    ) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                <div className="text-center">

                    <h1 className="text-3xl font-bold">

                        Your cart is empty

                    </h1>

                </div>

            </div>
        );
    }



    // =========================================
    // UI
    // =========================================

    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* ========================================= */}
                {/* LEFT SECTION */}
                {/* ========================================= */}

                <div className="lg:col-span-2">

                    <div className="bg-white rounded-2xl p-6 shadow-sm">

                        <h2 className="text-2xl font-bold mb-6">

                            Select Delivery Address

                        </h2>



                        <div className="space-y-4">

                            {addresses.map(address => (

                                <div

                                    key={address.id}

                                    onClick={() =>
                                        setSelectedAddress(
                                            address.id
                                        )
                                    }

                                    className={`border rounded-2xl p-5 cursor-pointer transition ${
                                        selectedAddress === address.id
                                            ? "border-black"
                                            : "border-gray-300"
                                    }`}
                                >

                                    <div className="flex justify-between">

                                        <h3 className="font-semibold text-lg">

                                            {address.fullName}

                                        </h3>



                                        <input
                                            type="radio"

                                            checked={
                                                selectedAddress
                                                === address.id
                                            }

                                            readOnly
                                        />
                                    </div>



                                    <p className="mt-2 text-gray-600">

                                        {address.houseNo},
                                        {" "}
                                        {address.area},
                                        {" "}
                                        {address.landmark}

                                    </p>



                                    <p className="text-gray-600">

                                        {address.city},
                                        {" "}
                                        {address.state}
                                        {" - "}
                                        {address.pincode}

                                    </p>



                                    <p className="mt-2">

                                        Phone:
                                        {" "}
                                        {address.mobile}

                                    </p>

                                </div>
                            ))}

                        </div>

                    </div>

                </div>



                {/* ========================================= */}
                {/* RIGHT SECTION */}
                {/* ========================================= */}

                <div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-10">

                        <h2 className="text-2xl font-bold mb-6">

                            Order Summary

                        </h2>



                        <div className="space-y-4">

                            {cart?.cartItems?.map(item => (

                                <div

                                    key={item.cartItemId}

                                    className="flex gap-4"
                                >

                                    <img
                                        src={item.productImageUrl}

                                        alt={item.productTitle}

                                        className="w-20 h-20 object-contain"
                                    />



                                    <div className="flex-1">

                                        <p className="font-medium">

                                            {item.productTitle}

                                        </p>



                                        <p className="text-sm text-gray-500">

                                            Qty:
                                            {" "}
                                            {item.quantity}

                                        </p>

                                    </div>



                                    <div>

                                        ₹ {item.subtotal}

                                    </div>

                                </div>
                            ))}

                        </div>



                        <div className="border-t mt-6 pt-6">

                            <div className="flex justify-between text-xl font-bold">

                                <span>

                                    Total

                                </span>

                                <span>

                                    ₹ {cart.totalAmount}

                                </span>

                            </div>



                            <button

                                onClick={
                                    handleProceedToPayment
                                }

                                disabled={processing}

                                className="w-full mt-6 bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
                            >

                                {
                                    processing
                                        ? "Processing..."
                                        : "Proceed To Payment"
                                }

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default CheckoutPage;