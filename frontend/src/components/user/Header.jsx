import React, { useEffect, useState } from "react";
import logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfileQuery, useLazyGetProfileQuery } from "../../redux/api/UserAPI";
import { useGetCartQuery, useLazyGetCartQuery } from "../../redux/api/CartAPI";
import Cookies from 'js-cookie'
import { setLoading } from "../../redux/slice/UserSlice";


const Header = () => {

  const [cartQty, setcartQty] = useState(0)
  const [getProfile, { isLoading }] = useLazyGetProfileQuery();
  const [getCart, { data: cartData }] = useLazyGetCartQuery();
  const { isAuthorized, user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch()

  useEffect(() => {

    setcartQty(cartData?.cart.length)
    if (Cookies.get('token') == undefined) {
      dispatch(setLoading(false))
    } else {
      if (loading) {
        getProfile()
        getCart()
      }
    }
  }, [isAuthorized, cartData])



  return (
    <>
      {/* Topbar */}
      <section className="bg-body-tertiary p-2 d-sm-block d-none">
        <div className="d-flex container">
          <div className="nav-topbar">
            <ul className="m-auto ps-0">
              <li>
                <Link className="text-decoration-none text-gn" to="">
                  <i class="fa-regular fa-envelope"></i>
                  <p className="d-inline text-black ps-2">
                    Pankaj@pankajkamat.com
                  </p>
                </Link>
              </li>
              <li className="ps-2">
                <Link className="text-decoration-none text-gn" to="">
                  <i class="fa-solid fa-phone"></i>
                  <p className="d-inline text-black ps-2">+918709507961</p>
                </Link>
              </li>
            </ul>
          </div>
          <div className="nav-topbar text-end">
            <Link href="" className="text-gn">
              <i className="fa-brands fa-facebook ps-2"></i>
            </Link>
            <Link href="" className="text-gn">
              <i className="fa-brands fa-instagram ps-2"></i>
            </Link>
            <Link href="" className="text-gn">
              <i className="fa-brands fa-youtube ps-2"></i>
            </Link>
          </div>
        </div>
      </section>
      {/* Topbar */}
      {/* Header Section Begin */}
      <nav className="navbar shadow-none navbar-expand-lg ">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} style={{ height: "40px" }} alt="" />
          </Link>
          <div className="d-sm-none d-block icon-nav">
            <ul className="mt-auto mb-auto">
              <li>
                <Link to="#">
                  <i class="fa-solid text-gn fa-lg fa-magnifying-glass"></i>
                </Link>
              </li>
              <li className="ps-2">
                <Link to="/login">
                  <i class="fa-solid text-gn fa-lg fa-user"></i>
                </Link>
              </li>
              <li className="ps-2 nav-cart">
                <div className="cart-qty-cls">{cartQty || 0}</div>
                <Link to="/cart">
                  <i class="fa-solid text-gn fa-lg fa-shopping-cart"></i>
                </Link>
              </li>
              <li>
                <Link
                  className="navbar-toggler fa-lg"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <i class="fa-solid fa-bars ps-3"></i>
                </Link>
              </li>
            </ul>
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="d-flex d-sm-none navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/shop">
                  Shop
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="d-none d-sm-block">
            <ul class="v-effect-link">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/contact">Contact us</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
            </ul>
          </div>
          <div className="d-sm-block d-none icon-nav">
            <ul className="mt-auto mb-auto">
              <li>
                <Link>
                  <i class="fa-solid text-gn fa-lg fa-magnifying-glass"></i>
                </Link>
              </li>
              <li className="ps-2">
                <Link
                  to={isAuthorized ? "/dashboard/account" : "/login"}
                  className="text-decoration-none"
                >
                  <p className="d-inline pe-1 text-black">
                    {isAuthorized
                      ? `Hello, ${user?.name || "user"}`
                      : "Login/Register"}
                  </p>
                  <i class="fa-solid text-gn fa-lg fa-user"></i>
                </Link>
              </li>
              <li className="ps-2 nav-cart">
                <div className="cart-qty-cls">{cartQty || 0}</div>
                <Link to="/cart">
                  <i class="fa-solid text-gn fa-lg fa-shopping-cart"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Header Section End */}
    </>
  );
};

export default Header;
