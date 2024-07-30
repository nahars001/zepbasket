import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetOrderQuery, useUpdateOrderMutation } from '../../redux/api/OrderAPI'
import toast from 'react-hot-toast'
import MetaData from '../../components/MetaData'

const EditOrder = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [orderInfo, setOrderInfo] = useState({
        name: "",
        phoneNo: "",
        email: "",
        orderStatus: "",
        address: "",
        pinCode: "",
        city: "",
        state: "",
        country: "",
        paymentStatus: ""
    })
    const { data, isLoading, isSuccess } = useGetOrderQuery(id)
    const [updateOrder, { data: updateOrderData, isSuccess: updateOrderIsSuccess, isLoading: updateOrderIsLoading, isError: updateOrderIsError, error: updateOrderError }] = useUpdateOrderMutation()



    useEffect(() => {
        if (isSuccess) {
            setOrderInfo({
                name: data.shippingInfo.name,
                phoneNo: data.shippingInfo.phoneNo,
                email: data.shippingInfo.email,
                orderStatus: data.orderInfo.orderStatus,
                address: data.shippingInfo.address,
                pinCode: data.shippingInfo.pinCode,
                city: data.shippingInfo.city,
                state: data.shippingInfo.state,
                country: data.shippingInfo.country,
                paymentStatus: data.paymentInfo.paymentStatus

            })
        }
        if (updateOrderIsError) {
            toast.error(updateOrderError.data.message)
        }

        if (updateOrderIsSuccess) {
            toast.success(updateOrderData.message)
            navigate("/admin/orders")
        }
    }, [isSuccess , updateOrderError, updateOrderIsSuccess])

    const inputHandler = (e) => {
        setOrderInfo({ ...orderInfo, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        await updateOrder({ body: orderInfo, id })
    }

    return (
        <div className="container">
            <MetaData pageName={"Edit Order"} />
            <div className="pt-md-2 pb-2 justify-content-center">
                <div >
                    <p className="text-uppercase fs-4">Edit Order</p>
                    <div className="border auth-form border-1 p-3 ">
                        <form action="" className='row'>
                            <div className="pt-3 col-md-6">
                                <label htmlFor="" className="form-label fw-bold">
                                    Order Status
                                </label>
                                <select
                                    className="form-control rounded-0"
                                    name="orderStatus"
                                    value={orderInfo.orderStatus}
                                    placeholder="Please Enter Your Product Stock"
                                    onChange={(e) => inputHandler(e)}
                                >
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Shipping">Shipping</option>
                                    <option value="Dispatched">Dispatched</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                            <div className="pt-3 col-md-6">
                                <label htmlFor="" className="form-label fw-bold">
                                    Paymnet Status
                                </label>
                                <select
                                    className="form-control rounded-0"
                                    name="paymentStatus"
                                    value={orderInfo.paymentStatus}
                                    placeholder="Please Enter Your Product Stock"
                                    onChange={(e) => inputHandler(e)}
                                >
                                    <option value="Not paid">Not Paid</option>
                                    <option value="Paid">Paid</option>
                                </select>
                            </div>
                            <div className="pt-3 col-md-6">
                                <label htmlFor="" className="form-label fw-bold">
                                    Name
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="text"
                                    name="name"
                                    value={orderInfo.name}
                                    placeholder="Please Enter Your Product Name"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="pt-3 col-md-6">
                                <label htmlFor="" className="form-label fw-bold">
                                    Phone No
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="number"
                                    name="phoneNo"
                                    value={orderInfo.phoneNo}
                                    placeholder="Please Enter Your Product Price"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="pt-3 col-md-6">
                                <label htmlFor="" className="form-label fw-bold">
                                    Email
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="text"
                                    name="email"
                                    value={orderInfo.email}
                                    placeholder="Please Enter Your Product Stock"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="pt-3 col-md-6">
                                <label htmlFor="" className="form-label fw-bold">
                                    Pin code
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="number"
                                    name="pinCode"
                                    value={orderInfo.pinCode}
                                    placeholder="Please Enter Your Pin Code"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="pt-3 col-md-6">
                                <label htmlFor="" className="form-label fw-bold">
                                    Address
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="text"
                                    name="address"
                                    value={orderInfo.address}
                                    placeholder="Please Enter Your Product Stock"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="pt-3 col-md-6">
                                <label htmlFor="" className="form-label fw-bold">
                                    City
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="text"
                                    name="city"
                                    value={orderInfo.city}
                                    placeholder="Please Enter Your Product Stock"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="pt-3 col-md-6">
                                <label htmlFor="" className="form-label fw-bold">
                                    State
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="text"
                                    name="state"
                                    value={orderInfo.state}
                                    placeholder="Please Enter Your Product Stock"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>

                            <div className="pt-3 col-md-6">
                                <label htmlFor="" className="form-label fw-bold">
                                    Coutnry
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="text"
                                    name="country"
                                    value={orderInfo.country}
                                    placeholder="Please Enter Your Product Stock"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="pt-3 col-md-3">
                                <button className="auth-btn bg-gn" disabled={updateOrderIsLoading} onClick={submitHandler}>
                                    Edit Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditOrder
