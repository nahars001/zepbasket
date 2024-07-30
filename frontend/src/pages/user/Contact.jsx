import React, { useState } from 'react'
import Breadcrumb from '../../components/user/Breadcrumb'
import MetaData from '../../components/MetaData'

const Contact = () => {

  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phoneNo: "",
    message: ""
  })

  const inputHandle = (e) => {
    setContactInfo({...contactInfo , [e.target.name] : e.target.value})
  }

  const submitHandler = () => {

  }

  return (
    <div>
      <MetaData pageName={"Contact"} />
      <Breadcrumb breadcrumbLink1={"#"} breadcrumbLink1Text={"Contact Us"} breadcrumbTitle={"Contact Us"} />
      <div className="container">
        <div className="row pt-5 pb-5">
          <div className="col-md-6 m-auto">
            <p className='fs-2 fw-bold'>Contact Us</p>
            <p className='fw-bold pt-2'>Feel free to adjust any of the answers or add more questions as needed!</p>
            <div className='pt-2'>
              <div className='d-flex pt-3'>
                <div>
                  <i className='fa-solid fs-5 fa-envelope rounded-5 text-white bg-gn p-2 me-2'></i>
                </div>
                <div>
                  <p className='fs-4'>Email</p>
                  <p>Pankaj@pankajkamat.com</p>
                </div>
              </div>
              <div className='d-flex pt-3'>
                <div>
                  <i className='fa-solid fs-5 fa-phone rounded-5 text-white bg-gn p-2 me-2'></i>
                </div>
                <div>
                  <p className='fs-4'>Phone</p>
                  <p>+918709507961</p>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <p className='fs-3'>Send A Message</p>
            <div className="border auth-form border-1 p-3 ">
              <form action="">
                <div className="pt-3">
                  <label htmlFor="" className="form-label fw-bold">
                    Name
                  </label>
                  <input
                    className="form-control rounded-0"
                    type="text"
                    name="name"
                    placeholder="Please Enter Your Name"
                    onChange={(e) => inputHandle(e)}
                  />
                </div>
                <div className="pt-3">
                  <label htmlFor="" className="form-label fw-bold">
                    Email Address
                  </label>
                  <input
                    className="form-control rounded-0"
                    type="email"
                    name="email"
                    placeholder="Please Enter Your Email"
                    onChange={(e) => inputHandle(e)}
                  />
                </div>
                <div className="pt-3">
                  <label htmlFor="" className="form-label fw-bold">
                    Phone No<sup className="text-danger">*</sup>
                  </label>
                  <input
                    className="form-control rounded-0"
                    type="number"
                    name="phoneNo"
                    placeholder="Please Enter Your Phone Number"
                    onChange={(e) => inputHandle(e)}
                  />
                </div>
                <div className="pt-3">
                  <label htmlFor="" className="form-label fw-bold">
                    Message</label>
                  <textarea
                    className="form-control rounded-0"
                    type="message"
                    name="message"
                    placeholder="Please Enter Your Message"
                    onChange={(e) => inputHandle(e)}
                  />
                </div>
                <div className="pt-3">
                  <button className="auth-btn bg-gn" onClick={submitHandler}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
