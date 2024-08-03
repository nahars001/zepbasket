import React, { useEffect } from "react";
import StarRatings from "react-star-ratings";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useCreateCartMutation, useGetCartQuery } from "../../redux/api/CartAPI";
import { useGetProductQuery } from "../../redux/api/ProductAPI";
import Loader from "./Loader";

const ShopProduct = () => {
  const navigate = useNavigate()

  const { isAuthorized } = useSelector((state) => state.user)

  
  
  
  const { data, isError, isLoading } = useGetProductQuery();
  const [createCart, { data: createCartData, isError: createCartIsError, error: createCartError, isSuccess: createCartIsSuccess }] = useCreateCartMutation()
  const { data: getCartData, isError: getCartIsError, error: getCartError, isSuccess: getCartIsSuccess } = useGetCartQuery()
  const addToCart = async ({ e, productId, name, price }) => {
    e.preventDefault()

    if (!isAuthorized) {
      toast("Please Login First")
    } else {
      const body = {
        productId,
        name, price,
        quantity: 1
      }

      await createCart({ body })
    }
  }
  useEffect(() => {
    if (createCartIsSuccess) {
      toast.success(createCartData.message)
    }
    if (createCartIsError) {
      toast.error(createCartError?.data.message)
    }
  }, [createCartIsSuccess, createCartIsError])

if (isLoading) {
  return <Loader />
}
  return (
    <>{
      data?.product?.map((product) => (
        <div className="col-md-4 p-2 col-6">
          <div className="shadow rounded ">
            <div className="position-relative product-image-body">
              <img onClick={() => navigate(`/product/${product._id}`)} src={`http://localhost:8000/assets/img/${product?.images[0]?.filename}`} className="img-fluid rounded-top product-image" alt="" />
              <Link className="position-absolute add-to-cart w-100" onClick={(e) => addToCart({ e, productId: product._id, name: product.name, price: product.price })}><div className="text-center bg-gn pt-1 pb-1 text-white fs-md-5 fw-md-bold"><i class="fa-solid fa-cart-shopping pe-1"></i>Add To Cart</div></Link>
            </div>
            <div className="text-center">
              <p className="fs-5">{product.name}</p>
              <StarRatings starDimension="14px" starRatedColor="#FFA200" numberOfStars={5} rating={4.5} starSpacing="2px" />
              <div><p className="d-inline"><del></del></p><p className="d-inline fs-5 text-gn ps-1">${product.price}</p></div>
            </div>

          </div>
        </div>
      ))
    }</>
  );
};

export default ShopProduct;
