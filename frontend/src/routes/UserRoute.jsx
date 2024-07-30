import React from "react";
import { Route } from "react-router-dom";
import Home from "../pages/user/Home";
import Login from "../pages/user/Login";
import Signup from "../pages/user/Signup";
import NotFound from "../pages/user/NotFound";
import Shop from "../pages/user/Shop";
import MyAccount from "../pages/user/MyAccount";
import Orders from "../pages/user/Orders";
import Address from "../pages/user/Address";
import ChangePassword from "../pages/user/ChangePassword";
import ProtectedRoute from "../components/ProtectedRoute";
import Cart from "../pages/user/Cart";
import ProductPage from "../pages/user/ProductPage";
import Checkout from "../pages/user/Checkout";
import OrderDetails from "../pages/user/OrderDetails";
import ForgotPassword from "../pages/user/ForgotPassword";
import ResetPassword from "../pages/user/ResetPassword";
import Contact from "../pages/user/Contact";
import About from "../pages/user/About";
import UserLayout from "../components/user/UserLayout";

const UserRoute = () => {
  return (
    <>
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route
          path="/dashboard/account"
          element={
            <ProtectedRoute>
              <MyAccount />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/address"
          element={
            <ProtectedRoute>
              <Address />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
      </Route>
    </>
  );
};

export default UserRoute;
