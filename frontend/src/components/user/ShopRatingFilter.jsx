import React from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

const ShopRatingFilter = () => {
  const selectRating = () => {};
  return (
    <div className="p-2">
      <Link
        className="fliter-btn"
        data-bs-toggle="collapse"
        to="#filter-rating"
        role="button"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        <p className="mb-1">Rating</p> <i class="fa-solid fa-caret-down"></i>
      </Link>
      <div class="collapse " id="filter-rating">
        <ul>
          {[4, 3, 2].map((rating) => (
            <li key={rating}>
              <div className="pe-1 d-inline">
                <input
                  onClick={() => selectRating()}
                  type="radio"
                  name="filter-rating-radio"
                  id={`filter-rating-radio-${rating}`}
                />
              </div>
              <label htmlFor="" className="form-label">
                <StarRatings
                  className="d-inline"
                  rating={rating}
                  starRatedColor="#0dcd0f"
                  numberOfStars={5}
                  name="rating"
                  starDimension="14px"
                  starSpacing="2px"
                />
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShopRatingFilter;
