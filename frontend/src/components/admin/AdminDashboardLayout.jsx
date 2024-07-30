import React from 'react'
import { NavLink } from 'react-router-dom'
import SubMenu from './SubMenu'

const AdminDashboardLayout = ({ children, isOpen, setIsOpen }) => {



    const dashboardList = [
        { name: "Dashboard", icon: "fa-home", url: "/admin" },
        {
            name: "Products", icon: "fa-store", subMenu: [
                { name: "All Product", url: "/admin/products" },
                { name: "Add New Product", url: "/admin/product/create" },
            ]
        },
        {
            name: "Orders", icon: "fa-box-open", subMenu: [
                { name: "All Orders", url: "/admin/orders" },
            ]
        },
        {
            name: "Users", icon: "fa-users", subMenu: [
                { name: "All Users", url: "/admin/users" },
            ]
        },
        {
            name: "Settings", icon: "fa-gear", subMenu: [
                { name: "General Setting", url: "/admin/setting/general" },
            ]
        }
    ]


    return (<>
        <div className='d-flex' >
            <div className={"text-white admin-sidebar d-none d-md-block"} style={{ width: isOpen ? "200px" : "40px" }}>
                <ul className='list-unstyled'>
                    {dashboardList.map((menu) => {

                        if (menu.subMenu) {
                            return (<SubMenu menu={menu} isOpen={isOpen} />)
                        }
                        return (<li className='p-2 admin-nav-option'>
                            <NavLink to={menu.url} className={"d-flex"}><i className={`fa-solid text-white ${menu.icon} align-content-center pt-2 pb-2`}></i>{isOpen ? <p className='ps-2 text-white align-content-center'>{menu.name}</p> : ""}</NavLink>
                        </li>)

                    })}
                </ul>
            </div>

            <div className="d-block d-md-none">
                <div className={`text-white admin-sidebar admin-sidebar-mobile `} style={{ left: isOpen ? "0" : "-100%" }}>
                    <ul className='list-unstyled'>
                        {dashboardList.map((menu) => {

                            if (menu.subMenu) {
                                return (<SubMenu menu={menu} isOpen={isOpen} />)
                            }
                            return (<li className='p-2 admin-nav-option'>
                                <NavLink to={menu.url} className={"d-flex"}><i className={`fa-solid text-white ${menu.icon} align-content-center pt-2 pb-2`}></i>{isOpen ? <p className='ps-2 text-white align-content-center'>{menu.name}</p> : ""}</NavLink>
                            </li>)

                        })}
                    </ul>
                </div>
            </div >
            <div className='w-100'>{children}</div>


        </div>
    </>
    )
}

export default AdminDashboardLayout
