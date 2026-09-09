import "./scss/style.css";
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Announcement from "./components/layout/AnnouncementBar.jsx";
import NavBar from "./components/layout/NavBar.jsx";
import Footer from "./components/layout/Footer.jsx";
import Newsletter from "./components/ui/Newsletter.jsx";
import Login from "./pages/LoginPage.jsx";
import Register from "./pages/RegisterPage.jsx";
import HomePage from "./pages/HomePage.jsx";  
import CartPage from "./pages/CartPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";
import { useAuth } from "./contexts/AuthContext.jsx";

function App() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, search]);

  return (
    <>
      {!isAuthLoading && !isAuthenticated && <Announcement />}
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products/:productId" element={<ProductPage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Newsletter />
      <Footer />
    </>
  );
}

export default App;
