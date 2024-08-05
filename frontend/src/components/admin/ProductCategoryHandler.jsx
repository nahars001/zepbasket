import React from 'react'
import { useGetAllCategoryQuery, useLazyGetSubCategoryQuery } from '../../redux/api/CategoryAPI'


const ProductCategoryHandler = ({ category, subCat, setCategory, setSubCat }) => {

    const [subCategory, { data: subCategoryData, isSuccess: subCategoryIsSuucess, isError: subCategoryIsError, error: subCategoryError }] = useLazyGetSubCategoryQuery()
    const { data: CategoryData, isSuccess: CategoryisSuccess } = useGetAllCategoryQuery()

    let Categories = CategoryData?.categories.filter((category) => {
        return category.parentCategory == undefined
    })

    const categoryHandler = async (e) => {
        const value = e.target.value.split("&")
        const id = value[0]
        const name = value[1]

        await subCategory(id)
        setCategory({ ...category, id, name })
        setSubCat({ ...subCat, id: "", name: "" })

    }
    const subCategoryHandler = async (e) => {
        const value = e.target.value.split("&")
        const id = value[0]
        const name = value[1]

        setSubCat({ ...subCat, id, name })

    }
    return (
        <>
            <div className="pt-3">
                <label htmlFor="" className="form-label fw-bold">
                    Category
                </label>
                <select
                    className="form-control rounded-0"
                    name="category"
                    placeholder="Please Select Parent Category"
                    onChange={(e) => categoryHandler(e)}
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
                <label htmlFor="" className="form-label fw-bold">
                    Sub category
                </label>
                <select
                    className="form-control rounded-0"
                    name="subCategory"
                    placeholder="Please Select Parent Category"
                    onChange={(e) => subCategoryHandler(e)}
                >
                    <option value={""}>Select Sub category</option>
                    {
                        subCategoryData?.subCategories?.map((category) => (
                            <option key={category._id} value={`${category._id}&${category.name}`}>{category.name}</option>
                        ))
                    }
                </select>
            </div>
        </>
    )
}

export default ProductCategoryHandler
