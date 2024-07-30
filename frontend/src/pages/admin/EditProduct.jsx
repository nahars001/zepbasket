import React, { useEffect, useState } from 'react'
import { useProductQuery, useUpdateProductMutation } from '../../redux/api/ProductAPI'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../components/user/Loader'
import toast from 'react-hot-toast'
import MetaData from '../../components/MetaData'

const EditProduct = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { data, isError, isLoading, isSuccess, error } = useProductQuery(id)
    const [updateProduct, { data: updateProductData, isError: updateProductIsError, isLoading: updateProductIsLoading, isSuccess: updateProductIsSuccess, error: updateProductError }] = useUpdateProductMutation()

    const [productInfo, setProductInfo] = useState({
        name: "",
        price: "",
        stock: "",
        description: "",
    })




    const [images, setImages] = useState([])
    const [oldImages, setOldImages] = useState([])
    const [previewImg, setPreviewImg] = useState([])

    useEffect(() => {
        if (isSuccess) {
            setProductInfo({
                name: data?.product?.name,
                price: data?.product?.price,
                stock: data?.product?.stock,
                description: data?.product?.description
            })
            data.product.images.map((img) => {
                setPreviewImg((oldArray) => [...oldArray, {
                    name: img.filename,
                    url: `/assets/img/${img.filename}`,
                    imgType: "oldImage"
                }])
                setOldImages((oldArray) => [...oldArray, {
                    name: img.filename,
                }])
            })
        }

        if (updateProductIsError) {
            toast.error(updateProductError.data.message)
        }

        if (updateProductIsSuccess) {
            toast.success(updateProductData.message)
            navigate("/admin/products")
        }
    }, [isSuccess, updateProductError, updateProductIsSuccess])

    const inputHandler = (e) => {
        setProductInfo({ ...productInfo, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const fd = new FormData()
        fd.append("name", productInfo.name)
        fd.append("stock", productInfo.stock)
        fd.append("price", productInfo.price)
        fd.append("description", productInfo.description)
        oldImages.map((img) => fd.append("oldImages", img.name))
        images.map((img) => fd.append("productImage", img.img))


        await updateProduct({ id, body: fd })
    }

    const imageHandler = (e) => {
        let files = e.target.files

        Array.from(files).forEach((img) => {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            setImages((oldArray) => [...oldArray, {
                name: uniqueSuffix,
                img,

            }])
            setPreviewImg((oldArray) => [...oldArray, {
                name: uniqueSuffix,
                url: URL.createObjectURL(img),
                imgType: "newImage"
            }])
        })


    }


    const deleteImageHandler = ({ filename, imgType }) => {
        const filteredImage = images.filter((img) => img.name != filename);
        const filteredPreviewImage = previewImg.filter((img) => img.name != filename);
        setPreviewImg(filteredPreviewImage);
        setImages(filteredImage)
        if (imgType == "oldImage") {
            const filteredOldImage = oldImages.filter((img) => img.name != filename);
            setOldImages(filteredOldImage)
        }
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="container">
            <MetaData pageName={"Edit Product"} />
            <div className="row pt-md-2 pb-2 justify-content-center">
                <div className="col-md-6">
                    <p className="text-uppercase fs-4">Edit Product</p>
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
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Product Image
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="file"
                                    name="image"
                                    value={productInfo.image}
                                    placeholder="Please Enter Your Product Image"
                                    multiple
                                    onChange={(e) => imageHandler(e)}
                                />
                            </div>
                            <div className='pt-3 row'>
                                {previewImg.length != 0 ? previewImg.map((img) => (
                                    <div className='col-3 p-2'>
                                        <div className='previewImg cursor-pointer' onClick={() => deleteImageHandler({ filename: img.name, imgType: img.imgType })}>
                                            <img src={img.url} className='img-fluid previewImgSrc' alt="" />
                                            <div className='previewImgDelete'>
                                                <i className='fa-solid fa-x fa-2x'></i>
                                            </div>
                                        </div>
                                    </div>
                                )) : ""}
                            </div>
                            <div className="pt-3">
                                <button className="auth-btn bg-gn" onClick={submitHandler}>
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

export default EditProduct
