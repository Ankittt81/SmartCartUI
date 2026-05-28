import {useEffect, useState} from "react";
import {getCart} from "../../services/cartService.js";
import {useNavigate} from "react-router-dom";


function CartPage() {

    const [cart, setCart] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const navigate = useNavigate();


    useEffect(() => {

        fetchCart();

    }, []);




    const fetchCart = async () => {

        try {

            const data =
                await getCart();

            setCart(data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);
        }
    };




    const handleCheckout = () => {
        navigate("/checkout");
    };




    if (loading) {

        return (

            <div className="p-10">

                Loading Cart...

            </div>
        );
    }




    if (
        !cart
        ||
        cart.cartItems.length === 0
    ) {

        return (

            <div className="p-10 text-2xl">

                Cart is empty

            </div>
        );
    }




    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <div className="max-w-5xl mx-auto">

                <h1 className="text-4xl font-bold mb-10">

                    Shopping Cart

                </h1>



                <div className="space-y-6">

                    {cart.cartItems.map(item => (

                        <div
                            key={item.cartItemId}
                            className="bg-white rounded-2xl p-6 flex gap-6 items-center shadow-sm"
                        >

                            {/* IMAGE */}

                            <img
                                src={item.productImageUrl}
                                alt={item.productTitle}
                                className="w-32 h-32 object-contain"
                            />



                            {/* INFO */}

                            <div className="flex-1">

                                <h2 className="text-2xl font-semibold">

                                    {item.productTitle}

                                </h2>



                                <div className="mt-3 text-gray-600">

                                    {Object.entries(

                                        item.attributes

                                    ).map(([key, value]) => (

                                        <p key={key}>

                                            <span className="font-medium capitalize">

                                                {key}

                                            </span>

                                            :
                                            {" "}

                                            {value}

                                        </p>
                                    ))}
                                </div>



                                <div className="mt-4">

                                    Quantity:
                                    {" "}

                                    {item.quantity}

                                </div>

                            </div>



                            {/* PRICE */}

                            <div className="text-right">

                                <p className="text-xl font-semibold">

                                    ₹ {item.price}

                                </p>



                                <p className="text-gray-500 mt-2">

                                    Total:
                                    {" "}

                                    ₹ {item.subtotal}

                                </p>

                            </div>

                        </div>
                    ))}

                </div>



                {/* SUMMARY */}

                <div className="bg-white rounded-2xl p-8 mt-10 shadow-sm">

                    <div className="flex justify-between text-2xl font-bold">

                        <span>

                            Total Amount

                        </span>

                        <span>

                            ₹ {cart.totalAmount}

                        </span>

                    </div>



                    <button
                        onClick={handleCheckout}
                        className="w-full mt-8 bg-black text-white py-5 rounded-2xl text-lg font-medium hover:opacity-90 transition"
                    >

                        Proceed To Checkout

                    </button>

                </div>

            </div>

        </div>
    );
}

export default CartPage;