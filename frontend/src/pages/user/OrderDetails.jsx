import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetOrderQuery } from '../../redux/api/OrderAPI'
import Breadcrumb from '../../components/user/Breadcrumb'
import Loader from '../../components/user/Loader'
import OrderProductInfo from '../../components/user/OrderProductInfo'
import MetaData from '../../components/MetaData'

const OrderDetails = () => {

    const { id } = useParams()
    const { data, isLoading } = useGetOrderQuery(id)

    if (isLoading) {
        return <>
            <Breadcrumb breadcrumbLink1={`/order/${id}`} breadcrumbLink1Text={"Order Page"} breadcrumbTitle={"Order Page"} />
            <Loader />
        </>
    }


    return (
        <div>
            <MetaData pageName={"Orders"} />
            <Breadcrumb breadcrumbLink1={`/order/${id}`} breadcrumbLink1Text={"Order Page"} breadcrumbTitle={"Order Page"} />
            <div className="container pt-5 pb-5">
                <div className="row">
                    <div className="col-md-6">
                        <div className='row m-4'>
                            <div className="col-md-6">
                                <p className='fs-4'>Shipping Info</p>
                                <p className='fw-bold'>{data.shippingInfo.name}</p>
                                <p>{data.shippingInfo.email}</p>
                                <p >{data.shippingInfo.phoneNo}</p>
                                <div className="pt-2">
                                    <p className='fw-bold'>Address</p>
                                    <p >{data.shippingInfo.address1}</p>
                                    <p >{data.shippingInfo.address2}</p>
                                    <p className='d-inline-block'>{data.shippingInfo.city},</p>
                                    <p className='d-inline-block ps-1'>{data.shippingInfo.state},</p>
                                    <p className=' d-inline-block ps-1'>{data.shippingInfo.country}</p>
                                    <p >{data.shippingInfo.pinCode}</p>
                                    {data?.landmark ? <p>Landmark : {data?.landmark}</p> : ""}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <p className='fs-4'>Billing Info</p>
                                <p className='fw-bold'>{data.shippingInfo.name}</p>
                                <p>{data.shippingInfo.email}</p>
                                <p >{data.shippingInfo.phoneNo}</p>
                                <div className="pt-2">
                                    <p className='fw-bold'>Address</p>
                                    <p >{data.shippingInfo.address1}</p>
                                    <p >{data.shippingInfo.address2}</p>
                                    <p className='d-inline-block'>{data.shippingInfo.city},</p>
                                    <p className='d-inline-block ps-1'>{data.shippingInfo.state},</p>
                                    <p className=' d-inline-block ps-1'>{data.shippingInfo.country}</p>
                                    <p >{data.shippingInfo.pinCode}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <OrderProductInfo />
                </div>
            </div>
        </div>
    )
}

export default OrderDetails
