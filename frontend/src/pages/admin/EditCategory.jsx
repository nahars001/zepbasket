import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../components/user/Loader'
import toast from 'react-hot-toast'
import MetaData from '../../components/MetaData'
import { useGetCategoryQuery, useUpdateCategoryMutation } from '../../redux/api/CategoryAPI'
import SelectCategoryHandler from '../../components/admin/SelectCategoryHandler'

const EditCategory = () => {
    const navigate = useNavigate()
    const { id } = useParams()


    const { data, isLoading, isSuccess } = useGetCategoryQuery(id)
    const [updateCategory, { data: updateCategoryData, isError: updateCategoryIsError, isLoading: updateCategoryIsLoading, isSuccess: updateCategoryIsSuccess, error: updateCategoryError }] = useUpdateCategoryMutation()


    const [categoryInfo, setCategoryInfo] = useState({
        name: "",
        url: "",
    })
    const [parentCategory, setParentCategory] = useState({
        id: "",
        name: ""
    })



    useEffect(() => {
        if (isSuccess) {
            setCategoryInfo({
                name: data?.category.name,
                url: data?.category.url,
            })

            setParentCategory({
                id: data?.category.parentCategoryID || "",
                name: data?.category.parentCategory || ""
            })
        }

        if (updateCategoryError) {
            toast.error(updateCategoryError.data.message)
        }

        if (updateCategoryIsSuccess) {
            toast.success(updateCategoryData.message)
            navigate("/admin/categories")
        }
    }, [isSuccess, updateCategoryError, updateCategoryIsSuccess])

    const inputHandler = (e) => {
        setCategoryInfo({ ...categoryInfo, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        const body = {
            name: categoryInfo.name,
            url: categoryInfo.url
        }
        if (parentCategory.name != "") {
            body.parentCategoryID = parentCategory.id
            body.parentCategory = parentCategory.name
        }

        await updateCategory({ id, body })
    }



    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="container">
            <MetaData pageName={"Edit Category"} />
            <div className="row pt-md-2 pb-2 justify-content-center">
                <div className="col-md-6">
                    <p className="text-uppercase fs-4">Edit Category</p>
                    <div className="border auth-form border-1 p-3 ">
                        <form action="">
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Category Name
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="text"
                                    name="name"
                                    value={categoryInfo.name}
                                    placeholder="Please Enter Your Product Name"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Category URL
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="text"
                                    name="url"
                                    value={categoryInfo.url}
                                    placeholder="Please Enter Your Product Price"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                            <SelectCategoryHandler parentCategory={parentCategory} setParentCategory={setParentCategory} />
                            <div className="pt-3">
                                <button className="auth-btn bg-gn" disabled={isLoading} onClick={submitHandler}>
                                    Edit Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditCategory
