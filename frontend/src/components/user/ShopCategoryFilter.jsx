import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const ShopCategoryFilter = ({ Categories }) => {

  return (
    <div className="p-2">
      <Link
        className="fliter-btn"
        data-bs-toggle="collapse"
        to="#filter-category"
        role="button"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        <p className="mb-1">Category</p> <i class="fa-solid fa-caret-down"></i>
      </Link>
      <div class="collapse " id="filter-category">
        {Categories?.map((category) => (
          <div>
            <input type="checkbox" name={category} id={category} /><label htmlFor={category}>{category.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopCategoryFilter;
