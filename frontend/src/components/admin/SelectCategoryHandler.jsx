import React, { useEffect } from 'react'
import Select from 'react-select'
import { useGetAllCategoryQuery } from '../../redux/api/CategoryAPI'

const SelectCategoryHandler = ({ parentCategory, setParentCategory }) => {
    const { data: CategoryData, isSuccess: CategoryisSuccess } = useGetAllCategoryQuery()

    let Categories = CategoryData?.categories.filter((category) => {
        return category.parentCategory == undefined
    })

    const parentCategoryHandler = (e) => {
        const value = e.value.split("&")
        const id = value[0]
        const name = value[1]


        setParentCategory({ ...parentCategory, id, name });
    }
    const options = []

    useEffect(() => {
        if (CategoryisSuccess) {
            Categories.map((category) => {
                options.push(
                    {
                        value: `${category._id}&${category.name}`, label: category.name
                    }
                )
            })
        }
    }, [options])

    return (
        <div className="pt-3">
            <label htmlFor="" className="form-label fw-bold">
                Parent Category
            </label>
            <Select
                name='parentCategory'
                className='rounded-0'
                placeholder={"Please select parent category"}
                options={options}
                onChange={parentCategoryHandler}
            />
        </div>
    )
}

export default SelectCategoryHandler
