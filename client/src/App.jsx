import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./components/Auth/AuthLayout";
import Login from "./Pages/Auth/Login.jsx";
import ShopLayout from "./components/Shop/ShopLayout.jsx";
import ShopHome from "./Pages/Shop/ShopHome.jsx";
import CheckAuth from "./components/Common/CheckAuth.jsx";
import AdminLayout from "./components/Admin/AdminLayout.jsx";
import AdminDashboard from "./Pages/Admin/AdminDashboard.jsx";
import UnAuthPage from "./Pages/NotFound/UnAuthPage.jsx";
import NotFound from "./Pages/NotFound/NotFound.jsx";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../store/Auth/authSlice.js";
import ChangePassword from "./Pages/Auth/ChangePassword.jsx";
import Register from "./Pages/Auth/Register.jsx";
import { Toaster } from "sonner";
const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" />} />
        {/* Login routes */}
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

        {/* Shop routes */}
        <Route
          path="shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShopLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShopHome />} />
        </Route>

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
        <Route path="/unauth-page" element={<UnAuthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
