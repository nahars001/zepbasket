import React from 'react'
import {  useParams } from 'react-router-dom'
import { useGetOrderQuery } from '../../redux/api/OrderAPI'

const OrderProductInfo = () => {
    const { id } = useParams()
    const { data, isLoading } = useGetOrderQuery(id)
    return (
        <div className='col-md-6 bg-body-tertiary border'>
            <div className='m-4'>
                <div className="row">
                    <p className='fs-5 col-6 fw-bold'>Order Status</p>
                    <p className={`fs-5 col-6 text-end fw-bold ${data.orderInfo.orderStatus == "Cancelled" ? "text-danger" : "text-success"}`} >{data.orderInfo.orderStatus}</p>
                </div>
                <p className='fs-5 fw-bold'>Product Info</p>
                <table className='table table-trans'>
                    <thead>
                        <tr><th><p>NAME</p></th>
                            <th><p>QTY</p></th>
                            <th><p className='text-danger text-end'>TOTAL</p></th></tr>
                    </thead>
                    <tbody>
                        {data?.orderItems.map((order) => (<tr>
                            <td>{order?.name.length >= 20 ? <p>{`${order?.name.slice(0, 20)}...`}</p> : <p>{order?.name}</p>}</td>
                            <td>${`${order?.price} x ${order?.quantity}`}</td>
                            <td><p className='text-danger text-end fw-bold'>${order?.price * order?.quantity}</p></td>
                        </tr>))}
                    </tbody>
                </table>
                <div className='row'>
                    <p className='col-md-6'>Subtotal</p>
                    <p className='col-md-6 text-end'>${data.priceInfo.subTotal}</p>
                </div>
                <div className='row'>
                    <p className='col-md-6'>Tax(18%)</p>
                    <p className='col-md-6 text-end'>${data.priceInfo.taxAmount}</p>
                </div>
                <div className='row'>
                    <p className='col-md-6'>Shipping Charge</p>
                    <p className='col-md-6 text-end'>${data.priceInfo.shippingAmount}</p>
                </div>
                <hr />
                <div className='row'>
                    <p className='col-md-6'>Total</p>
                    <p className='col-md-6 text-end fw-bold text-danger'>${data.priceInfo.totalAmount}</p>
                </div>
            </div>
        </div>
    )
}

export default OrderProductInfo
