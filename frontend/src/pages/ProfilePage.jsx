import { useNavigate } from "react-router-dom";
import AddressSelector from "../components/AddressSelector";

function ProfilePage() {
    const navigate = useNavigate();

    const user = {
        name: "Ankit Kumar",
        email: "ankit@example.com"
    };

    const handleLogout = () => {
        localStorage.clear();
        alert("Logged out ✅");
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">

                {/* 🔥 USER INFO */}
                <div className="mb-6 border-b pb-4">
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-gray-500">{user.email}</p>
                </div>

                {/* 🔥 QUICK ACTIONS */}
                <div className="flex gap-4 mb-6">

                    <button
                        onClick={() => navigate("/orders")}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        My Orders 📦
                    </button>

                    <button
                        onClick={() => navigate("/cart")}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        My Cart 🛒
                    </button>

                </div>

                {/* 🔥 ADDRESS MANAGEMENT */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">
                        My Addresses 🏠
                    </h2>

                    <AddressSelector onSelect={() => {}} />
                </div>

                {/* 🔥 LOGOUT */}
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-6 py-2 rounded"
                >
                    Logout 🔐
                </button>

            </div>
        </div>
    );
}

export default ProfilePage;