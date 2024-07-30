import React, { useEffect, useState } from 'react'
import { useGetCartQuery } from '../../redux/api/CartAPI'
import TotalPriceCalculate from '../../helpers/TotalPriceCalculate'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from "react-hot-toast"
import { useCreateOrderMutation } from '../../redux/api/OrderAPI'

const CheckoutDetails = ({ shippingInfo }) => {
    const { data } = useGetCartQuery()
    const { user } = useSelector((state) => state.user)
    const [createOrder, { data: createOrderData, isLoading, isError, isSuccess, error }] = useCreateOrderMutation()
    const navigate = useNavigate()
    const [paymentMethod, setPaymentMethod] = useState("COD")

    useEffect(() => {
        if (isSuccess) {
            toast.success("Order Successfully Placed")
            navigate("/dashboard/orders")
        }
        if (isError) {
            toast.error("Can't Place Order")
        }
    })
    const total = TotalPriceCalculate(data?.cart)

    const orderItems = []


    const orderInfoSet = () => {
        data.cart.map((item) => {
            orderItems.push({ productId: item._id, name: item.name, price: item.price, quantity: item.quantity })
        })
    }

    const paymentMethodHandler = (method) => {
        setPaymentMethod(method)
    }
    const btnhandler = async () => {
        if (shippingInfo.name == "") {
            return toast.error("Please Enter Your Name")
        }
        if (shippingInfo.address == "") {
            return toast.error("Please Enter Your Address")
        }
        if (shippingInfo.email == "") {
            return toast.error("Please Enter Your Email")
        }
        if (shippingInfo.phoneNo == "") {
            return toast.error("Please Enter Your Phone No")
        }
        if (shippingInfo.name == "") {
            return toast.error("Please Enter Your Name")
        }
        if (shippingInfo.pinCode == "") {
            return toast.error("Please Enter Your Pin Code")
        }
        if (shippingInfo.country == "") {
            return toast.error("Please Enter Your Country")
        }
        if (shippingInfo.city == "") {
            return toast.error("Please Enter Your City")
        }
        if (shippingInfo.state == "") {
            return toast.error("Please Enter Your state")
        }
        if (shippingInfo.country == "") {
            return toast.error("Please Enter Your Country")
        }

        orderInfoSet()
        const body = {
            shippingInfo: shippingInfo,
            priceInfo: total,
            orderItems,
            paymentInfo: {
                paymentStatus: "Not paid",
                paymentMethod: paymentMethod
            }, orderInfo: {
                orderStatus: "Processing"
            }, userInfo: {
                userId: user._id,
                userName: user.name
            }
        }

        if (paymentMethod == "COD") {
            await createOrder({ body })
        }

        if (paymentMethod == "Online") {
            toast("Online Payment Method Not Available Right Now")
        }

    }

    return (
        <div className='col-md-6 bg-body-tertiary border'>
            <div className='m-4'>
                <table className='table table-trans'>
                    <thead>
                        <tr><th><p>NAME</p></th>
                            <th><p>QTY</p></th>
                            <th><p className='text-danger text-end'>TOTAL</p></th></tr>
                    </thead>
                    <tbody>
                        {data?.cart.map((list) => (<tr key={list._id}>
                            <td>{list?.name.length >= 20 ? <p>{`${list?.name.slice(0, 20)}...`}</p> : <p>{list?.name}</p>}</td>
                            <td>${`${list?.price} x ${list?.quantity}`}</td>
                            <td><p className='text-danger text-end fw-bold'>${list?.price * list?.quantity}</p></td>
                        </tr>))}
                    </tbody>
                </table>
                <div className='row'>
                    <p className='col-md-6'>Subtotal</p>
                    <p className='col-md-6 text-end'>${total.subTotal}</p>
                </div>
                <div className='row'>
                    <p className='col-md-6'>Tax(18%)</p>
                    <p className='col-md-6 text-end'>${total.taxAmount}</p>
                </div>
                <div className='row'>
                    <p className='col-md-6'>Shipping Charge</p>
                    <p className='col-md-6 text-end'>${total.shippingAmount}</p>
                </div>
                <hr />
                <div className='row'>
                    <p className='col-md-6'>Total</p>
                    <p className='col-md-6 text-end fw-bold text-danger'>${total.totalAmount}</p>
                </div>
                <hr />
                <div>
                    <p className='fs-5 pb-2'>Payment Method</p>
                    <div className='row'>
                        <div className='col-6'>
                            <input type="radio" name="payment_method" sel id="COD" value={"COD"} defaultChecked onClick={() => paymentMethodHandler("COD")} />
                            <label className='ps-1' htmlFor="COD">Cash On Delivery</label>
                        </div>
                        <div className='col-6'>
                            <input type="radio" name="payment_method" id="Online" value={"Online"} onClick={() => paymentMethodHandler("Online")} />
                            <label className='ps-1' htmlFor="COD">Online</label>
                        </div>
                    </div>

                </div>
                <div className="row pt-4">
                    <div className="col-md-6"><Link to={"/cart"} className='btn btn-gn rounded-0 text-uppercase'>Back To Cart</Link></div>
                    <div className="col-md-6 text-end"><Link onClick={btnhandler} className='btn btn-gn rounded-0 text-uppercase'>Place Order</Link></div>
                </div>

            </div>
        </div>
    )
}

export default CheckoutDetails
