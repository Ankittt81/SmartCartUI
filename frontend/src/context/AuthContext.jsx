import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axiosConfig";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    // =====================================================
    // 🔥 FETCH CURRENT USER
    // =====================================================

    const fetchUser = async () => {

        try {

            const token = localStorage.getItem("token");

            // no token
            if (!token) {
                setLoading(false);
                return;
            }

            // 🔥 CALL BACKEND
            const res = await api.get("/auth/profile");

            // adjust according to backend response
            setUser(res.data.data);

        } catch (err) {

            console.error(err);

            localStorage.removeItem("token");

            setUser(null);

        } finally {

            setLoading(false);
        }
    };

    // =====================================================
    // 🔥 ON APP LOAD
    // =====================================================

    useEffect(() => {
        fetchUser();
    }, []);

    // =====================================================
    // 🔥 LOGOUT
    // =====================================================

    const logout = () => {

        localStorage.removeItem("token");

        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                logout,
                loading,
                fetchUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// =====================================================
// 🔥 CUSTOM HOOK
// =====================================================

export function useAuth() {
    return useContext(AuthContext);
}