import React from "react";

const HeroSection = () => {
  const sliderData = [
    {
      title: "Zep Basket",
      tagline: "Welcome To Zep Basket",
      buttonTitle: "Shop Now",
      imgUrl:
        "https://multikart-react-reactpixelstrap.vercel.app/assets/images/home-banner/1.jpg",
      active: "active",
    },
    {
      title: "Fashion Male",
      tagline: "Welcome To Fashion Male ",
      buttonTitle: "Shop Now",
      imgUrl:
        "https://multikart-react-reactpixelstrap.vercel.app/assets/images/parallax/1.jpg",
    },
  ];
  return (
    <>
      <div id="heroSectionSlider" className="carousel slide">
        <div className="carousel-indicators">
          {sliderData.map((val, index) => (
            <button
              type="button"
              data-bs-target="#heroSectionSlider"
              data-bs-slide-to={index}
              className={val.active}
              aria-current="true"
              aria-label={`Slide ${index}`}
              key={val.title}
            />
          ))}
        </div>
        <div className="carousel-inner">
          {sliderData.map((val) => (
            <div
              className={`carousel-item ${val?.active}`}
              style={{
                backgroundImage: `url(${val.imgUrl})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "450px",
                alignContent: "center",
                backgroundPosition: "center",
              }}
              key={val.title}
            >
              <div className="container">
                <div className="col-md-6 text-center">
                  <h4>{val.tagline}</h4>
                  <h1 className="fs-60 pt-2 text-uppercase">{val.title}</h1>
                  <button className="btn rounded-0 hero-section-btn mt-3 fs-4">
                    {val.buttonTitle}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="hero-slide-button">
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#heroSectionSlider"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#heroSectionSlider"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
