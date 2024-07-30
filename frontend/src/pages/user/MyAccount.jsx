import React from "react";
import DashboardLayout from "../../components/user/DashboardLayout";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MetaData from "../../components/MetaData";

const MyAccount = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <DashboardLayout>
      <MetaData pageName={"My Account"} />
      <div className="border ps-3 pt-1 pb-1">
        <p className="fs-5 text-uppercase fw-bold">My Account</p>
        <p style={{ fontSize: "14px" }} className="">
          Hello, <span className="fw-bold">{user?.name || "User"}</span> ! <br></br> From your My Account
          Dashboard you have the ability to view a snapshot of your recent
          account activity and update your account information. Select a link
          below to view or edit information.
        </p>

        <div className="pt-2">
          <div className="row">
            <div className="col-md-6 my-account-contact">
              <p className="fs-5  fw-bold">Account Info</p>
              <div className="row">
                <div className="col-md-6">
                  <p style={{ fontSize: "14px" }}>Contact Information</p>
                </div>
                <div className="col-md-6 text-end">
                  <Link className="text-gn" style={{ fontSize: "14px" }}>
                    Edit Information
                  </Link>
                </div>
              </div>
              <hr />
              <p className="text-uppercase" style={{ fontSize: "14px" }}>
                {user?.name}
              </p>
              <p style={{ fontSize: "14px" }} className="">
                {user?.email}
              </p>
              <p style={{ fontSize: "14px" }} className="">
                {user?.phoneNo}
              </p>
              <Link to="" className="text-gn" style={{ fontSize: "14px" }}>
                Change Password
              </Link>
            </div>
            <div className="col-md-6 my-account-contact">
              <p className="fs-5  fw-bold">Address</p>
              <div className="row">
                <div className="col-md-6">
                  <p style={{ fontSize: "14px" }}>Default Shipping Address</p>
                </div>
                <div className="col-md-6 text-end">
                  <Link className="text-gn" style={{ fontSize: "14px" }}>
                    Manage Addresses
                  </Link>
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyAccount;
