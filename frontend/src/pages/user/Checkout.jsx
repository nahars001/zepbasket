import React, { useState } from 'react'
import Breadcrumb from '../../components/user/Breadcrumb'
import CheckoutDetails from '../../components/user/CheckoutDetails'
import Loader from '../../components/user/Loader'
import { useGetCartQuery } from '../../redux/api/CartAPI'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MetaData from '../../components/MetaData'

const Checkout = () => {

    const { data, isLoading, } = useGetCartQuery()
    
    const { isAuthorized } = useSelector((state) => state.user)

    const [shippingInfo, setShippingInfo] = useState({
        name: "",
        email: "",
        phoneNo: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
        landmark: "",
        note: ""
    })

    const inuptHandler = (e) => {
        setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value })

    }

    if (isLoading) {
        return <Loader />
    }

    if (data?.cart.length == 0) {
        return <>
            <Breadcrumb breadcrumbLink1={"/checkout"} breadcrumbLink1Text={"Checkout"} breadcrumbTitle={"Checkout"} />
            <div className='container pt-5 pb-5' >

                <div className="text-center">
                    <p className="fs-1">Your Cart is Empty</p>
                    <p className="fw-bold">Explore More Shortlist Some Items.</p>
                    <Link to={"/"}>
                        {" "}
                        <button className="btn btn-gn rounded-0 mt-2">Back To Shop</button>
                    </Link>
                </div></div>
        </>
    }

    if (!isAuthorized) {
        return <>
            <Breadcrumb breadcrumbLink1={"/checkout"} breadcrumbLink1Text={"Checkout"} breadcrumbTitle={"Checkout"} />
            <div className='container pt-5 pb-5' >

                <div className="text-center">
                    <p className="fs-1">Please Login First To See Cart</p>
                    <p className="fw-bold">Explore More Shortlist Some Items.</p>
                    <Link to={"/"}>
                        {" "}
                        <button className="btn btn-gn rounded-0 mt-2">Back To Shop</button>
                    </Link>
                </div></div>
        </>
    }

    return (
        <div>
            <MetaData pageName={"Checkout"} />
            <Breadcrumb breadcrumbLink1={"/checkout"} breadcrumbLink1Text={"Checkout"} breadcrumbTitle={"Checkout"} />
            <div className='container pt-5 pb-5'>
                <div className="row">
                    <div className="col-md-6">
                        <p className='fs-4 pb-2'>Shipping Details</p>
                        <form className='row' action="">
                            <div className='col-md-6 pt-3'><label className='form-label' htmlFor="">Full Name</label>
                                <input className='form-control rounded-0' name='name' onChange={(e) => inuptHandler(e)} type="text" /></div>

                            <div className='col-md-6 pt-3'><label className='form-label' htmlFor="">Phone No</label>
                                <input className='form-control rounded-0' name='phoneNo' onChange={(e) => inuptHandler(e)} type="number" /></div>

                            <div className='col-md-6 pt-3'><label className='form-label' htmlFor="">Email</label>
                                <input className='form-control rounded-0' name='email' onChange={(e) => inuptHandler(e)} type="email" /></div>

                            <div className='col-md-6 pt-3'><label className='form-label' htmlFor="">Address</label>
                                <input className='form-control rounded-0' name='address' onChange={(e) => inuptHandler(e)} type="text" /></div>

                            <div className='col-md-6 pt-3'><label className='form-label' htmlFor="">City</label>
                                <input className='form-control rounded-0' name='city' onChange={(e) => inuptHandler(e)} type="text" /></div>

                            <div className='col-md-6 pt-3'><label className='form-label' htmlFor="">Country</label>
                                <input className='form-control rounded-0' name='country' onChange={(e) => inuptHandler(e)} type="text" /></div>

                            <div className='col-md-6 pt-3'><label className='form-label' htmlFor="">State</label>
                                <input className='form-control rounded-0' name='state' onChange={(e) => inuptHandler(e)} type="text" /></div>

                            <div className='col-md-6 pt-3'><label className='form-label' htmlFor="">Pin Code</label>
                                <input className='form-control rounded-0' name='pinCode' onChange={(e) => inuptHandler(e)} type="text" /></div>

                            <div className='col-md-6 pt-3'><label className='form-label' htmlFor="">Landmark</label>
                                <input className='form-control rounded-0' name='landmark' onChange={(e) => inuptHandler(e)} type="text" /></div>

                            <div className='col-md-6 pt-3'><label className='form-label' htmlFor="">Note</label>
                                <input className='form-control rounded-0' name='note' onChange={(e) => inuptHandler(e)} type="text" /></div>
                        </form>
                    </div>
                    <CheckoutDetails shippingInfo={shippingInfo} />
                </div>
            </div>
        </div>
    )
}

export default Checkout
