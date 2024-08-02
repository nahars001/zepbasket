import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/user/Breadcrumb";
import { useRegisterMutation } from "../../redux/api/AuthAPI";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import MetaData from "../../components/MetaData";

const Signup = () => {

  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNo: "",
    password: "",
    c_password: "",
  });

  const [register, { data, error, isError, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
    if (isSuccess) {
      toast.success(data.message);
      navigate("/")
    }
  }, [isError, isSuccess]);
  const inputHandle = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    await register({ body: user });
  };
  return (
    <div>
      <MetaData pageName={"Sign Up"} />
      <Breadcrumb
        breadcrumbTitle={"Sign Up"}
        breadcrumbLink1Text={"Sign Up"}
        breadcrumbLink1={"/register"}
      />

      <div className="container">
        <div className="row pt-5 pb-5 justify-content-center">
          <div className="col-md-6">
            <h2 className="text-uppercase">Create An Account</h2>
            <div className="border auth-form border-1 p-3 ">
              <form action="">
                <div className="pt-3">
                  <label htmlFor="" className="form-label fw-bold">
                    Name
                  </label>
                  <input
                    className="form-control rounded-0"
                    type="text"
                    name="name"
                    placeholder="Please Enter Your Name"
                    onChange={(e) => inputHandle(e)}
                  />
                </div>
                <div className="pt-3">
                  <label htmlFor="" className="form-label fw-bold">
                    Email Address
                  </label>
                  <input
                    className="form-control rounded-0"
                    type="email"
                    name="email"
                    placeholder="Please Enter Your Email"
                    onChange={(e) => inputHandle(e)}
                  />
                </div>
                <div className="pt-3">
                  <label htmlFor="" className="form-label fw-bold">
                    Phone No<sup className="text-danger">*</sup>
                  </label>
                  <input
                    className="form-control rounded-0"
                    type="number"
                    name="phoneNo"
                    placeholder="Please Enter Your Phone Number"
                    onChange={(e) => inputHandle(e)}
                  />
                </div>
                <div className="pt-3">
                  <label htmlFor="" className="form-label fw-bold">
                    Password<sup className="text-danger">*</sup>
                  </label>
                  <input
                    className="form-control rounded-0"
                    type="password"
                    name="password"
                    placeholder="Please Enter Your Password"
                    onChange={(e) => inputHandle(e)}
                  />
                </div>
                <div className="pt-3">
                  <label htmlFor="" className="form-label fw-bold">
                    Confirm Password<sup className="text-danger">*</sup>
                  </label>
                  <input
                    className="form-control rounded-0"
                    type="password"
                    name="c_password"
                    placeholder="Please Enter Your Confirm Password"
                    onChange={(e) => inputHandle(e)}
                  />
                </div>
                <div className="pt-3">
                  <button className="auth-btn bg-gn" onClick={submitHandler}>
                    Sign Up
                  </button>
                </div>
              </form>
              <div className="pt-3">
                <p className="text-center text-black mb-0">
                  Already have account?{" "}
                  <Link
                    to={"/login"}
                    className="text-decoration-none fw-medium text-gn"
                  >
                    Signin here
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

export default Signup;
