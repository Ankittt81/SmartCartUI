import { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

function ForgotPasswordPage() {

    const navigate = useNavigate();

    // 🔥 Step Controller
    const [step, setStep] = useState(1);

    // 🔥 Form Data
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // 🔥 Messages
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // =====================================================
    // 🔥 STEP 1 → SEND OTP
    // =====================================================

    const handleSendOtp = async (e) => {

        e.preventDefault();

        setError("");
        setMessage("");

        try {

            await api.post(
                "/auth/reset-password/request",
                { email }
            );

            setMessage("OTP sent successfully ✅");

            // move to OTP step
            setStep(2);

        } catch (err) {

            console.error(err);

            setError("Failed to send OTP ❌");
        }
    };

    // =====================================================
    // 🔥 STEP 2 → VALIDATE OTP
    // =====================================================

    const handleValidateOtp = async (e) => {

        e.preventDefault();

        setError("");
        setMessage("");

        try {

            await api.post(
                "/auth/reset-password/validate",
                {
                    email,
                    otp
                }
            );

            setMessage("OTP verified successfully ✅");

            // move to reset password step
            setStep(3);

        } catch (err) {

            console.error(err);

            setError("Invalid OTP ❌");
        }
    };

    // =====================================================
    // 🔥 STEP 3 → RESET PASSWORD
    // =====================================================

    const handleResetPassword = async (e) => {

        e.preventDefault();

        setError("");
        setMessage("");

        // 🔥 password validation
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match ❌");
            return;
        }

        try {

            await api.post(
                "/auth/reset-password/confirm",
                {
                    email,
                    newPassword
                }
            );

            setMessage("Password reset successful ✅");

            // redirect to login after success
            setTimeout(() => {
                navigate("/");
            }, 2000);

        } catch (err) {

            console.error(err);

            setError("Password reset failed ❌");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-2xl shadow-xl w-96">

                {/* TITLE */}
                <h1 className="text-2xl font-bold text-center mb-6">
                    Reset Password 🔐
                </h1>

                {/* SUCCESS MESSAGE */}
                {message && (
                    <p className="text-green-500 mb-4">
                        {message}
                    </p>
                )}

                {/* ERROR MESSAGE */}
                {error && (
                    <p className="text-red-500 mb-4">
                        {error}
                    </p>
                )}

                {/* ================================================= */}
                {/* 🔥 STEP 1 → EMAIL */}
                {/* ================================================= */}

                {step === 1 && (

                    <form onSubmit={handleSendOtp}>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                        />

                        <button
                            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
                        >
                            Send OTP
                        </button>

                    </form>
                )}

                {/* ================================================= */}
                {/* 🔥 STEP 2 → OTP */}
                {/* ================================================= */}

                {step === 2 && (

                    <form onSubmit={handleValidateOtp}>

                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                        />

                        <button
                            className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
                        >
                            Verify OTP
                        </button>

                    </form>
                )}

                {/* ================================================= */}
                {/* 🔥 STEP 3 → NEW PASSWORD */}
                {/* ================================================= */}

                {step === 3 && (

                    <form onSubmit={handleResetPassword}>

                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                        />

                        <input
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                        />

                        <button
                            className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition"
                        >
                            Reset Password
                        </button>

                    </form>
                )}

                {/* BACK TO LOGIN */}
                <button
                    onClick={() => navigate("/")}
                    className="mt-4 text-sm text-blue-500 hover:underline"
                >
                    Back to Login
                </button>

            </div>
        </div>
    );
}

export default ForgotPasswordPage;