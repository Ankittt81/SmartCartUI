import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext.jsx";

function PublicNavbar() {

    const { user } = useAuth();

    return (

        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-50">

            {/* LOGO */}

            <Link
                to="/products"
                className="text-2xl font-bold text-blue-600"
            >

                SmartCart

            </Link>



            {/* NAVIGATION */}

            <div className="flex items-center gap-6">

                <Link
                    to="/products"
                    className="text-gray-700 hover:text-blue-600"
                >

                    Products

                </Link>

                <Link
                    to="/cart"
                    className="text-gray-700 hover:text-blue-600"
                >

                    Cart

                </Link>
                {/* SELLER */}

                {user?.roles?.includes("ROLE_SELLER") && (

                    <Link
                        to="/seller/dashboard"
                        className="bg-emerald-600 text-white px-4 py-2 rounded-xl"
                    >

                        Seller Panel

                    </Link>

                )}



                {/* ADMIN */}

                {user?.roles?.includes("ROLE_ADMIN") && (

                    <Link
                        to="/admin/dashboard"
                        className="bg-purple-600 text-white px-4 py-2 rounded-xl"
                    >

                        Admin Panel

                    </Link>

                )}

            </div>

        </div>
    );
}

export default PublicNavbar;