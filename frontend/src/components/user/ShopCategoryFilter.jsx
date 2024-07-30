import React from "react";
import { Link } from "react-router-dom";

const ShopCategoryFilter = () => {
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
        <ul>
          <li>
            <Link href="#">Electronic</Link>
          </li>
          <li>
            <Link href="#">Fashion</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ShopCategoryFilter;
