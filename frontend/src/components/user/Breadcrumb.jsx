import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({
  breadcrumbTitle,
  breadcrumbLink1Text,
  breadcrumbLink1,
  breadcrumbLink2,
  breadcrumbLink2Text,
}) => {
  return (
    <div className="bg-body-tertiary">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-6 pt-3 pb-3">
            <h5 className="text-black text-uppercase mb-0">{breadcrumbTitle}</h5>
          </div>
          <div className="col-6 text-end d-flex justify-content-end align-items-center">
            <nav>
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <Link to="/" className="">
                    Home
                  </Link>
                </li>
                <li
                  class="breadcrumb-item"
                  aria-current={breadcrumbLink2 ? "" : "page"}
                >
                  <Link to={breadcrumbLink1}>{breadcrumbLink1Text}</Link>
                </li>
                {breadcrumbLink2 ? (
                  <>
                    <li class="breadcrumb-item">{breadcrumbLink2Text}</li>
                  </>
                ) : (
                  <> </>
                )}
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
