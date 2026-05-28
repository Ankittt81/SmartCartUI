import { useContext } from "react";

import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function RoleProtectedRoute({children, allowedRoles}) {
    const {user, loading} = useAuth();

    // auth still loading
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-semibold">
                    Loading...
                </h1>
            </div>
        );
    }

    // not logged in
    if (!user) {

        return <Navigate to="/" />;
    }

    // role check
    const hasAccess = user.roles?.some(

        role => allowedRoles.includes(role)

    );

    // forbidden
    if (!hasAccess) {

        return (

            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

                <h1 className="text-5xl font-bold text-red-500 mb-4">

                    403

                </h1>

                <p className="text-gray-600 text-lg">

                    Access Denied

                </p>

            </div>
        );
    }

    return children;
}

export default RoleProtectedRoute;