import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const SubMenu = ({ menu, isOpen }) => {
    const [isMenuOpen, setIsOpenMenu] = useState(false)
    const menuOpenHandler = () => {
        setIsOpenMenu(!isMenuOpen)
    }

    return (<>
        <li onClick={menuOpenHandler} className='p-2 admin-nav-option d-flex justify-content-between cursor-pointer'>
            <div className="d-flex"><i className={`fa-solid text-white ${menu.icon} align-content-center pt-2 pb-2`}></i>{isOpen ? <p className='ps-2 text-white align-content-center'>{menu.name}</p> : ""}</div>
            {isOpen ? isMenuOpen ? <i className='fa-solid fa-angle-up align-content-center'></i> : <i className='fa-solid fa-angle-down align-content-center'></i> : ""}
        </li>
        {isOpen ? isMenuOpen ? menu.subMenu.map((submenu) => (
            <li className='p-2 ps-3 admin-nav-submenu'>
                <NavLink to={submenu.url} className={"d-flex"}>{isOpen ? <p className='ps-2 text-white align-content-center'>{submenu.name}</p> : ""}</NavLink>
            </li>
        )
        ) : "" : ""}
    </>

    )
}

export default SubMenu
