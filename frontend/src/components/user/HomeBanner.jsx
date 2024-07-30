import React from "react";

const HomeBanner = () => {
  return (
    <div className="container pt-5 pb-4">
      <div className="row">
        <div className="col-md-4 ">
          <div
            className="home-banner"
            style={{
              backgroundImage: `url("https://multikart-react-reactpixelstrap.vercel.app/_next/static/media/sub-banner1.5d5f9c6f.jpg")`,
            }}
          >
            <div className="pe-4">
              <h1 className="text-black">MEN</h1>
              <h4 className="text-danger">10% Off</h4>
            </div>
          </div>
        </div>
        <div className="col-md-4 ">
          <div
            className="home-banner"
            style={{
              backgroundImage: `url("https://multikart-react-reactpixelstrap.vercel.app/_next/static/media/sub-banner1.5d5f9c6f.jpg")`,
            }}
          >
            <div className="pe-4">
              <h1 className="text-black">WOMEN</h1>
              <h4 className="text-danger">10% Off</h4>
            </div>
          </div>
        </div>
        <div className="col-md-4 ">
          <div
            className="home-banner"
            style={{
              backgroundImage: `url("https://multikart-react-reactpixelstrap.vercel.app/_next/static/media/sub-banner1.5d5f9c6f.jpg")`,
            }}
          >
            <div className="pe-4">
              <h1 className="text-black">KIDS</h1>
              <h4 className="text-danger">10% Off</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
