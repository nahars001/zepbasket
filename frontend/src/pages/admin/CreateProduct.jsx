import React, { useEffect, useRef, useState } from 'react'
import { useCreateProductMutation } from '../../redux/api/ProductAPI'
import toast from "react-hot-toast"
import MetaData from '../../components/MetaData'
import AddProductPreviewImg from '../../components/admin/AddProductPreviewImg'
import { useGetAllCategoryQuery, useLazyGetSubCategoryQuery } from '../../redux/api/CategoryAPI'
import { useNavigate } from "react-router-dom"
import ProductCategoryHandler from '../../components/admin/ProductCategoryHandler'

const CreateProduct = () => {
    const ref = useRef()
    const navigate = useNavigate()
    const [createProduct, { data, isLoading, isError, isSuccess, error }] = useCreateProductMutation()
    const [subCategory, { data: subCategoryData, isSuccess: subCategoryIsSuucess, isError: subCategoryIsError, error: subCategoryError }] = useLazyGetSubCategoryQuery()
    const { data: CategoryData, isSuccess: CategoryisSuccess } = useGetAllCategoryQuery()

    const [productInfo, setProductInfo] = useState({
        name: "",
        price: "",
        stock: "",
        description: "",
        category: "",
        subCategory: ""
    })
    const [images, setImages] = useState([])
    const [previewImg, setPreviewImg] = useState([])
    const [category, setCategory] = useState({
        id: "",
        name: ""
    })
    const [subCat, setSubCat] = useState({
        id: "",
        name: ""
    })

    const inputHandler = (e) => {
        setProductInfo({ ...productInfo, [e.target.name]: e.target.value })
    }



    useEffect(() => {
        if (isSuccess) {
            navigate("/admin/products")
        }
        if (isError) {
            toast.error(error.data.message)
        }
    }, [isError, isSuccess])

    let Categories = CategoryData?.categories.filter((category) => {
        return category.parentCategory == undefined
    })

    const submitHandler = async (e) => {
        e.preventDefault()
        const fromdata = new FormData()
        fromdata.append("name", productInfo.name)
        fromdata.append("price", productInfo.price)
        fromdata.append("stock", productInfo.stock)
        fromdata.append("description", productInfo.description)
        fromdata.append("categoryName", category.name)
        fromdata.append("categoryID", category.id)
        if (subCat.name != "") {

            fromdata.append("subCategoryName", subCat.name)
            fromdata.append("subCategoryID", subCat.id)
        }
        images?.map((img) => fromdata.append("productImage", img.img))

        await createProduct({ body: fromdata })
    }
    return (
        <div className="container">
            <MetaData pageName={"Add New Product"} />
            <div className="row pt-md-2 pb-2 justify-content-center">
                <div className="col-md-6">
                    <p className="text-uppercase fs-4">Add New Product</p>
                    <div className="border auth-form border-1 p-3 ">
                        <form action="">
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Product Name
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="text"
                                    name="name"
                                    value={productInfo.name}
                                    placeholder="Please Enter Your Product Name"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Product Price
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="number"
                                    name="price"
                                    value={productInfo.price}
                                    placeholder="Please Enter Your Product Price"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Product Stock
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="number"
                                    name="stock"
                                    value={productInfo.stock}
                                    placeholder="Please Enter Your Product Stock"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Product Description
                                </label>
                                <textarea
                                    className="form-control rounded-0"
                                    type="text"
                                    name="description"
                                    value={productInfo.description}
                                    placeholder="Please Enter Your Product Description"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                            <ProductCategoryHandler category={category} subCat={subCat} setCategory={setCategory} setSubCat={setSubCat} />
                            <AddProductPreviewImg images={images} previewImg={previewImg} setImages={setImages} setPreviewImg={setPreviewImg} ref={ref} />
                            <div className="pt-3">
                                <button className="auth-btn bg-gn" disabled={isLoading} onClick={submitHandler}>
                                    Add New Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateProduct
