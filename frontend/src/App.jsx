import { Routes, Route } from "react-router-dom";

import PublicLayout from "./components/layout/PublicLayout";
import AddProductPage from "./pages/seller/AddProductPage";
import ProductPage from "./pages/ProductPage";
import SellerDashboardLayout from "./components/dashboard/SellerDashboardLayout";
import ProductDetailPage from "./pages/ProductDetailPage";
import SellerProductsPage from "./pages/seller/SellerProductsPage";
import CartPage from "./pages/cart/CartPage.jsx";

import CheckoutPage from "./pages/cart/CheckoutPage.jsx";

import OrdersPage from "./pages/dashboard/OrdersPage.jsx";

import PaymentPage from "./pages/PaymentPage";

import ProfilePage from "./pages/dashboard/ProfilePage.jsx";

import AddressesPage from "./pages/dashboard/AddressesPage.jsx";

import ForgotPasswordPage from "./pages/ForgotPasswordPage";

import AuthPage from "./pages/AuthPage";



import SellerDashboard from "./pages/seller/SellerDashboard";

import RoleProtectedRoute from "./routes/RoleProtectedRoute";
import AdminDashboardLayout
    from "./components/dashboard/AdminDashboardLayout";

import AdminDashboard
    from "./pages/admin/AdminDashboard";

import UsersPage
    from "./pages/admin/UsersPage";

import SellersPage
    from "./pages/admin/SellersPage";

import ProductsPage
    from "./pages/admin/ProductsPage";

import CategoriesPage
    from "./pages/admin/CategoriesPage";

import AnalyticsPage
    from "./pages/admin/AnalyticsPage";
import PaymentSuccessPage from "./pages/payment/PaymentSuccessPage.jsx";

function App() {

    return (

        <Routes>

            {/* ================= PUBLIC LAYOUT ================= */}

            <Route
                path="/"
                element={

                    <PublicLayout>

                        <AuthPage />

                    </PublicLayout>
                }
            />

            <Route
                path="/products"
                element={

                    <PublicLayout>

                        <ProductPage />

                    </PublicLayout>
                }
            />

            <Route
                path="/products/:id"
                element={

                    <PublicLayout>

                        <ProductDetailPage />

                    </PublicLayout>
                }
            />

            <Route
                path="/cart"
                element={

                    <RoleProtectedRoute
                        allowedRoles={[
                            "ROLE_USER",
                            "ROLE_SELLER",
                            "ROLE_ADMIN"
                        ]}
                    >

                        <PublicLayout>

                            <CartPage />

                        </PublicLayout>

                    </RoleProtectedRoute>
                }
            />
            <Route
                path="/payment/success"
                element={

                    <RoleProtectedRoute
                        allowedRoles={[
                            "ROLE_USER",
                            "ROLE_SELLER",
                            "ROLE_ADMIN"
                        ]}
                    >

                        <PublicLayout>

                            <PaymentSuccessPage />

                        </PublicLayout>

                    </RoleProtectedRoute>
                }
            />

            <Route
                path="/checkout"
                element={

                    <RoleProtectedRoute
                        allowedRoles={[
                            "ROLE_USER",
                            "ROLE_SELLER",
                            "ROLE_ADMIN"
                        ]}
                    >

                        <PublicLayout>

                            <CheckoutPage />

                        </PublicLayout>

                    </RoleProtectedRoute>
                }
            />

            <Route
                path="/dashboard/orders"
                element={

                    <RoleProtectedRoute
                        allowedRoles={[
                            "ROLE_USER",
                            "ROLE_SELLER",
                            "ROLE_ADMIN"
                        ]}
                    >

                        <PublicLayout>

                            <OrdersPage />

                        </PublicLayout>

                    </RoleProtectedRoute>
                }
            />

            <Route
                path="/payment/:orderId"
                element={

                    <RoleProtectedRoute
                        allowedRoles={[
                            "ROLE_USER",
                            "ROLE_SELLER",
                            "ROLE_ADMIN"
                        ]}
                    >

                        <PublicLayout>

                            <PaymentPage />

                        </PublicLayout>

                    </RoleProtectedRoute>
                }
            />

            <Route
                path="/profile"
                element={

                    <RoleProtectedRoute
                        allowedRoles={[
                            "ROLE_USER",
                            "ROLE_SELLER",
                            "ROLE_ADMIN"
                        ]}
                    >

                        <PublicLayout>

                            <ProfilePage />

                        </PublicLayout>

                    </RoleProtectedRoute>
                }
            />

            <Route
                path="/addresses"
                element={

                    <RoleProtectedRoute
                        allowedRoles={[
                            "ROLE_USER",
                            "ROLE_SELLER",
                            "ROLE_ADMIN"
                        ]}
                    >

                        <PublicLayout>

                            <AddressesPage />

                        </PublicLayout>

                    </RoleProtectedRoute>
                }
            />

            <Route
                path="/forgot-password"
                element={

                    <PublicLayout>

                        <ForgotPasswordPage />

                    </PublicLayout>
                }
            />



            {/* ================= SELLER ROUTES ================= */}
            <Route
                path="/seller"
                element={

                    <RoleProtectedRoute
                        allowedRoles={[
                            "ROLE_SELLER",
                            "ROLE_ADMIN"
                        ]}
                    >

                        <SellerDashboardLayout />

                    </RoleProtectedRoute>
                }
            >

                <Route
                    index
                    element={<SellerDashboard />}
                />



                <Route
                    path="products/add"
                    element={<AddProductPage />}
                />



                <Route
                    path="products"
                    element={<SellerProductsPage />}
                />

            </Route>

            <Route
                path="/seller/dashboard"
                element={

                    <RoleProtectedRoute
                        allowedRoles={[
                            "ROLE_SELLER",
                            "ROLE_ADMIN"
                        ]}
                    >

                        <SellerDashboard />

                    </RoleProtectedRoute>
                }
            />
            <Route
                path="/admin"
                element={

                    <RoleProtectedRoute
                        allowedRoles={[
                            "ROLE_ADMIN"
                        ]}
                    >

                        <AdminDashboardLayout />

                    </RoleProtectedRoute>
                }
            >

                <Route
                    path="dashboard"
                    element={<AdminDashboard />}
                />

                <Route
                    path="users"
                    element={<UsersPage />}
                />

                <Route
                    path="sellers"
                    element={<SellersPage />}
                />

                <Route
                    path="products"
                    element={<ProductsPage />}
                />

                <Route
                    path="categories"
                    element={<CategoriesPage />}
                />

                <Route
                    path="analytics"
                    element={<AnalyticsPage />}
                />

            </Route>

        </Routes>
    );
}

export default App;