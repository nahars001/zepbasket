import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLazyGetCartQuery } from '../../redux/api/CartAPI';
import { useLazyGetProfileQuery } from '../../redux/api/UserAPI';
import { setLoading } from '../../redux/slice/UserSlice';
import Cookies from 'js-cookie'
import logo_white from "../../assets/img/logo-white.png"
import { Link } from 'react-router-dom';

const AdminHeader = ({ setIsOpen, isOpen }) => {

  const [getProfile, { isLoading }] = useLazyGetProfileQuery();
  const [getCart, { data: cartData }] = useLazyGetCartQuery();
  const { isAuthorized, user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch()

  useEffect(() => {

    if (Cookies.get('token') == undefined) {
      dispatch(setLoading(false))
    } else {
      if (loading) {
        getProfile()
        getCart()
      }
    }
  }, [isAuthorized, cartData])

  const isOpenHandler = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='bg-admin border-bottom admin-header'>
      <div className='d-flex pe-2 ps-2 h-100 '>
        <div className='w-50 align-content-center'>
          <Link onClick={isOpenHandler} className='d-inline-block'><i className={`${isOpen ? "fa-regular fa-square-minus" : "fa-solid fa-bars"} p-1  border border-white text-white`}></i></Link>
          <Link to={"/"}><img src={logo_white} className='ps-2' alt="" srcset="" height={"35px"} /></Link>
        </div>
        <div className='w-50 align-content-center'>
          <ul className='list-unstyled mt-auto mb-auto d-flex justify-content-end'>
            <li className="ps-2 ">
              <Link>
                <p className="d-inline pe-1 text-white">
                  {isAuthorized
                    ? `Hello, ${user?.name || "user"}`
                    : "Login/Register"}
                </p>
                <i class="fa-solid text-white fa-lg fa-user"></i>
              </Link>
            </li>
          </ul>
        </div>

      </div>
    </div>
  )
}

export default AdminHeader
