import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/user/Breadcrumb";
import { useLoginMutation } from "../../redux/api/AuthAPI";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MetaData from "../../components/MetaData";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { isAuthorized } = useSelector((state) => state.user);
  const [login, { data, isError, isLoading, isSuccess, error }] =
    useLoginMutation();
  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
    if (isSuccess) {
      toast.success(data.message);
    }

    isAuthorized && navigate("/");
  }, [isAuthorized, isError]);
  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const loginHandler = async (e) => {
    e.preventDefault();
    await login({ body: user });
  };
  return (
    <div>
      <MetaData pageName={"Login"} />
      <Breadcrumb
        breadcrumbTitle={"Login"}
        breadcrumbLink1Text={"Login"}
        breadcrumbLink1={"/login"}
      />

      <div className="container">
        <div className="row pt-5 pb-5 justify-content-center">
          <div className="col-md-6">
            <h2 className="text-uppercase">Sign In</h2>
            <div className="border auth-form border-1 p-3 ">
              <form action="">
                <div className="pt-3">
                  <label htmlFor="" className="form-label fw-bold">
                    Email Address
                  </label>
                  <input
                    className="form-control rounded-0"
                    type="email"
                    name="email"
                    placeholder="Please Enter Your Email"
                    onChange={(e) => inputHandler(e)}
                  />
                </div>
                <div className="pt-3">
                  <label htmlFor="" className="form-label fw-bold">
                    Password
                  </label>
                  <input
                    className="form-control rounded-0"
                    type="password"
                    name="password"
                    placeholder="Please Enter Your Password"
                    onChange={(e) => inputHandler(e)}
                  />
                  <p className="mb-0 pt-1">
                    <Link className="text-decoration-none text-danger" to="/password/forgot">
                      Forgot Password?
                    </Link>
                  </p>
                </div>
                <div className="pt-3">
                  <button className="auth-btn bg-gn" onClick={loginHandler}>
                    Sign In
                  </button>
                </div>
              </form>
              <div className="pt-3">
                <p className="text-center text-black mb-0">
                  Don't have account?{" "}
                  <Link
                    to={"/register"}
                    className="text-decoration-none fw-medium text-gn"
                  >
                    Signup here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
