import { useState } from "react";
import axios from "axios";

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!form.email || !form.password || (!isLogin && !form.name)) {
            setError("All fields are required");
            return;
        }

        setLoading(true);

        try {
            if (isLogin) {
                const res = await axios.post("http://localhost:8080/auth/login", {
                    email: form.email,
                    password: form.password
                });

                localStorage.setItem("token", res.data.token);
                setMessage("Login successful ✅");

            } else {
                await axios.post("http://localhost:8080/auth/register", form);
                setMessage("Registration successful ✅");
                setIsLogin(true);
            }

        } catch (err) {
            setError("Something went wrong ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">

            {/* LEFT SIDE (BACKGROUND DESIGN) */}
            <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 text-white items-center justify-center p-10">
                <div>
                    <h1 className="text-4xl font-bold mb-4">Welcome 🚀</h1>
                    <p className="text-lg opacity-90">
                        Manage your orders, track inventory and experience seamless shopping.
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE (FORM) */}
            <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100">

                <div className="bg-white p-8 rounded-2xl shadow-xl w-96">

                    {/* Tabs */}
                    <div className="relative flex mb-6 border-b">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`w-1/2 py-2 ${
                                isLogin ? "text-blue-600 font-semibold" : "text-gray-500"
                            }`}
                        >
                            Login
                        </button>

                        <button
                            onClick={() => setIsLogin(false)}
                            className={`w-1/2 py-2 ${
                                !isLogin ? "text-blue-600 font-semibold" : "text-gray-500"
                            }`}
                        >
                            Register
                        </button>

                        <span
                            className={`absolute bottom-0 left-0 h-1 w-1/2 bg-blue-500 transition-all duration-300 ${
                                isLogin ? "translate-x-0" : "translate-x-full"
                            }`}
                        ></span>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-xl font-bold mb-4 text-center">
                            {isLogin ? "Sign In" : "Create Account"}
                        </h2>

                        {message && <p className="text-green-500 mb-4">{message}</p>}
                        {error && <p className="text-red-500 mb-4">{error}</p>}

                        {!isLogin && (
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                onChange={handleChange}
                                className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            />
                        )}

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            className="w-full mb-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                        />

                        {/* 🔥 Forgot Password */}
                        {isLogin && (
                            <div className="text-right mb-4">
                                <button
                                    type="button"
                                    className="text-sm text-blue-500 hover:underline"
                                    onClick={() => alert("Forgot password flow later")}
                                >
                                    Forgot Password?
                                </button>
                            </div>
                        )}

                        <button
                            disabled={loading}
                            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                        >
                            {loading
                                ? "Processing..."
                                : isLogin
                                    ? "Login"
                                    : "Register"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;