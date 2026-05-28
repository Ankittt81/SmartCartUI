import { useContext } from "react";
import { useAuth } from "../../context/AuthContext";

function Navbar() {

    const { user, logout } = useAuth();

    return (

        <div className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between">

            <div>

                <h2 className="text-2xl font-bold">
                    Welcome, {user?.name}
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                    Manage your dashboard activities
                </p>

            </div>

            <div className="flex items-center gap-4">

                <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">

                    {user?.roles?.join(", ")}

                </div>

                <button
                    onClick={logout}
                    className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600"
                >
                    Logout
                </button>

            </div>

        </div>
    );
}

export default Navbar;