import React, { useEffect } from 'react'
import Breadcrumb from '../../components/user/Breadcrumb'
import { useDelateCartMutation, useGetCartQuery, useUpdateCartMutation } from '../../redux/api/CartAPI'
import Loader from "../../components/user/Loader"
import default_image from "../../assets/img/product-default.png";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TotalPriceCalculate from '../../helpers/TotalPriceCalculate';
import MetaData from '../../components/MetaData';

const Cart = () => {
    const { data, isLoading, } = useGetCartQuery()
    const [updateCart, { data: updateCartData, isLoading: updateCartIsLoading, isSuccess, isError, error }] = useUpdateCartMutation()
    const [deleteCart, { data: deleteCartData, isLoading: deleteCartIsLoading, isSuccess: deleteCartIsSuccess, isError: deleteCartIsError, error: deleteCartError
    }] = useDelateCartMutation()
    const { isAuthorized } = useSelector((state) => state.user)

    useEffect(() => {
        if (isError) {
            toast.error(error.data.message);
        }
        if (isSuccess) {
            toast.success(updateCartData.message);
        }
        if (deleteCartError) {
            toast.error(deleteCartError.data.message);
        }
        if (deleteCartIsSuccess) {
            toast.success(deleteCartData.message);
        }
    }, [error, isSuccess, deleteCartIsSuccess, deleteCartError])

    const cartQuantityHandler = async ({ id, e }) => {

        const body = {
            quantity: e.target.value
        }
        console.log(e.target.value);
        await updateCart({ id, body })
    }
    const cartRemoveHandler = async (id) => {
        await deleteCart(id)
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

    if (isLoading) {
        return <Loader />
    }
    if (data?.cart.length == 0) {
        return <>
            <MetaData pageName={"Cart"} />
            <Breadcrumb breadcrumbLink1={"/cart"} breadcrumbLink1Text={"Cart"} breadcrumbTitle={"Cart"} />
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

    const total = TotalPriceCalculate(data?.cart)
    return (
        <div>
            <MetaData pageName={"Cart"} />
            <Breadcrumb breadcrumbLink1={"/cart"} breadcrumbLink1Text={"Cart"} breadcrumbTitle={"Cart"} />
            <div className='container pt-5 pb-5'>

                <div>
                    <table className='table cart-table'>
                        <thead>
                            <tr>
                                <th>IMAGE</th>
                                <th>PRODUCT NAME</th>
                                <th>PRICE</th>
                                <th>QUANTITY</th>
                                <th>TOTAL</th>
                                <th>ACTION</th>

                            </tr>
                        </thead>
                        <tbody>
                            {data?.cart?.map((list) => (
                                <tr key={list?._id}>
                                    <td >{<img
                                        src={list?.image ? list.image : default_image}
                                        alt=""
                                        className=""
                                        width={"40px"}
                                    />}</td>
                                    <td>{list?.name.length >= 20 ? <p>{`${list?.name.slice(0, 20)}...`}</p> : <p>{list?.name}</p>}</td>
                                    <td><p className="fw-bold">${list?.price}</p></td>
                                    <td><input type="number" className='cart-quantity' onChange={(e) => cartQuantityHandler({ id: list._id, e })} value={list?.quantity} /></td>
                                    <td><p className="fw-bold">${list?.quantity * list?.price}</p></td>
                                    <td><Link onClick={() => cartRemoveHandler(list?._id)}><i class="fa-solid fa-xmark text-danger" ></i></Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
                <div className='d-flex align-items-center justify-content-end'>
                    <div className='col-1'><p className='fw-bold'>Total Price :</p></div>
                    <div className='col-2'><p className='fs-5 text-center fw-bold'>{total.subTotal}</p></div>
                </div>
                <div className='d-flex justify-content-between pt-2'>
                    <div><Link to={"/shop"} className='btn btn-gn rounded-0 text-uppercase'>Continue Shopping</Link></div>
                    <div><Link to={"/checkout"} className='btn btn-gn rounded-0 text-uppercase'>Procced To Checkout</Link></div>
                </div>
            </div>
        </div>
    )
}

export default Cart
