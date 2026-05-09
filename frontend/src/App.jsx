import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AuthPage from "./pages/AuthPage";
import OrdersPage from "./pages/OrdersPage";
import PaymentPage from "./pages/PaymentPage";
import ProfilePage from "./pages/ProfilePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AddressesPage from "./pages/AddressesPage";

function App() {
    return (

            <Layout>
                <Routes>
                    <Route path="/" element={<AuthPage />} />
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="/products/:id" element={<ProductDetailPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/payment/:orderId" element={<PaymentPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/addresses" element={<AddressesPage />}/>
                </Routes>
            </Layout>

    );
}

export default App;