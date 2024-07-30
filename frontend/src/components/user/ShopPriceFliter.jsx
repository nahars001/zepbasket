import React from 'react'

const ShopPriceFliter = () => {
  return (
    <div className="p-2">
                <a
                  className="fliter-btn"
                  data-bs-toggle="collapse"
                  href="#filter-price"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <p className="mb-1">Price</p>{" "}
                  <i class="fa-solid fa-caret-down"></i>
                </a>
                <div class="collapse " id="filter-price">
                    <div>
                        <input type="range" name="" id="" />
                    </div>
                </div>
              </div>
  )
}

export default ShopPriceFliter
