import React, { useEffect, useRef, useState } from 'react'
import { useCreateProductMutation } from '../../redux/api/ProductAPI'
import toast from "react-hot-toast"
import MetaData from '../../components/MetaData'

const CreateProduct = () => {
    const ref = useRef()
    const [createProduct, { data, isLoading, isError, isSuccess, error }] = useCreateProductMutation()

    const [productInfo, setProductInfo] = useState({
        name: "",
        price: "",
        stock: "",
        description: "",
    })
    const [images, setImages] = useState([])
    const [previewImg, setPreviewImg] = useState([])

    const inputHandler = (e) => {
        setProductInfo({ ...productInfo, [e.target.name]: e.target.value })
    }

    const imageHandler = (e) => {
        let files = e.target.files

        Array.from(files).forEach((img) => {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            setImages((oldArray) => [...oldArray, {
                name: uniqueSuffix,
                img
            }])
            setPreviewImg((oldArray) => [...oldArray, {
                name: uniqueSuffix,
                url: URL.createObjectURL(img)
            }])
        })


    }

    const deleteImageHandler = (filename) => {
        const filteredImage = images.filter((img) => img.name != filename);
        const filteredPreviewImage = previewImg.filter((img) => img.name != filename);
        setPreviewImg(filteredPreviewImage);
        setImages(filteredImage)
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message)
            setProductInfo({
                name: "",
                price: "",
                stock: "",
                description: "",
            })
            ref.current.value = ""
            setImages([])
            setPreviewImg([])
        }
        if (isError) {
            toast.error(error.data.message)
        }
    }, [isError, isSuccess])

    const submitHandler = async (e) => {
        e.preventDefault()
        const fromdata = new FormData()
        fromdata.append("name", productInfo.name)
        fromdata.append("price", productInfo.price)
        fromdata.append("stock", productInfo.stock)
        fromdata.append("description", productInfo.description)
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
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Product Image
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="file"
                                    name="image"
                                    ref={ref}
                                    placeholder="Please Enter Your Product Image"
                                    multiple
                                    onChange={(e) => imageHandler(e)}
                                />
                            </div>
                            <div className='pt-3 row'>
                                {previewImg.length != 0 ? previewImg.map((img) => (
                                    <div className='col-3 p-2'>
                                        <div className='previewImg cursor-pointer' onClick={() => deleteImageHandler(img.name)}>
                                            <img src={img.url} className='img-fluid previewImgSrc' alt="" />
                                            <div className='previewImgDelete'>
                                                <i className='fa-solid fa-x fa-2x'></i>
                                            </div>
                                        </div>
                                    </div>
                                )) : ""}
                            </div>
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
