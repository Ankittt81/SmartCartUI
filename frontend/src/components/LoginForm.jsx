import { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginForm() {
    const { fetchUser } = useAuth();

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            // ✅ Login API
            const res = await api.post(
                "/auth/login",
                form
            );

            // ✅ Token from backend response
            const token = res.data.data;

            localStorage.setItem("token", token);
            // 🔥 fetch current user
            await fetchUser();

            alert("Login successful ✅");

            navigate("/products");

        } catch (err) {

            console.error(err);

            setError("Invalid credentials ❌");
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            {/* ERROR */}
            {error && (
                <p className="text-red-500 mb-3">
                    {error}
                </p>
            )}

            {/* EMAIL */}
            <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                className="w-full mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />

            {/* PASSWORD */}
            <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full mb-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />

            {/* 🔥 FORGOT PASSWORD */}
            <div className="text-right mb-4">

                <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-sm text-blue-500 hover:underline"
                >
                    Forgot Password?
                </button>

            </div>

            {/* LOGIN BUTTON */}
            <button
                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
            >
                Login
            </button>

        </form>
    );
}

export default LoginForm;