import { useState } from "react";
import axios from "axios";

function LoginForm() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            // ✅ Direct HTTP call (no service layer)
            const res = await axios.post(
                "http://localhost:8080/auth/login",
                form
            );

            localStorage.setItem("token", res.data.token);
            alert("Login successful");

        } catch (err) {
            setError("Invalid credentials");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500">{error}</p>}

            <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="w-full mb-3 p-2 border rounded"
            />

            <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full mb-3 p-2 border rounded"
            />

            <button className="w-full bg-blue-500 text-white p-2 rounded">
                Login
            </button>
        </form>
    );
}

export default LoginForm;