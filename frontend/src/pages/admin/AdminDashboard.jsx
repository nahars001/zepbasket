import React from 'react'
import AnalyticEcommerce from '../../components/admin/AnalyticEcommerce'
import { useAdminDashboardQuery } from '../../redux/api/AdminAPI'
import Loader from "../../components/user/Loader"



const AdminDashboard = () => {

  const { data, isLoading } = useAdminDashboardQuery()
  if (isLoading) {
    return <Loader />
  }

  return (
    <div className='container'>
      <p className='fs-3'>Dashboard</p>
      <div className='row m-0'>
        <AnalyticEcommerce title={"No Of Orders"} number={data.noOfOrders} />
        <AnalyticEcommerce title={"No Of Product"} number={data.noOfProducts} />
        <AnalyticEcommerce title={"No Of Users"} number={data.noOfUsers} />
        <AnalyticEcommerce title={"Total Sales"} number={`$${data.totalSales}`} />
      </div>
      <div className="row">
        <div className="col-md-8">
          
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
