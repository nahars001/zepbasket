import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from "mdbreact"
import Loader from "../../components/user/Loader"
import MetaData from '../../components/MetaData'
import { useDeleteCategoryMutation, useGetAllCategoryQuery } from '../../redux/api/CategoryAPI'
import toast from 'react-hot-toast'

const AllCategory = () => {

    const navigate = useNavigate()
    const { data, isLoading } = useGetAllCategoryQuery()
    const [deleteCategory, { data: deleteCategoryData, isSuccess: deleteCategoryIsSuucess, isError: deleteCategoryIsError, error: deleteCategoryError }] = useDeleteCategoryMutation()


    const deleteCategoryHandler = async ({ e, id }) => {
        e.preventDefault()
        await deleteCategory(id)
    }

    useEffect(() => {
        if (deleteCategoryIsSuucess) {
            toast.success(deleteCategoryData.message)
        }
        if (deleteCategoryError) {
            toast.error(deleteCategoryError.data.message)
        }
    }, [deleteCategoryIsSuucess, deleteCategoryError])

    const productData = {
        columns: [
            {
                label: "Category ID",
                field: "id",
                sort: "asc",
            },
            {
                label: "Name",
                field: "name",
                sort: "asc",
            },
            {
                label: "URL",
                field: "url",
                sort: "asc",
            },
            {
                label: "Parent Category",
                field: "parentCategory",
                sort: "asc",
            },
            {
                label: "Category Type",
                field: "type",
                sort: "asc"
            }, {
                label: "Actions",
                field: "actions",
                sort: "disabled",
            },

        ],

        rows: []
    }

    data?.categories?.map((category, index) => {

        productData?.rows.push({
            id: category?._id,
            name: category?.name,
            url: category?.url,
            parentCategory: category.parentCategory == undefined ? "None" : category.parentCategory,
            type: category.parentCategory == undefined ? "Category" : "Sub Category",
            actions: (<>
                <button className='btn btn-primary ms-2' onClick={() => navigate(`/admin/category/edit/${category._id}`)}>
                    <i className='fa-solid fa-pencil'></i>
                </button>
                <button className='btn btn-danger ms-2' onClick={(e) => deleteCategoryHandler({ e, id: category?._id })}>
                    <i className='fa-solid fa-trash'></i>
                </button>
            </>
            ),


        })
    })


    if (isLoading) {
        return <Loader />
    }

    return (
        <div className='container pt-2'>
            <MetaData pageName={"All Categories"} />
            <div className='d-flex justify-content-between'>
                <p className='fs-4'>All Categories</p>
                <Link className='btn btn-outline-gn' to={"/admin/category/create"}>Add New Category</Link>
            </div>
            <div className='mt-2'>
                <MDBDataTable striped bordered hover data={productData} />
            </div>
        </div>
    )
}

export default AllCategory
