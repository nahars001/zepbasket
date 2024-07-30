import React from 'react'
import Breadcrumb from '../../components/user/Breadcrumb'
import MetaData from '../../components/MetaData'

const About = () => {
  return (
    <div>
      <MetaData pageName={"About"} />
      <Breadcrumb breadcrumbLink1={"#"} breadcrumbLink1Text={"About Us"} breadcrumbTitle={"About Us"} />

      <div className='container pb-5 pt-5'>
        <p className='fs-3 pb-2'>About Us</p>
        <p>Welcome to <b>Zepbasket</b>!</p>
        <br />
        <p>At <b>Zepbasket</b>, we're revolutionizing the online shopping experience by combining cutting-edge technology with a user-centric approach. Founded in 2024, our mission is to provide a seamless, enjoyable, and secure shopping experience for customers worldwide.</p>

        <br />
        <p className='fs-5'>Who We Are:</p>
        <br />
        <p>We are a team of passionate developers, designers, and e-commerce enthusiasts committed to bringing you the best online shopping platform. Our diverse team brings together expertise from various fields to create a holistic and innovative shopping experience.</p>
        <br />
        <p className='fs-5'>Our Technology:</p>
        <br />
        <p>Our platform is built on the powerful MERN stack, which includes MongoDB, Express.js, React.js, and Node.js. This robust and flexible technology stack allows us to deliver a fast, reliable, and scalable service. With the MERN stack, we ensure that our platform is always up-to-date with the latest features and security measures, providing you with a top-notch online shopping experience.</p>
      </div>
    </div>
  )
}

export default About
