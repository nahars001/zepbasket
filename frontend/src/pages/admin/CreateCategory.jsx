import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast"
import MetaData from '../../components/MetaData'
import { useCreateCategoryMutation, useGetAllCategoryQuery } from '../../redux/api/CategoryAPI'

const CreateCategory = () => {
    const [createCategory, { data, isLoading, isError, isSuccess, error }] = useCreateCategoryMutation()
    const { data: CategoryData, isSuccess: CategoryisSuccess } = useGetAllCategoryQuery()

    const [categoryInfo, setCategoryInfo] = useState({
        name: "",
        url: "",
    })
    const [parentCategory, setParentCategory] = useState({
        id: "",
        name: ""
    })

    const inputHandler = (e) => {
        setCategoryInfo({ ...categoryInfo, [e.target.name]: e.target.value })
    }
    const parentCategoryHandler = (e) => {
        const value = e.target.value.split("&")
        const id = value[0]
        const name = value[1]

        setParentCategory({ ...parentCategory, id, name });
    }

    let Categories = CategoryData?.categories.filter((category) => {
        return category.parentCategory == undefined
    })

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message)
            setCategoryInfo({
                name: "",
                url: "",
            })
            setParentCategory({
                id: "",
                name: ""
            })
        }
        if (isError) {
            toast.error(error.data.message)
        }
        if (CategoryisSuccess) {

        }
    }, [isError, isSuccess, CategoryisSuccess])

    const submitHandler = async (e) => {
        e.preventDefault()

        const body = {
            name: categoryInfo.name,
            url: categoryInfo.url
        }

        if (parentCategory.id != "") {
            body.parentCategoryID = parentCategory.id
            body.parentCategory = parentCategory.name
        }


        await createCategory({ body })
    }
    return (
        <div className="container">
            <MetaData pageName={"Add New Category"} />
            <div className="row pt-md-2 pb-2 justify-content-center">
                <div className="col-md-6">
                    <p className="text-uppercase fs-4">Add New Category</p>
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
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Parent Category
                                </label>
                                <select
                                    className="form-control rounded-0"
                                    name="parentCategory"
                                    value={parentCategory?.name}
                                    placeholder="Please Select Parent Category"
                                    onChange={(e) => parentCategoryHandler(e)}
                                >
                                    <option value={""}>Select Parent Category</option>
                                    {
                                        Categories?.map((category) => (
                                            <option key={category._id} value={`${category._id}&${category.name}`}>{category.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="pt-3">
                                <button className="auth-btn bg-gn" disabled={isLoading} onClick={submitHandler}>
                                    Add New Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default CreateCategory
