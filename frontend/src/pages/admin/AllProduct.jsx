import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from "mdbreact"
import { useDeleteProductMutation, useGetProductQuery } from '../../redux/api/ProductAPI'
import Loader from "../../components/user/Loader"
import defalut_product_image from "../../assets/img/product-default.png"
import toast from 'react-hot-toast'

const AllProduct = () => {

  const navigate = useNavigate()
  const { data, isLoading } = useGetProductQuery()
  const productData = {
    columns: [
      {
        label: "ID",
        field: "id",
        sort: "asc",
        width: 10
      },
      {
        label: "Image",
        field: "image",
        sort: "disabled",
        width: 30
      },
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 150
      },
      {
        label: "Price",
        field: "price",
        sort: "asc",
        width: 40
      },
      {
        label: "Stock",
        field: "stock",
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

  const [deleteProduct, { data: deleteProductData, isSuccess: deleteProductIsSuucess, isError: deleteProductIsError, error: deleteProductError }] = useDeleteProductMutation()

  const deleteProductHandler = async ({ e, id }) => {
    await deleteProduct(id)
  }

  useEffect(() => {
    if (deleteProductIsSuucess) {
      toast.success(deleteProductData.message)
    }
    if (deleteProductError) {
      toast.error(deleteProductError.data.message)
    }
  }, [deleteProductIsSuucess, deleteProductError])

  data?.product?.map((product, index) => {

    productData?.rows.push({
      id: product._id,
      name: product.name.length > 15 ? `${product.name.substring(0,15)}...` : product.name,
      image: (<img src={product.img || defalut_product_image} width={"30px"} />),
      price: product.price,
      stock: product?.stock == 0 ? (
        <p className="text-danger">
          <b>Out Of Stock</b>
        </p>
      ) : (
        <p className="text-success">
          <b>{product?.stock}</b>
        </p>
      ),
      actions: (<>
        <button className='btn btn-success ms-2' onClick={() => navigate(`/product/${product._id}`)}>
          <i className='fa-solid fa-eye'></i>
        </button>
        <button className='btn btn-primary ms-2' onClick={() => navigate(`/admin/product/${product._id}`)}>
          <i className='fa-solid fa-pencil'></i>
        </button>
        <button className='btn btn-danger ms-2' onClick={(e) => deleteProductHandler({ e, id: product._id })}>
          <i className='fa-solid fa-trash'></i>
        </button>
      </>
      )
    })
  })


  if (isLoading) {
    return <Loader />
  }

  return (
    <div className='container pt-2'>
      <div className='d-flex justify-content-between'>
        <p className='fs-4'>All Products</p>
        <Link className='btn btn-outline-gn' to={"/admin/product/create"}>Add New Product</Link>
      </div>
      <div className='mt-2'>
        <MDBDataTable striped bordered hover data={productData} />
      </div>
    </div>
  )
}

export default AllProduct
