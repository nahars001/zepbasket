import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MDBDataTable } from "mdbreact"
import Loader from "../../components/user/Loader"
import { useGetAllAdminOrderQuery } from '../../redux/api/OrderAPI'
import MetaData from '../../components/MetaData'

const AllOrders = () => {

  const navigate = useNavigate()
  const { data, isLoading } = useGetAllAdminOrderQuery()

  const productData = {
    columns: [
      {
        label: "Order ID",
        field: "id",
        sort: "asc",
      },
      {
        label: "User Name",
        field: "username",
        sort: "asc",
      },
      {
        label: "User Email",
        field: "email",
        sort: "asc",
      },
      {
        label: "SubTotal",
        field: "subtotal",
        sort: "asc",
      },
      {
        label: "Total",
        field: "total",
        sort: "asc"
      },

      {
        label: "Order Status",
        field: "status",
        sort: "asc"
      },
      {
        label: "Actions",
        field: "actions",
        sort: "disabled",
      },

    ],

    rows: []
  }

  data?.orders?.map((order, index) => {

    productData?.rows.push({
      id: order._id,
      username: order.shippingInfo.name,
      email: order.shippingInfo.email.length > 15 ? `${order.shippingInfo.email.substring(0, 15)}...` : order.shippingInfo.email,
      subtotal: order.priceInfo.subTotal,
      total: order.priceInfo.totalAmount,
      status: <p className={`fw-bold ${order.orderInfo.orderStatus == "Cancelled" ? "text-danger" : "text-success"}`} >{order.orderInfo.orderStatus}</p>,
      actions: (<>
        <button className='btn btn-success ms-2' onClick={() => navigate(`/order/${order._id}`)}>
          <i className='fa-solid fa-eye'></i>
        </button>
        <button className='btn btn-primary ms-2' onClick={() => navigate(`/admin/order/${order._id}`)}>
          <i className='fa-solid fa-pencil'></i>
        </button>
        <button className='btn btn-danger ms-2'>
          <i className='fa-solid fa-trash'></i>
        </button>
      </>
      ),


    })
  })


  if (isLoading) {
    return <Loader />
  }

  return (
    <div className='container pt-2'>
      <MetaData pageName={"All Orders"} />
      <div className='d-flex justify-content-between'>
        <p className='fs-4'>All Orders</p>
      </div>
      <div className='mt-2'>
        <MDBDataTable striped bordered hover data={productData} />
      </div>
    </div>
  )
}

export default AllOrders
