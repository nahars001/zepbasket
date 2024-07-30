import React from "react";
import UserRoute from "./routes/UserRoute";
import "./assets/css/style.css";
import "mdbreact/dist/css/mdb.css"
import { Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AdminRoute from "./routes/AdminRoute";

const App = () => {
  const userRoute = UserRoute()
  const adminRoute = AdminRoute()

  return (
    <div>
      <Toaster position="top-center"/>
      <Routes>
        {userRoute}
        {adminRoute}
      </Routes>
    </div>
  );
};

export default App;
