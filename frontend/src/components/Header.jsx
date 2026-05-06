import { useNavigate } from "react-router-dom";
import { getCart } from "../utils/cart";
import { useEffect, useState } from "react";

function Header() {
    const navigate = useNavigate();
    const [count, setCount] = useState(0);

    useEffect(() => {
        const cart = getCart();
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        setCount(totalItems);
    }, []);

    return (
        <div className="bg-white shadow p-4 flex justify-between items-center">

            {/* LOGO */}
            <h1
                onClick={() => navigate("/products")}
                className="text-xl font-bold cursor-pointer"
            >
                SmartCart 🛒
            </h1>

            {/* NAV */}
            <div className="flex items-center gap-6">

                <button onClick={() => navigate("/products")}>
                    Products
                </button>

                <button onClick={() => navigate("/cart")} className="relative">
                    Cart 🛒

                    {/* 🔥 CART COUNT */}
                    {count > 0 && (
                        <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
              {count}
            </span>
                    )}
                </button>
                <button onClick={() => navigate("/orders")}>
                    Orders 📦
                </button>

                <button onClick={() => navigate("/profile")}>
                    Profile 👤
                </button>

            </div>
        </div>
    );
}

export default Header;