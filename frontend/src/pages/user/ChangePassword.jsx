import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/user/DashboardLayout";
import { useUpdatePasswordMutation } from "../../redux/api/UserAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MetaData from "../../components/MetaData";

const ChangePassword = () => {

  const navigate = useNavigate()
  const [pass, setPass] = useState(
    {
      password: "",
      cPassword: "",
      newPassword: ""
    })
  const inputHandler = (e) => {
    setPass({ ...pass, [e.target.name]: e.target.value })
  }
  const [updatePassword, { isError, error, isSuccess, data }] = useUpdatePasswordMutation()

  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
    if (isSuccess) {
      toast.success(data.message);
      setPass({
        password: "",
        cPassword: "",
        newPassword: ""
      })
      navigate("/dashboard/account")
      
    }
  }, [error, isSuccess])
  const submitHandler = async (e) => {
    e.preventDefault()
    await updatePassword({ body: pass })
  }
  return (
    <DashboardLayout>
      <MetaData pageName={"Change Password"} />
      <div className="container border pt-1 pb-1">
        <p className="fs-5 fw-bold pb-2">Change Password</p>
        <form action="">
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="" className="form-label">
                Old Password
              </label>
              <input
                type="text"
                className="form-control dashboard-from-control"
                name="password"
                id=""
                value={pass.password}
                onChange={(e) => inputHandler(e)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="" className="form-label">
                New Password
              </label>
              <input
                type="text"
                className="form-control dashboard-from-control"
                name="newPassword"
                id=""
                value={pass.newPassword}
                onChange={(e) => inputHandler(e)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="" className="form-label">
                Re-enter New Password
              </label>
              <input
                type="text"
                className="form-control dashboard-from-control"
                name="cPassword"
                id=""
                value={pass.cPassword}
                onChange={(e) => inputHandler(e)}
              />
            </div>
          </div>
          <button className="btn btn-gn rounded-0 mt-2 mb-1" onClick={submitHandler}>Change Password</button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default ChangePassword;
