import React from "react";
import logo_white from "../../assets/img/logo-white.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-dark text-white">
      <div className="container pt-5 pb-5">
        <div className="row pb-3">
          <div className="col-md-6 align-content-end">
            <h5>KNOW IT ALL FIRST!</h5>
            <p>
              Never Miss Anything From Multikart By Signing Up To Our
              Newsletter.
            </p>
          </div>
          <div className="col-md-6">
            <form action="" className="">
              <div className="d-flex justify-content-between align-items-end">
                <div className="col-9">
                  <label htmlFor="" className="footer-email-label">
                    Email Address
                  </label>
                  <input
                    type="text"
                    className="footer-email-input rounded-0 mt-1"
                    placeholder="Please Enter Your Email"
                  />
                </div>
                <div className="col-3 text-center">
                  <button className="footer-email-submit">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <hr />
        <div className="row pt-3">
          <div className="col-md-4">
            <img src={logo_white} alt="" />
            <p className="pt-2">
              At Zepbasket, we're revolutionizing the online shopping experience by combining cutting-edge technology with a user-centric approach.
            </p>
          </div>
          <div className="col-md-2">
            <h5 className="">Quick Link</h5>
            <ul className="list-unstyled footer-ul ps-0">
              <li>
                <Link to={"/shop"} className="footer-ul-link">
                  Shop
                </Link>
              </li>
              <li>
                <Link to={"/about"} className="footer-ul-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link to={"/contact"} className="footer-ul-link">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-2">
            <h5 className="">Useful Link</h5>
            <ul className="list-unstyled footer-ul ps-0">
              <li>
                <Link className="footer-ul-link">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="" className="footer-ul-link">
                  T&C
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="">Contact Information</h5>
            <ul className="list-unstyled footer-ul">
              <li>
                <i class="fa-solid fa-phone "></i>
                <p className="ps-2 d-inline">+91-8709507961</p>
              </li>
              <li>
                <i class="fa-solid fa-envelope"></i>
                <p className="ps-2 d-inline">zepbasket@pankajkamat.com</p>
              </li>
              <li>
                <i class="fa-solid fa-map-pin"></i>
                <p className="ps-2 d-inline">Benipatti Madhubani - 847224</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="m-0" />
      <div className="container pt-2 pb-2">
        <div className="row justify-content-between">
          <p className="mb-0 col-md-6">
            © Zepbasket 2024 | All Rights Reserved
          </p>
          <div className="col-md-6 text-end d-none d-sm-block">
            <Link href="" className="text-white">
              <i className="fa-brands fa-facebook ps-2"></i>
            </Link>
            <Link href="" className="text-white">
              <i className="fa-brands fa-instagram ps-2"></i>
            </Link>
            <Link href="" className="text-white">
              <i className="fa-brands fa-youtube ps-2"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
