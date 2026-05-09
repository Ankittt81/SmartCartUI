import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function AuthPage() {

    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen flex">

            {/* LEFT SIDE */}
            <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 text-white items-center justify-center p-10">

                <div>
                    <h1 className="text-4xl font-bold mb-4">
                        Welcome 🚀
                    </h1>

                    <p className="text-lg opacity-90">
                        Manage your orders, track inventory and experience seamless shopping.
                    </p>
                </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100">

                <div className="bg-white p-8 rounded-2xl shadow-xl w-96">

                    {/* 🔥 Tabs */}
                    <div className="relative flex mb-6 border-b">

                        <button
                            onClick={() => setIsLogin(true)}
                            className={`w-1/2 py-2 transition ${
                                isLogin
                                    ? "text-blue-600 font-semibold"
                                    : "text-gray-500"
                            }`}
                        >
                            Login
                        </button>

                        <button
                            onClick={() => setIsLogin(false)}
                            className={`w-1/2 py-2 transition ${
                                !isLogin
                                    ? "text-blue-600 font-semibold"
                                    : "text-gray-500"
                            }`}
                        >
                            Register
                        </button>

                        {/* 🔥 Animated Bottom Line */}
                        <span
                            className={`absolute bottom-0 left-0 h-1 w-1/2 bg-blue-500 transition-all duration-300 ${
                                isLogin
                                    ? "translate-x-0"
                                    : "translate-x-full"
                            }`}
                        ></span>

                    </div>

                    {/* 🔥 Dynamic Form */}
                    {isLogin ? <LoginForm /> : <RegisterForm />}

                </div>

            </div>

        </div>
    );
}

export default AuthPage;