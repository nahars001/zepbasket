import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/user/Breadcrumb";
import { useLoginMutation, useResetVerifyTokenQuery } from "../../redux/api/AuthAPI";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../components/user/Loader";
import MetaData from "../../components/MetaData";

const ResetPassword = () => {
    const [password, setPassword] = useState({
        password: "",
        c_password: ""
    });
    const navigate = useNavigate();
    const { token } = useParams()

    const { isAuthorized } = useSelector((state) => state.user);
    const { data: verifyTokenData, isLoading: verifyTokenIsLoading, isSuccess: verifyTokenIsSuccess, isError: verifyTokenIsError, error: verifyTokenError } = useResetVerifyTokenQuery(token)
    const [login, { data, isError, isLoading, isSuccess, error }] =
        useLoginMutation();
    useEffect(() => {
        if (isError) {
            toast.error(error.data.message);
        }
        if (isSuccess) {
            toast.success(data.message);
        }
        if (verifyTokenIsError) {
            toast.error(verifyTokenError.data.message);
            navigate("/password/forgot")
        }

    }, [isSuccess, isError, verifyTokenIsError]);
    const inputHandler = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    };
    const resetHandler = async (e) => {
        e.preventDefault();
        await login({ body: password });
    };
    if (isAuthorized) {
        return navigate("/")
    }
    if (verifyTokenIsLoading) {
        return <Loader />
    }
    return (
        <div>
            <MetaData pageName={"Reset Password"} />
            <Breadcrumb
                breadcrumbTitle={"Reset Password"}
                breadcrumbLink1Text={"Reset Password"}
                breadcrumbLink1={"#"}
            />

            <div className="container">
                <div className="row pt-5 pb-5 justify-content-center">
                    <div className="col-md-6">
                        <h2 className="text-uppercase">Reset Password</h2>
                        <div className="border auth-form border-1 p-3 ">
                            <form action="">
                                <div className="pt-3">
                                    <label htmlFor="" className="form-label fw-bold">
                                        Password
                                    </label>
                                    <input
                                        className="form-control rounded-0"
                                        type="password"
                                        name="password"
                                        value={password.password}
                                        placeholder="Please Enter Your Email"
                                        onChange={(e) => inputHandler(e)}
                                    />
                                </div>
                                <div className="pt-3">
                                    <label htmlFor="" className="form-label fw-bold">
                                        Confirm Password
                                    </label>
                                    <input
                                        className="form-control rounded-0"
                                        type="password"
                                        name="c_password"
                                        value={password.c_password}
                                        placeholder="Please Enter Your Password"
                                        onChange={(e) => inputHandler(e)}
                                    />
                                </div>
                                <div className="pt-3">
                                    <button className="auth-btn bg-gn" onClick={resetHandler}>
                                        Reset Password
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

export default ResetPassword;
