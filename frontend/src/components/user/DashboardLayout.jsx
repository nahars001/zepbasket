import React from "react";
import Breadcrumb from "./Breadcrumb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLazyLogoutQuery } from "../../redux/api/AuthAPI";

const DashboardLayout = ({ children }) => {
  const [logout, { data, isError, isLoading, isSuccess }] =
    useLazyLogoutQuery();

    const navigate = useNavigate()

  const dashboardList = [
    { name: "Account Info", url: "/account", icon: "fa-solid fa-user" },
    { name: "Orders", url: "/orders", icon: "fa-solid fa-box-open" },
    { name: "Change Password", url: "/password", icon: "fa-solid fa-key" },
    {
      name: "Logout",
      url: "/logout",
      icon: "fa-solid fa-right-from-bracket",
    },
  ];

  const logoutHandler = async () => {
    await logout();
    navigate(0);
  };

  const location = useLocation();
  return (
    <div>
      <Breadcrumb
        breadcrumbLink1={`/dashboard}`}
        breadcrumbLink1Text={"Dashboard"}
        breadcrumbTitle={"Dashboard"}
      />
      <div className="container">
        <div className="row pt-5 pb-5">
          <div className="col-md-3">
            <div className="box-shadow border ps-3 pt-1 ">
              <ul className="list-unstyled mb-0">
                {dashboardList.map((list) => (
                  <li
                    className={`fw-medium pt-1 pb-1 dashboard-li ${location.pathname == `/dashboard${list.url}`
                      ? "dashboard-li-active"
                      : ""
                      }`}
                    key={list.name}
                  >
                    <Link
                      onClick={list?.url == "/logout" ? logoutHandler : ""}
                      to={list?.url == "/logout" ? "" : `/dashboard${list.url}`}
                    >
                      <i class={`${list.icon} pe-1`}></i>
                      {list.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-md-9">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
