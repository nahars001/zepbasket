import React from "react";
import DashboardLayout from "../../components/user/DashboardLayout";
import { Link } from "react-router-dom";
import { useGetAllOrderQuery } from "../../redux/api/OrderAPI";
import Loader from "../../components/user/Loader"
import MetaData from "../../components/MetaData";

const Orders = () => {
  const { data, isLoading } = useGetAllOrderQuery()

  if (isLoading) {
    return <DashboardLayout>
      <Loader />
    </DashboardLayout>
  }

  if (data.orders.length == 0) {
    return <DashboardLayout>
      <MetaData pageName={"Orders"} />
      <div className="text-center">
        <p className="fs-1">Your Order is Empty</p>
        <p className="fw-bold">Explore More Shortlist Some Items.</p>
        <Link to={"/"}>
          <button className="btn btn-gn rounded-0 mt-2">Back To Shop</button>
        </Link>
      </div>
    </DashboardLayout>
  }

  return (
    <DashboardLayout>
      <MetaData pageName={"Orders"} />
      <div className="container border pt-1 pb-1">
        <p className="fs-5 fw-bold">My Orders</p>
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Order</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.orders.map((order, index) => (
                <tr className="order-table">
                  <td>{`#${index + 1}`}</td>
                  <td>{order.createdAt.split('T')[0]}</td>
                  <td>{order?.orderInfo?.orderStatus}</td>
                  <td>{`$${order.priceInfo.totalAmount}`}</td>
                  <td><Link className="btn btn-gn" to={`/order/${order._id}`}>View Order</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Orders;
