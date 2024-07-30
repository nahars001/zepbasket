import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/user/Breadcrumb";
import { useForgotPasswordMutation, useLoginMutation } from "../../redux/api/AuthAPI";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MetaData from "../../components/MetaData";

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const navigate = useNavigate();

    const { isAuthorized } = useSelector((state) => state.user);
    const [forgotPassword, { data, isError, isLoading, isSuccess, error }] =
        useForgotPasswordMutation();

    useEffect(() => {
        if (isError) {
            toast.error(error.data.message);

        }
        if (isSuccess) {
            setEmail("");
            toast.success(data.message);
        }
    }, [isError, isSuccess]);
    const inputHandler = (e) => {
        setEmail(e.target.value);
    };
    const resetHanlder = async (e) => {
        e.preventDefault();
        await forgotPassword({ body: { email } });
    };
    if (isAuthorized) {
        return navigate("/")
    }

    return (
        <div>
            <MetaData pageName={"Forgot Password"} />
            <Breadcrumb
                breadcrumbTitle={"Forgot Password"}
                breadcrumbLink1Text={"Forgot Password"}
                breadcrumbLink1={"#"}
            />

            <div className="container">
                <div className="row pt-5 pb-5 justify-content-center">
                    <div className="col-md-6">
                        <h2 className="text-uppercase">Forgot Password</h2>
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
                                        value={email}
                                        placeholder="Please Enter Your Email"
                                        onChange={(e) => inputHandler(e)}
                                    />
                                </div>
                                <div className="pt-3">
                                    <button className="auth-btn bg-gn" onClick={resetHanlder}>
                                        Forogot Password
                                    </button>
                                </div>
                            </form>
                            <div className="pt-3">
                                <p className="text-center text-black mb-0">
                                    Already have account?{" "}
                                    <Link
                                        href="/login"
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

export default ForgotPassword;
