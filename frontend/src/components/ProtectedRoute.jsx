import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie'
import Loader from "./user/Loader";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children, admin }) => {
  const { isAuthorized, loading, user } = useSelector((state) => state.user);

  if (loading) {
    return <Loader />
  }

  if (!isAuthorized) {
    return <Navigate to="/login" replace={true} />;
  }

  if (admin && user.role != "admin") {
    toast.error('You dont have permession for this resource')
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
