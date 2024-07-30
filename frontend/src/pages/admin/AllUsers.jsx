import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MDBDataTable } from "mdbreact"
import Loader from "../../components/user/Loader"
import { useGetAllUsersQuery } from '../../redux/api/UserAPI'
import { useDeleteUserMutation } from '../../redux/api/AuthAPI'
import toast from 'react-hot-toast'
import MetaData from '../../components/MetaData'

const AllUsers = () => {

  const navigate = useNavigate()
  const { data, isLoading } = useGetAllUsersQuery()
  const [deleteUser, { data: deleteUserData, isSuccess: deleteUserIsSuccess, isLoading: deleteUserIsLoading, isError: deleteUserIsError, error: deleteUserError }] = useDeleteUserMutation()
  const productData = {
    columns: [
      {
        label: "User ID",
        field: "id",
        sort: "asc",
        width: 10
      },
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 150
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 40
      },
      {
        label: "Phone No",
        field: "phone",
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

  data?.result?.forEach((user, index) => {

    productData?.rows.push({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phoneNo,
      actions: (
        <button className='btn btn-danger ms-2' onClick={(e) => deleteUserHandler({ e, id: user._id })}>
          <i className='fa-solid fa-trash'></i>
        </button>
      ),


    })
  })

  useEffect(() => {
    if (deleteUserIsSuccess) {
      toast.success(deleteUserData.message)
    }
    if (deleteUserError) {
      toast.error(deleteUserError.data.message)
    }
  }, [deleteUserIsSuccess, deleteUserError])

  const deleteUserHandler = async ({ e, id }) => {
    e.preventDefault()
    await deleteUser(id)
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className='container pt-2'>
      <MetaData pageName={"All Users"} />
      <div className='d-flex justify-content-between'>
        <p className='fs-4'>All Orders</p>
      </div>
      <div className='mt-2'>
        <MDBDataTable striped bordered hover data={productData} />
      </div>
    </div>
  )
}

export default AllUsers
