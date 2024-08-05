import React from 'react'
import CreateProduct from '../pages/admin/CreateProduct'
import { Route } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import AdminLayout from '../components/admin/AdminLayout'
import AdminDashboard from '../pages/admin/AdminDashboard'
import AllProduct from '../pages/admin/AllProduct'
import AllUsers from '../pages/admin/AllUsers'
import AllOrders from '../pages/admin/AllOrders'
import EditProduct from '../pages/admin/EditProduct'
import EditOrder from '../pages/admin/EditOrder'
import GeneralSetting from '../pages/admin/GeneralSetting'
import AllCategory from '../pages/admin/AllCategory'
import CreateCategory from '../pages/admin/CreateCategory'
import EditCategory from '../pages/admin/EditCategory'

const AdminRoute = () => {
    return (
        <>
            <Route element={<AdminLayout />}>
                <Route path="/admin" element={<ProtectedRoute admin={true}><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/products" element={<ProtectedRoute admin={true}><AllProduct /></ProtectedRoute>} />
                <Route path="/admin/product/create" element={<ProtectedRoute admin={true}><CreateProduct /></ProtectedRoute>} />
                <Route path="/admin/product/:id" element={<ProtectedRoute admin={true}><EditProduct /></ProtectedRoute>} />
                <Route path="/admin/users" element={<ProtectedRoute admin={true}><AllUsers /></ProtectedRoute>} />
                <Route path="/admin/orders" element={<ProtectedRoute admin={true}><AllOrders /></ProtectedRoute>} />
                <Route path="/admin/order/:id" element={<ProtectedRoute admin={true}><EditOrder /></ProtectedRoute>} />
                <Route path="/admin/setting/general" element={<ProtectedRoute admin={true}><GeneralSetting /></ProtectedRoute>} />
                <Route path="/admin/categories" element={<ProtectedRoute admin={true}><AllCategory /></ProtectedRoute>} />
                <Route path="/admin/category/create" element={<ProtectedRoute admin={true}><CreateCategory /></ProtectedRoute>} />
                <Route path="/admin/category/edit/:id" element={<ProtectedRoute admin={true}><EditCategory /></ProtectedRoute>} />


            </Route>
        </>
    )
}

export default AdminRoute
