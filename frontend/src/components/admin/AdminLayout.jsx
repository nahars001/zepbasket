import React, { useState } from 'react'
import AdminHeader from './AdminHeader'
import { Outlet } from 'react-router-dom'
import AdminDashboardLayout from './AdminDashboardLayout'

const AdminLayout = () => {

  const [isOpen, setIsOpen] = useState(true)
  return (
    <>
      <AdminHeader isOpen={isOpen} setIsOpen={setIsOpen} />
      <AdminDashboardLayout isOpen={isOpen} setIsOpen={setIsOpen} >
        <Outlet />
      </AdminDashboardLayout>
    </>
  )
}

export default AdminLayout
