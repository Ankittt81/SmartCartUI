import { useState } from "react";
import axios from "axios";

function RegisterForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        // ✅ basic validation
        if (!form.name || !form.email || !form.password) {
            setError("All fields are required");
            return;
        }

        try {
            // ✅ Direct HTTP call
            await axios.post(
                "http://localhost:8080/auth/register",
                form
            );

            setMessage("Registered successfully ✅");

        } catch (err) {
            setError("Error registering ❌");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {message && <p className="text-green-500">{message}</p>}
            {error && <p className="text-red-500">{error}</p>}

            <input
                name="name"
                placeholder="Name"
                onChange={handleChange}
                className="w-full mb-3 p-2 border rounded"
            />

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
                Register
            </button>
        </form>
    );
}

export default RegisterForm;