import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useEffect } from "react";

function ProfilePage() {
    const { user, loading } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {

        if (!loading && !user) {
            navigate("/");
        }

    }, [user, loading, navigate]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return null;
    }

    // 🔥 LOGOUT
    const handleLogout = () => {

        localStorage.clear();

        alert("Logged out successfully ✅");

        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-5xl mx-auto">

                {/* ================================================= */}
                {/* 🔥 PROFILE HEADER */}
                {/* ================================================= */}

                <div className="bg-white rounded-2xl shadow p-6 mb-6 flex items-center justify-between">

                    <div>

                        <h1 className="text-3xl font-bold">
                            {user.name}
                        </h1>

                        <p className="text-gray-500 mt-1">
                            {user.email}
                        </p>

                    </div>

                    {/* Avatar */}
                    <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold">
                        {user.name.charAt(0)}
                    </div>

                </div>

                {/* ================================================= */}
                {/* 🔥 DASHBOARD CARDS */}
                {/* ================================================= */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* ORDERS */}
                    <div
                        onClick={() => navigate("/orders")}
                        className="bg-white rounded-2xl shadow p-6 cursor-pointer hover:shadow-xl transition hover:-translate-y-1"
                    >

                        <div className="text-4xl mb-4">
                            📦
                        </div>

                        <h2 className="text-xl font-semibold mb-2">
                            My Orders
                        </h2>

                        <p className="text-gray-500">
                            Track and manage your orders
                        </p>

                    </div>

                    {/* ADDRESSES */}
                    <div
                        onClick={() => navigate("/addresses")}
                        className="bg-white rounded-2xl shadow p-6 cursor-pointer hover:shadow-xl transition hover:-translate-y-1"
                    >

                        <div className="text-4xl mb-4">
                            🏠
                        </div>

                        <h2 className="text-xl font-semibold mb-2">
                            My Addresses
                        </h2>

                        <p className="text-gray-500">
                            Manage delivery addresses
                        </p>

                    </div>

                    {/* CART */}
                    <div
                        onClick={() => navigate("/cart")}
                        className="bg-white rounded-2xl shadow p-6 cursor-pointer hover:shadow-xl transition hover:-translate-y-1"
                    >

                        <div className="text-4xl mb-4">
                            🛒
                        </div>

                        <h2 className="text-xl font-semibold mb-2">
                            My Cart
                        </h2>

                        <p className="text-gray-500">
                            View products in your cart
                        </p>

                    </div>

                    {/* RESET PASSWORD */}
                    <div
                        onClick={() => navigate("/forgot-password")}
                        className="bg-white rounded-2xl shadow p-6 cursor-pointer hover:shadow-xl transition hover:-translate-y-1"
                    >

                        <div className="text-4xl mb-4">
                            🔐
                        </div>

                        <h2 className="text-xl font-semibold mb-2">
                            Reset Password
                        </h2>

                        <p className="text-gray-500">
                            Change your account password
                        </p>

                    </div>

                    {/* PRODUCTS */}
                    <div
                        onClick={() => navigate("/products")}
                        className="bg-white rounded-2xl shadow p-6 cursor-pointer hover:shadow-xl transition hover:-translate-y-1"
                    >

                        <div className="text-4xl mb-4">
                            🛍️
                        </div>

                        <h2 className="text-xl font-semibold mb-2">
                            Browse Products
                        </h2>

                        <p className="text-gray-500">
                            Explore product catalogue
                        </p>

                    </div>

                    {/* LOGOUT */}
                    <div
                        onClick={handleLogout}
                        className="bg-red-500 text-white rounded-2xl shadow p-6 cursor-pointer hover:bg-red-600 transition hover:-translate-y-1"
                    >

                        <div className="text-4xl mb-4">
                            🚪
                        </div>

                        <h2 className="text-xl font-semibold mb-2">
                            Logout
                        </h2>

                        <p className="opacity-90">
                            Securely logout from account
                        </p>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default ProfilePage;