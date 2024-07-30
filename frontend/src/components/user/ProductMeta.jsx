import React, { useEffect, useState } from 'react'
import { useCreateCartMutation, useUpdateCartMutation } from '../../redux/api/CartAPI'
import toast from 'react-hot-toast'
import StarRatings from 'react-star-ratings'

const ProductMeta = ({ name, price, description, productId, noOfReview, stock }) => {
    const [updateCart, { data: updateCartData, isError: updateCartIsError, error: updateCartError, isSuccess: updateCartIsSuccess }] = useUpdateCartMutation()
    const [createCart, { data: createCartData, isError: createCartIsError, error: createCartError, isSuccess: createCartIsSuccess }] = useCreateCartMutation()
    const [cartQty, setCartQty] = useState(1)
    useEffect(() => {
        if (createCartIsSuccess) {
            toast.success(createCartData.message)
        }
        if (updateCartIsSuccess) {
            toast.success(updateCartData.message)
        }
        if (updateCartIsError) {
            toast.error(updateCartError?.data.message)
        }
        if (createCartIsError) {
            toast.error(createCartError?.data.message)
        }
    }, [createCartIsSuccess, updateCartIsSuccess, updateCartIsError, createCartIsError])
    const addToCart = async (e) => {
        e.preventDefault()
        const body = {
            productId,
            name,
            price,
            quantity: cartQty
        }
        console.log(body);
        await createCart({ body })
    }
    const increaseQty = async () => {
        if (cartQty <= stock) {
            setCartQty(cartQty + 1)
        }
    }

    const decreaseQty = () => {
        if (cartQty != 1) {
            setCartQty(cartQty - 1)

        }

    }
    return (
        <>
            <div>
                <p className='fs-3 text-uppercase'>{name}</p>
                <p className='fs-4 text-danger'>${price}</p>
                <div className="border-top border-bottom mt-2 mb-2">
                    <p className='fw-bold pt-2'>Product Description</p>
                    <p className='pt-1'>{description}</p>

                    <p className='pt-1 pb-1 text-uppercase fw-bold' style={{ fontSize: "13px" }}>Quantity</p>
                    <div className='cart-qty d-flex' >
                        <div className='cart-qty-update-btn cart-qty-update-btn-left' onClick={decreaseQty}><i class="fa-solid fa-chevron-left text-secondary"></i></div>
                        <div className='cart-qty-number'><p>{cartQty}</p></div>
                        <div className='cart-qty-update-btn cart-qty-update-btn-right' onClick={increaseQty}><i class="fa-solid fa-chevron-right text-secondary"></i></div>
                    </div>
                    <button className='btn btn-gn rounded-0 mt-2 mb-2 m-0 text-white' onClick={addToCart}>Add To Cart</button>

                </div>
                <div className='product-page-social-icon pb-2 border-bottom'>
                    <p className='fw-bold'>Share It</p>
                    <i className='fa-brands fa-facebook'></i>
                    <i className='fa-brands fa-instagram'></i>
                    <i className='fa-brands fa-twitter'></i>
                    <i className='fa-brands fa-whatsapp'></i>
                </div>
                <div className='product-page-review-icon pt-2 pb-2 border-bottom'>
                    <p className='fw-bold'>Review</p>

                    {noOfReview === 0 ? <p>No reviews yet</p> : <><StarRatings
                        starSpacing={"5px"}
                        starDimension={"16px"} /></>}
                </div>
            </div>
        </>
    )
}

export default ProductMeta
